package com.omnistock.order.service;

import com.omnistock.order.client.InventoryClient;
import com.omnistock.order.client.ProductClient;
import com.omnistock.order.dto.OrderItemRequest;
import com.omnistock.order.dto.OrderRequest;
import com.omnistock.order.model.Order;
import com.omnistock.order.model.OrderItem;
import com.omnistock.order.model.OrderStatus;
import com.omnistock.order.repository.OrderRepository;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import io.github.resilience4j.timelimiter.annotation.TimeLimiter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductClient productClient;
    private final InventoryClient inventoryClient;

    public OrderService(OrderRepository orderRepository, ProductClient productClient, InventoryClient inventoryClient) {
        this.orderRepository = orderRepository;
        this.productClient = productClient;
        this.inventoryClient = inventoryClient;
    }

    @Transactional
    @CircuitBreaker(name = "inventoryService", fallbackMethod = "placeOrderFallback")
    @Retry(name = "inventoryService")
    public Order placeOrder(OrderRequest request) {
        Order order = new Order();
        order.setCustomerId(request.getCustomerId());
        order.setStatus(OrderStatus.PENDING);
        
        List<OrderItemRequest> successfulReservations = new ArrayList<>();

        try {
            for (OrderItemRequest itemReq : request.getItems()) {
                // 1. Validate Product & get price
                Map<String, Object> product = productClient.validateProduct(itemReq.getProductId());
                if (product == null) {
                    throw new RuntimeException("Product validation failed");
                }
                
                BigDecimal price = new BigDecimal(product.get("unitPrice").toString());

                // 2. Reserve Stock
                Map<String, Object> reserveReq = new HashMap<>();
                reserveReq.put("productId", itemReq.getProductId());
                reserveReq.put("warehouseId", itemReq.getWarehouseId());
                reserveReq.put("quantity", itemReq.getQuantity());
                
                inventoryClient.reserveStock(reserveReq);
                successfulReservations.add(itemReq);

                // Add to order
                OrderItem orderItem = new OrderItem();
                orderItem.setProductId(itemReq.getProductId());
                orderItem.setWarehouseId(itemReq.getWarehouseId());
                orderItem.setQuantity(itemReq.getQuantity());
                orderItem.setPriceAtOrder(price);
                order.addItem(orderItem);
            }

            order.setStatus(OrderStatus.CONFIRMED);
            return orderRepository.save(order);

        } catch (Exception e) {
            // 3. Compensating transaction (Release stock)
            for (OrderItemRequest itemReq : successfulReservations) {
                Map<String, Object> releaseReq = new HashMap<>();
                releaseReq.put("productId", itemReq.getProductId());
                releaseReq.put("warehouseId", itemReq.getWarehouseId());
                releaseReq.put("quantity", itemReq.getQuantity());
                try {
                    inventoryClient.releaseStock(releaseReq);
                } catch (Exception ex) {
                    // Log failure to release, requires manual intervention in real world
                }
            }
            order.setStatus(OrderStatus.FAILED);
            orderRepository.save(order);
            throw new RuntimeException("Order placement failed: " + e.getMessage());
        }
    }

    public Order placeOrderFallback(OrderRequest request, Throwable t) {
        Order order = new Order();
        order.setCustomerId(request.getCustomerId());
        order.setStatus(OrderStatus.FAILED);
        orderRepository.save(order);
        throw new RuntimeException("Order failed due to service unavailability: " + t.getMessage());
    }
}
