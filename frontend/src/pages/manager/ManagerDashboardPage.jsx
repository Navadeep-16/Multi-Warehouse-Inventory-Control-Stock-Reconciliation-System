import React, { useState } from 'react';
import { useInventoryData } from '../../context/InventoryDataContext';
import { useAuth } from '../../context/AuthContext';
import { 
  CheckCircle, XCircle, AlertTriangle, ArrowRightLeft, DollarSign, Warehouse, 
  Package, ShoppingBag, Activity, Clock, ShieldCheck, ChevronRight, MessageSquare
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

export const ManagerDashboardPage = () => {
  const { user } = useAuth();
  const { 
    orders, inventoryItems, warehouses, transfers, staffTasks,
    approveCustomerOrder, rejectCustomerOrder 
  } = useInventoryData();

  // Rejection modal state
  const [rejectingOrder, setRejectingOrder] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  // Pending customer orders needing manager approval
  const pendingCustomerOrders = orders.filter(o => o.status === 'PENDING_MANAGER_APPROVAL');

  const handleConfirmReject = (e) => {
    e.preventDefault();
    if (!rejectingOrder) return;
    if (!rejectionReason.trim()) {
      alert('Please provide a reason for rejecting the customer order.');
      return;
    }
    rejectCustomerOrder(rejectingOrder.id, rejectionReason, user?.sub || 'manager@nexora.io');
    setRejectingOrder(null);
    setRejectionReason('');
  };

  const totalValue = inventoryItems.reduce((acc, i) => acc + (i.available * i.unitCost), 0);
  const lowStockCount = inventoryItems.filter(i => i.available > 0 && i.available <= i.reorder).length;
  const pendingTransfers = transfers.filter(t => t.status === 'Pending').length;

  const managerChartData = [
    { month: 'Apr', valuation: 420000 },
    { month: 'May', valuation: 450000 },
    { month: 'Jun', valuation: 480000 },
    { month: 'Jul', valuation: 510000 },
    { month: 'Aug', valuation: 540000 },
    { month: 'Sep', valuation: totalValue || 590000 },
  ];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-200 select-none">
      {/* 1. MANAGER HEADER BANNER */}
      <div className="bg-[#0D141E] border border-[#1D2A3A] rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-[#E7B65A]/15 text-[#E7B65A] border border-[#E7B65A]/30 uppercase tracking-wider">
              MANAGER SUPERVISORY DASHBOARD
            </span>
            <span className="text-xs text-[#7F8DA3]">
              Active User: <strong className="text-[#F5F7FA]">{user?.sub || 'manager@nexora.io'}</strong>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F7FA] tracking-tight">
            Welcome Back, Operational Manager 👋
          </h1>
          <p className="text-[#7F8DA3] text-xs sm:text-sm mt-1">
            Supervise warehouse inventory, review customer order approvals, and monitor transfer workflows.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/operations/stock-in" className="px-4 py-2 bg-[#E7B65A] text-[#070B11] font-bold rounded-xl text-xs hover:bg-[#f0c46e] transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(231,182,90,0.2)]">
            <Activity className="w-4 h-4" />
            <span>Receive Stock</span>
          </Link>
          <Link to="/transfers/create" className="px-4 py-2 bg-[#0D141E] border border-[#1D2A3A] text-[#F5F7FA] font-semibold rounded-xl text-xs hover:border-[#E7B65A]/50 transition-all flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-[#5B9CF6]" />
            <span>Create Transfer</span>
          </Link>
        </div>
      </div>

      {/* 2. CUSTOMER ORDERS PENDING APPROVAL (HIGH PRIORITY QUEUE) */}
      <div className="bg-[#0D141E] border border-[#E7B65A]/40 rounded-2xl p-6 space-y-4 shadow-xl relative">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-[#F5F7FA]">Customer Orders Awaiting Approval</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E7B65A] text-[#070B11]">
                {pendingCustomerOrders.length} Pending
              </span>
            </div>
            <p className="text-xs text-[#7F8DA3]">Orders placed by Customers require Manager authorization before creating Staff fulfillment tasks.</p>
          </div>
          <Link to="/orders" className="text-xs font-bold text-[#E7B65A] hover:underline flex items-center gap-1">
            View All Orders <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {pendingCustomerOrders.length === 0 ? (
          <div className="p-8 text-center bg-[#111A26] rounded-xl border border-[#1D2A3A]">
            <CheckCircle className="w-10 h-10 text-[#43C98B] mx-auto mb-2 opacity-80" />
            <h3 className="text-sm font-bold text-[#F5F7FA]">No Customer Orders Awaiting Approval</h3>
            <p className="text-xs text-[#7F8DA3] mt-1">All customer orders have been reviewed and dispatched.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingCustomerOrders.map(ord => (
              <div 
                key={ord.id} 
                className="p-4 bg-[#111A26] border border-[#1D2A3A] hover:border-[#E7B65A]/50 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono font-bold text-[#E7B65A]">{ord.orderNumber}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#E7B65A]/15 text-[#E7B65A] border border-[#E7B65A]/30 uppercase">
                      PENDING MANAGER APPROVAL
                    </span>
                    <span className="text-xs text-[#7F8DA3]">({ord.orderDate})</span>
                  </div>
                  <div className="text-xs font-semibold text-[#F5F7FA]">
                    Customer: <span className="text-[#5B9CF6]">{ord.customerName || ord.customer}</span>
                  </div>
                  <div className="text-xs text-[#7F8DA3]">
                    Products: <strong className="text-[#F5F7FA]">{ord.products}</strong> (Qty: {ord.quantity})
                  </div>
                  <div className="text-[11px] text-[#7F8DA3]">
                    Delivery: {ord.deliveryAddress || 'Standard Warehouse Dispatch'}
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <div className="text-right mr-2 hidden md:block">
                    <div className="text-base font-bold font-mono text-[#43C98B]">${(ord.total || 0).toLocaleString()}</div>
                    <div className="text-[10px] text-[#7F8DA3]">Total Value</div>
                  </div>

                  <button
                    onClick={() => approveCustomerOrder(ord.id, user?.sub || 'manager@nexora.io')}
                    className="px-4 py-2 bg-[#43C98B] hover:bg-[#3bb37b] text-[#070B11] font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(67,201,139,0.2)]"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>APPROVE</span>
                  </button>

                  <button
                    onClick={() => { setRejectingOrder(ord); setRejectionReason(''); }}
                    className="px-4 py-2 bg-[#EF6461]/15 hover:bg-[#EF6461] hover:text-[#070B11] text-[#EF6461] border border-[#EF6461]/30 font-bold rounded-xl text-xs transition-all flex items-center gap-1.5"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>REJECT</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. MANAGER KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#0D141E] border border-[#1D2A3A] rounded-xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#7F8DA3] uppercase">Total Inventory Value</span>
            <div className="w-9 h-9 rounded-lg bg-[#E7B65A]/10 flex items-center justify-center text-[#E7B65A]">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-mono text-[#F5F7FA]">
              ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-[#43C98B] font-medium mt-1">Active warehouse assets</div>
          </div>
        </div>

        <div className="bg-[#0D141E] border border-[#1D2A3A] rounded-xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#7F8DA3] uppercase">Active Warehouses</span>
            <div className="w-9 h-9 rounded-lg bg-[#5B9CF6]/10 flex items-center justify-center text-[#5B9CF6]">
              <Warehouse className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-mono text-[#F5F7FA]">{warehouses.length} Active Hubs</div>
            <div className="text-xs text-[#7F8DA3] mt-1">Supervised logistics</div>
          </div>
        </div>

        <Link to="/inventory/low-stock" className="bg-[#0D141E] border border-[#1D2A3A] rounded-xl p-5 hover:border-[#E7B65A]/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#7F8DA3] uppercase">Low Stock Alerts</span>
            <div className="w-9 h-9 rounded-lg bg-[#E7B65A]/10 flex items-center justify-center text-[#E7B65A]">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-mono text-[#E7B65A]">{lowStockCount} SKUs</div>
            <div className="text-xs text-[#7F8DA3] mt-1">Below reorder threshold</div>
          </div>
        </Link>

        <Link to="/transfers/pending" className="bg-[#0D141E] border border-[#1D2A3A] rounded-xl p-5 hover:border-[#5B9CF6]/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#7F8DA3] uppercase">Pending Transfers</span>
            <div className="w-9 h-9 rounded-lg bg-[#5B9CF6]/10 flex items-center justify-center text-[#5B9CF6]">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-mono text-[#F5F7FA]">{pendingTransfers} Requests</div>
            <div className="text-xs text-[#7F8DA3] mt-1">Awaiting manager approval</div>
          </div>
        </Link>
      </div>

      {/* 4. REJECTION REASON MODAL */}
      {rejectingOrder && (
        <div className="fixed inset-0 z-50 bg-[#070B11]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0D141E] border border-[#EF6461]/40 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center gap-3 text-[#EF6461]">
              <XCircle className="w-6 h-6" />
              <h3 className="text-lg font-bold text-[#F5F7FA]">Reject Customer Order</h3>
            </div>

            <p className="text-xs text-[#7F8DA3]">
              You are rejecting Order <strong className="text-[#F5F7FA]">{rejectingOrder.orderNumber}</strong> ({rejectingOrder.customerName || rejectingOrder.customer}).
              Please enter the rejection reason to notify the customer.
            </p>

            <form onSubmit={handleConfirmReject} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-[#7F8DA3] uppercase block mb-1.5">
                  Rejection Reason (Required)
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  required
                  rows={3}
                  placeholder="e.g. Insufficient stock availability in regional warehouse..."
                  className="w-full bg-[#111A26] border border-[#1D2A3A] rounded-xl p-3 text-xs text-[#F5F7FA] focus:outline-none focus:border-[#EF6461] transition-all"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setRejectingOrder(null)}
                  className="px-4 py-2 bg-[#111A26] border border-[#1D2A3A] text-[#7F8DA3] hover:text-[#F5F7FA] font-semibold text-xs rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#EF6461] text-[#070B11] font-bold text-xs rounded-xl hover:bg-[#d94f4c] transition-all"
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
