import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, Download, Plus, AlertCircle, RefreshCw } from 'lucide-react';

export const InventoryPage = () => {
  // Mock data for immediate visual impact while backend API is wired
  const inventoryItems = [
    { id: 1, sku: 'LAP-PRO-15', name: 'MacBook Pro 15"', category: 'Electronics', warehouse: 'WH-East', available: 145, reserved: 20, reorder: 50, status: 'Healthy', unitCost: 1999 },
    { id: 2, sku: 'MON-4K-32', name: 'Dell 32" 4K Monitor', category: 'Electronics', warehouse: 'WH-West', available: 12, reserved: 5, reorder: 30, status: 'Low Stock', unitCost: 699 },
    { id: 3, sku: 'KEY-MECH-01', name: 'Mechanical Keyboard', category: 'Accessories', warehouse: 'WH-East', available: 0, reserved: 0, reorder: 100, status: 'Out of Stock', unitCost: 129 },
    { id: 4, sku: 'DESK-STAND-01', name: 'Standing Desk', category: 'Furniture', warehouse: 'WH-North', available: 89, reserved: 15, reorder: 20, status: 'Healthy', unitCost: 450 },
    { id: 5, sku: 'MOU-WIRE-02', name: 'Wireless Mouse', category: 'Accessories', warehouse: 'WH-West', available: 520, reserved: 50, reorder: 100, status: 'Overstock', unitCost: 49 },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Global Inventory</h1>
          <p className="text-muted mt-1">Manage, filter, and export all stock across warehouses.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-surface-elevated text-foreground px-4 py-2 rounded-lg text-sm font-semibold border border-border hover:bg-border transition-colors flex items-center gap-2">
            <RefreshCw className="w-4 h-4" /> Sync
          </button>
          <button className="bg-surface-elevated text-foreground px-4 py-2 rounded-lg text-sm font-semibold border border-border hover:bg-border transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-surface border border-border p-4 rounded-xl flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-1 gap-4 items-center">
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input 
              type="text" 
              placeholder="Search by SKU, Product Name..." 
              className="w-full bg-surface-elevated border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-all text-foreground placeholder:text-muted"
            />
          </div>
          <select className="bg-surface-elevated border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary text-foreground">
            <option value="">All Warehouses</option>
            <option value="WH-East">WH-East (New York)</option>
            <option value="WH-West">WH-West (California)</option>
          </select>
          <select className="bg-surface-elevated border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary text-foreground">
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>
        <button className="bg-surface-elevated text-muted px-4 py-2 rounded-lg text-sm font-semibold border border-border hover:text-foreground transition-colors flex items-center gap-2">
          <Filter className="w-4 h-4" /> More Filters
        </button>
      </div>

      {/* Advanced Data Table */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-surface-elevated/50 text-muted uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4">SKU / Product</th>
                <th className="px-6 py-4">Warehouse</th>
                <th className="px-6 py-4">Available</th>
                <th className="px-6 py-4">Reserved</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Unit Cost</th>
                <th className="px-6 py-4">Total Value</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {inventoryItems.map((item) => (
                <tr key={item.id} className="hover:bg-surface-elevated/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-foreground">{item.sku}</div>
                    <div className="text-xs text-muted mt-0.5">{item.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-surface-elevated px-2 py-1 rounded text-xs font-mono">{item.warehouse}</span>
                  </td>
                  <td className="px-6 py-4 font-mono">
                    <span className={item.available <= item.reorder ? 'text-danger font-bold' : ''}>
                      {item.available}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-muted">{item.reserved}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      item.status === 'Healthy' ? 'bg-success/10 text-success' :
                      item.status === 'Low Stock' ? 'bg-warning/10 text-warning' :
                      item.status === 'Out of Stock' ? 'bg-danger/10 text-danger' :
                      'bg-primary/10 text-primary'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono">${item.unitCost.toLocaleString()}</td>
                  <td className="px-6 py-4 font-mono">${(item.available * item.unitCost).toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:underline text-xs font-bold uppercase tracking-wider">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-border flex justify-between items-center bg-surface-elevated/30">
          <div className="text-xs text-muted">Showing 1 to 5 of 45,892 entries</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-surface border border-border rounded text-xs text-muted hover:text-foreground">Prev</button>
            <button className="px-3 py-1 bg-primary text-background font-bold rounded text-xs">1</button>
            <button className="px-3 py-1 bg-surface border border-border rounded text-xs text-muted hover:text-foreground">2</button>
            <button className="px-3 py-1 bg-surface border border-border rounded text-xs text-muted hover:text-foreground">3</button>
            <button className="px-3 py-1 bg-surface border border-border rounded text-xs text-muted hover:text-foreground">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};
