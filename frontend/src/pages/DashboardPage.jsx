import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  TrendingUp, TrendingDown, Package, Warehouse, ShoppingCart, 
  AlertTriangle, Activity, DollarSign, Box, ShieldAlert, Clock,
  ArrowRightLeft, FileWarning, CheckCircle
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, 
  Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';

const mockOrderData = [
  { name: 'Jan', sales: 4000, purchases: 2400 },
  { name: 'Feb', sales: 3000, purchases: 1398 },
  { name: 'Mar', sales: 2000, purchases: 9800 },
  { name: 'Apr', sales: 2780, purchases: 3908 },
  { name: 'May', sales: 1890, purchases: 4800 },
  { name: 'Jun', sales: 2390, purchases: 3800 },
];

const mockCategoryData = [
  { name: 'Electronics', value: 400 },
  { name: 'Apparel', value: 300 },
  { name: 'Home & Garden', value: 300 },
  { name: 'Automotive', value: 200 },
];
const COLORS = ['#00e5b8', '#00b8ff', '#8b5cf6', '#f43f5e'];

const StatCard = ({ title, value, icon: Icon, trend, trendUp, subtitle, isWarning }) => (
  <div className={`bg-surface border p-6 rounded-xl transition-all border-t-2 ${isWarning ? 'border-t-danger border-border hover:border-danger' : 'border-t-primary border-border hover:border-primary'}`}>
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2 rounded-lg ${isWarning ? 'bg-danger/10 text-danger' : 'bg-primary/10 text-primary'}`}>
        <Icon className="w-5 h-5" />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md ${trendUp ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
          {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {trend}
        </div>
      )}
    </div>
    <div>
      <div className="text-3xl font-heading font-bold text-foreground mb-1">{value}</div>
      <div className="text-xs font-bold text-muted uppercase tracking-wider">{title}</div>
      {subtitle && <div className="text-[10px] text-muted mt-1">{subtitle}</div>}
    </div>
  </div>
);

export const DashboardPage = () => {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Command Center</h1>
          <p className="text-muted mt-1">Real-time ERP metrics, stock alerts, and financial overview.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-surface-elevated text-foreground px-4 py-2 rounded-lg text-sm font-semibold border border-border hover:bg-border transition-colors">Export Report</button>
          <button className="bg-primary text-background px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">Quick Action</button>
        </div>
      </div>

      {/* KPI Grid 1: Core Metrics */}
      <h3 className="text-sm font-bold text-muted uppercase tracking-wider border-b border-border pb-2 mt-8">Core Inventory Metrics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Inventory Value" value="$1.24M" icon={DollarSign} trend="+12%" trendUp={true} subtitle="Across all 4 warehouses" />
        <StatCard title="Total Physical Units" value="45,892" icon={Package} trend="+5.2%" trendUp={true} subtitle="Available & Reserved" />
        <StatCard title="Active Warehouses" value="4" icon={Warehouse} />
        <StatCard title="Total Product SKUs" value="1,204" icon={Box} trend="+24" trendUp={true} />
      </div>

      {/* KPI Grid 2: Stock Status */}
      <h3 className="text-sm font-bold text-muted uppercase tracking-wider border-b border-border pb-2 mt-8">Stock Health & Alerts</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Available Stock" value="38,400" icon={CheckCircle} />
        <StatCard title="Reserved (Orders)" value="5,102" icon={ShoppingCart} />
        <StatCard title="Low Stock Items" value="42" icon={AlertTriangle} isWarning={true} subtitle="Below reorder point" />
        <StatCard title="Out of Stock" value="12" icon={ShieldAlert} isWarning={true} subtitle="Zero quantity available" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-surface border border-border p-6 rounded-xl">
          <h2 className="text-sm font-bold text-muted uppercase tracking-wider mb-6 flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" /> Stock Movement (6 Months)
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockOrderData} margin={{ top: 5, right: 0, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00e5b8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00e5b8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPurchases" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '8px' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Area type="monotone" dataKey="sales" name="Stock Out (Sales)" stroke="#00e5b8" fillOpacity={1} fill="url(#colorSales)" strokeWidth={2} />
                <Area type="monotone" dataKey="purchases" name="Stock In (Purchases)" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorPurchases)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Category Breakdown */}
        <div className="bg-surface border border-border p-6 rounded-xl flex flex-col">
          <h2 className="text-sm font-bold text-muted uppercase tracking-wider mb-6">Inventory by Category</h2>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={mockCategoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                  {mockCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '8px' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: 'var(--text-muted)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Actionable Alerts Table */}
      <div className="bg-surface border border-border rounded-xl mt-8 overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-surface-elevated/30">
          <h2 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-danger" /> Pending Action Required
          </h2>
          <button className="text-xs font-bold text-primary hover:underline uppercase tracking-wider">View All</button>
        </div>
        <div className="divide-y divide-border">
          {[
            { id: 'REC-992', type: 'Reconciliation', msg: 'Mismatch detected in Warehouse A (Shortage: 5 units)', time: '10m ago', priority: 'High' },
            { id: 'TRN-402', type: 'Transfer', msg: 'Transfer TRN-402 is delayed by 2 days', time: '1h ago', priority: 'Medium' },
            { id: 'PO-109', type: 'Procurement', msg: 'Purchase Order PO-109 requires Manager Approval', time: '2h ago', priority: 'High' },
          ].map((alert, i) => (
            <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-surface-elevated/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${alert.priority === 'High' ? 'bg-danger shadow-[0_0_8px_rgba(244,63,94,0.6)]' : 'bg-warning shadow-[0_0_8px_rgba(234,179,8,0.6)]'}`}></div>
                <div>
                  <div className="text-sm font-medium text-foreground">{alert.msg}</div>
                  <div className="text-xs text-muted font-mono mt-1">{alert.id} • {alert.type} • {alert.time}</div>
                </div>
              </div>
              <button className="px-3 py-1.5 bg-surface border border-border hover:bg-border rounded text-xs font-bold uppercase tracking-wider transition-colors">Resolve</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
