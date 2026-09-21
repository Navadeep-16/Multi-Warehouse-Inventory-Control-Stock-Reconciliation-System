import React, { useState } from 'react';
import { useInventoryData } from '../context/InventoryDataContext';
import { useAuth, getUserRole } from '../context/AuthContext';
import { 
  ShoppingCart, CheckCircle, XCircle, Clock, Truck, Package, 
  ChevronRight, Filter, Search, ShieldAlert, ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const OrdersPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const role = getUserRole(user);
  const { orders, approveCustomerOrder, rejectCustomerOrder } = useInventoryData();

  const [activeTab, setActiveTab] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [rejectingOrder, setRejectingOrder] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const isManager = role === 'MANAGER' || role === 'ADMIN';

  const handleConfirmReject = (e) => {
    e.preventDefault();
    if (!rejectingOrder) return;
    if (!rejectionReason.trim()) {
      alert('Please provide a rejection reason.');
      return;
    }
    rejectCustomerOrder(rejectingOrder.id, rejectionReason, user?.sub || 'manager@nexora.io');
    setRejectingOrder(null);
    setRejectionReason('');
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (o.customer && o.customer.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (o.products && o.products.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activeTab === 'PENDING') return matchesSearch && o.status === 'PENDING_MANAGER_APPROVAL';
    if (activeTab === 'APPROVED') return matchesSearch && (o.status === 'APPROVED' || o.status === 'IN_PROGRESS' || o.status === 'PICKED' || o.status === 'PACKED');
    if (activeTab === 'DISPATCHED') return matchesSearch && (o.status === 'DISPATCHED' || o.status === 'DELIVERED');
    if (activeTab === 'REJECTED') return matchesSearch && o.status === 'REJECTED';
    return matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING_MANAGER_APPROVAL': return 'bg-[#E7B65A]/20 text-[#E7B65A] border-[#E7B65A]/30';
      case 'APPROVED': return 'bg-[#5B9CF6]/20 text-[#5B9CF6] border-[#5B9CF6]/30';
      case 'DISPATCHED':
      case 'DELIVERED': return 'bg-[#43C98B]/20 text-[#43C98B] border-[#43C98B]/30';
      case 'REJECTED': return 'bg-[#EF6461]/20 text-[#EF6461] border-[#EF6461]/30';
      default: return 'bg-[#5B9CF6]/20 text-[#5B9CF6] border-[#5B9CF6]/30';
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200 select-none">
      {/* Header */}
      <div className="bg-[#0D141E] border border-[#1D2A3A] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
        <div>
          <h1 className="text-2xl font-bold text-[#F5F7FA]">Order Management & Lifecycle Control</h1>
          <p className="text-xs text-[#7F8DA3] mt-1">Supervise customer orders, Manager authorization queues, and fulfillment statuses.</p>
        </div>

        {role === 'CUSTOMER' && (
          <button
            onClick={() => navigate('/customer/products')}
            className="px-4 py-2 bg-[#E7B65A] text-[#070B11] font-bold rounded-xl text-xs hover:bg-[#f0c46e] transition-all"
          >
            + Place New Customer Order
          </button>
        )}
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0D141E] border border-[#1D2A3A] p-4 rounded-xl">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['ALL', 'PENDING', 'APPROVED', 'DISPATCHED', 'REJECTED'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-[#E7B65A] text-[#070B11]'
                  : 'bg-[#111A26] text-[#7F8DA3] border border-[#1D2A3A] hover:text-[#F5F7FA]'
              }`}
            >
              {tab === 'PENDING' ? 'Pending Approval' : tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7F8DA3]" />
          <input
            type="text"
            placeholder="Search order number or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#111A26] border border-[#1D2A3A] rounded-xl pl-9 pr-4 py-1.5 text-xs text-[#F5F7FA] focus:outline-none focus:border-[#E7B65A]"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#0D141E] border border-[#1D2A3A] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#111A26] border-b border-[#1D2A3A] text-[#7F8DA3] uppercase font-semibold">
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Products</th>
                <th className="py-3.5 px-4">Warehouse</th>
                <th className="py-3.5 px-4 text-right">Total Value</th>
                <th className="py-3.5 px-4">Status</th>
                {isManager && <th className="py-3.5 px-4 text-center">Manager Action</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1D2A3A]/60">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={isManager ? 7 : 6} className="py-12 text-center text-[#7F8DA3]">
                    No orders matching criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map(ord => (
                  <tr key={ord.id} className="hover:bg-[#111A26]/50 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#E7B65A]">{ord.orderNumber}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#F5F7FA]">{ord.customerName || ord.customer}</div>
                      <div className="text-[10px] text-[#7F8DA3] font-mono">{ord.customer}</div>
                    </td>
                    <td className="py-3.5 px-4 text-[#F5F7FA] font-medium">{ord.products}</td>
                    <td className="py-3.5 px-4 font-mono text-[#5B9CF6]">{ord.warehouse || 'WH-EAST'}</td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-[#43C98B]">
                      ${(ord.total || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border ${getStatusBadge(ord.status)}`}>
                        {ord.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    {isManager && (
                      <td className="py-3.5 px-4 text-center">
                        {ord.status === 'PENDING_MANAGER_APPROVAL' ? (
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => approveCustomerOrder(ord.id, user?.sub || 'manager@nexora.io')}
                              className="px-2.5 py-1 bg-[#43C98B] hover:bg-[#3bb37b] text-[#070B11] font-bold rounded-lg text-[10px] transition-all"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => { setRejectingOrder(ord); setRejectionReason(''); }}
                              className="px-2.5 py-1 bg-[#EF6461]/20 text-[#EF6461] hover:bg-[#EF6461] hover:text-[#070B11] border border-[#EF6461]/30 font-bold rounded-lg text-[10px] transition-all"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] text-[#7F8DA3]">Reviewed</span>
                        )}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rejection Modal */}
      {rejectingOrder && (
        <div className="fixed inset-0 z-50 bg-[#070B11]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0D141E] border border-[#EF6461]/40 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center gap-3 text-[#EF6461]">
              <XCircle className="w-6 h-6" />
              <h3 className="text-lg font-bold text-[#F5F7FA]">Reject Customer Order</h3>
            </div>

            <p className="text-xs text-[#7F8DA3]">
              Specify reason for rejecting <strong className="text-[#F5F7FA]">{rejectingOrder.orderNumber}</strong>.
            </p>

            <form onSubmit={handleConfirmReject} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-[#7F8DA3] uppercase block mb-1">
                  Rejection Reason *
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  required
                  rows={3}
                  placeholder="e.g. Stock unavailable in warehouse..."
                  className="w-full bg-[#111A26] border border-[#1D2A3A] rounded-xl p-3 text-xs text-[#F5F7FA] focus:outline-none focus:border-[#EF6461]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setRejectingOrder(null)}
                  className="px-4 py-2 bg-[#111A26] border border-[#1D2A3A] text-[#7F8DA3] font-semibold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#EF6461] text-[#070B11] font-bold text-xs rounded-xl hover:bg-[#d94f4c]"
                >
                  Confirm Rejection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
