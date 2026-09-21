import React from 'react';
import { useInventoryData } from '../../context/InventoryDataContext';
import { Warehouse as WarehouseIcon, Activity, PieChart, BarChart2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export const WarehouseCapacityPage = () => {
  const { warehouses } = useInventoryData();

  const totalCapacity = warehouses.reduce((s, w) => s + w.capacity, 0);
  const totalUtilization = warehouses.reduce((s, w) => s + w.utilization, 0);
  const totalAvailable = totalCapacity - totalUtilization;
  const overallPct = Math.round((totalUtilization / totalCapacity) * 100);

  const capacityChartData = warehouses.map(w => ({
    name: w.code,
    Used: w.utilization,
    Available: w.capacity - w.utilization,
    capacity: w.capacity
  }));

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-heading font-bold text-foreground">Warehouse Capacity & Utilization</h1>
        <p className="text-muted text-sm mt-1">Real-time volumetric allocation, available storage headroom, and load balances.</p>
      </div>

      {/* Network Capacity Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        <div className="bg-surface border border-border rounded-xl p-5">
          <span className="text-xs font-semibold text-muted uppercase tracking-wider">Total Network Capacity</span>
          <div className="text-2xl font-bold font-mono text-foreground mt-2">{totalCapacity.toLocaleString()} units</div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <span className="text-xs font-semibold text-muted uppercase tracking-wider">Current Allocated Stock</span>
          <div className="text-2xl font-bold font-mono text-primary mt-2">{totalUtilization.toLocaleString()} units</div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <span className="text-xs font-semibold text-muted uppercase tracking-wider">Available Storage Headroom</span>
          <div className="text-2xl font-bold font-mono text-success mt-2">{totalAvailable.toLocaleString()} units</div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5">
          <span className="text-xs font-semibold text-muted uppercase tracking-wider">Average Network Utilization</span>
          <div className="text-2xl font-bold font-mono text-warning mt-2">{overallPct}%</div>
        </div>
      </div>

      {/* Capacity Chart */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <h3 className="font-heading font-semibold text-foreground text-lg mb-2">Used vs. Available Headroom</h3>
        <p className="text-xs text-muted mb-6">Stacked capacity volume per regional facility (units)</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={capacityChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="name" stroke="#5A5D63" tick={{ fontSize: 12 }} />
              <YAxis stroke="#5A5D63" tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111720', borderColor: '#1E293B', color: '#F5F3EE' }}
                formatter={(value) => [`${value.toLocaleString()} units`]}
              />
              <Legend />
              <Bar dataKey="Used" fill="#D6A85F" stackId="a" radius={[0, 0, 0, 0]} />
              <Bar dataKey="Available" fill="#1E293B" stackId="a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Visual Capacity Gauges Table */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <h3 className="font-heading font-semibold text-foreground text-lg mb-4">Facility Capacity Breakdown</h3>
        <div className="space-y-6">
          {warehouses.map(w => {
            const avail = w.capacity - w.utilization;
            const pct = Math.round((w.utilization / w.capacity) * 100);
            return (
              <div key={w.id} className="bg-surface-elevated border border-border rounded-xl p-5 space-y-3">
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <div>
                    <h4 className="font-bold text-foreground text-base">{w.name} <span className="font-mono text-xs text-muted font-normal">({w.code})</span></h4>
                    <p className="text-xs text-muted">{w.location}</p>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-sm font-bold text-foreground">{w.utilization.toLocaleString()}</span>
                    <span className="text-xs text-muted"> / {w.capacity.toLocaleString()} units</span>
                    <span className={`ml-3 px-2.5 py-1 rounded text-xs font-bold ${
                      pct >= 85 ? 'bg-danger/10 text-danger' : pct >= 65 ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                    }`}>
                      {pct}% Used
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-3 bg-border rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      pct >= 85 ? 'bg-danger' : pct >= 65 ? 'bg-warning' : 'bg-success'
                    }`}
                    style={{ width: `${pct}%` }}
                  ></div>
                </div>

                <div className="flex justify-between text-xs text-muted font-mono pt-1">
                  <span>Available Storage: <strong className="text-success">{avail.toLocaleString()} units</strong></span>
                  <span>Max Capacity: <strong className="text-foreground">{w.capacity.toLocaleString()} units</strong></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
