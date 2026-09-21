import React, { useState } from 'react';
import { useInventoryData } from '../context/InventoryDataContext';
import { useAuth } from '../context/AuthContext';
import { 
  Package, CheckCircle, AlertTriangle, XCircle, ShoppingBag, 
  CheckSquare, QrCode, Plus, ArrowDownLeft, ArrowUpRight, 
  ArrowRightLeft, ShieldCheck, ChevronRight, Calendar, Clock
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { Link, useNavigate } from 'react-router-dom';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { inventoryItems, warehouses, products, stockOperations } = useInventoryData();

  const isStaff = user?.role?.toUpperCase() === 'STAFF';

  // Task checklist state for interactive check/uncheck
  const [tasksList, setTasksList] = useState([
    { id: 1, title: 'Receive PO-2026-8803 Shipment', sub: 'Supplier: Logitech B2B (WH-EAST)', priority: 'HIGH', time: '14:30', status: 'DONE', completed: true },
    { id: 2, title: 'Dispatch Order #ORD-2026-9003', sub: '5x Dell UltraSharp 32" (WH-WEST)', priority: 'HIGH', time: '15:15', status: 'DONE', completed: true },
    { id: 3, title: 'Zone A Physical Stock Count Audit', sub: 'Verify MacBook Pro 16" count on Rack A4', priority: 'MEDIUM', time: '16:00', status: 'IN PROGRESS', completed: false },
    { id: 4, title: 'Print Replacement Barcode Stickers', sub: 'Keychron Mechanical Keyboards shelf bin', priority: 'LOW', time: '17:30', status: 'PENDING', completed: false }
  ]);

  const toggleTask = (id) => {
    setTasksList(prev => prev.map(t => {
      if (t.id === id) {
        const nextCompleted = !t.completed;
        return {
          ...t,
          completed: nextCompleted,
          status: nextCompleted ? 'DONE' : 'PENDING'
        };
      }
      return t;
    }));
  };

  // 7-day stock movement data
  const movementData = [
    { date: 'Sep 15', stockIn: 120, stockOut: 85 },
    { date: 'Sep 16', stockIn: 180, stockOut: 140 },
    { date: 'Sep 17', stockIn: 90, stockOut: 110 },
    { date: 'Sep 18', stockIn: 240, stockOut: 195 },
    { date: 'Sep 19', stockIn: 150, stockOut: 130 },
    { date: 'Sep 20', stockIn: 210, stockOut: 175 },
    { date: 'Sep 21', stockIn: 290, stockOut: 210 },
  ];

  // Donut chart distribution data
  const inventoryStatusData = [
    { name: 'In Stock', value: 892, pct: '71.5%', color: '#43C98B' },
    { name: 'Low Stock', value: 48, pct: '3.8%', color: '#E7B65A' },
    { name: 'Out of Stock', value: 12, pct: '1.0%', color: '#EF6461' },
    { name: 'Reserved', value: 296, pct: '23.7%', color: '#5B9CF6' }
  ];

  // Low stock alerts list
  const lowStockAlerts = [
    { id: 1, name: 'Keychron Q1 Pro', sku: 'WH-EAST · KEY-MECH-01', qty: 0 },
    { id: 2, name: 'Dell UltraSharp 32" 4K', sku: 'WH-WEST · MON-DELL-32', qty: 12 },
    { id: 3, name: 'CalDigit TS4 Dock', sku: 'WH-NORTH · DOCK-THUN-04', qty: 8 },
    { id: 4, name: 'Logitech MX Master 3S', sku: 'WH-EAST · MOUSE-LOG-01', qty: 5 }
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200 select-none">
      
      {/* 1. DASHBOARD HEADER */}
      <div className="bg-[#0D141E] border border-[#1D2A3A] rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-[#E7B65A]/15 text-[#E7B65A] border border-[#E7B65A]/30 uppercase tracking-wider">
              STAFF OPERATIONS ROLE
            </span>
            <span className="text-xs text-[#7F8DA3]">
              Current user: <strong className="text-[#F5F7FA]">staff@nexora.io</strong>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F7FA] tracking-tight">
            Welcome back, <br className="hidden sm:inline" />
            <span className="text-[#F5F7FA]">Staff Operations Dashboard 👋</span>
          </h1>
          <p className="text-[#7F8DA3] text-xs sm:text-sm mt-1">
            Here are your key updates for today. Keep operations running smoothly.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Shift info badge */}
          <div className="text-xs text-right hidden lg:block border-r border-[#1D2A3A] pr-4">
            <div className="flex items-center gap-1.5 text-[#F5F7FA] font-medium justify-end">
              <Calendar className="w-3.5 h-3.5 text-[#E7B65A]" />
              <span>Sunday, 21 September 2026</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#7F8DA3] mt-1 justify-end">
              <Clock className="w-3.5 h-3.5 text-[#43C98B]" />
              <span>Shift: Day (08:00 AM - 05:00 PM)</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/barcode-qr')}
              className="px-4 py-2 bg-[#E7B65A] text-[#070B11] font-bold rounded-xl text-xs hover:bg-[#f0c46e] transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(231,182,90,0.2)]"
            >
              <QrCode className="w-4 h-4" />
              <span>Scan Barcode</span>
            </button>

            <button
              onClick={() => navigate('/operations/stock-in')}
              className="px-4 py-2 bg-[#0D141E] border border-[#1D2A3A] text-[#F5F7FA] font-semibold rounded-xl text-xs hover:border-[#E7B65A]/50 transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 text-[#43C98B]" />
              <span>Receive Stock</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. KPI CARDS (6 Compact Columns) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        
        {/* Card 1: Total Items */}
        <div className="bg-[#0D141E] border border-[#1D2A3A] hover:border-[#E7B65A]/40 rounded-2xl p-4 transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#7F8DA3]">Total Items</span>
            <div className="w-7 h-7 rounded-lg bg-[#5B9CF6]/15 flex items-center justify-center text-[#5B9CF6]">
              <Package className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-xl font-bold font-mono text-[#F5F7FA]">1,248</div>
            <div className="flex items-center gap-1 text-[10px] text-[#43C98B] font-bold mt-1">
              <span>↑ 5.2%</span>
              <span className="text-[#7F8DA3] font-normal">Across all warehouses</span>
            </div>
          </div>
        </div>

        {/* Card 2: Available Stock */}
        <div className="bg-[#0D141E] border border-[#1D2A3A] hover:border-[#43C98B]/40 rounded-2xl p-4 transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#7F8DA3]">Available Stock</span>
            <div className="w-7 h-7 rounded-lg bg-[#43C98B]/15 flex items-center justify-center text-[#43C98B]">
              <CheckCircle className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-xl font-bold font-mono text-[#F5F7FA]">892</div>
            <div className="flex items-center gap-1 text-[10px] text-[#43C98B] font-bold mt-1">
              <span>↑ 3.1%</span>
              <span className="text-[#7F8DA3] font-normal">Ready for dispatch</span>
            </div>
          </div>
        </div>

        {/* Card 3: Low Stock Items */}
        <div className="bg-[#0D141E] border border-[#1D2A3A] hover:border-[#E7B65A]/40 rounded-2xl p-4 transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#7F8DA3]">Low Stock Items</span>
            <div className="w-7 h-7 rounded-lg bg-[#E7B65A]/15 flex items-center justify-center text-[#E7B65A]">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-xl font-bold font-mono text-[#E7B65A]">48</div>
            <div className="flex items-center gap-1 text-[10px] text-[#E7B65A] font-bold mt-1">
              <span>↑ 12%</span>
              <span className="text-[#7F8DA3] font-normal">Need attention</span>
            </div>
          </div>
        </div>

        {/* Card 4: Out of Stock */}
        <div className="bg-[#0D141E] border border-[#1D2A3A] hover:border-[#EF6461]/40 rounded-2xl p-4 transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#7F8DA3]">Out of Stock</span>
            <div className="w-7 h-7 rounded-lg bg-[#EF6461]/15 flex items-center justify-center text-[#EF6461]">
              <XCircle className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-xl font-bold font-mono text-[#EF6461]">12</div>
            <div className="flex items-center gap-1 text-[10px] text-[#EF6461] font-bold mt-1">
              <span>↑ 8%</span>
              <span className="text-[#7F8DA3] font-normal">Reorder required</span>
            </div>
          </div>
        </div>

        {/* Card 5: Pending Orders */}
        <div className="bg-[#0D141E] border border-[#1D2A3A] hover:border-[#5B9CF6]/40 rounded-2xl p-4 transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#7F8DA3]">Pending Orders</span>
            <div className="w-7 h-7 rounded-lg bg-[#5B9CF6]/15 flex items-center justify-center text-[#5B9CF6]">
              <ShoppingBag className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-xl font-bold font-mono text-[#F5F7FA]">18</div>
            <div className="flex items-center gap-1 text-[10px] text-[#5B9CF6] font-bold mt-1">
              <span>↑ 20%</span>
              <span className="text-[#7F8DA3] font-normal">Awaiting dispatch</span>
            </div>
          </div>
        </div>

        {/* Card 6: My Tasks */}
        <div className="bg-[#0D141E] border border-[#1D2A3A] hover:border-[#43C98B]/40 rounded-2xl p-4 transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#7F8DA3]">My Tasks</span>
            <div className="w-7 h-7 rounded-lg bg-[#43C98B]/15 flex items-center justify-center text-[#43C98B]">
              <CheckSquare className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="text-xl font-bold font-mono text-[#F5F7FA]">7</div>
            <div className="flex items-center gap-1 text-[10px] text-[#43C98B] font-bold mt-1">
              <span>↓ 30%</span>
              <span className="text-[#7F8DA3] font-normal">3 completed today</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. CHARTS ROW (Stock Movement + Inventory Status Donut) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Stock Movement Line/Area Chart */}
        <div className="lg:col-span-2 bg-[#0D141E] border border-[#1D2A3A] rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#F5F7FA]">Stock Movement</h2>
              <p className="text-xs text-[#7F8DA3]">Daily Stock In vs Stock Out velocity over the last 7 days</p>
            </div>

            <select className="bg-[#070B11] border border-[#1D2A3A] text-xs text-[#F5F7FA] font-semibold rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#E7B65A]">
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
            </select>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={movementData}>
                <defs>
                  <linearGradient id="inGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#43C98B" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#43C98B" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="outGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E7B65A" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#E7B65A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1D2A3A" opacity={0.6} />
                <XAxis dataKey="date" stroke="#7F8DA3" tick={{ fontSize: 11 }} />
                <YAxis stroke="#7F8DA3" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0D141E', borderColor: '#1D2A3A', borderRadius: '12px', color: '#fff' }} />
                <Area type="monotone" dataKey="stockIn" name="Stock In" stroke="#43C98B" strokeWidth={2.5} fillOpacity={1} fill="url(#inGrad)" />
                <Area type="monotone" dataKey="stockOut" name="Stock Out" stroke="#E7B65A" strokeWidth={2.5} fillOpacity={1} fill="url(#outGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Inventory Status Donut Chart */}
        <div className="bg-[#0D141E] border border-[#1D2A3A] rounded-2xl p-6 flex flex-col justify-between shadow-lg">
          <div>
            <h2 className="text-base font-bold text-[#F5F7FA]">Inventory Status</h2>
            <p className="text-xs text-[#7F8DA3]">Real-time item status breakdown</p>
          </div>

          <div className="h-44 relative my-2 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={inventoryStatusData} dataKey="value" cx="50%" cy="50%" innerRadius={55} outerRadius={78} paddingAngle={4}>
                  {inventoryStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0D141E', borderColor: '#1D2A3A', borderRadius: '12px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
              <span className="text-xl font-bold font-mono text-[#F5F7FA]">1,248</span>
              <span className="text-[10px] uppercase tracking-wider text-[#7F8DA3]">Total Items</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#1D2A3A]">
            {inventoryStatusData.map(item => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span className="text-[#7F8DA3]">{item.name}:</span>
                <span className="font-bold text-[#F5F7FA]">{item.value} ({item.pct})</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4. QUICK ACTIONS CARD */}
      <div className="bg-[#0D141E] border border-[#1D2A3A] rounded-2xl p-6 space-y-4 shadow-lg">
        <h2 className="text-base font-bold text-[#F5F7FA]">Quick Actions</h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Action 1: Receive Stock */}
          <button
            onClick={() => navigate('/operations/stock-in')}
            className="p-4 bg-[#111A26] border border-[#1D2A3A] hover:border-[#43C98B] rounded-xl flex items-center gap-3 text-left transition-all duration-200 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#43C98B]/15 text-[#43C98B] flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
              ↓
            </div>
            <div>
              <div className="text-xs font-bold text-[#F5F7FA]">Receive Stock</div>
              <div className="text-[10px] text-[#7F8DA3]">Stock In Workflows</div>
            </div>
          </button>

          {/* Action 2: Issue Stock */}
          <button
            onClick={() => navigate('/operations/stock-out')}
            className="p-4 bg-[#111A26] border border-[#1D2A3A] hover:border-[#E7B65A] rounded-xl flex items-center gap-3 text-left transition-all duration-200 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#E7B65A]/15 text-[#E7B65A] flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
              ↑
            </div>
            <div>
              <div className="text-xs font-bold text-[#F5F7FA]">Issue Stock</div>
              <div className="text-[10px] text-[#7F8DA3]">Dispatch Outbound</div>
            </div>
          </button>

          {/* Action 3: Create Transfer */}
          <button
            onClick={() => navigate('/transfers/create')}
            className="p-4 bg-[#111A26] border border-[#1D2A3A] hover:border-[#5B9CF6] rounded-xl flex items-center gap-3 text-left transition-all duration-200 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#5B9CF6]/15 text-[#5B9CF6] flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
              ⇄
            </div>
            <div>
              <div className="text-xs font-bold text-[#F5F7FA]">Create Transfer</div>
              <div className="text-[10px] text-[#7F8DA3]">Inter-Warehouse</div>
            </div>
          </button>

          {/* Action 4: Stock Count */}
          <button
            onClick={() => navigate('/reconciliation/physical-count')}
            className="p-4 bg-[#111A26] border border-[#1D2A3A] hover:border-[#E7B65A] rounded-xl flex items-center gap-3 text-left transition-all duration-200 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#E7B65A]/15 text-[#E7B65A] flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
              📋
            </div>
            <div>
              <div className="text-xs font-bold text-[#F5F7FA]">Stock Count</div>
              <div className="text-[10px] text-[#7F8DA3]">Physical Audit</div>
            </div>
          </button>
        </div>
      </div>

      {/* 5. TODAY'S TASKS & LOW STOCK ALERTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Today's Tasks (Left 65%) */}
        <div className="lg:col-span-2 bg-[#0D141E] border border-[#1D2A3A] rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#F5F7FA]">Today's Tasks</h2>
            <Link to="/tasks" className="text-xs font-bold text-[#E7B65A] hover:underline flex items-center gap-1">
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {tasksList.map(task => (
              <div 
                key={task.id}
                className="p-3.5 bg-[#111A26] border border-[#1D2A3A] rounded-xl flex items-center justify-between gap-3 text-xs hover:border-[#E7B65A]/40 transition-all"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="w-4 h-4 accent-[#E7B65A] rounded cursor-pointer"
                  />
                  <div>
                    <span className={`font-bold text-[#F5F7FA] block ${task.completed ? 'line-through opacity-70' : ''}`}>
                      {task.title}
                    </span>
                    <span className="text-[11px] text-[#7F8DA3]">{task.sub}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    task.priority === 'HIGH' ? 'bg-[#EF6461]/15 text-[#EF6461]' : 'bg-[#7F8DA3]/15 text-[#7F8DA3]'
                  }`}>
                    {task.priority}
                  </span>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                    task.status === 'DONE' ? 'bg-[#43C98B]/20 text-[#43C98B] border border-[#43C98B]/30' :
                    task.status === 'IN PROGRESS' ? 'bg-[#E7B65A]/20 text-[#E7B65A] border border-[#E7B65A]/30' :
                    'bg-[#5B9CF6]/20 text-[#5B9CF6] border border-[#5B9CF6]/30'
                  }`}>
                    {task.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts (Right 35%) */}
        <div className="bg-[#0D141E] border border-[#1D2A3A] rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#F5F7FA]">Low Stock Alerts</h2>
            <Link to="/inventory/low-stock" className="text-xs font-bold text-[#E7B65A] hover:underline flex items-center gap-1">
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {lowStockAlerts.map(alert => (
              <div key={alert.id} className="p-3 bg-[#111A26] border border-[#1D2A3A] rounded-xl flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-[#F5F7FA]">{alert.name}</div>
                  <div className="text-[11px] text-[#7F8DA3]">{alert.sku}</div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[#EF6461] text-xs">
                    {alert.qty} units
                  </span>
                  <button
                    onClick={() => navigate('/operations/stock-in')}
                    className="px-2.5 py-1 bg-[#E7B65A]/20 text-[#E7B65A] border border-[#E7B65A]/30 hover:bg-[#E7B65A] hover:text-[#070B11] font-bold rounded-lg text-[10px] transition-colors"
                  >
                    Restock
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
