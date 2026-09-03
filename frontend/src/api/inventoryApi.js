import api from './axiosClient';

export const getInventoryByWarehouse = async (warehouseId) => {
  const { data } = await api.get(`/inventory/warehouse/${warehouseId}`);
  return data;
};

// Alias used by InventoryPage
export const getStockForWarehouse = getInventoryByWarehouse;

export const getLowStockItems = async () => {
  const { data } = await api.get('/inventory/low-stock');
  return data;
};

export const replenishStock = async (replenishRequest) => {
  const { data } = await api.put('/inventory/replenish', replenishRequest);
  return data;
};

// Update stock by warehouseId + productId + quantity delta
export const updateStock = async (warehouseId, productId, quantity) => {
  return replenishStock({ warehouseId, productId, quantity });
};

// Fetch all warehouses
export const getWarehouses = async () => {
  const { data } = await api.get('/inventory/warehouses');
  return data;
};

