import React from 'react';
import { useInventoryData } from '../../context/InventoryDataContext';
import { useAuth } from '../../context/AuthContext';
import { Package, Truck, CheckCircle2, Clock, AlertCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export const CustomerOrdersPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { orders } = useInventoryData();

  const customerEmail = user?.sub || user?.username || 'customer@gmail.com';
  const myOrders = orders.filter(o => 
    o.customer?.toLowerCase() === customerEmail.toLowerCase() || 
    o.customerName?.toLowerCase().includes('customer') ||
    o.customer === 'John Doe Customer'
  );

  const getOrderStatusStep = (status) => {
    switch (status) {
      case 'PENDING_MANAGER_APPROVAL': return 1;
      case 'APPROVED': return 2;
      case 'IN_PROGRESS':
      case 'PICKED': return 3;
      case 'PACKED':
      case 'READY_FOR_DISPATCH': return 4;
      case 'DISPATCHED': return 5;
      case 'DELIVERED': return 6;
      case 'REJECTED': return -1;
      default: return 1;
    }
  };

  const steps = ['Order Placed', 'Manager Approved', 'Staff Processing', 'Packed', 'Dispatched', 'Delivered'];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200 select-none">
      {/* Header */}
      <div className="bg-[#0D141E] border border-[#1D2A3A] rounded-2xl p-6 flex items-center justify-between shadow-lg">
        <div>
          <h1 className="text-2xl font-bold text-[#F5F7FA]">My Customer Orders & Live Tracking</h1>
          <p className="text-xs text-[#7F8DA3] mt-1">Real-time status updates from Manager authorization to Staff dispatch.</p>
        </div>
        <Link to="/customer/products" className="text-xs font-bold text-[#E7B65A] hover:underline">
          + Place New Order
        </Link>
      </div>

      {myOrders.length === 0 ? (
        <div className="p-12 text-center bg-[#0D141E] border border-[#1D2A3A] rounded-2xl space-y-4">
          <Package className="w-12 h-12 text-[#7F8DA3] mx-auto opacity-50" />
          <h3 className="text-base font-bold text-[#F5F7FA]">No Order History Found</h3>
          <p className="text-xs text-[#7F8DA3] max-w-sm mx-auto">You have not submitted any orders yet.</p>
          <button
            onClick={() => navigate('/customer/products')}
            className="px-6 py-2.5 bg-[#E7B65A] text-[#070B11] font-bold text-xs rounded-xl hover:bg-[#f0c46e] transition-all"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {myOrders.map(ord => {
            const currentStep = getOrderStatusStep(ord.status);
            const isRejected = ord.status === 'REJECTED';

            return (
              <div key={ord.id} className="bg-[#0D141E] border border-[#1D2A3A] hover:border-[#E7B65A]/40 rounded-2xl p-6 space-y-5 transition-all shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1D2A3A] pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#E7B65A] text-base">{ord.orderNumber}</span>
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                        isRejected ? 'bg-[#EF6461]/20 text-[#EF6461]' :
                        ord.status === 'DISPATCHED' ? 'bg-[#43C98B]/20 text-[#43C98B]' : 'bg-[#5B9CF6]/20 text-[#5B9CF6]'
                      }`}>
                        {ord.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <div className="text-xs text-[#7F8DA3] mt-1">
                      Submitted on <strong className="text-[#F5F7FA]">{ord.orderDate || ord.createdAt}</strong> · Shipping to: {ord.deliveryAddress || 'Default Address'}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-bold font-mono text-[#F5F7FA]">${(ord.total || 0).toLocaleString()}</div>
                    <div className="text-[10px] text-[#7F8DA3]">Total Order Value</div>
                  </div>
                </div>

                {/* Items preview */}
                <div className="p-3 bg-[#111A26] rounded-xl text-xs text-[#F5F7FA]">
                  <strong>Ordered Items:</strong> {ord.products}
                </div>

                {/* Status Timeline Stepper */}
                {isRejected ? (
                  <div className="p-4 bg-[#EF6461]/10 border border-[#EF6461]/30 rounded-xl text-xs text-[#EF6461] space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4" /> Order Rejected by Operational Manager
                    </div>
                    <div>Reason: "{ord.rejectionReason || 'Stock unavailable in assigned warehouse'}"</div>
                  </div>
                ) : (
                  <div className="pt-2 space-y-3">
                    <div className="grid grid-cols-6 gap-2 text-center text-[10px] font-bold text-[#7F8DA3]">
                      {steps.map((st, idx) => (
                        <div key={st} className={idx + 1 <= currentStep ? 'text-[#43C98B]' : ''}>
                          {st}
                        </div>
                      ))}
                    </div>

                    <div className="w-full bg-[#070B11] h-2.5 rounded-full overflow-hidden flex border border-[#1D2A3A]">
                      <div 
                        className="bg-gradient-to-r from-[#E7B65A] via-[#5B9CF6] to-[#43C98B] h-full transition-all duration-500" 
                        style={{ width: `${(currentStep / 6) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
