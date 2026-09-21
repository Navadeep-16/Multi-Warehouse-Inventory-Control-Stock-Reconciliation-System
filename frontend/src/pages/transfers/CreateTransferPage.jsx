import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventoryData } from '../../context/InventoryDataContext';

export default function CreateTransferPage() {
  const navigate = useNavigate();
  const { warehouses, products, createTransfer } = useInventoryData();

  const [form, setForm] = useState({
    sourceWarehouse: warehouses[1]?.code || 'WH-WEST',
    destWarehouse: warehouses[0]?.code || 'WH-EAST',
    productId: products[0]?.id || 1,
    quantity: 10,
    priority: 'Normal',
    reason: 'Regional Stock Balancing',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.sourceWarehouse === form.destWarehouse) {
      alert('Source and Destination warehouse cannot be the same!');
      return;
    }
    createTransfer(form);
    navigate('/transfers');
  };

  return (
    <div className="space-y-6">
      {/* Header & Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 text-xs text-muted mb-1">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span>/</span>
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/transfers')}>Transfers</span>
          <span>/</span>
          <span className="text-primary font-medium">Create Transfer</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Create Stock Transfer</h1>
            <p className="text-sm text-muted">Initiate inter-warehouse inventory movements with full audit tracking.</p>
          </div>
        </div>
      </div>

      {/* Transfer Form */}
      <div className="bg-surface border border-border rounded-2xl p-6 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Source Warehouse (Dispatch) *</label>
              <select
                value={form.sourceWarehouse}
                onChange={e => setForm({ ...form, sourceWarehouse: e.target.value })}
                className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
              >
                {warehouses.map(wh => (
                  <option key={wh.id} value={wh.code}>
                    {wh.name} ({wh.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-muted mb-1">Destination Warehouse (Receiving) *</label>
              <select
                value={form.destWarehouse}
                onChange={e => setForm({ ...form, destWarehouse: e.target.value })}
                className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
              >
                {warehouses.map(wh => (
                  <option key={wh.id} value={wh.code}>
                    {wh.name} ({wh.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-muted mb-1">Select Product *</label>
              <select
                value={form.productId}
                onChange={e => setForm({ ...form, productId: e.target.value })}
                className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
              >
                {products.map(prod => (
                  <option key={prod.id} value={prod.id}>
                    {prod.name} ({prod.sku}) — Total Catalog Stock: {prod.stock}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-muted mb-1">Quantity *</label>
              <input
                type="number"
                min="1"
                value={form.quantity}
                onChange={e => setForm({ ...form, quantity: e.target.value })}
                className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Priority Level</label>
              <select
                value={form.priority}
                onChange={e => setForm({ ...form, priority: e.target.value })}
                className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
              >
                <option value="Normal">Normal</option>
                <option value="High">High Priority</option>
                <option value="Urgent">Urgent / Rush</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-muted mb-1">Reason for Transfer</label>
              <input
                type="text"
                placeholder="e.g. Stock deficit rebalancing"
                value={form.reason}
                onChange={e => setForm({ ...form, reason: e.target.value })}
                className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted mb-1">Notes / Instructions</label>
            <textarea
              rows="3"
              placeholder="Special handling instructions for warehouse logistics team..."
              value={form.notes}
              onChange={e => setForm({ ...form, notes: e.target.value })}
              className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={() => navigate('/transfers')}
              className="px-4 py-2 bg-surface-elevated border border-border text-muted hover:text-foreground rounded-xl text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-surface-dark font-semibold rounded-xl text-xs hover:bg-primary-hover shadow-lg transition"
            >
              Submit Transfer Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
