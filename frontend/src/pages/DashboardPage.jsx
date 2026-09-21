import React from 'react';
import { useInventoryData } from '../context/InventoryDataContext';
import { 
  DollarSign, Package, Warehouse, AlertTriangle, XCircle, 
  ArrowRightLeft, ShoppingBag, TrendingUp, Activity, ArrowUpRight, ArrowDownRight, Layers
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';
import { Link } from 'react-router-dom';

export const DashboardPage = () => {
  const { inventoryItems, warehouses, products, transfers, purchaseOrders, orders, stockOperations } = useInventoryData();

  // Metrics calculations
  const totalValue = inventoryItems.reduce((acc, item) => acc + (item.available * item.unitCost), 0);
  const lowStockCount = inventoryItems.filter(i => i.available > 0 && i.available <= i.reorder).length;
  const outOfStockCount = inventoryItems.filter(i => i.available === 0).length;
  const pendingTransfersCount = transfers.filter(t => t.status === 'Pending').length;
  const pendingPOCount = purchaseOrders.filter(p => p.status === 'Pending').length;

  const chartData = [
    { month: 'Apr', valuation: 420000, movement: 1240 },
    { month: 'May', valuation: 450000, movement: 1380 },
    { month: 'Jun', valuation: 480000, movement: 1520 },
    { month: 'Jul', valuation: 510000, movement: 1410 },
    { month: 'Aug', valuation: 540000, movement: 1680 },
    { month: 'Sep', valuation: totalValue || 590000, movement: 1890 },
  ];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground tracking-tight">Executive Dashboard</h1>
          <p className="text-muted text-sm mt-1">Real-time multi-warehouse inventory control & stock reconciliation overview.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/operations/stock-in" className="bg-primary text-background px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent transition-colors flex items-center gap-2">
            <Activity className="w-4 h-4" /> Receive Stock
          </Link>
          <Link to="/transfers/create" className="bg-surface-elevated text-foreground px-4 py-2 rounded-lg text-sm font-semibold border border-border hover:border-primary/50 transition-colors flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4" /> Transfer Stock
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Inventory Value */}
        <div className="bg-surface border border-border rounded-xl p-5 hover:border-primary/40 transition-all group relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted uppercase tracking-wider">Inventory Value</span>
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-mono text-foreground">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <div className="flex items-center gap-1 text-xs text-success mt-2">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span className="font-semibold">+8.4%</span>
              <span className="text-muted ml-1">vs last month</span>
            </div>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-surface border border-border rounded-xl p-5 hover:border-primary/40 transition-all group relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted uppercase tracking-wider">Total Products</span>
            <div className="w-9 h-9 rounded-lg bg-info/10 flex items-center justify-center text-info group-hover:scale-110 transition-transform">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-mono text-foreground">{products.length}</div>
            <div className="text-xs text-muted mt-2">Catalog SKUs active</div>
          </div>
        </div>

        {/* Low Stock Items */}
        <div className="bg-surface border border-border rounded-xl p-5 hover:border-warning/40 transition-all group relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted uppercase tracking-wider">Low Stock Alerts</span>
            <div className="w-9 h-9 rounded-lg bg-warning/10 flex items-center justify-center text-warning group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-mono text-warning">{lowStockCount}</div>
            <Link to="/inventory/low-stock" className="text-xs text-warning hover:underline mt-2 inline-block font-medium">View low-stock items →</Link>
          </div>
        </div>

        {/* Out of Stock Items */}
        <div className="bg-surface border border-border rounded-xl p-5 hover:border-danger/40 transition-all group relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted uppercase tracking-wider">Out of Stock</span>
            <div className="w-9 h-9 rounded-lg bg-danger/10 flex items-center justify-center text-danger group-hover:scale-110 transition-transform">
              <XCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-mono text-danger">{outOfStockCount}</div>
            <Link to="/inventory/out-of-stock" className="text-xs text-danger hover:underline mt-2 inline-block font-medium">View out-of-stock →</Link>
          </div>
        </div>
      </div>

      {/* Secondary Operational Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-surface-elevated/40 border border-border rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Warehouse className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">{warehouses.length} Active Warehouses</div>
            <div className="text-xs text-muted">Across 4 geographical regions</div>
          </div>
        </div>

        <div className="bg-surface-elevated/40 border border-border rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center text-info shrink-0">
            <ArrowRightLeft className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">{pendingTransfersCount} Pending Transfers</div>
            <Link to="/transfers/pending" className="text-xs text-info hover:underline font-medium">Review pending approvals</Link>
          </div>
        </div>

        <div className="bg-surface-elevated/40 border border-border rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center text-success shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">{pendingPOCount} Pending Purchase Orders</div>
            <Link to="/procurement/purchase-orders" className="text-xs text-success hover:underline font-medium">Track procurement POs</Link>
          </div>
        </div>
      </div>

      {/* Recharts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Valuation Trend */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-heading font-semibold text-foreground text-lg">Inventory Valuation Trend</h3>
              <p className="text-xs text-muted mt-0.5">Asset value valuation across all warehouse nodes ($)</p>
            </div>
            <span className="text-xs font-mono text-primary bg-primary/10 px-2.5 py-1 rounded-full">USD ($)</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D6A85F" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#D6A85F" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="month" stroke="#5A5D63" tick={{ fontSize: 12 }} />
                <YAxis stroke="#5A5D63" tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111720', borderColor: '#1E293B', color: '#F5F3EE' }}
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Valuation']}
                />
                <Area type="monotone" dataKey="valuation" stroke="#D6A85F" strokeWidth={2} fillOpacity={1} fill="url(#colorVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stock Movement Velocity */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-heading font-semibold text-foreground text-lg">Stock Movement Velocity</h3>
              <p className="text-xs text-muted mt-0.5">Units received, issued & transferred per month</p>
            </div>
            <span className="text-xs font-mono text-info bg-info/10 px-2.5 py-1 rounded-full">Units</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="month" stroke="#5A5D63" tick={{ fontSize: 12 }} />
                <YAxis stroke="#5A5D63" tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111720', borderColor: '#1E293B', color: '#F5F3EE' }}
                  formatter={(value) => [`${value} units`, 'Movement']}
                />
                <Bar dataKey="movement" fill="#7B93AD" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Warehouse Utilization Overview */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-heading font-semibold text-foreground text-lg">Warehouse Utilization</h3>
            <p className="text-xs text-muted mt-0.5">Storage capacity and current allocation across regional hubs</p>
          </div>
          <Link to="/warehouses/capacity" className="text-xs text-primary hover:underline font-semibold">View capacity details →</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {warehouses.map(wh => {
            const pct = Math.round((wh.utilization / wh.capacity) * 100);
            return (
              <div key={wh.id} className="bg-surface-elevated border border-border rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{wh.code}</h4>
                    <p className="text-xs text-muted">{wh.name}</p>
                  </div>
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    pct >= 85 ? 'bg-danger/10 text-danger' : pct >= 65 ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                  }`}>
                    {pct}%
                  </span>
                </div>
                
                {/* Progress bar */}
                <div className="w-full h-2 bg-border rounded-full overflow-hidden my-3">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      pct >= 85 ? 'bg-danger' : pct >= 65 ? 'bg-warning' : 'bg-success'
                    }`}
                    style={{ width: `${pct}%` }}
                  ></div>
                </div>

                <div className="flex justify-between text-[11px] font-mono text-muted">
                  <span>Used: {wh.utilization.toLocaleString()}</span>
                  <span>Cap: {wh.capacity.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Stock Operations */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-foreground text-base">Recent Stock Operations</h3>
            <Link to="/operations/stock-in" className="text-xs text-primary hover:underline font-semibold">View all</Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-muted border-b border-border uppercase font-semibold text-[10px]">
                <tr>
                  <th className="py-2.5">Ref #</th>
                  <th className="py-2.5">Type</th>
                  <th className="py-2.5">Warehouse</th>
                  <th className="py-2.5">Qty</th>
                  <th className="py-2.5 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {stockOperations.slice(0, 5).map(op => (
                  <tr key={op.id} className="hover:bg-surface-elevated/40">
                    <td className="py-3 font-mono font-semibold text-foreground">{op.reference}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        op.type === 'Stock In' ? 'bg-success/10 text-success' :
                        op.type === 'Stock Out' ? 'bg-danger/10 text-danger' : 'bg-warning/10 text-warning'
                      }`}>
                        {op.type}
                      </span>
                    </td>
                    <td className="py-3 font-mono text-muted">{op.warehouse}</td>
                    <td className="py-3 font-mono font-bold">{op.quantity > 0 ? `+${op.quantity}` : op.quantity}</td>
                    <td className="py-3 text-right text-muted font-mono">{op.date.split(' ')[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-foreground text-base">Recent Orders</h3>
            <Link to="/orders" className="text-xs text-primary hover:underline font-semibold">View orders</Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-muted border-b border-border uppercase font-semibold text-[10px]">
                <tr>
                  <th className="py-2.5">Order #</th>
                  <th className="py-2.5">Customer</th>
                  <th className="py-2.5">Total</th>
                  <th className="py-2.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.slice(0, 5).map(ord => (
                  <tr key={ord.id} className="hover:bg-surface-elevated/40">
                    <td className="py-3 font-mono font-semibold text-foreground">{ord.orderNumber}</td>
                    <td className="py-3 text-muted truncate max-w-[120px]">{ord.customer}</td>
                    <td className="py-3 font-mono text-foreground">${ord.total.toLocaleString()}</td>
                    <td className="py-3 text-right">
                      <span className="bg-info/10 text-info px-2 py-0.5 rounded text-[10px] font-bold">
                        {ord.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
