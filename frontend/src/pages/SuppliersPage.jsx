import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventoryData } from '../context/InventoryDataContext';

export default function SuppliersPage() {
  const navigate = useNavigate();
  const { suppliers, addSupplier } = useInventoryData();

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: '',
    contact: '',
    email: '',
    phone: '',
    address: '',
    productsSupplied: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    addSupplier(form);
    setForm({ name: '', contact: '', email: '', phone: '', address: '', productsSupplied: '' });
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-muted mb-1">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span>/</span>
          <span className="text-primary font-medium">Suppliers</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Vendor & Supplier Directory</h1>
            <p className="text-sm text-muted">Manage B2B component vendors, manufacturer contacts, and total volume metrics.</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-primary text-surface-dark font-semibold hover:bg-primary-hover rounded-xl text-xs shadow-lg transition flex items-center gap-1.5 self-start"
          >
            <span>+</span> Add Vendor Partner
          </button>
        </div>
      </div>

      {/* Supplier Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suppliers.map(supp => (
          <div key={supp.id} className="p-5 bg-surface border border-border rounded-2xl space-y-3 hover:border-primary/50 transition">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-bold text-foreground">{supp.name}</h3>
                <p className="text-xs text-muted">{supp.contact}</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-success/20 text-success border border-success/30">
                {supp.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-border">
              <div>
                <span className="text-muted block text-[11px]">Email Contact</span>
                <span className="text-foreground font-medium">{supp.email}</span>
              </div>
              <div>
                <span className="text-muted block text-[11px]">Phone</span>
                <span className="text-foreground font-medium">{supp.phone}</span>
              </div>
              <div className="col-span-2">
                <span className="text-muted block text-[11px]">Main Products Supplied</span>
                <span className="text-primary font-medium">{supp.productsSupplied}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 text-xs border-t border-border/50">
              <span className="text-muted">Total Lifetime Procurement:</span>
              <span className="font-extrabold text-foreground text-sm">${supp.totalPurchases.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Supplier Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-surface border border-border rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <h2 className="text-lg font-bold text-foreground">Add Vendor / Supplier</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs text-muted mb-1">Company / Supplier Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-muted mb-1">Contact Person</label>
                  <input
                    type="text"
                    value={form.contact}
                    onChange={e => setForm({ ...form, contact: e.target.value })}
                    className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-muted mb-1">Phone</label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted mb-1">Products Supplied</label>
                  <input
                    type="text"
                    placeholder="e.g. Displays, Microchips"
                    value={form.productsSupplied}
                    onChange={e => setForm({ ...form, productsSupplied: e.target.value })}
                    className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
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
                  Save Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
