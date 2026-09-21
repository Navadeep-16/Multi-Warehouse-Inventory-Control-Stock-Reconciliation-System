import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell
} from 'recharts';

export default function AnalyticsPage() {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState('30D');

  const turnoverData = [
    { month: 'May', turnover: 4.2, agingDays: 42, stockOutRate: 1.8 },
    { month: 'Jun', turnover: 4.8, agingDays: 38, stockOutRate: 1.2 },
    { month: 'Jul', turnover: 5.1, agingDays: 34, stockOutRate: 0.9 },
    { month: 'Aug', turnover: 5.9, agingDays: 29, stockOutRate: 0.6 },
    { month: 'Sep', turnover: 6.4, agingDays: 26, stockOutRate: 0.4 }
  ];

  const warehouseUtilizationData = [
    { warehouse: 'WH-EAST', used: 34200, capacity: 50000 },
    { warehouse: 'WH-WEST', used: 58900, capacity: 75000 },
    { warehouse: 'WH-NORTH', used: 18400, capacity: 40000 },
    { warehouse: 'WH-SOUTH', used: 49200, capacity: 60000 }
  ];

  const categoryDistribution = [
    { name: 'Electronics', value: 45, color: '#D6A85F' },
    { name: 'Accessories', value: 25, color: '#3B82F6' },
    { name: 'Storage', value: 18, color: '#10B981' },
    { name: 'Furniture', value: 12, color: '#F59E0B' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-muted mb-1">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span>/</span>
          <span className="text-primary font-medium">Analytics</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Executive Inventory Analytics</h1>
            <p className="text-sm text-muted">Stock turnover ratios, inventory aging, fulfillment velocity, and warehouse load trends.</p>
          </div>
          <div className="flex gap-2">
            {['7D', '30D', '90D', 'YTD'].map(tf => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  timeframe === tf
                    ? 'bg-primary text-surface-dark shadow'
                    : 'bg-surface border border-border text-muted hover:text-foreground'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Turnover Ratio & Stock Aging */}
        <div className="p-6 bg-surface border border-border rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-foreground">Stock Turnover & Aging Trends</h3>
            <span className="text-xs text-primary font-medium">Annualized Ratio</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={turnoverData}>
                <defs>
                  <linearGradient id="turnoverGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D6A85F" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#D6A85F" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="month" stroke="#64748B" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748B" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#111720', borderColor: '#1E293B', borderRadius: '12px', color: '#fff' }}
                />
                <Area type="monotone" dataKey="turnover" stroke="#D6A85F" strokeWidth={2.5} fillOpacity={1} fill="url(#turnoverGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Warehouse Storage Utilization */}
        <div className="p-6 bg-surface border border-border rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-foreground">Warehouse Capacity vs Utilization</h3>
            <span className="text-xs text-muted">Units Count</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={warehouseUtilizationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="warehouse" stroke="#64748B" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748B" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#111720', borderColor: '#1E293B', borderRadius: '12px', color: '#fff' }} />
                <Bar dataKey="capacity" fill="#1E293B" radius={[6, 6, 0, 0]} />
                <Bar dataKey="used" fill="#D6A85F" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Category Share & Fulfillment Velocity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Share */}
        <div className="p-6 bg-surface border border-border rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-foreground">Category Asset Distribution</h3>
          <div className="h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryDistribution} dataKey="value" cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4}>
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#111720', borderColor: '#1E293B', borderRadius: '12px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs pt-2">
            {categoryDistribution.map(cat => (
              <div key={cat.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }}></span>
                <span className="text-muted">{cat.name}:</span>
                <span className="font-bold text-foreground">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Fulfillment Velocity */}
        <div className="lg:col-span-2 p-6 bg-surface border border-border rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-foreground">Stock Out Deficit Trend (% Rate)</h3>
            <span className="text-xs text-success font-semibold">↓ Decreasing Stockout Rate</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={turnoverData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="month" stroke="#64748B" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748B" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#111720', borderColor: '#1E293B', borderRadius: '12px', color: '#fff' }} />
                <Line type="monotone" dataKey="stockOutRate" stroke="#EF4444" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
