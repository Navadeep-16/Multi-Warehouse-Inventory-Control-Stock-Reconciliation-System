import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventoryData } from '../../context/InventoryDataContext';

export default function StockAdjustmentsPage() {
  const navigate = useNavigate();
  const { warehouses, products, inventoryItems, addStockAdjustment, stockOperations } = useInventoryData();

  const [form, setForm] = useState({
    warehouseId: warehouses[0]?.id || 1,
    productId: products[0]?.id || 1,
    adjustedQuantity: 10,
    reason: 'Routine Cycle Count Audit',
    notes: ''
  });

  const selectedItem = inventoryItems.find(
    i => i.productId === parseInt(form.productId, 10) && i.warehouseId === parseInt(form.warehouseId, 10)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    addStockAdjustment(form);
    navigate('/inventory');
  };

  const adjustmentLogs = stockOperations.filter(op => op.type === 'Adjustment');

  return (
    <div className="space-y-6">
      {/* Header & Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 text-xs text-muted mb-1">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span>/</span>
          <span>Stock Operations</span>
          <span>/</span>
          <span className="text-primary font-medium">Stock Adjustments</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Stock Adjustments</h1>
            <p className="text-sm text-muted">Reconcile discrepancies, update count corrections, or post damage adjustments.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Card */}
        <div className="lg:col-span-2 bg-surface border border-border rounded-2xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Post Inventory Adjustment</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-muted mb-1">Warehouse *</label>
                <select
                  value={form.warehouseId}
                  onChange={e => setForm({ ...form, warehouseId: e.target.value })}
                  className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                >
                  {warehouses.map(wh => (
                    <option key={wh.id} value={wh.id}>
                      {wh.name} ({wh.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-muted mb-1">Product *</label>
                <select
                  value={form.productId}
                  onChange={e => setForm({ ...form, productId: e.target.value })}
                  className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                >
                  {products.map(prod => (
                    <option key={prod.id} value={prod.id}>
                      {prod.name} ({prod.sku})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Current Stock Banner */}
            <div className="p-4 bg-surface-elevated border border-border rounded-xl flex justify-between items-center text-xs">
              <div>
                <span className="text-muted">Recorded System Stock: </span>
                <span className="font-bold text-foreground text-sm">{selectedItem ? selectedItem.available : 0} units</span>
              </div>
              <div>
                <span className="text-muted">Warehouse: </span>
                <span className="text-primary font-medium">{selectedItem ? selectedItem.warehouse : 'N/A'}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-muted mb-1">New Verified Physical Count *</label>
                <input
                  type="number"
                  min="0"
                  value={form.adjustedQuantity}
                  onChange={e => setForm({ ...form, adjustedQuantity: e.target.value })}
                  className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary font-bold text-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-muted mb-1">Adjustment Reason *</label>
                <select
                  value={form.reason}
                  onChange={e => setForm({ ...form, reason: e.target.value })}
                  className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="Routine Cycle Count Audit">Routine Cycle Count Audit</option>
                  <option value="Damaged / Spoiled Items">Damaged / Spoiled Items</option>
                  <option value="Found Unrecorded Stock">Found Unrecorded Stock</option>
                  <option value="Supplier Replacement Alignment">Supplier Replacement Alignment</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-muted mb-1">Audit Notes / Explanation</label>
              <textarea
                rows="3"
                placeholder="Detail the physical count findings or authorization notes..."
                value={form.notes}
                onChange={e => setForm({ ...form, notes: e.target.value })}
                className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
              ></textarea>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-surface-dark font-semibold rounded-xl text-xs hover:bg-primary-hover shadow-lg transition"
              >
                Apply Adjustment
              </button>
            </div>
          </form>
        </div>

        {/* Audit Log Card */}
        <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-foreground">Recent Adjustments Log</h3>
          <div className="space-y-3">
            {adjustmentLogs.length === 0 ? (
              <p className="text-xs text-muted">No manual adjustments recorded yet.</p>
            ) : (
              adjustmentLogs.map(log => (
                <div key={log.id} className="p-3 bg-surface-elevated rounded-xl border border-border/50 text-xs">
                  <div className="flex justify-between font-semibold text-foreground">
                    <span>{log.product}</span>
                    <span className="text-primary font-mono">{log.reference}</span>
                  </div>
                  <div className="text-muted text-[11px] mt-1">
                    Set count: <strong className="text-foreground">{log.quantity} units</strong> ({log.warehouse})
                  </div>
                  <div className="text-muted text-[10px] italic mt-1">{log.notes}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
