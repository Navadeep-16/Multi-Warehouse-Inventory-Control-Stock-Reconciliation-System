import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventoryData } from '../../context/InventoryDataContext';

export default function MyWarehousePage() {
  const navigate = useNavigate();
  const { warehouses, inventoryItems } = useInventoryData();

  const myWh = warehouses[0] || {};
  const myItems = inventoryItems.filter(i => i.warehouse === myWh.code);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs text-muted mb-1">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span>/</span>
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/warehouses')}>Warehouses</span>
          <span>/</span>
          <span className="text-primary font-medium">My Warehouse</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">{myWh.name} ({myWh.code})</h1>
          <p className="text-sm text-muted">Assigned staff fulfillment center overview, active zones, and assigned inventory.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-surface border border-border rounded-xl">
          <span className="text-xs text-muted uppercase font-semibold">Location</span>
          <p className="text-sm font-bold text-foreground mt-1">{myWh.location}</p>
        </div>
        <div className="p-4 bg-surface border border-border rounded-xl">
          <span className="text-xs text-muted uppercase font-semibold">Manager</span>
          <p className="text-sm font-bold text-foreground mt-1">{myWh.manager}</p>
        </div>
        <div className="p-4 bg-surface border border-border rounded-xl">
          <span className="text-xs text-muted uppercase font-semibold">Assigned Products</span>
          <p className="text-sm font-bold text-primary mt-1">{myItems.length} SKUs</p>
        </div>
        <div className="p-4 bg-surface border border-border rounded-xl">
          <span className="text-xs text-muted uppercase font-semibold">Utilization</span>
          <p className="text-sm font-bold text-success mt-1">{myWh.utilization} / {myWh.capacity} units</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-foreground">Assigned Warehouse Inventory</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-surface-elevated/70 border-b border-border text-muted uppercase font-semibold">
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Available Qty</th>
                <th className="py-3 px-4">Batch No</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {myItems.map(item => (
                <tr key={item.id} className="hover:bg-surface-elevated/40 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-primary">{item.sku}</td>
                  <td className="py-3.5 px-4 font-semibold text-foreground">{item.name}</td>
                  <td className="py-3.5 px-4 text-muted">{item.category}</td>
                  <td className="py-3.5 px-4 font-bold text-foreground">{item.available} units</td>
                  <td className="py-3.5 px-4 font-mono text-muted">{item.batchNo}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-success/20 text-success border border-success/30">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
