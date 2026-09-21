import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Search, Bell, Sun, Moon, ChevronRight, LogOut, Settings, UserCircle, ChevronDown, ShoppingCart } from 'lucide-react';
import { useAuth, getUserRole } from '../context/AuthContext';
import { useInventoryData } from '../context/InventoryDataContext';

export const TopBar = () => {
  const navigate = useNavigate();
  const { user, logout, switchRole } = useAuth();
  const { cart } = useInventoryData();
  const location = useLocation();
  const [theme, setTheme] = useState('dark');
  const [profileOpen, setProfileOpen] = useState(false);

  const role = getUserRole(user);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  const pathnames = location.pathname.split('/').filter((x) => x);
  const cartCount = cart ? cart.reduce((sum, i) => sum + i.quantity, 0) : 0;

  return (
    <header className="h-14 border-b border-[#1D2A3A] bg-[#070B11]/90 backdrop-blur flex items-center justify-between px-6 sticky top-0 z-20 select-none">
      {/* Breadcrumbs */}
      <div className="flex items-center text-xs text-[#7F8DA3] capitalize overflow-hidden whitespace-nowrap hidden md:flex min-w-[180px]">
        <Link to={`/${role.toLowerCase()}-dashboard`} className="hover:text-[#E7B65A] transition-colors font-medium">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-[#1D2A3A] flex-shrink-0" />
        <span className="text-[#F5F7FA] font-semibold">
          {pathnames.length === 0 ? 'Dashboard' : pathnames[pathnames.length - 1].replace('-', ' ')}
        </span>
      </div>

      {/* Global Search */}
      <div className="flex-1 max-w-lg relative group mx-4">
        <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7F8DA3] group-focus-within:text-[#E7B65A] transition-colors" />
        <input 
          type="text" 
          placeholder="Search inventory, products, orders, SKUs, or scan barcode..." 
          className="w-full bg-[#0D141E] border border-[#1D2A3A] rounded-xl pl-9 pr-14 py-1.5 text-xs focus:outline-none focus:border-[#E7B65A] focus:ring-1 focus:ring-[#E7B65A]/40 transition-all text-[#F5F7FA] placeholder:text-[#7F8DA3]"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] text-[#7F8DA3] font-mono bg-[#070B11] border border-[#1D2A3A] px-1.5 py-0.5 rounded-md">
          <span>⌘</span><span>K</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* Customer Cart Quick Button */}
        {role === 'CUSTOMER' && (
          <button 
            onClick={() => navigate('/customer/cart')}
            className="relative px-3 py-1.5 bg-[#E7B65A]/15 border border-[#E7B65A]/30 hover:bg-[#E7B65A]/25 text-[#E7B65A] rounded-xl transition-all flex items-center gap-2 text-xs font-bold"
          >
            <ShoppingCart className="w-4 h-4 text-[#E7B65A]" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="px-1.5 py-0.2 bg-[#E7B65A] text-[#070B11] rounded-full text-[10px] font-extrabold">
                {cartCount}
              </span>
            )}
          </button>
        )}

        <button onClick={toggleTheme} className="p-1.5 text-[#7F8DA3] hover:text-[#F5F7FA] hover:bg-[#111A26] rounded-lg transition-all">
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        <button 
          onClick={() => navigate('/notifications')}
          className="relative p-1.5 text-[#7F8DA3] hover:text-[#F5F7FA] hover:bg-[#111A26] rounded-lg transition-all"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1.5 w-2 h-2 bg-[#EF6461] rounded-full border border-[#070B11]"></span>
        </button>
        
        {/* Profile Menu */}
        <div className="relative pl-3 border-l border-[#1D2A3A] ml-1">
          <div 
            className="flex items-center gap-2.5 cursor-pointer p-1 hover:bg-[#111A26] rounded-xl transition-all"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#E7B65A] to-[#5B9CF6] flex items-center justify-center text-[#070B11] shadow-md font-bold text-xs">
              {(user?.sub || user?.username || user?.name || 'U')[0].toUpperCase()}
            </div>

            <div className="text-left hidden sm:block">
              <div className="text-xs font-semibold text-[#F5F7FA] leading-tight">
                {user?.sub || user?.username || user?.name || 'user@nexora.io'}
              </div>
              <div className="text-[10px] font-extrabold text-[#E7B65A] tracking-wider uppercase">
                {role}
              </div>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-[#7F8DA3]" />
          </div>

          {/* Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-[#0D141E] border border-[#1D2A3A] rounded-xl shadow-2xl overflow-hidden py-1 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-2.5 border-b border-[#1D2A3A] bg-[#111A26]">
                <div className="text-xs font-semibold text-[#F5F7FA]">{user?.sub || user?.username || 'user@nexora.io'}</div>
                <div className="text-[10px] font-extrabold text-[#E7B65A] uppercase">Active Role: {role}</div>
              </div>

              <Link to="/profile" className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#F5F7FA] hover:bg-[#111A26] transition-colors" onClick={() => setProfileOpen(false)}>
                <UserCircle className="w-4 h-4 text-[#7F8DA3]" /> My Profile
              </Link>

              {role === 'ADMIN' && (
                <Link to="/users-roles" className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#5B9CF6] hover:bg-[#111A26] transition-colors font-semibold" onClick={() => setProfileOpen(false)}>
                  <UserCircle className="w-4 h-4 text-[#5B9CF6]" /> Admin Users & Roles
                </Link>
              )}

              <Link to="/settings" className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#F5F7FA] hover:bg-[#111A26] transition-colors" onClick={() => setProfileOpen(false)}>
                <Settings className="w-4 h-4 text-[#7F8DA3]" /> Settings
              </Link>

              <div className="h-px bg-[#1D2A3A] my-1"></div>
              
              <button 
                onClick={() => { setProfileOpen(false); logout(); navigate('/login'); }}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-[#EF6461] hover:bg-[#EF6461]/10 transition-colors text-left font-semibold"
              >
                <LogOut className="w-4 h-4" /> Sign Out Session
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
