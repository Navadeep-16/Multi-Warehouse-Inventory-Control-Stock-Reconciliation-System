import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventoryData } from '../context/InventoryDataContext';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { settings, setSettings, addToast } = useInventoryData();

  const [form, setForm] = useState(settings);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSettings(form);
    addToast('System settings updated successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-muted mb-1">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span>/</span>
          <span className="text-primary font-medium">Settings</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">System & Application Settings</h1>
          <p className="text-sm text-muted">Configure enterprise defaults, inventory thresholds, notifications, and security rules.</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl p-6 max-w-3xl space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Settings */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-primary uppercase tracking-wider border-b border-border pb-2">
              General Company Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-muted mb-1">Company Name</label>
                <input
                  type="text"
                  value={form.companyName}
                  onChange={e => setForm({ ...form, companyName: e.target.value })}
                  className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs text-muted mb-1">Operations Email</label>
                <input
                  type="email"
                  value={form.companyEmail}
                  onChange={e => setForm({ ...form, companyEmail: e.target.value })}
                  className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs text-muted mb-1">Base Currency</label>
                <select
                  value={form.currency}
                  onChange={e => setForm({ ...form, currency: e.target.value })}
                  className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="USD ($)">USD ($) - US Dollar</option>
                  <option value="EUR (€)">EUR (€) - Euro</option>
                  <option value="GBP (£)">GBP (£) - British Pound</option>
                  <option value="INR (₹)">INR (₹) - Indian Rupee</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-muted mb-1">Timezone</label>
                <input
                  type="text"
                  value={form.timezone}
                  onChange={e => setForm({ ...form, timezone: e.target.value })}
                  className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Inventory Defaults */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-primary uppercase tracking-wider border-b border-border pb-2">
              Inventory & Reorder Rules
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-muted mb-1">Default Low Stock Reorder Threshold (Units)</label>
                <input
                  type="number"
                  value={form.reorderThresholdDefault}
                  onChange={e => setForm({ ...form, reorderThresholdDefault: e.target.value })}
                  className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <input
                  type="checkbox"
                  id="autoReorder"
                  checked={form.enableAutoReorder}
                  onChange={e => setForm({ ...form, enableAutoReorder: e.target.checked })}
                  className="w-4 h-4 accent-primary"
                />
                <label htmlFor="autoReorder" className="text-xs text-foreground font-medium">
                  Enable Automatic Reorder Recommendations
                </label>
              </div>
            </div>
          </div>

          {/* Notification Toggles */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-primary uppercase tracking-wider border-b border-border pb-2">
              Notification Preferences
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="emailAlerts"
                  checked={form.enableEmailAlerts}
                  onChange={e => setForm({ ...form, enableEmailAlerts: e.target.checked })}
                  className="w-4 h-4 accent-primary"
                />
                <label htmlFor="emailAlerts" className="text-xs text-foreground font-medium">
                  Send Email Notifications for Urgent Discrepancies & PO Approvals
                </label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="lowStockWarning"
                  checked={form.enableLowStockWarning}
                  onChange={e => setForm({ ...form, enableLowStockWarning: e.target.checked })}
                  className="w-4 h-4 accent-primary"
                />
                <label htmlFor="lowStockWarning" className="text-xs text-foreground font-medium">
                  Show On-Screen Low Stock Warning Banners
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary text-surface-dark font-bold rounded-xl text-xs hover:bg-primary-hover shadow-lg transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
