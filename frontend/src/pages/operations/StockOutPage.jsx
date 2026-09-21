import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventoryData } from '../../context/InventoryDataContext';

export default function StockOutPage() {
  const navigate = useNavigate();
  const { warehouses, products, addStockOut, stockOperations } = useInventoryData();

  const [form, setForm] = useState({
    warehouseId: warehouses[0]?.id || 1,
    productId: products[0]?.id || 1,
    quantity: 1,
    destination: '',
    reason: 'Customer Order Fulfillment',
    reference: `ISS-${Date.now().toString().slice(-4)}`,
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.destination) {
      alert('Please specify Destination / Customer name.');
      return;
    }
    addStockOut(form);
    navigate('/inventory');
  };

  const recentStockOuts = stockOperations.filter(op => op.type === 'Stock Out');

  return (
    <div className="space-y-6">
      {/* Header & Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 text-xs text-muted mb-1">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span>/</span>
          <span>Stock Operations</span>
          <span>/</span>
          <span className="text-primary font-medium">Stock Out (Issue)</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Stock Out (Issue)</h1>
            <p className="text-sm text-muted">Dispatch inventory items for sales orders, customer deliveries, or internal usage.</p>
          </div>
          <button
            onClick={() => navigate('/inventory')}
            className="px-4 py-2 bg-surface border border-border text-foreground hover:bg-surface-elevated rounded-xl text-xs font-semibold transition"
          >
            ← Back to Inventory
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Issue Form */}
        <div className="lg:col-span-2 bg-surface border border-border rounded-2xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="text-warning">↑</span> Dispatch / Stock Issue Details
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-muted mb-1">Dispatching Warehouse *</label>
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
                <label className="block text-xs font-medium text-muted mb-1">Select Product *</label>
                <select
                  value={form.productId}
                  onChange={e => setForm({ ...form, productId: e.target.value })}
                  className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                >
                  {products.map(prod => (
                    <option key={prod.id} value={prod.id}>
                      {prod.name} ({prod.sku}) — Available Stock: {prod.stock}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-muted mb-1">Issue Quantity *</label>
                <input
                  type="number"
                  min="1"
                  value={form.quantity}
                  onChange={e => setForm({ ...form, quantity: e.target.value })}
                  className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-muted mb-1">Destination / Customer *</label>
                <input
                  type="text"
                  placeholder="e.g., Acme Corp / Client Order"
                  value={form.destination}
                  onChange={e => setForm({ ...form, destination: e.target.value })}
                  className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-muted mb-1">Issue Reason</label>
                <select
                  value={form.reason}
                  onChange={e => setForm({ ...form, reason: e.target.value })}
                  className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="Customer Order Fulfillment">Customer Order Fulfillment</option>
                  <option value="Internal Department Usage">Internal Department Usage</option>
                  <option value="Damaged / Scrap Removal">Damaged / Scrap Removal</option>
                  <option value="Sample / Marketing Demo">Sample / Marketing Demo</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-muted mb-1">Reference Code</label>
                <input
                  type="text"
                  value={form.reference}
                  onChange={e => setForm({ ...form, reference: e.target.value })}
                  className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-muted mb-1">Notes / Dispatched By</label>
                <input
                  type="text"
                  placeholder="e.g., Courier tracking # or delivery team"
                  value={form.notes}
                  onChange={e => setForm({ ...form, notes: e.target.value })}
                  className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={() => navigate('/inventory')}
                className="px-4 py-2 bg-surface-elevated border border-border text-muted hover:text-foreground rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-surface-dark hover:bg-primary-hover font-semibold rounded-xl text-xs shadow-lg transition"
              >
                Confirm & Issue Stock
              </button>
            </div>
          </form>
        </div>

        {/* Dispatch Log Sidebar */}
        <div className="space-y-4">
          <div className="bg-surface border border-border rounded-2xl p-6">
            <h3 className="text-sm font-bold text-foreground mb-3">Dispatch Guidelines</h3>
            <ul className="text-xs text-muted space-y-2 list-disc pl-4">
              <li>Stock quantities decrease immediately upon submission.</li>
              <li>Ensure physical items are loaded onto dispatch bays.</li>
              <li>Serial number logging is auto-captured in inventory logs.</li>
            </ul>
          </div>

          <div className="bg-surface border border-border rounded-2xl p-6">
            <h3 className="text-sm font-bold text-foreground mb-3">Recent Stock Out Activity</h3>
            <div className="space-y-3">
              {recentStockOuts.length === 0 ? (
                <p className="text-xs text-muted">No stock out activity logged yet.</p>
              ) : (
                recentStockOuts.slice(0, 4).map(op => (
                  <div key={op.id} className="p-3 bg-surface-elevated rounded-xl border border-border/50 text-xs">
                    <div className="flex justify-between font-semibold text-foreground">
                      <span>{op.product}</span>
                      <span className="text-warning">-{op.quantity} units</span>
                    </div>
                    <div className="flex justify-between text-muted text-[11px] mt-1">
                      <span>{op.warehouse}</span>
                      <span>{op.date}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
