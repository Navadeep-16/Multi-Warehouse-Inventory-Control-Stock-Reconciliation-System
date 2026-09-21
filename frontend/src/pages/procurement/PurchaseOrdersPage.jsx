import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventoryData } from '../../context/InventoryDataContext';

export default function PurchaseOrdersPage() {
  const navigate = useNavigate();
  const { purchaseOrders, suppliers, addPurchaseOrder } = useInventoryData();

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    supplier: suppliers[0]?.name || 'Apple Commercial Direct',
    expectedDelivery: '2026-10-05',
    totalAmount: 45000,
    itemsCount: 25
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addPurchaseOrder(form);
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-muted mb-1">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span>/</span>
          <span>Procurement</span>
          <span>/</span>
          <span className="text-primary font-medium">Purchase Orders</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Purchase Orders (PO)</h1>
            <p className="text-sm text-muted">Issue, approve, and track vendor purchase orders for stock replenishment.</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-primary text-surface-dark font-semibold hover:bg-primary-hover rounded-xl text-xs shadow-lg transition flex items-center gap-1.5 self-start"
          >
            <span>+</span> Create Purchase Order
          </button>
        </div>
      </div>

      {/* PO Table */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-surface-elevated/70 border-b border-border text-muted uppercase font-semibold">
                <th className="py-3 px-4">PO Number</th>
                <th className="py-3 px-4">Supplier</th>
                <th className="py-3 px-4">PO Date</th>
                <th className="py-3 px-4">Expected Delivery</th>
                <th className="py-3 px-4">Items Qty</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {purchaseOrders.map(po => (
                <tr key={po.id} className="hover:bg-surface-elevated/40 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-primary">{po.poNumber}</td>
                  <td className="py-3.5 px-4 font-medium text-foreground">{po.supplier}</td>
                  <td className="py-3.5 px-4 text-muted">{po.date}</td>
                  <td className="py-3.5 px-4 text-muted">{po.expectedDelivery}</td>
                  <td className="py-3.5 px-4 text-foreground font-semibold">{po.itemsCount} units</td>
                  <td className="py-3.5 px-4 font-bold text-foreground">${po.totalAmount.toLocaleString()}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                      po.status === 'Received'
                        ? 'bg-success/20 text-success border border-success/30'
                        : po.status === 'Approved'
                        ? 'bg-primary/20 text-primary border border-primary/30'
                        : 'bg-warning/20 text-warning border border-warning/30'
                    }`}>
                      {po.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => navigate('/operations/stock-in')}
                      className="px-2.5 py-1 bg-surface-elevated border border-border text-foreground hover:border-primary rounded-lg text-[10px] font-semibold transition"
                    >
                      Receive PO
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Creating PO */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-surface border border-border rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <h2 className="text-lg font-bold text-foreground">Issue New Purchase Order</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted mb-1">Vendor / Supplier *</label>
                <select
                  value={form.supplier}
                  onChange={e => setForm({ ...form, supplier: e.target.value })}
                  className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                >
                  {suppliers.map(s => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-muted mb-1">Expected Delivery</label>
                  <input
                    type="date"
                    value={form.expectedDelivery}
                    onChange={e => setForm({ ...form, expectedDelivery: e.target.value })}
                    className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted mb-1">Total Amount ($)</label>
                  <input
                    type="number"
                    value={form.totalAmount}
                    onChange={e => setForm({ ...form, totalAmount: e.target.value })}
                    className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-muted mb-1">Total Quantity Units</label>
                <input
                  type="number"
                  value={form.itemsCount}
                  onChange={e => setForm({ ...form, itemsCount: e.target.value })}
                  className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-surface-elevated border border-border text-muted rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary text-surface-dark font-semibold rounded-xl text-xs hover:bg-primary-hover shadow transition"
                >
                  Submit PO
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
