import React, { useState } from 'react';
import { useInventoryData } from '../../context/InventoryDataContext';
import { useAuth } from '../../context/AuthContext';
import { ShoppingBag, Trash2, Plus, Minus, MapPin, CreditCard, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export const CustomerCartPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, updateCartQty, removeFromCart, placeCustomerOrder } = useInventoryData();

  const [deliveryAddress, setDeliveryAddress] = useState('742 Evergreen Terrace, Springfield, OR 97477');
  const [phone, setPhone] = useState('+1 (555) 019-2834');

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 500 ? 0 : 49;
  const grandTotal = subtotal + tax + shipping;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    placeCustomerOrder({
      customerEmail: user?.sub || user?.username || 'customer@gmail.com',
      customerName: user?.name || user?.username || 'Customer User',
      items: cart,
      total: grandTotal,
      deliveryAddress: deliveryAddress,
      warehouse: 'WH-EAST'
    });

    navigate('/customer/orders');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200 select-none">
      {/* Header */}
      <div className="bg-[#0D141E] border border-[#1D2A3A] rounded-2xl p-6 flex items-center justify-between shadow-lg">
        <div>
          <h1 className="text-2xl font-bold text-[#F5F7FA]">Shopping Cart & Order Checkout</h1>
          <p className="text-xs text-[#7F8DA3] mt-1">Review selected items before submitting for Manager Approval.</p>
        </div>
        <Link to="/customer/products" className="text-xs font-bold text-[#E7B65A] hover:underline">
          ← Continue Shopping
        </Link>
      </div>

      {cart.length === 0 ? (
        <div className="p-12 text-center bg-[#0D141E] border border-[#1D2A3A] rounded-2xl space-y-4">
          <ShoppingBag className="w-12 h-12 text-[#7F8DA3] mx-auto opacity-50" />
          <h3 className="text-base font-bold text-[#F5F7FA]">Your Cart is Empty</h3>
          <p className="text-xs text-[#7F8DA3] max-w-sm mx-auto">Browse our catalog to select products for procurement.</p>
          <button
            onClick={() => navigate('/customer/products')}
            className="px-6 py-2.5 bg-[#E7B65A] text-[#070B11] font-bold text-xs rounded-xl hover:bg-[#f0c46e] transition-all"
          >
            Explore Product Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-[#0D141E] border border-[#1D2A3A] rounded-2xl p-6 space-y-4 shadow-lg">
              <h2 className="text-base font-bold text-[#F5F7FA]">Cart Items ({cart.length})</h2>

              <div className="space-y-3">
                {cart.map(item => (
                  <div key={item.id} className="p-4 bg-[#111A26] border border-[#1D2A3A] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-[#070B11] rounded-lg p-2 overflow-hidden flex items-center justify-center shrink-0 border border-[#1D2A3A]">
                        <img src={item.image} alt={item.name} className="object-contain h-full w-full" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#F5F7FA]">{item.name}</div>
                        <div className="text-[10px] text-[#7F8DA3] font-mono">{item.sku}</div>
                        <div className="text-xs font-bold font-mono text-[#E7B65A] mt-1">${item.price.toLocaleString()}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6">
                      <div className="flex items-center gap-2 bg-[#070B11] border border-[#1D2A3A] rounded-lg px-2 py-1">
                        <button
                          onClick={() => updateCartQty(item.id, item.quantity - 1)}
                          className="text-[#7F8DA3] hover:text-[#F5F7FA] p-0.5"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold font-mono text-[#F5F7FA] px-2">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQty(item.id, item.quantity + 1)}
                          className="text-[#7F8DA3] hover:text-[#F5F7FA] p-0.5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="font-mono font-bold text-sm text-[#F5F7FA] min-w-[80px] text-right">
                        ${(item.price * item.quantity).toLocaleString()}
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#EF6461] hover:bg-[#EF6461]/10 p-2 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Checkout & Address Panel */}
          <div className="space-y-4">
            <div className="bg-[#0D141E] border border-[#1D2A3A] rounded-2xl p-6 space-y-4 shadow-lg">
              <h2 className="text-base font-bold text-[#F5F7FA]">Delivery & Checkout</h2>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-[11px] font-bold text-[#7F8DA3] uppercase block mb-1">
                    Delivery Address
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3 top-3 text-[#E7B65A]" />
                    <textarea
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      rows={2}
                      className="w-full bg-[#111A26] border border-[#1D2A3A] rounded-xl pl-9 pr-3 py-2 text-xs text-[#F5F7FA] focus:outline-none focus:border-[#E7B65A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#7F8DA3] uppercase block mb-1">
                    Contact Phone Number
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#111A26] border border-[#1D2A3A] rounded-xl px-3 py-2 text-xs text-[#F5F7FA] focus:outline-none focus:border-[#E7B65A]"
                  />
                </div>
              </div>

              <div className="border-t border-[#1D2A3A] pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-[#7F8DA3]">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#F5F7FA]">${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-[#7F8DA3]">
                  <span>Tax (8%)</span>
                  <span className="font-mono text-[#F5F7FA]">${tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-[#7F8DA3]">
                  <span>Shipping</span>
                  <span className="font-mono text-[#43C98B]">{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
                </div>
                <div className="border-t border-[#1D2A3A] pt-2 flex justify-between font-bold text-sm text-[#F5F7FA]">
                  <span>Total Payable</span>
                  <span className="font-mono text-[#E7B65A]">${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full py-3 bg-[#E7B65A] hover:bg-[#f0c46e] text-[#070B11] font-bold text-xs rounded-xl transition-all shadow-[0_0_20px_rgba(231,182,90,0.25)] flex items-center justify-center gap-2"
              >
                <span>PLACE ORDER (SUBMIT FOR MANAGER APPROVAL)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[10px] text-[#7F8DA3] text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#43C98B]" />
                <span>Protected by NEXORA Manager Authorization Workflow</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
