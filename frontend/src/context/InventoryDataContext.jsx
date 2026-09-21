import React, { createContext, useContext, useState } from 'react';

const InventoryDataContext = createContext();

export const InventoryDataProvider = ({ children }) => {
  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Warehouses Data
  const [warehouses, setWarehouses] = useState([
    {
      id: 1,
      code: 'WH-EAST',
      name: 'New York Logistics Hub',
      location: 'Queens, New York, NY',
      manager: 'Sarah Jenkins',
      capacity: 50000,
      utilization: 34200,
      status: 'Active',
      productCount: 42,
      stockUnits: 34200,
      zones: [
        { id: 'Z1', name: 'Zone A - High Value Electronics', aisles: 12, racks: 48, bins: 240 },
        { id: 'Z2', name: 'Zone B - Peripherals & Cables', aisles: 8, racks: 32, bins: 160 },
        { id: 'Z3', name: 'Zone C - Bulk Storage & Furniture', aisles: 6, racks: 24, bins: 96 }
      ]
    },
    {
      id: 2,
      code: 'WH-WEST',
      name: 'San Francisco Fulfillment',
      location: 'Oakland, California, CA',
      manager: 'Marcus Vance',
      capacity: 75000,
      utilization: 58900,
      status: 'Active',
      productCount: 58,
      stockUnits: 58900,
      zones: [
        { id: 'Z1', name: 'Zone A - Primary Distribution', aisles: 18, racks: 72, bins: 360 },
        { id: 'Z2', name: 'Zone B - Cold Storage & Components', aisles: 10, racks: 40, bins: 200 }
      ]
    },
    {
      id: 3,
      code: 'WH-NORTH',
      name: 'Chicago Central Depot',
      location: 'Naperville, Illinois, IL',
      manager: 'David Miller',
      capacity: 40000,
      utilization: 18400,
      status: 'Active',
      productCount: 31,
      stockUnits: 18400,
      zones: [
        { id: 'Z1', name: 'Zone A - General Cargo', aisles: 10, racks: 40, bins: 200 }
      ]
    },
    {
      id: 4,
      code: 'WH-SOUTH',
      name: 'Austin Distribution Center',
      location: 'Austin, Texas, TX',
      manager: 'Elena Rostova',
      capacity: 60000,
      utilization: 49200,
      status: 'Active',
      productCount: 49,
      stockUnits: 49200,
      zones: [
        { id: 'Z1', name: 'Zone A - Heavy Equipment', aisles: 14, racks: 56, bins: 280 }
      ]
    }
  ]);

  // Products Catalog Data
  const [products, setProducts] = useState([
    {
      id: 1,
      sku: 'PRO-MAC-16',
      name: 'MacBook Pro 16" M3 Max',
      barcode: '885909743019',
      category: 'Electronics',
      brand: 'Apple',
      unit: 'pcs',
      unitCost: 2899.00,
      unitPrice: 3499.00,
      stock: 145,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&q=80'
    },
    {
      id: 2,
      sku: 'MON-DELL-32',
      name: 'Dell UltraSharp 32" 4K Monitor',
      barcode: '884116382012',
      category: 'Electronics',
      brand: 'Dell',
      unit: 'pcs',
      unitCost: 650.00,
      unitPrice: 899.00,
      stock: 12,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&q=80'
    },
    {
      id: 3,
      sku: 'KEY-MECH-01',
      name: 'Keychron Q1 Pro Mechanical Keyboard',
      barcode: '793573194012',
      category: 'Accessories',
      brand: 'Keychron',
      unit: 'pcs',
      unitCost: 110.00,
      unitPrice: 199.00,
      stock: 0,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&q=80'
    },
    {
      id: 4,
      sku: 'DESK-STAND-01',
      name: 'Jarvis Motorized Standing Desk',
      barcode: '602493012948',
      category: 'Furniture',
      brand: 'Fully',
      unit: 'set',
      unitCost: 420.00,
      unitPrice: 689.00,
      stock: 89,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=300&q=80'
    },
    {
      id: 5,
      sku: 'MOU-VERT-02',
      name: 'Logitech MX Vertical Wireless Mouse',
      barcode: '097855142981',
      category: 'Accessories',
      brand: 'Logitech',
      unit: 'pcs',
      unitCost: 65.00,
      unitPrice: 109.99,
      stock: 310,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=300&q=80'
    },
    {
      id: 6,
      sku: 'SSD-SAMS-2TB',
      name: 'Samsung 990 PRO 2TB NVMe M.2 SSD',
      barcode: '887276729014',
      category: 'Storage',
      brand: 'Samsung',
      unit: 'pcs',
      unitCost: 120.00,
      unitPrice: 189.99,
      stock: 450,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300&q=80'
    },
    {
      id: 7,
      sku: 'DOCK-THUN-04',
      name: 'CalDigit TS4 Thunderbolt 4 Dock',
      barcode: '850012948192',
      category: 'Accessories',
      brand: 'CalDigit',
      unit: 'pcs',
      unitCost: 240.00,
      unitPrice: 399.95,
      stock: 8,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=300&q=80'
    },
    {
      id: 8,
      sku: 'CHR-STEEL-01',
      name: 'Steelcase Gesture Ergonomic Chair',
      barcode: '792019482012',
      category: 'Furniture',
      brand: 'Steelcase',
      unit: 'pcs',
      unitCost: 850.00,
      unitPrice: 1420.00,
      stock: 24,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d8310?w=300&q=80'
    }
  ]);

  // Inventory Stock Items (per Warehouse + Product)
  const [inventoryItems, setInventoryItems] = useState([
    {
      id: 1,
      productId: 1,
      sku: 'PRO-MAC-16',
      name: 'MacBook Pro 16" M3 Max',
      category: 'Electronics',
      warehouse: 'WH-EAST',
      warehouseId: 1,
      available: 95,
      reserved: 15,
      reorder: 30,
      unitCost: 2899.00,
      unitPrice: 3499.00,
      status: 'Healthy',
      batchNo: 'BCH-2026-A1',
      serialNo: 'SN-APL-884910'
    },
    {
      id: 2,
      productId: 1,
      sku: 'PRO-MAC-16',
      name: 'MacBook Pro 16" M3 Max',
      category: 'Electronics',
      warehouse: 'WH-WEST',
      warehouseId: 2,
      available: 50,
      reserved: 5,
      reorder: 20,
      unitCost: 2899.00,
      unitPrice: 3499.00,
      status: 'Healthy',
      batchNo: 'BCH-2026-A2',
      serialNo: 'SN-APL-884915'
    },
    {
      id: 3,
      productId: 2,
      sku: 'MON-DELL-32',
      name: 'Dell UltraSharp 32" 4K Monitor',
      category: 'Electronics',
      warehouse: 'WH-WEST',
      warehouseId: 2,
      available: 12,
      reserved: 5,
      reorder: 30,
      unitCost: 650.00,
      unitPrice: 899.00,
      status: 'Low Stock',
      batchNo: 'BCH-2026-D1',
      serialNo: 'SN-DEL-441092'
    },
    {
      id: 4,
      productId: 3,
      sku: 'KEY-MECH-01',
      name: 'Keychron Q1 Pro Mechanical Keyboard',
      category: 'Accessories',
      warehouse: 'WH-EAST',
      warehouseId: 1,
      available: 0,
      reserved: 0,
      reorder: 50,
      unitCost: 110.00,
      unitPrice: 199.00,
      status: 'Out of Stock',
      batchNo: 'BCH-2025-K9',
      serialNo: 'SN-KEY-000000'
    },
    {
      id: 5,
      productId: 4,
      sku: 'DESK-STAND-01',
      name: 'Jarvis Motorized Standing Desk',
      category: 'Furniture',
      warehouse: 'WH-NORTH',
      warehouseId: 3,
      available: 89,
      reserved: 12,
      reorder: 25,
      unitCost: 420.00,
      unitPrice: 689.00,
      status: 'Healthy',
      batchNo: 'BCH-2026-F4',
      serialNo: 'SN-FUL-991204'
    },
    {
      id: 6,
      productId: 5,
      sku: 'MOU-VERT-02',
      name: 'Logitech MX Vertical Wireless Mouse',
      category: 'Accessories',
      warehouse: 'WH-WEST',
      warehouseId: 2,
      available: 310,
      reserved: 20,
      reorder: 50,
      unitCost: 65.00,
      unitPrice: 109.99,
      status: 'Overstock',
      batchNo: 'BCH-2026-L2',
      serialNo: 'SN-LOG-112049'
    },
    {
      id: 7,
      productId: 6,
      sku: 'SSD-SAMS-2TB',
      name: 'Samsung 990 PRO 2TB NVMe M.2 SSD',
      category: 'Storage',
      warehouse: 'WH-SOUTH',
      warehouseId: 4,
      available: 450,
      reserved: 35,
      reorder: 100,
      unitCost: 120.00,
      unitPrice: 189.99,
      status: 'Healthy',
      batchNo: 'BCH-2026-S8',
      serialNo: 'SN-SAM-889104'
    },
    {
      id: 8,
      productId: 7,
      sku: 'DOCK-THUN-04',
      name: 'CalDigit TS4 Thunderbolt 4 Dock',
      category: 'Accessories',
      warehouse: 'WH-NORTH',
      warehouseId: 3,
      available: 8,
      reserved: 2,
      reorder: 15,
      unitCost: 240.00,
      unitPrice: 399.95,
      status: 'Low Stock',
      batchNo: 'BCH-2026-C1',
      serialNo: 'SN-CAL-771029'
    }
  ]);

  // Categories & Brands State
  const [categories, setCategories] = useState([
    { id: 1, name: 'Electronics', description: 'Computing, displays & consumer electronics', productCount: 18 },
    { id: 2, name: 'Accessories', description: 'Peripherals, docks, input devices & cables', productCount: 24 },
    { id: 3, name: 'Furniture', description: 'Ergonomic desks, seating & office decor', productCount: 12 },
    { id: 4, name: 'Storage', description: 'SSD drives, NVMe arrays & SAN storage', productCount: 15 },
    { id: 5, name: 'Networking', description: 'Enterprise routers, switches & APs', productCount: 9 }
  ]);

  const [brands, setBrands] = useState([
    { id: 1, name: 'Apple', country: 'United States', status: 'Active', productCount: 8 },
    { id: 2, name: 'Dell', country: 'United States', status: 'Active', productCount: 14 },
    { id: 3, name: 'Logitech', country: 'Switzerland', status: 'Active', productCount: 22 },
    { id: 4, name: 'Samsung', country: 'South Korea', status: 'Active', productCount: 11 },
    { id: 5, name: 'Steelcase', country: 'United States', status: 'Active', productCount: 6 }
  ]);

  // Batches & Serials Data
  const [batches, setBatches] = useState([
    { id: 1, batchNo: 'BCH-2026-A1', serialNo: 'SN-APL-884910', product: 'MacBook Pro 16" M3 Max', mfgDate: '2026-01-15', expiryDate: '2029-01-15', quantity: 95, warehouse: 'WH-EAST', status: 'Valid' },
    { id: 2, batchNo: 'BCH-2026-A2', serialNo: 'SN-APL-884915', product: 'MacBook Pro 16" M3 Max', mfgDate: '2026-02-01', expiryDate: '2029-02-01', quantity: 50, warehouse: 'WH-WEST', status: 'Valid' },
    { id: 3, batchNo: 'BCH-2026-D1', serialNo: 'SN-DEL-441092', product: 'Dell UltraSharp 32" 4K Monitor', mfgDate: '2025-11-10', expiryDate: '2028-11-10', quantity: 12, warehouse: 'WH-WEST', status: 'Valid' },
    { id: 4, batchNo: 'BCH-2026-S8', serialNo: 'SN-SAM-889104', product: 'Samsung 990 PRO 2TB NVMe M.2 SSD', mfgDate: '2026-03-01', expiryDate: '2031-03-01', quantity: 450, warehouse: 'WH-SOUTH', status: 'Valid' }
  ]);

  // Transfers Data
  const [transfers, setTransfers] = useState([
    {
      id: 101,
      code: 'TR-2026-001',
      sourceWarehouse: 'WH-WEST',
      destWarehouse: 'WH-EAST',
      product: 'MacBook Pro 16" M3 Max',
      productId: 1,
      quantity: 10,
      requestedBy: 'Sarah Jenkins',
      date: '2026-09-20',
      priority: 'High',
      reason: 'Rebalance regional stock deficit',
      status: 'Pending'
    },
    {
      id: 102,
      code: 'TR-2026-002',
      sourceWarehouse: 'WH-SOUTH',
      destWarehouse: 'WH-NORTH',
      product: 'Samsung 990 PRO 2TB NVMe M.2 SSD',
      productId: 6,
      quantity: 50,
      requestedBy: 'David Miller',
      date: '2026-09-18',
      priority: 'Normal',
      reason: 'Fulfill customer bulk order allocation',
      status: 'Approved'
    },
    {
      id: 103,
      code: 'TR-2026-003',
      sourceWarehouse: 'WH-EAST',
      destWarehouse: 'WH-WEST',
      product: 'Jarvis Motorized Standing Desk',
      productId: 4,
      quantity: 15,
      requestedBy: 'Marcus Vance',
      date: '2026-09-15',
      priority: 'Low',
      reason: 'Warehouse reorganization',
      status: 'Completed'
    }
  ]);

  // Stock Operations History Log
  const [stockOperations, setStockOperations] = useState([
    {
      id: 1,
      type: 'Stock In',
      reference: 'RCV-2026-9901',
      warehouse: 'WH-EAST',
      product: 'MacBook Pro 16" M3 Max',
      quantity: 50,
      date: '2026-09-20 14:30',
      user: 'Sarah Jenkins',
      notes: 'Received initial shipment from Apple Direct',
      batchNo: 'BCH-2026-A1'
    },
    {
      id: 2,
      type: 'Stock Out',
      reference: 'ISS-2026-4412',
      warehouse: 'WH-WEST',
      product: 'Dell UltraSharp 32" 4K Monitor',
      quantity: 5,
      date: '2026-09-19 11:15',
      user: 'Marcus Vance',
      notes: 'Dispatched for enterprise client order #ORD-8812',
      batchNo: 'BCH-2026-D1'
    },
    {
      id: 3,
      type: 'Adjustment',
      reference: 'ADJ-2026-012',
      warehouse: 'WH-NORTH',
      product: 'CalDigit TS4 Thunderbolt 4 Dock',
      quantity: -2,
      date: '2026-09-17 09:45',
      user: 'David Miller',
      notes: 'Damaged during transit loading inspection',
      batchNo: 'BCH-2026-C1'
    }
  ]);

  // Purchase Orders Data
  const [purchaseOrders, setPurchaseOrders] = useState([
    {
      id: 1,
      poNumber: 'PO-2026-8801',
      supplier: 'Apple Commercial Logistics',
      date: '2026-09-15',
      expectedDelivery: '2026-09-25',
      totalAmount: 144950.00,
      status: 'Approved',
      itemsCount: 50
    },
    {
      id: 2,
      poNumber: 'PO-2026-8802',
      supplier: 'Dell Enterprise Systems',
      date: '2026-09-18',
      expectedDelivery: '2026-09-28',
      totalAmount: 32500.00,
      status: 'Pending',
      itemsCount: 50
    },
    {
      id: 3,
      poNumber: 'PO-2026-8803',
      supplier: 'Logitech Global Distribution',
      date: '2026-09-10',
      expectedDelivery: '2026-09-16',
      totalAmount: 19500.00,
      status: 'Received',
      itemsCount: 300
    }
  ]);

  // Purchase Requests Data
  const [purchaseRequests, setPurchaseRequests] = useState([
    {
      id: 1,
      requestCode: 'PR-2026-019',
      requestedBy: 'Alex Chen',
      department: 'IT Hardware Procurement',
      products: 'Keychron Q1 Pro Mechanical Keyboard',
      quantity: 100,
      priority: 'High',
      date: '2026-09-21',
      status: 'Pending'
    },
    {
      id: 2,
      requestCode: 'PR-2026-018',
      requestedBy: 'Maria Garcia',
      department: 'Facilities & Ops',
      products: 'Steelcase Gesture Ergonomic Chair',
      quantity: 20,
      priority: 'Medium',
      date: '2026-09-19',
      status: 'Approved'
    }
  ]);

  // Reconciliation Sessions Data
  const [reconciliationSessions, setReconciliationSessions] = useState([
    {
      id: 1,
      code: 'REC-2026-Q3-NY',
      warehouse: 'WH-EAST',
      zone: 'Zone A - Electronics',
      date: '2026-09-15',
      expectedStock: 110,
      physicalStock: 108,
      variance: -2,
      matchedItems: 40,
      discrepanciesCount: 2,
      progress: 100,
      status: 'Discrepancy Review'
    },
    {
      id: 2,
      code: 'REC-2026-Q3-SF',
      warehouse: 'WH-WEST',
      zone: 'Zone B - Components',
      date: '2026-09-20',
      expectedStock: 372,
      physicalStock: 372,
      variance: 0,
      matchedItems: 372,
      discrepanciesCount: 0,
      progress: 100,
      status: 'Completed'
    }
  ]);

  // Discrepancy Items Data
  const [discrepancies, setDiscrepancies] = useState([
    {
      id: 1,
      product: 'CalDigit TS4 Thunderbolt 4 Dock',
      sku: 'DOCK-THUN-04',
      warehouse: 'WH-NORTH',
      systemQty: 10,
      physicalQty: 8,
      variance: -2,
      variancePct: '-20%',
      reason: 'Physical shrinkage / missing carton',
      reviewer: 'David Miller',
      status: 'Pending Review'
    },
    {
      id: 2,
      product: 'Dell UltraSharp 32" 4K Monitor',
      sku: 'MON-DELL-32',
      warehouse: 'WH-WEST',
      systemQty: 15,
      physicalQty: 12,
      variance: -3,
      variancePct: '-20%',
      reason: 'Unrecorded demo unit allocation',
      reviewer: 'Marcus Vance',
      status: 'Pending Review'
    }
  ]);

  // Suppliers Data
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: 'Apple Commercial Direct', contact: 'Tim Cook (Sales)', email: 'b2b@apple.com', phone: '+1 (800) 692-7753', address: 'One Apple Park Way, Cupertino, CA', productsSupplied: 'MacBook, iPad, Studio Display', totalPurchases: 845000.00, status: 'Active' },
    { id: 2, name: 'Dell Enterprise Systems', contact: 'Michael H. (Direct)', email: 'orders@dell.com', phone: '+1 (800) 456-3355', address: 'Round Rock, Texas, TX', productsSupplied: 'Monitors, Servers, Workstations', totalPurchases: 320000.00, status: 'Active' },
    { id: 3, name: 'Logitech Corporate B2B', contact: 'Bridget Lawson', email: 'sales@logitech.com', phone: '+1 (800) 255-8850', address: 'Lausanne, Switzerland', productsSupplied: 'Mice, Keyboards, Webcams', totalPurchases: 195000.00, status: 'Active' },
    { id: 4, name: 'Samsung Semiconductor', contact: 'K. J. Kim', email: 'semicon@samsung.com', phone: '+1 (800) 726-7864', address: 'San Jose, California, CA', productsSupplied: 'NVMe SSDs, Memory Modules', totalPurchases: 410000.00, status: 'Active' }
  ]);

  // Customers Data
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Acme Global Innovations', email: 'procurement@acme.io', phone: '+1 (415) 890-1122', address: '500 Howard St, San Francisco, CA', ordersCount: 28, totalSpent: 284900.00, status: 'VIP Enterprise' },
    { id: 2, name: 'Stripe Corporate IT', email: 'hardware@stripe.com', phone: '+1 (415) 998-3344', address: '354 Oyster Point Blvd, South SF, CA', ordersCount: 42, totalSpent: 512000.00, status: 'VIP Enterprise' },
    { id: 3, name: 'Vercel Infrastructure', email: 'ops@vercel.com', phone: '+1 (650) 443-8811', address: '440 N Barranca Ave, Covina, CA', ordersCount: 15, totalSpent: 189000.00, status: 'Standard' },
    { id: 4, name: 'Linear Systems Inc.', email: 'facilities@linear.app', phone: '+1 (415) 332-9012', address: 'San Francisco, CA', ordersCount: 9, totalSpent: 87500.00, status: 'Standard' }
  ]);

  // Orders Data
  const [orders, setOrders] = useState([
    { id: 1, orderNumber: 'ORD-2026-9001', customer: 'Acme Global Innovations', products: 'MacBook Pro 16" M3 Max (x10)', quantity: 10, total: 34990.00, warehouse: 'WH-EAST', orderDate: '2026-09-20', status: 'Confirmed' },
    { id: 2, orderNumber: 'ORD-2026-9002', customer: 'Stripe Corporate IT', products: 'Samsung 990 PRO 2TB SSD (x100)', quantity: 100, total: 18999.00, warehouse: 'WH-SOUTH', orderDate: '2026-09-19', status: 'Processing' },
    { id: 3, orderNumber: 'ORD-2026-9003', customer: 'Vercel Infrastructure', products: 'Dell UltraSharp 32" Monitor (x5)', quantity: 5, total: 4495.00, warehouse: 'WH-WEST', orderDate: '2026-09-18', status: 'Shipped' },
    { id: 4, orderNumber: 'ORD-2026-9004', customer: 'Linear Systems Inc.', products: 'Jarvis Motorized Standing Desk (x3)', quantity: 3, total: 2067.00, warehouse: 'WH-NORTH', orderDate: '2026-09-15', status: 'Delivered' }
  ]);

  // Users & Roles Data
  const [usersList, setUsersList] = useState([
    { id: 1, name: 'Sarah Jenkins', email: 'sarah.j@nexora.io', role: 'Warehouse Manager', department: 'East Coast Operations', status: 'Active', lastLogin: '2026-09-21 10:14' },
    { id: 2, name: 'Marcus Vance', email: 'marcus.v@nexora.io', role: 'Inventory Manager', department: 'West Coast Operations', status: 'Active', lastLogin: '2026-09-21 09:30' },
    { id: 3, name: 'David Miller', email: 'david.m@nexora.io', role: 'Warehouse Manager', department: 'Midwest Distribution', status: 'Active', lastLogin: '2026-09-20 16:45' },
    { id: 4, name: 'Elena Rostova', email: 'elena.r@nexora.io', role: 'Procurement Manager', department: 'Global Supply Chain', status: 'Active', lastLogin: '2026-09-21 11:02' },
    { id: 5, name: 'Navadeep Challa', email: 'challanavadeep8@gmail.com', role: 'Super Admin', department: 'Executive Management', status: 'Active', lastLogin: '2026-09-21 11:45' }
  ]);

  // Audit Logs Data
  const [auditLogs, setAuditLogs] = useState([
    { id: 1, timestamp: '2026-09-21 11:24:12', user: 'Navadeep Challa', action: 'USER_LOGIN', module: 'Auth', entity: 'User Session', ip: '192.168.1.105', oldValue: '-', newValue: 'JWT Issued', status: 'Success' },
    { id: 2, timestamp: '2026-09-21 10:15:40', user: 'Sarah Jenkins', action: 'STOCK_RECEIVE', module: 'Operations', entity: 'PRO-MAC-16', ip: '10.142.17.12', oldValue: 'Qty: 45', newValue: 'Qty: 95', status: 'Success' },
    { id: 3, timestamp: '2026-09-20 14:22:01', user: 'Marcus Vance', action: 'TRANSFER_CREATE', module: 'Transfers', entity: 'TR-2026-001', ip: '10.142.17.44', oldValue: 'Draft', newValue: 'Pending', status: 'Success' },
    { id: 4, timestamp: '2026-09-19 16:10:05', user: 'Elena Rostova', action: 'PO_APPROVE', module: 'Procurement', entity: 'PO-2026-8801', ip: '10.142.17.89', oldValue: 'Pending', newValue: 'Approved', status: 'Success' }
  ]);

  // Settings State
  const [settings, setSettings] = useState({
    companyName: 'NEXORA Retail Operations Ltd.',
    companyEmail: 'ops@nexora.io',
    phone: '+1 (800) 555-NEXORA',
    currency: 'USD ($)',
    timezone: 'UTC -5 (Eastern Standard Time)',
    reorderThresholdDefault: 20,
    enableAutoReorder: true,
    enableEmailAlerts: true,
    enableLowStockWarning: true,
    theme: 'Luxury Dark'
  });

  // --- ACTIONS & MUTATIONS ---

  // 1. Receive Stock (Stock In)
  const addStockIn = (data) => {
    const { warehouseId, productId, quantity, batchNo, serialNo, notes } = data;
    const qtyNum = parseInt(quantity, 10);
    const targetWH = warehouses.find(w => w.id === parseInt(warehouseId, 10)) || warehouses[0];
    const targetProd = products.find(p => p.id === parseInt(productId, 10)) || products[0];

    // Update or add inventory item
    setInventoryItems(prev => {
      const idx = prev.findIndex(item => item.productId === targetProd.id && item.warehouseId === targetWH.id);
      if (idx >= 0) {
        const updated = [...prev];
        const newAvail = updated[idx].available + qtyNum;
        updated[idx] = {
          ...updated[idx],
          available: newAvail,
          status: newAvail <= 0 ? 'Out of Stock' : newAvail <= updated[idx].reorder ? 'Low Stock' : 'Healthy'
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            id: prev.length + 1,
            productId: targetProd.id,
            sku: targetProd.sku,
            name: targetProd.name,
            category: targetProd.category,
            warehouse: targetWH.code,
            warehouseId: targetWH.id,
            available: qtyNum,
            reserved: 0,
            reorder: 20,
            unitCost: targetProd.unitCost,
            unitPrice: targetProd.unitPrice,
            status: 'Healthy',
            batchNo: batchNo || 'BCH-NEW',
            serialNo: serialNo || 'SN-NEW'
          }
        ];
      }
    });

    // Update total product catalog stock count
    setProducts(prev => prev.map(p => p.id === targetProd.id ? { ...p, stock: p.stock + qtyNum } : p));

    // Update warehouse utilization
    setWarehouses(prev => prev.map(w => w.id === targetWH.id ? { ...w, utilization: w.utilization + qtyNum, stockUnits: w.stockUnits + qtyNum } : w));

    // Log operation
    setStockOperations(prev => [
      {
        id: prev.length + 1,
        type: 'Stock In',
        reference: `RCV-${Date.now().toString().slice(-4)}`,
        warehouse: targetWH.code,
        product: targetProd.name,
        quantity: qtyNum,
        date: new Date().toISOString().replace('T', ' ').slice(0, 16),
        user: 'Current User',
        notes: notes || 'Received stock',
        batchNo: batchNo || 'N/A'
      },
      ...prev
    ]);

    // Audit log
    setAuditLogs(prev => [
      {
        id: prev.length + 1,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        user: 'Current User',
        action: 'STOCK_RECEIVE',
        module: 'Operations',
        entity: targetProd.sku,
        ip: '127.0.0.1',
        oldValue: 'Received',
        newValue: `+${qtyNum} units`,
        status: 'Success'
      },
      ...prev
    ]);

    addToast(`Successfully received ${qtyNum} units of ${targetProd.name} at ${targetWH.code}`);
  };

  // 2. Issue Stock (Stock Out)
  const addStockOut = (data) => {
    const { warehouseId, productId, quantity, notes } = data;
    const qtyNum = parseInt(quantity, 10);
    const targetWH = warehouses.find(w => w.id === parseInt(warehouseId, 10)) || warehouses[0];
    const targetProd = products.find(p => p.id === parseInt(productId, 10)) || products[0];

    setInventoryItems(prev => {
      const idx = prev.findIndex(item => item.productId === targetProd.id && item.warehouseId === targetWH.id);
      if (idx >= 0) {
        const updated = [...prev];
        const newAvail = Math.max(0, updated[idx].available - qtyNum);
        updated[idx] = {
          ...updated[idx],
          available: newAvail,
          status: newAvail === 0 ? 'Out of Stock' : newAvail <= updated[idx].reorder ? 'Low Stock' : 'Healthy'
        };
        return updated;
      }
      return prev;
    });

    setProducts(prev => prev.map(p => p.id === targetProd.id ? { ...p, stock: Math.max(0, p.stock - qtyNum) } : p));
    setWarehouses(prev => prev.map(w => w.id === targetWH.id ? { ...w, utilization: Math.max(0, w.utilization - qtyNum), stockUnits: Math.max(0, w.stockUnits - qtyNum) } : w));

    setStockOperations(prev => [
      {
        id: prev.length + 1,
        type: 'Stock Out',
        reference: `ISS-${Date.now().toString().slice(-4)}`,
        warehouse: targetWH.code,
        product: targetProd.name,
        quantity: qtyNum,
        date: new Date().toISOString().replace('T', ' ').slice(0, 16),
        user: 'Current User',
        notes: notes || 'Issued stock out',
        batchNo: 'N/A'
      },
      ...prev
    ]);

    addToast(`Issued ${qtyNum} units of ${targetProd.name} from ${targetWH.code}`);
  };

  // 3. Stock Adjustment
  const addStockAdjustment = (data) => {
    const { warehouseId, productId, adjustedQuantity, reason } = data;
    const targetQty = parseInt(adjustedQuantity, 10);
    const targetWH = warehouses.find(w => w.id === parseInt(warehouseId, 10)) || warehouses[0];
    const targetProd = products.find(p => p.id === parseInt(productId, 10)) || products[0];

    setInventoryItems(prev => {
      const idx = prev.findIndex(item => item.productId === targetProd.id && item.warehouseId === targetWH.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          available: targetQty,
          status: targetQty === 0 ? 'Out of Stock' : targetQty <= updated[idx].reorder ? 'Low Stock' : 'Healthy'
        };
        return updated;
      }
      return prev;
    });

    setStockOperations(prev => [
      {
        id: prev.length + 1,
        type: 'Adjustment',
        reference: `ADJ-${Date.now().toString().slice(-4)}`,
        warehouse: targetWH.code,
        product: targetProd.name,
        quantity: targetQty,
        date: new Date().toISOString().replace('T', ' ').slice(0, 16),
        user: 'Current User',
        notes: reason || 'Manual audit stock adjustment',
        batchNo: 'N/A'
      },
      ...prev
    ]);

    addToast(`Stock adjusted for ${targetProd.name} to ${targetQty} units at ${targetWH.code}`);
  };

  // 4. Create Transfer
  const createTransfer = (data) => {
    const { sourceWarehouse, destWarehouse, productId, quantity, priority, reason } = data;
    const targetProd = products.find(p => p.id === parseInt(productId, 10)) || products[0];
    const newTr = {
      id: Date.now(),
      code: `TR-2026-${Math.floor(100 + Math.random() * 900)}`,
      sourceWarehouse,
      destWarehouse,
      product: targetProd.name,
      productId: targetProd.id,
      quantity: parseInt(quantity, 10),
      requestedBy: 'Current Operator',
      date: new Date().toISOString().split('T')[0],
      priority: priority || 'Normal',
      reason: reason || 'Inter-warehouse rebalancing',
      status: 'Pending'
    };
    setTransfers(prev => [newTr, ...prev]);
    addToast(`Transfer request ${newTr.code} submitted successfully`);
  };

  // 5. Approve Transfer
  const approveTransfer = (id) => {
    const tr = transfers.find(t => t.id === id);
    if (!tr) return;

    setTransfers(prev => prev.map(t => t.id === id ? { ...t, status: 'Completed' } : t));

    // Decrement source WH stock, Increment dest WH stock
    setInventoryItems(prev => {
      return prev.map(item => {
        if (item.product === tr.product && item.warehouse === tr.sourceWarehouse) {
          const newAvail = Math.max(0, item.available - tr.quantity);
          return { ...item, available: newAvail, status: newAvail === 0 ? 'Out of Stock' : newAvail <= item.reorder ? 'Low Stock' : 'Healthy' };
        }
        if (item.product === tr.product && item.warehouse === tr.destWarehouse) {
          const newAvail = item.available + tr.quantity;
          return { ...item, available: newAvail, status: newAvail <= item.reorder ? 'Low Stock' : 'Healthy' };
        }
        return item;
      });
    });

    addToast(`Transfer ${tr.code} approved and stock moved!`);
  };

  // 6. Reject Transfer
  const rejectTransfer = (id) => {
    setTransfers(prev => prev.map(t => t.id === id ? { ...t, status: 'Rejected' } : t));
    addToast(`Transfer request rejected`, 'warning');
  };

  // 7. Add Product
  const addProduct = (prodData) => {
    const newProd = {
      id: Date.now(),
      sku: prodData.sku || `PROD-${Date.now().toString().slice(-4)}`,
      name: prodData.name,
      barcode: prodData.barcode || `${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      category: prodData.category || 'General',
      brand: prodData.brand || 'Generic',
      unit: prodData.unit || 'pcs',
      unitCost: parseFloat(prodData.unitCost || 0),
      unitPrice: parseFloat(prodData.unitPrice || 0),
      stock: parseInt(prodData.stock || 0, 10),
      status: 'Active',
      image: prodData.image || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&q=80'
    };
    setProducts(prev => [newProd, ...prev]);

    // Create default inventory item for WH-EAST
    setInventoryItems(prev => [
      ...prev,
      {
        id: Date.now(),
        productId: newProd.id,
        sku: newProd.sku,
        name: newProd.name,
        category: newProd.category,
        warehouse: 'WH-EAST',
        warehouseId: 1,
        available: newProd.stock,
        reserved: 0,
        reorder: 20,
        unitCost: newProd.unitCost,
        unitPrice: newProd.unitPrice,
        status: newProd.stock === 0 ? 'Out of Stock' : newProd.stock <= 20 ? 'Low Stock' : 'Healthy',
        batchNo: 'BCH-INITIAL',
        serialNo: 'SN-INITIAL'
      }
    ]);

    addToast(`Added product "${newProd.name}" to catalog!`);
  };

  // 8. Delete Product
  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setInventoryItems(prev => prev.filter(i => i.productId !== id));
    addToast('Product removed from catalog', 'warning');
  };

  // 9. Add Supplier
  const addSupplier = (supplier) => {
    const newSupp = {
      id: Date.now(),
      name: supplier.name,
      contact: supplier.contact || 'N/A',
      email: supplier.email,
      phone: supplier.phone || 'N/A',
      address: supplier.address || 'N/A',
      productsSupplied: supplier.productsSupplied || 'General Supplies',
      totalPurchases: 0,
      status: 'Active'
    };
    setSuppliers(prev => [newSupp, ...prev]);
    addToast(`Added supplier "${supplier.name}"`);
  };

  // 10. Add Customer
  const addCustomer = (customer) => {
    const newCust = {
      id: Date.now(),
      name: customer.name,
      email: customer.email,
      phone: customer.phone || 'N/A',
      address: customer.address || 'N/A',
      ordersCount: 0,
      totalSpent: 0,
      status: 'Standard'
    };
    setCustomers(prev => [newCust, ...prev]);
    addToast(`Added customer "${customer.name}"`);
  };

  // 11. Add Purchase Order
  const addPurchaseOrder = (po) => {
    const newPo = {
      id: Date.now(),
      poNumber: `PO-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      supplier: po.supplier || 'General Supplier',
      date: new Date().toISOString().split('T')[0],
      expectedDelivery: po.expectedDelivery || '2026-10-01',
      totalAmount: parseFloat(po.totalAmount || 1000),
      status: 'Pending',
      itemsCount: parseInt(po.itemsCount || 10, 10)
    };
    setPurchaseOrders(prev => [newPo, ...prev]);
    addToast(`Purchase Order ${newPo.poNumber} created!`);
  };

  // 12. Create Order
  const createOrder = (orderData) => {
    const newOrd = {
      id: Date.now(),
      orderNumber: `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: orderData.customer || 'Enterprise Client',
      products: orderData.products || 'Mixed Equipment Order',
      quantity: parseInt(orderData.quantity || 1, 10),
      total: parseFloat(orderData.total || 999),
      warehouse: orderData.warehouse || 'WH-EAST',
      orderDate: new Date().toISOString().split('T')[0],
      status: 'Confirmed'
    };
    setOrders(prev => [newOrd, ...prev]);
    addToast(`Order ${newOrd.orderNumber} placed successfully!`);
  };

  // 13. Add User
  const addUser = (userData) => {
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      role: userData.role || 'Staff',
      department: userData.department || 'Operations',
      status: 'Active',
      lastLogin: 'Never'
    };
    setUsersList(prev => [newUser, ...prev]);
    addToast(`User ${userData.name} created!`);
  };

  // 14. Approve Discrepancy
  const approveDiscrepancy = (id) => {
    setDiscrepancies(prev => prev.map(d => d.id === id ? { ...d, status: 'Approved & Adjusted' } : d));
    addToast(`Discrepancy adjustment approved! Stock aligned.`);
  };

  return (
    <InventoryDataContext.Provider
      value={{
        // State
        warehouses,
        products,
        inventoryItems,
        categories,
        brands,
        batches,
        transfers,
        stockOperations,
        purchaseOrders,
        purchaseRequests,
        reconciliationSessions,
        discrepancies,
        suppliers,
        customers,
        orders,
        usersList,
        auditLogs,
        settings,
        toasts,

        // Actions
        addToast,
        removeToast,
        addStockIn,
        addStockOut,
        addStockAdjustment,
        createTransfer,
        approveTransfer,
        rejectTransfer,
        addProduct,
        deleteProduct,
        addSupplier,
        addCustomer,
        addPurchaseOrder,
        createOrder,
        addUser,
        approveDiscrepancy,
        setSettings
      }}
    >
      {children}

      {/* Global Toast Overlay */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl border shadow-2xl flex items-center justify-between text-sm font-medium transition-all transform animate-in slide-in-from-bottom-5 ${
              toast.type === 'warning'
                ? 'bg-warning/20 border-warning/40 text-warning'
                : toast.type === 'danger'
                ? 'bg-danger/20 border-danger/40 text-danger'
                : 'bg-surface-elevated border-primary/40 text-primary shadow-[0_0_20px_rgba(214,168,95,0.15)]'
            }`}
          >
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-3 text-muted hover:text-foreground text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </InventoryDataContext.Provider>
  );
};

export const useInventoryData = () => useContext(InventoryDataContext);
