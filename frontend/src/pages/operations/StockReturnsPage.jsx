import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventoryData } from '../../context/InventoryDataContext';

export default function StockReturnsPage() {
  const navigate = useNavigate();
  const { products, addToast } = useInventoryData();

  const [form, setForm] = useState({
    returnType: 'Customer Return',
    product: products[0]?.name || 'MacBook Pro 16"',
    quantity: 1,
    reason: 'Defective / Warranty Swap',
    reference: 'RET-2026-001'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addToast(`Processed ${form.returnType} for ${form.product} (${form.quantity} units)`);
    navigate('/inventory');
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs text-muted mb-1">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span>/</span>
          <span>Operations</span>
          <span>/</span>
          <span className="text-primary font-medium">Stock Returns</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Stock Returns Workflow</h1>
          <p className="text-sm text-muted">Process customer returns, RMA items, or return damaged goods to suppliers.</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl p-6 max-w-2xl space-y-4">
        <h2 className="text-lg font-bold text-foreground">Record Item Return</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-muted mb-1">Return Type</label>
            <select
              value={form.returnType}
              onChange={e => setForm({ ...form, returnType: e.target.value })}
              className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
            >
              <option value="Customer Return">Customer Return (RMA Restock)</option>
              <option value="Supplier Return">Supplier Return (RTV Defect Return)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-muted mb-1">Product</label>
              <select
                value={form.product}
                onChange={e => setForm({ ...form, product: e.target.value })}
                className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
              >
                {products.map(p => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-muted mb-1">Quantity</label>
              <input
                type="number"
                min="1"
                value={form.quantity}
                onChange={e => setForm({ ...form, quantity: e.target.value })}
                className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-muted mb-1">Reason for Return</label>
            <input
              type="text"
              value={form.reason}
              onChange={e => setForm({ ...form, reason: e.target.value })}
              className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border">
            <button
              type="submit"
              className="px-5 py-2 bg-primary text-surface-dark font-bold rounded-xl text-xs hover:bg-primary-hover shadow transition"
            >
              Confirm Return Processing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
