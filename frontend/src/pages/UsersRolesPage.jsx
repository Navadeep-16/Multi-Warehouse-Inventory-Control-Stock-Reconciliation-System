import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventoryData } from '../context/InventoryDataContext';
import { useAuth, getUserRole } from '../context/AuthContext';
import { UserCheck, Mail, Warehouse, ShieldCheck, Plus, CheckCircle2, AlertTriangle, Send } from 'lucide-react';

export default function UsersRolesPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const role = getUserRole(user);
  const { usersList, addManagedUser, warehouses } = useInventoryData();

  const [activeTab, setActiveTab] = useState('users');
  const [showModal, setShowModal] = useState(false);
  const [invitedUser, setInvitedUser] = useState(null);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: 'MANAGER',
    assignedWarehouse: 'WH-EAST',
    department: 'Operations Supervisory'
  });

  const isAdmin = role === 'ADMIN';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email) return;

    const created = addManagedUser({
      name: form.fullName,
      email: form.email,
      phone: form.phone,
      role: form.role,
      assignedWarehouse: form.assignedWarehouse,
      department: form.department
    });

    setInvitedUser(created);
    setForm({
      fullName: '',
      email: '',
      phone: '',
      role: 'MANAGER',
      assignedWarehouse: 'WH-EAST',
      department: 'Operations Supervisory'
    });
    setShowModal(false);
  };

  const rolesList = [
    { name: 'ADMIN', permissions: 'Full System Control, Security, Audit Logs, Settings, Manager & Staff Account Creation' },
    { name: 'MANAGER', permissions: 'Stock In/Out Supervision, Physical Count, Customer Order Approval, Transfer Approvals' },
    { name: 'STAFF', permissions: 'Physical Count Entry, Order Picking, Packing, Transfer Execution, Barcode Scan' },
    { name: 'CUSTOMER', permissions: 'Browse Catalog, Add to Cart, Place Orders, Track Order Status' }
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200 select-none">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-[#7F8DA3] mb-1">
          <span className="hover:text-[#F5F7FA] cursor-pointer" onClick={() => navigate(`/${role.toLowerCase()}-dashboard`)}>Dashboard</span>
          <span>/</span>
          <span className="text-[#E7B65A] font-medium">Users & Roles</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#F5F7FA] tracking-tight">Users & Role Access Control</h1>
            <p className="text-sm text-[#7F8DA3]">Manage system users, assigned roles, warehouse assignments, and role permissions.</p>
          </div>

          {isAdmin && (
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-[#E7B65A] text-[#070B11] font-bold hover:bg-[#f0c46e] rounded-xl text-xs shadow-lg transition flex items-center gap-1.5 shadow-[0_0_15px_rgba(231,182,90,0.2)]"
            >
              <Plus className="w-4 h-4" />
              <span>Create Manager / Staff Account</span>
            </button>
          )}
        </div>
      </div>

      {/* Admin Privilege Warning if non-admin */}
      {!isAdmin && (
        <div className="p-4 bg-[#EF6461]/10 border border-[#EF6461]/30 rounded-xl text-xs text-[#EF6461] flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>Note: User creation and role assignment are restricted to <strong>ADMIN</strong> users. Managers can view assigned team rosters only.</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#1D2A3A] pb-2">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === 'users'
              ? 'bg-[#E7B65A] text-[#070B11] shadow'
              : 'bg-[#0D141E] text-[#7F8DA3] border border-[#1D2A3A] hover:text-[#F5F7FA]'
          }`}
        >
          👤 All System Users ({usersList.length})
        </button>
        <button
          onClick={() => setActiveTab('matrix')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === 'matrix'
              ? 'bg-[#E7B65A] text-[#070B11] shadow'
              : 'bg-[#0D141E] text-[#7F8DA3] border border-[#1D2A3A] hover:text-[#F5F7FA]'
          }`}
        >
          🛡️ Role Permission Matrix
        </button>
      </div>

      {activeTab === 'users' ? (
        /* User List Table */
        <div className="bg-[#0D141E] border border-[#1D2A3A] rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#111A26] border-b border-[#1D2A3A] text-[#7F8DA3] uppercase font-semibold">
                  <th className="py-3.5 px-4">User Name</th>
                  <th className="py-3.5 px-4">Gmail Address</th>
                  <th className="py-3.5 px-4">Assigned Role</th>
                  <th className="py-3.5 px-4">Assigned Warehouse</th>
                  <th className="py-3.5 px-4">Department</th>
                  <th className="py-3.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1D2A3A]/60">
                {usersList.map(u => (
                  <tr key={u.id} className="hover:bg-[#111A26]/50 transition">
                    <td className="py-3.5 px-4 font-bold text-[#F5F7FA]">{u.name}</td>
                    <td className="py-3.5 px-4 font-mono text-[#5B9CF6]">{u.email}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border ${
                        u.role === 'ADMIN' ? 'bg-[#5B9CF6]/15 text-[#5B9CF6] border-[#5B9CF6]/30' :
                        u.role === 'MANAGER' ? 'bg-[#E7B65A]/15 text-[#E7B65A] border-[#E7B65A]/30' :
                        u.role === 'STAFF' ? 'bg-[#43C98B]/15 text-[#43C98B] border-[#43C98B]/30' :
                        'bg-[#E056FD]/15 text-[#E056FD] border-[#E056FD]/30'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#F5F7FA]">{u.assignedWarehouse || 'WH-EAST'}</td>
                    <td className="py-3.5 px-4 text-[#7F8DA3]">{u.department}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#43C98B]/20 text-[#43C98B] border border-[#43C98B]/30">
                        {u.status}
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
            <div key={r.name} className="p-5 bg-[#0D141E] border border-[#1D2A3A] rounded-2xl space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-[#E7B65A]">{r.name}</h3>
                <span className="text-[10px] text-[#7F8DA3] uppercase tracking-wider">Role Definition</span>
              </div>
              <p className="text-xs text-[#7F8DA3] leading-relaxed">{r.permissions}</p>
            </div>
          ))}
        </div>
      )}

      {/* Admin Create Manager / Staff Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070B11]/80 backdrop-blur-sm p-4">
          <div className="bg-[#0D141E] border border-[#1D2A3A] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-[#E7B65A]" />
              <h2 className="text-lg font-bold text-[#F5F7FA]">Admin: Create Manager or Staff Account</h2>
            </div>
            <p className="text-xs text-[#7F8DA3]">
              Assign an official Gmail address and role. An invitation email will be dispatched to the user.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-[#7F8DA3] uppercase mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={e => setForm({ ...form, fullName: e.target.value })}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full bg-[#111A26] border border-[#1D2A3A] rounded-xl px-3 py-2 text-xs text-[#F5F7FA] focus:outline-none focus:border-[#E7B65A]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#7F8DA3] uppercase mb-1">Assigned Gmail Address *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="manager1@gmail.com or staff1@gmail.com"
                  className="w-full bg-[#111A26] border border-[#1D2A3A] rounded-xl px-3 py-2 text-xs text-[#F5F7FA] focus:outline-none focus:border-[#E7B65A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#7F8DA3] uppercase mb-1">Assign Role *</label>
                  <select
                    value={form.role}
                    onChange={e => setForm({ ...form, role: e.target.value })}
                    className="w-full bg-[#111A26] border border-[#1D2A3A] rounded-xl px-3 py-2 text-xs text-[#F5F7FA] focus:outline-none focus:border-[#E7B65A]"
                  >
                    <option value="MANAGER">MANAGER (Supervisory)</option>
                    <option value="STAFF">STAFF (Fulfillment & Ops)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#7F8DA3] uppercase mb-1">Assigned Warehouse</label>
                  <select
                    value={form.assignedWarehouse}
                    onChange={e => setForm({ ...form, assignedWarehouse: e.target.value })}
                    className="w-full bg-[#111A26] border border-[#1D2A3A] rounded-xl px-3 py-2 text-xs text-[#F5F7FA] focus:outline-none focus:border-[#E7B65A]"
                  >
                    {warehouses.map(w => (
                      <option key={w.code} value={w.code}>{w.code} ({w.name.split(' ')[0]})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#7F8DA3] uppercase mb-1">Phone Number</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  placeholder="+1 (555) 019-2834"
                  className="w-full bg-[#111A26] border border-[#1D2A3A] rounded-xl px-3 py-2 text-xs text-[#F5F7FA] focus:outline-none focus:border-[#E7B65A]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-[#111A26] border border-[#1D2A3A] text-[#7F8DA3] hover:text-[#F5F7FA] font-semibold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#E7B65A] text-[#070B11] font-bold text-xs rounded-xl hover:bg-[#f0c46e] flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Create Account & Send Invitation</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Simulated Email Invitation Dialog */}
      {invitedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070B11]/80 backdrop-blur-sm p-4">
          <div className="bg-[#0D141E] border border-[#43C98B]/40 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center gap-2 text-[#43C98B]">
              <CheckCircle2 className="w-6 h-6" />
              <h3 className="text-base font-bold text-[#F5F7FA]">Invitation Sent to {invitedUser.email}</h3>
            </div>

            <div className="p-4 bg-[#111A26] border border-[#1D2A3A] rounded-xl space-y-2 text-xs text-[#7F8DA3] font-mono">
              <div className="text-[#E7B65A] font-bold">NEXORA SYSTEM INVITATION</div>
              <div>Your account has been created by System Admin.</div>
              <div>Role: <strong className="text-[#F5F7FA]">{invitedUser.role}</strong></div>
              <div>Assigned Warehouse: <strong className="text-[#F5F7FA]">{invitedUser.assignedWarehouse}</strong></div>
              <div>Login Email: <strong className="text-[#5B9CF6]">{invitedUser.email}</strong></div>
              <div className="text-[10px] text-[#7F8DA3] pt-2 border-t border-[#1D2A3A]">
                Instructions: Log in using your assigned Gmail account to access your designated dashboard.
              </div>
            </div>

            <button
              onClick={() => setInvitedUser(null)}
              className="w-full py-2 bg-[#43C98B] text-[#070B11] font-bold text-xs rounded-xl hover:bg-[#3bb37b] transition-all"
            >
              Close Window
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
