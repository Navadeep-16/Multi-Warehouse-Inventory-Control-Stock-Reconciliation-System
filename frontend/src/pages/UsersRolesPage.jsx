import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventoryData } from '../context/InventoryDataContext';

export default function UsersRolesPage() {
  const navigate = useNavigate();
  const { usersList, addUser } = useInventoryData();

  const [activeTab, setActiveTab] = useState('users');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'Warehouse Manager',
    department: 'Operations'
  });

  const rolesList = [
    { name: 'Super Admin', permissions: 'Full System Control, Security, Audit Logs, Settings' },
    { name: 'Admin', permissions: 'Manage Catalog, Warehouses, Users & Approvals' },
    { name: 'Warehouse Manager', permissions: 'Stock In/Out, Adjustments, Physical Count, Transfers' },
    { name: 'Inventory Manager', permissions: 'Catalog Edit, Reorder Approvals, Valuation Reports' },
    { name: 'Procurement Manager', permissions: 'PO Issuance, Supplier Management, PR Approvals' },
    { name: 'Staff', permissions: 'Read-only Catalog & Physical Count Entry' },
    { name: 'Viewer', permissions: 'Read-Only Executive Dashboards' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    addUser(form);
    setForm({ name: '', email: '', role: 'Warehouse Manager', department: 'Operations' });
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-muted mb-1">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span>/</span>
          <span className="text-primary font-medium">Users & Roles</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Users & Role Access Matrix</h1>
            <p className="text-sm text-muted">Manage system users, access roles, and security permissions matrix.</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-primary text-surface-dark font-semibold hover:bg-primary-hover rounded-xl text-xs shadow-lg transition flex items-center gap-1.5 self-start"
          >
            <span>+</span> Add System User
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border pb-2">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === 'users'
              ? 'bg-primary text-surface-dark shadow'
              : 'bg-surface text-muted hover:text-foreground'
          }`}
        >
          👤 System Users ({usersList.length})
        </button>
        <button
          onClick={() => setActiveTab('matrix')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === 'matrix'
              ? 'bg-primary text-surface-dark shadow'
              : 'bg-surface text-muted hover:text-foreground'
          }`}
        >
          🛡️ Role Permission Matrix
        </button>
      </div>

      {activeTab === 'users' ? (
        /* User List Table */
        <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-surface-elevated/70 border-b border-border text-muted uppercase font-semibold">
                  <th className="py-3 px-4">User Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Last Login</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {usersList.map(user => (
                  <tr key={user.id} className="hover:bg-surface-elevated/40 transition">
                    <td className="py-3.5 px-4 font-bold text-foreground">{user.name}</td>
                    <td className="py-3.5 px-4 font-mono text-muted">{user.email}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-primary/20 text-primary border border-primary/30">
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-muted">{user.department}</td>
                    <td className="py-3.5 px-4 text-muted font-mono text-[11px]">{user.lastLogin}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-success/20 text-success border border-success/30">
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Matrix Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rolesList.map(r => (
            <div key={r.name} className="p-5 bg-surface border border-border rounded-2xl space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-primary">{r.name}</h3>
                <span className="text-[10px] text-muted uppercase tracking-wider">Role Definition</span>
              </div>
              <p className="text-xs text-muted leading-relaxed">{r.permissions}</p>
            </div>
          ))}
        </div>
      )}

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-surface border border-border rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <h2 className="text-lg font-bold text-foreground">Add System User Account</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs text-muted mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs text-muted mb-1">Corporate Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-muted mb-1">Role</label>
                  <select
                    value={form.role}
                    onChange={e => setForm({ ...form, role: e.target.value })}
                    className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  >
                    {rolesList.map(r => (
                      <option key={r.name} value={r.name}>{r.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-muted mb-1">Department</label>
                  <input
                    type="text"
                    value={form.department}
                    onChange={e => setForm({ ...form, department: e.target.value })}
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
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
