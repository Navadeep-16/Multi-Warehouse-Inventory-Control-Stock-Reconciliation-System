import React from 'react';
import { useInventoryData } from '../../context/InventoryDataContext';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, UserCheck, ShieldAlert, DollarSign, Package, Warehouse, 
  ShoppingBag, ArrowRightLeft, Activity, ArrowUpRight, CheckSquare, 
  Clock, AlertTriangle, ChevronRight, Settings, Plus, FileText, Sparkles
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell 
} from 'recharts';
import { Link, useNavigate } from 'react-router-dom';

export const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    inventoryItems, warehouses, products, orders, staffTasks, usersList, auditLogs 
  } = useInventoryData();

  // Metric Calculations
  const totalUsers = usersList.length;
  const managersCount = usersList.filter(u => u.role === 'MANAGER' || u.role === 'Warehouse Manager').length;
  const staffCount = usersList.filter(u => u.role === 'STAFF' || u.role === 'Staff').length;
  const customersCount = usersList.filter(u => u.role === 'CUSTOMER').length;
  const totalValue = inventoryItems.reduce((acc, i) => acc + (i.available * i.unitCost), 0);
  const pendingOrdersCount = orders.filter(o => o.status === 'PENDING_MANAGER_APPROVAL').length;
  const pendingTasksCount = staffTasks.filter(t => t.status === 'PENDING').length;
  const lowStockCount = inventoryItems.filter(i => i.available > 0 && i.available <= i.reorder).length;
  const outOfStockCount = inventoryItems.filter(i => i.available === 0).length;

  const chartValuationData = [
    { month: 'Apr', valuation: 480000, orders: 120 },
    { month: 'May', valuation: 520000, orders: 145 },
    { month: 'Jun', valuation: 590000, orders: 168 },
    { month: 'Jul', valuation: 640000, orders: 180 },
    { month: 'Aug', valuation: 710000, orders: 210 },
    { month: 'Sep', valuation: totalValue || 850000, orders: 248 },
  ];

  const warehouseCapData = warehouses.map(w => ({
    name: w.code,
    utilization: Math.round((w.utilization / w.capacity) * 100),
    capacity: 100
  }));

  const userDistributionData = [
    { name: 'Managers', value: managersCount || 3, color: '#E7B65A' },
    { name: 'Staff', value: staffCount || 8, color: '#43C98B' },
    { name: 'Customers', value: customersCount || 14, color: '#E056FD' },
    { name: 'Admins', value: 2, color: '#5B9CF6' }
  ];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-200 select-none">
      {/* 1. HEADER BANNER */}
      <div className="bg-[#0D141E] border border-[#1D2A3A] rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#5B9CF6]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-[#5B9CF6]/15 text-[#5B9CF6] border border-[#5B9CF6]/30 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#5B9CF6]" /> ADMIN EXECUTIVE DASHBOARD
            </span>
            <span className="text-xs text-[#7F8DA3]">
              Super Admin: <strong className="text-[#F5F7FA]">{user?.sub || 'admin@nexora.io'}</strong>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F7FA] tracking-tight">
            NEXORA Enterprise Master Control Hub 👋
          </h1>
          <p className="text-[#7F8DA3] text-xs sm:text-sm mt-1">
            Global view across microservices, multi-warehouse operations, customer ordering, and system administration.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/users-roles')}
            className="px-4 py-2 bg-[#E7B65A] text-[#070B11] font-bold rounded-xl text-xs hover:bg-[#f0c46e] transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(231,182,90,0.25)]"
          >
            <Plus className="w-4 h-4" />
            <span>Create Manager / Staff Account</span>
          </button>

          <button
            onClick={() => navigate('/audit-logs')}
            className="px-4 py-2 bg-[#111A26] border border-[#1D2A3A] text-[#F5F7FA] font-semibold rounded-xl text-xs hover:border-[#5B9CF6]/50 transition-all flex items-center gap-2"
          >
            <FileText className="w-4 h-4 text-[#5B9CF6]" />
            <span>Audit Logs</span>
          </button>
        </div>
      </div>

      {/* 2. TOP METRICS GRID (8 Executive KPI Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        <div className="bg-[#0D141E] border border-[#1D2A3A] rounded-xl p-3.5 hover:border-[#5B9CF6]/40 transition-all">
          <div className="text-[10px] font-bold text-[#7F8DA3] uppercase">Total Users</div>
          <div className="text-xl font-bold font-mono text-[#F5F7FA] mt-1">{totalUsers}</div>
          <div className="text-[10px] text-[#5B9CF6] mt-0.5">Across system</div>
        </div>

        <div className="bg-[#0D141E] border border-[#1D2A3A] rounded-xl p-3.5 hover:border-[#E7B65A]/40 transition-all">
          <div className="text-[10px] font-bold text-[#7F8DA3] uppercase">Managers</div>
          <div className="text-xl font-bold font-mono text-[#E7B65A] mt-1">{managersCount}</div>
          <div className="text-[10px] text-[#7F8DA3] mt-0.5">Supervisory</div>
        </div>

        <div className="bg-[#0D141E] border border-[#1D2A3A] rounded-xl p-3.5 hover:border-[#43C98B]/40 transition-all">
          <div className="text-[10px] font-bold text-[#7F8DA3] uppercase">Staff Users</div>
          <div className="text-xl font-bold font-mono text-[#43C98B] mt-1">{staffCount}</div>
          <div className="text-[10px] text-[#7F8DA3] mt-0.5">Operational</div>
        </div>

        <div className="bg-[#0D141E] border border-[#1D2A3A] rounded-xl p-3.5 hover:border-[#E056FD]/40 transition-all">
          <div className="text-[10px] font-bold text-[#7F8DA3] uppercase">Customers</div>
          <div className="text-xl font-bold font-mono text-[#E056FD] mt-1">{customersCount}</div>
          <div className="text-[10px] text-[#7F8DA3] mt-0.5">Verified buyers</div>
        </div>

        <div className="bg-[#0D141E] border border-[#1D2A3A] rounded-xl p-3.5 hover:border-[#E7B65A]/40 transition-all">
          <div className="text-[10px] font-bold text-[#7F8DA3] uppercase">Total Products</div>
          <div className="text-xl font-bold font-mono text-[#F5F7FA] mt-1">{products.length}</div>
          <div className="text-[10px] text-[#7F8DA3] mt-0.5">SKUs active</div>
        </div>

        <div className="bg-[#0D141E] border border-[#1D2A3A] rounded-xl p-3.5 hover:border-[#43C98B]/40 transition-all">
          <div className="text-[10px] font-bold text-[#7F8DA3] uppercase">Warehouses</div>
          <div className="text-xl font-bold font-mono text-[#F5F7FA] mt-1">{warehouses.length}</div>
          <div className="text-[10px] text-[#7F8DA3] mt-0.5">Global hubs</div>
        </div>

        <div className="bg-[#0D141E] border border-[#1D2A3A] rounded-xl p-3.5 hover:border-[#E7B65A]/40 transition-all">
          <div className="text-[10px] font-bold text-[#7F8DA3] uppercase">Pending Orders</div>
          <div className="text-xl font-bold font-mono text-[#E7B65A] mt-1">{pendingOrdersCount}</div>
          <div className="text-[10px] text-[#E7B65A] mt-0.5">Awaiting Manager</div>
        </div>

        <div className="bg-[#0D141E] border border-[#1D2A3A] rounded-xl p-3.5 hover:border-[#EF6461]/40 transition-all">
          <div className="text-[10px] font-bold text-[#7F8DA3] uppercase">Low / Out Stock</div>
          <div className="text-xl font-bold font-mono text-[#EF6461] mt-1">{lowStockCount + outOfStockCount}</div>
          <div className="text-[10px] text-[#EF6461] mt-0.5">Attention needed</div>
        </div>
      </div>

      {/* 3. ANALYTICS CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#0D141E] border border-[#1D2A3A] rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#F5F7FA]">Global Asset Valuation & Order Trends</h2>
              <p className="text-xs text-[#7F8DA3]">Monthly inventory capitalization progression vs customer orders</p>
            </div>
            <span className="text-xs font-semibold text-[#5B9CF6] bg-[#5B9CF6]/10 px-2.5 py-1 rounded-full border border-[#5B9CF6]/20">Executive Analytics</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartValuationData}>
                <defs>
                  <linearGradient id="adminVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5B9CF6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#5B9CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1D2A3A" />
                <XAxis dataKey="month" stroke="#7F8DA3" tick={{ fontSize: 11 }} />
                <YAxis stroke="#7F8DA3" tick={{ fontSize: 11 }} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: '#0D141E', borderColor: '#1D2A3A', borderRadius: '12px', color: '#fff' }} />
                <Area type="monotone" dataKey="valuation" stroke="#5B9CF6" strokeWidth={2.5} fillOpacity={1} fill="url(#adminVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#0D141E] border border-[#1D2A3A] rounded-2xl p-6 flex flex-col justify-between shadow-lg">
          <div>
            <h2 className="text-base font-bold text-[#F5F7FA]">User Role Distribution</h2>
            <p className="text-xs text-[#7F8DA3]">System role accounts Breakdown</p>
          </div>

          <div className="h-44 relative my-2 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={userDistributionData} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4}>
                  {userDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0D141E', borderColor: '#1D2A3A', borderRadius: '12px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
              <span className="text-xl font-bold font-mono text-[#F5F7FA]">{totalUsers}</span>
              <span className="text-[10px] uppercase tracking-wider text-[#7F8DA3]">Total Users</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#1D2A3A]">
            {userDistributionData.map(item => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span className="text-[#7F8DA3]">{item.name}:</span>
                <span className="font-bold text-[#F5F7FA]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. RECENT SYSTEM ACTIVITY & AUDIT LOG PREVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0D141E] border border-[#1D2A3A] rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#F5F7FA]">Recent Customer Orders</h2>
            <Link to="/orders" className="text-xs font-bold text-[#E7B65A] hover:underline flex items-center gap-1">
              All Orders <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {orders.slice(0, 4).map(ord => (
              <div key={ord.id} className="p-3.5 bg-[#111A26] border border-[#1D2A3A] rounded-xl flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-[#F5F7FA] flex items-center gap-2">
                    <span>{ord.orderNumber}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold ${
                      ord.status === 'PENDING_MANAGER_APPROVAL' ? 'bg-[#E7B65A]/20 text-[#E7B65A]' :
                      ord.status === 'APPROVED' ? 'bg-[#5B9CF6]/20 text-[#5B9CF6]' :
                      ord.status === 'DISPATCHED' ? 'bg-[#43C98B]/20 text-[#43C98B]' : 'bg-[#EF6461]/20 text-[#EF6461]'
                    }`}>
                      {ord.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#7F8DA3] mt-1">{ord.customerName || ord.customer} · {ord.products}</div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-[#F5F7FA]">${(ord.total || 0).toLocaleString()}</div>
                  <div className="text-[10px] text-[#7F8DA3]">{ord.orderDate || ord.createdAt}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0D141E] border border-[#1D2A3A] rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#F5F7FA]">System Audit Trail</h2>
            <Link to="/audit-logs" className="text-xs font-bold text-[#5B9CF6] hover:underline flex items-center gap-1">
              Full Logs <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {auditLogs.slice(0, 4).map(log => (
              <div key={log.id} className="p-3 bg-[#111A26] border border-[#1D2A3A] rounded-xl flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-[#F5F7FA]">{log.action} ({log.module})</div>
                  <div className="text-[11px] text-[#7F8DA3]">User: {log.user} · IP: {log.ip}</div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#43C98B]/15 text-[#43C98B]">
                    {log.status}
                  </span>
                  <div className="text-[10px] text-[#7F8DA3] mt-0.5">{log.timestamp.split(' ')[1]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
