package com.omnistock.inventory.repository;

import com.omnistock.inventory.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    List<Inventory> findByWarehouseId(Long warehouseId);
    Optional<Inventory> findBySkuAndWarehouseId(String sku, Long warehouseId);
}
