import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventoryData } from '../context/InventoryDataContext';

export default function CustomersPage() {
  const navigate = useNavigate();
  const { customers, addCustomer } = useInventoryData();

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    addCustomer(form);
    setForm({ name: '', email: '', phone: '', address: '' });
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-muted mb-1">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span>/</span>
          <span className="text-primary font-medium">Customers</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Enterprise Client Accounts</h1>
            <p className="text-sm text-muted">Manage B2B buyers, customer accounts, and order history totals.</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-primary text-surface-dark font-semibold hover:bg-primary-hover rounded-xl text-xs shadow-lg transition flex items-center gap-1.5 self-start"
          >
            <span>+</span> Add Client Account
          </button>
        </div>
      </div>

      {/* Customer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {customers.map(cust => (
          <div key={cust.id} className="p-5 bg-surface border border-border rounded-2xl space-y-3 hover:border-primary/50 transition">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-bold text-foreground">{cust.name}</h3>
                <p className="text-xs text-muted">{cust.email}</p>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                cust.status.includes('VIP')
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'bg-surface-elevated text-muted'
              }`}>
                {cust.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-border">
              <div>
                <span className="text-muted block text-[11px]">Phone Contact</span>
                <span className="text-foreground font-medium">{cust.phone}</span>
              </div>
              <div>
                <span className="text-muted block text-[11px]">Orders Placed</span>
                <span className="text-foreground font-bold">{cust.ordersCount} orders</span>
              </div>
              <div className="col-span-2">
                <span className="text-muted block text-[11px]">Primary Office Address</span>
                <span className="text-muted">{cust.address}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 text-xs border-t border-border/50">
              <span className="text-muted">Total Lifetime Revenue:</span>
              <span className="font-extrabold text-primary text-base">${cust.totalSpent.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-surface border border-border rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <h2 className="text-lg font-bold text-foreground">Add Customer Account</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs text-muted mb-1">Company / Customer Name *</label>
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
                  <label className="block text-xs text-muted mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-muted mb-1">Office / Delivery Address</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={e => setForm({ ...form, address: e.target.value })}
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
                  Save Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
