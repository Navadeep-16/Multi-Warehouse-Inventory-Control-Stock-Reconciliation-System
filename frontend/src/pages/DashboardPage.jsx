import React from 'react';
import { useInventoryData } from '../context/InventoryDataContext';
import { useAuth } from '../context/AuthContext';
import { 
  DollarSign, Package, Warehouse, AlertTriangle, XCircle, 
  ArrowRightLeft, ShoppingBag, TrendingUp, Activity, ArrowUpRight, ArrowDownRight, Layers,
  QrCode, CheckSquare, Clock, ShieldCheck, UserCheck, RefreshCw
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';
import { Link } from 'react-router-dom';

export const DashboardPage = () => {
  const { user, switchRole } = useAuth();
  const { inventoryItems, warehouses, products, transfers, purchaseOrders, orders, stockOperations } = useInventoryData();

  const isStaff = user?.role?.toUpperCase() === 'STAFF';

  // Metrics calculations
  const totalValue = inventoryItems.reduce((acc, item) => acc + (item.available * item.unitCost), 0);
  const lowStockItems = inventoryItems.filter(i => i.available > 0 && i.available <= i.reorder);
  const outOfStockItems = inventoryItems.filter(i => i.available === 0);
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

  if (isStaff) {
    // ----------------------------------------------------
    // STAFF DASHBOARD VIEW
    // ----------------------------------------------------
    return (
      <div className="space-y-8 pb-12 animate-in fade-in duration-300">
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/20 text-primary border border-primary/30 uppercase tracking-widest">
                STAFF OPERATIONS ROLE
              </span>
              <button
                onClick={() => switchRole('MANAGER')}
                className="text-xs text-muted hover:text-foreground underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Switch to Manager Dashboard
              </button>
            </div>
            <h1 className="text-3xl font-heading font-bold text-foreground tracking-tight">Staff Operations Dashboard</h1>
            <p className="text-muted text-sm mt-1">Daily receiving, dispatch orders, stock lookups, and warehouse shelf counts.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/barcode-qr" className="bg-primary text-background px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent transition-colors flex items-center gap-2 shadow">
              <QrCode className="w-4 h-4" /> Scan Barcode / Lookup
            </Link>
            <Link to="/operations/stock-in" className="bg-surface-elevated text-foreground px-4 py-2 rounded-lg text-sm font-semibold border border-border hover:border-primary/50 transition-colors flex items-center gap-2">
              <Activity className="w-4 h-4 text-success" /> Receive Stock (In)
            </Link>
          </div>
        </div>

        {/* Staff Quick Action Hub */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/operations/stock-in" className="p-5 bg-surface border border-border rounded-xl hover:border-primary/50 transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted uppercase">Stock Inbound</span>
              <span className="p-2 bg-success/20 text-success rounded-lg group-hover:scale-110 transition-transform">↓</span>
            </div>
            <p className="text-xl font-bold text-foreground mt-2">Receive Shipment</p>
            <p className="text-xs text-muted mt-1">Log supplier purchase deliveries</p>
          </Link>

          <Link to="/operations/stock-out" className="p-5 bg-surface border border-border rounded-xl hover:border-primary/50 transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted uppercase">Stock Issue</span>
              <span className="p-2 bg-warning/20 text-warning rounded-lg group-hover:scale-110 transition-transform">↑</span>
            </div>
            <p className="text-xl font-bold text-foreground mt-2">Dispatch Order</p>
            <p className="text-xs text-muted mt-1">Dispatch items for customer orders</p>
          </Link>

          <Link to="/reconciliation/physical-count" className="p-5 bg-surface border border-border rounded-xl hover:border-primary/50 transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted uppercase">Shelf Audit</span>
              <span className="p-2 bg-primary/20 text-primary rounded-lg group-hover:scale-110 transition-transform">📋</span>
            </div>
            <p className="text-xl font-bold text-foreground mt-2">Physical Stock Count</p>
            <p className="text-xs text-muted mt-1">Record zone & rack physical counts</p>
          </Link>

          <Link to="/barcode-qr" className="p-5 bg-surface border border-border rounded-xl hover:border-primary/50 transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted uppercase">Barcode Station</span>
              <span className="p-2 bg-surface-elevated text-foreground rounded-lg group-hover:scale-110 transition-transform">🏷️</span>
            </div>
            <p className="text-xl font-bold text-foreground mt-2">Print & Scan Labels</p>
            <p className="text-xs text-muted mt-1">Verify SKU tags and print barcode stickers</p>
          </Link>
        </div>

        {/* Staff Duty & Task Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Tasks */}
          <div className="lg:col-span-2 bg-surface border border-border rounded-xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-primary" /> Daily Shift Tasks & Work Queue
              </h2>
              <span className="text-xs text-success font-semibold">3 / 5 Tasks Completed</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-surface-elevated rounded-lg border border-border/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
                  <div>
                    <span className="font-semibold text-foreground block">Receive PO-2026-8803 Shipment</span>
                    <span className="text-muted">Supplier: Logitech B2B (WH-EAST)</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-success/20 text-success rounded text-[10px]">DONE</span>
              </div>

              <div className="p-3 bg-surface-elevated rounded-lg border border-border/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
                  <div>
                    <span className="font-semibold text-foreground block">Dispatch Order #ORD-2026-9003</span>
                    <span className="text-muted">5x Dell UltraSharp 32" (WH-WEST)</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-success/20 text-success rounded text-[10px]">DONE</span>
              </div>

              <div className="p-3 bg-surface-elevated rounded-lg border border-border/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4 accent-primary" />
                  <div>
                    <span className="font-semibold text-foreground block">Zone A Physical Stock Count Audit</span>
                    <span className="text-muted">Verify MacBook Pro 16" count on Rack A4</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-warning/20 text-warning rounded text-[10px]">IN PROGRESS</span>
              </div>

              <div className="p-3 bg-surface-elevated rounded-lg border border-border/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4 accent-primary" />
                  <div>
                    <span className="font-semibold text-foreground block">Print Replacement Barcode Stickers</span>
                    <span className="text-muted">Keychron Mechanical Keyboards shelf bin</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-surface-elevated text-muted rounded text-[10px]">PENDING</span>
              </div>
            </div>
          </div>

          {/* Urgent Stock Action Items */}
          <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" /> Low Stock & Restock Queue
            </h2>

            <div className="space-y-3">
              {lowStockItems.length === 0 && outOfStockItems.length === 0 ? (
                <p className="text-xs text-muted">All stock levels healthy.</p>
              ) : (
                [...outOfStockItems, ...lowStockItems].map(item => (
                  <div key={item.id} className="p-3 bg-surface-elevated rounded-lg border border-border/50 text-xs flex justify-between items-center">
                    <div>
                      <span className="font-bold text-foreground block">{item.name}</span>
                      <span className="text-muted text-[11px]">{item.warehouse} • SKU: {item.sku}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.available === 0 ? 'bg-danger/20 text-danger' : 'bg-warning/20 text-warning'
                    }`}>
                      {item.available} units
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // EXECUTIVE MANAGER DASHBOARD VIEW
  // ----------------------------------------------------
  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/20 text-primary border border-primary/30 uppercase tracking-widest">
              MANAGER / ADMIN ROLE
            </span>
            <button
              onClick={() => switchRole('STAFF')}
              className="text-xs text-muted hover:text-foreground underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Switch to Staff Dashboard
            </button>
          </div>
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
            <div className="flex items-center gap-1 text-xs text-success font-medium mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+12.4% vs last month</span>
            </div>
          </div>
        </div>

        {/* Total Warehouses */}
        <div className="bg-surface border border-border rounded-xl p-5 hover:border-primary/40 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted uppercase tracking-wider">Total Warehouses</span>
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <Warehouse className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-mono text-foreground">{warehouses.length} Active Hubs</div>
            <div className="text-xs text-muted mt-1">Global logisitic coverage</div>
          </div>
        </div>

        {/* Low Stock Items */}
        <Link to="/inventory/low-stock" className="bg-surface border border-border rounded-xl p-5 hover:border-warning/40 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted uppercase tracking-wider">Low Stock Alerts</span>
            <div className="w-9 h-9 rounded-lg bg-warning/10 flex items-center justify-center text-warning group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-mono text-warning">{lowStockItems.length} SKUs</div>
            <div className="text-xs text-muted mt-1">Below reorder threshold</div>
          </div>
        </Link>

        {/* Pending Transfers */}
        <Link to="/transfers/pending" className="bg-surface border border-border rounded-xl p-5 hover:border-primary/40 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted uppercase tracking-wider">Pending Transfers</span>
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-mono text-foreground">{pendingTransfersCount} Requests</div>
            <div className="text-xs text-muted mt-1">Awaiting approval</div>
          </div>
        </Link>
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Valuation Trend Chart */}
        <div className="lg:col-span-2 bg-surface border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-foreground">Inventory Valuation Trend</h3>
              <p className="text-xs text-muted">6-month total asset valuation progression across facilities</p>
            </div>
            <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">Monthly</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="valGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D6A85F" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#D6A85F" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="month" stroke="#64748B" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748B" tick={{ fontSize: 11 }} tickFormatter={(val) => `$${val / 1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: '#111720', borderColor: '#1E293B', borderRadius: '12px', color: '#fff' }} />
                <Area type="monotone" dataKey="valuation" stroke="#D6A85F" strokeWidth={2.5} fillOpacity={1} fill="url(#valGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Warehouse Capacity Overview */}
        <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-foreground">Warehouse Utilization</h3>
            <Link to="/warehouses" className="text-xs text-primary hover:underline font-semibold">View All</Link>
          </div>

          <div className="space-y-4">
            {warehouses.map(wh => {
              const pct = Math.round((wh.utilization / wh.capacity) * 100);
              return (
                <div key={wh.id} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-foreground">{wh.code} ({wh.name.split(' ')[0]})</span>
                    <span className="text-muted">{pct}% ({wh.utilization.toLocaleString()} / {wh.capacity.toLocaleString()})</span>
                  </div>
                  <div className="w-full bg-surface-elevated h-2 rounded-full overflow-hidden border border-border">
                    <div 
                      className={`h-full transition-all ${pct > 80 ? 'bg-danger' : pct > 60 ? 'bg-warning' : 'bg-primary'}`} 
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity & Low Stock Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Stock Movements */}
        <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-foreground">Recent Stock Operations</h3>
            <Link to="/inventory" className="text-xs text-primary hover:underline font-semibold">Full Activity Log</Link>
          </div>

          <div className="divide-y divide-border/60">
            {stockOperations.slice(0, 4).map(op => (
              <div key={op.id} className="py-3 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="font-bold text-foreground">{op.product}</div>
                  <div className="text-muted text-[11px]">{op.type} • {op.warehouse} • {op.date}</div>
                </div>
                <span className={`font-mono font-bold px-2 py-1 rounded ${
                  op.type === 'Stock In' ? 'bg-success/20 text-success' : op.type === 'Stock Out' ? 'bg-warning/20 text-warning' : 'bg-primary/20 text-primary'
                }`}>
                  {op.type === 'Stock In' ? `+${op.quantity}` : `-${op.quantity}`} units
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Items List */}
        <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-foreground">Low Stock Restock Alerts</h3>
            <Link to="/inventory/low-stock" className="text-xs text-primary hover:underline font-semibold">View All ({lowStockItems.length})</Link>
          </div>

          <div className="divide-y divide-border/60">
            {lowStockItems.length === 0 ? (
              <p className="text-xs text-muted py-4">No products are currently low in stock.</p>
            ) : (
              lowStockItems.slice(0, 4).map(item => (
                <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-foreground">{item.name}</div>
                    <div className="text-muted text-[11px]">{item.warehouse} • Reorder level: {item.reorder} units</div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-warning block">{item.available} available</span>
                    <Link to="/procurement/purchase-orders" className="text-[10px] text-primary hover:underline">Create PO →</Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
