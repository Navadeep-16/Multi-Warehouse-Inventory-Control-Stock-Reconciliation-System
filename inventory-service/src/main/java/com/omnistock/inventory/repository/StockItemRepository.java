package com.omnistock.inventory.repository;

import com.omnistock.inventory.model.StockItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface StockItemRepository extends JpaRepository<StockItem, Long> {
    List<StockItem> findByProductId(Long productId);
    List<StockItem> findByWarehouseId(Long warehouseId);
    
    @Query("SELECT s FROM StockItem s WHERE s.quantityAvailable < s.reorderThreshold")
    List<StockItem> findLowStockItems();
    
    Optional<StockItem> findByProductIdAndWarehouseId(Long productId, Long warehouseId);
}
