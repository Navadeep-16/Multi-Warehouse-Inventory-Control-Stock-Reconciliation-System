import React from 'react';
import { useInventoryData } from '../../context/InventoryDataContext';
import { useAuth } from '../../context/AuthContext';
import { 
  ShoppingBag, ShoppingCart, Truck, CheckCircle2, Clock, AlertCircle, 
  ArrowRight, Package, MapPin, Sparkles, Heart, ChevronRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const CustomerDashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { products, orders, cart, addToCart } = useInventoryData();

  // Filter orders placed by this customer (or all customer orders for demo)
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
    <div className="space-y-8 pb-12 animate-in fade-in duration-200 select-none">
      {/* 1. HERO HERO BANNER */}
      <div className="bg-gradient-to-r from-[#0D141E] via-[#111A26] to-[#0D141E] border border-[#1D2A3A] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-[-5%] top-[-20%] w-80 h-80 bg-[#E7B65A]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-[#E056FD]/15 text-[#E056FD] border border-[#E056FD]/30 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> VERIFIED CUSTOMER PORTAL
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F7FA] tracking-tight">
            Welcome to NEXORA Retail & Enterprise Store 🛍️
          </h1>
          <p className="text-[#7F8DA3] text-xs sm:text-sm">
            Browse premium hardware, monitor real-time fulfillment timelines, and track delivery status directly.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => navigate('/customer/products')}
              className="px-5 py-2.5 bg-[#E7B65A] text-[#070B11] font-bold rounded-xl text-xs hover:bg-[#f0c46e] transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(231,182,90,0.25)]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Browse Catalog</span>
            </button>

            <button
              onClick={() => navigate('/customer/cart')}
              className="px-5 py-2.5 bg-[#0D141E] border border-[#1D2A3A] text-[#F5F7FA] font-semibold rounded-xl text-xs hover:border-[#E7B65A]/50 transition-all flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4 text-[#E7B65A]" />
              <span>View Cart ({cart.length})</span>
            </button>
          </div>
        </div>

        {/* Quick Cart / Order Summary Card */}
        <div className="bg-[#070B11] border border-[#1D2A3A] rounded-xl p-4 min-w-[240px] text-xs space-y-3">
          <div className="flex justify-between font-bold text-[#F5F7FA]">
            <span>Shopping Cart</span>
            <span className="text-[#E7B65A]">{cart.length} Items</span>
          </div>
          <div className="text-[#7F8DA3] text-[11px]">
            Subtotal: <strong className="text-[#F5F7FA] font-mono">${cart.reduce((s, i) => s + (i.price * i.quantity), 0).toLocaleString()}</strong>
          </div>
          <button
            onClick={() => navigate('/customer/cart')}
            className="w-full py-2 bg-[#111A26] border border-[#1D2A3A] hover:border-[#E7B65A]/50 text-[#F5F7FA] font-semibold rounded-lg text-center transition-all block text-[11px]"
          >
            Checkout Order →
          </button>
        </div>
      </div>

      {/* 2. ACTIVE ORDERS TRACKING TIMELINE */}
      <div className="bg-[#0D141E] border border-[#1D2A3A] rounded-2xl p-6 space-y-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#F5F7FA]">Live Order Fulfillment Tracking</h2>
            <p className="text-xs text-[#7F8DA3]">Real-time status updates from Manager approval to Staff dispatch</p>
          </div>
          <Link to="/customer/orders" className="text-xs font-bold text-[#E7B65A] hover:underline flex items-center gap-1">
            Order History <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {myOrders.length === 0 ? (
          <div className="p-8 text-center bg-[#111A26] rounded-xl border border-[#1D2A3A]">
            <Package className="w-10 h-10 text-[#7F8DA3] mx-auto mb-2 opacity-60" />
            <h3 className="text-sm font-bold text-[#F5F7FA]">No Active Customer Orders</h3>
            <p className="text-xs text-[#7F8DA3] mt-1">Explore our product catalog to place your first order.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {myOrders.slice(0, 2).map(ord => {
              const currentStep = getOrderStatusStep(ord.status);
              const isRejected = ord.status === 'REJECTED';

              return (
                <div key={ord.id} className="p-5 bg-[#111A26] border border-[#1D2A3A] rounded-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1D2A3A] pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#E7B65A] text-sm">{ord.orderNumber}</span>
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                          isRejected ? 'bg-[#EF6461]/20 text-[#EF6461]' : 'bg-[#43C98B]/20 text-[#43C98B]'
                        }`}>
                          {ord.status.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <div className="text-xs text-[#7F8DA3] mt-0.5">{ord.products}</div>
                    </div>

                    <div className="text-right">
                      <div className="font-mono font-bold text-[#F5F7FA]">${(ord.total || 0).toLocaleString()}</div>
                      <div className="text-[10px] text-[#7F8DA3]">{ord.orderDate || ord.createdAt}</div>
                    </div>
                  </div>

                  {/* Rejection Notification Alert */}
                  {isRejected ? (
                    <div className="p-3 bg-[#EF6461]/10 border border-[#EF6461]/30 rounded-xl text-xs text-[#EF6461] flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <div>
                        <strong>Order Rejected by Manager:</strong> "{ord.rejectionReason || 'Stock unavailable'}"
                      </div>
                    </div>
                  ) : (
                    /* Progress Stepper */
                    <div className="pt-2">
                      <div className="grid grid-cols-6 gap-2 text-center text-[10px] font-semibold text-[#7F8DA3] mb-2">
                        {steps.map((st, idx) => (
                          <div key={st} className={idx + 1 <= currentStep ? 'text-[#43C98B] font-bold' : ''}>
                            {st}
                          </div>
                        ))}
                      </div>

                      <div className="w-full bg-[#070B11] h-2 rounded-full overflow-hidden flex border border-[#1D2A3A]">
                        <div 
                          className="bg-gradient-to-r from-[#E7B65A] to-[#43C98B] h-full transition-all duration-500" 
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

      {/* 3. FEATURED PRODUCTS CATALOG PREVIEW */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#F5F7FA]">Featured Hardware</h2>
          <Link to="/customer/products" className="text-xs font-bold text-[#E7B65A] hover:underline">
            View All Catalog →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.slice(0, 4).map(prod => (
            <div key={prod.id} className="bg-[#0D141E] border border-[#1D2A3A] hover:border-[#E7B65A]/40 rounded-xl overflow-hidden flex flex-col justify-between group transition-all">
              <div className="p-4 space-y-3">
                <div className="h-32 bg-[#111A26] rounded-lg overflow-hidden flex items-center justify-center p-2 relative">
                  <img 
                    src={prod.image || 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=500&q=80'} 
                    alt={prod.name} 
                    className="object-contain h-full w-full group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-bold bg-[#070B11]/80 text-[#E7B65A]">
                    {prod.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-[#F5F7FA] line-clamp-1">{prod.name}</h3>
                  <p className="text-[11px] text-[#7F8DA3] line-clamp-2 mt-0.5">{prod.description || 'Premium commercial inventory product.'}</p>
                </div>
              </div>

              <div className="p-4 pt-0 flex items-center justify-between border-t border-[#1D2A3A]/50 mt-2">
                <div>
                  <div className="text-sm font-bold font-mono text-[#F5F7FA]">${(prod.unitPrice || 999).toLocaleString()}</div>
                  <div className="text-[9px] text-[#43C98B] font-semibold">In Stock ({prod.stock} units)</div>
                </div>

                <button
                  onClick={() => addToCart(prod)}
                  className="px-3 py-1.5 bg-[#E7B65A]/15 border border-[#E7B65A]/30 hover:bg-[#E7B65A] hover:text-[#070B11] text-[#E7B65A] font-bold rounded-lg text-xs transition-all flex items-center gap-1"
                >
                  <ShoppingCart className="w-3.5 h-3.5" /> Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
