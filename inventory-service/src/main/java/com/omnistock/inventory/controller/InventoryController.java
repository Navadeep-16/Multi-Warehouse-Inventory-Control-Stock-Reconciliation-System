package com.omnistock.inventory.controller;

import com.omnistock.inventory.client.ProductClient;
import com.omnistock.inventory.dto.ReservationRequest;
import com.omnistock.inventory.exception.InsufficientStockException;
import com.omnistock.inventory.model.StockItem;
import com.omnistock.inventory.repository.StockItemRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    private final StockItemRepository stockItemRepository;
    private final ProductClient productClient;

    public InventoryController(StockItemRepository stockItemRepository, ProductClient productClient) {
        this.stockItemRepository = stockItemRepository;
        this.productClient = productClient;
    }

    @GetMapping("/{productId}")
    public List<StockItem> getProductStock(@PathVariable Long productId) {
        return stockItemRepository.findByProductId(productId);
    }

    @GetMapping("/warehouse/{warehouseId}")
    public List<StockItem> getWarehouseStock(@PathVariable Long warehouseId) {
        return stockItemRepository.findByWarehouseId(warehouseId);
    }

    @GetMapping("/low-stock")
    public List<StockItem> getLowStockItems() {
        return stockItemRepository.findLowStockItems();
    }

    @PostMapping("/reserve")
    @Transactional
    public ResponseEntity<?> reserveStock(@RequestBody ReservationRequest request) {
        StockItem stock = stockItemRepository.findByProductIdAndWarehouseId(request.getProductId(), request.getWarehouseId())
                .orElseThrow(() -> new InsufficientStockException("Stock item not found"));

        if (stock.getQuantityAvailable() < request.getQuantity()) {
            throw new InsufficientStockException("Insufficient stock for product " + request.getProductId());
        }

        stock.setQuantityAvailable(stock.getQuantityAvailable() - request.getQuantity());
        stockItemRepository.save(stock);

        if (stock.getQuantityAvailable() < stock.getReorderThreshold()) {
            // Log LOW_STOCK_ALERT event
            System.out.println("LOW_STOCK_ALERT: Product " + stock.getProductId() + " at warehouse " + stock.getWarehouseId() + " is below threshold");
            // Here we could publish an event to Kafka/RabbitMQ
        }

        return ResponseEntity.ok().build();
    }

    @PostMapping("/release")
    @Transactional
    public ResponseEntity<?> releaseStock(@RequestBody ReservationRequest request) {
        stockItemRepository.findByProductIdAndWarehouseId(request.getProductId(), request.getWarehouseId())
                .ifPresent(stock -> {
                    stock.setQuantityAvailable(stock.getQuantityAvailable() + request.getQuantity());
                    stockItemRepository.save(stock);
                });
        return ResponseEntity.ok().build();
    }

    @PutMapping("/replenish")
    @PreAuthorize("hasRole('MANAGER')")
    @Transactional
    public ResponseEntity<StockItem> replenishStock(@RequestBody ReservationRequest request) {
        // Validate product exists and is active using Feign
        try {
            productClient.validateProduct(request.getProductId());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        StockItem stock = stockItemRepository.findByProductIdAndWarehouseId(request.getProductId(), request.getWarehouseId())
                .orElseGet(() -> {
                    StockItem newItem = new StockItem();
                    newItem.setProductId(request.getProductId());
                    newItem.setWarehouseId(request.getWarehouseId());
                    newItem.setQuantityAvailable(0);
                    newItem.setReorderThreshold(10); // default
                    return newItem;
                });

        stock.setQuantityAvailable(stock.getQuantityAvailable() + request.getQuantity());
        StockItem saved = stockItemRepository.save(stock);
        return ResponseEntity.ok(saved);
    }
}
