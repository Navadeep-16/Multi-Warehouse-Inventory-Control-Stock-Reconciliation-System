import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventoryData } from '../context/InventoryDataContext';

export default function SmartInventoryPage() {
  const navigate = useNavigate();
  const { products } = useInventoryData();

  const fastMoving = products.filter(p => p.stock > 100);
  const lowStockPred = products.filter(p => p.stock <= 20);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-muted mb-1">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span>/</span>
          <span className="text-primary font-medium">Smart Inventory</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">AI & Smart Inventory Intelligence</h1>
          <p className="text-sm text-muted">Machine learning demand forecasting, auto-reorder recommendations, and overstock risk detection.</p>
        </div>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-surface border border-border rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted font-semibold uppercase">Demand Velocity Predictor</span>
            <span className="text-primary font-bold text-xs">⚡ Live AI</span>
          </div>
          <p className="text-2xl font-extrabold text-foreground">+34.8% YoY</p>
          <p className="text-xs text-muted">Projected stock demand increase for Q4 enterprise desktop setups.</p>
        </div>

        <div className="p-5 bg-surface border border-border rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted font-semibold uppercase">Suggested Reorder Window</span>
            <span className="text-warning font-bold text-xs">⚠️ Action Needed</span>
          </div>
          <p className="text-2xl font-extrabold text-warning">3 Days</p>
          <p className="text-xs text-muted">Recommended reorder lead time to prevent stockout on 2 critical SKUs.</p>
        </div>

        <div className="p-5 bg-surface border border-border rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted font-semibold uppercase">Overstock Idle Capital</span>
            <span className="text-muted font-bold text-xs">ℹ️ Efficiency</span>
          </div>
          <p className="text-2xl font-extrabold text-foreground">$48,200</p>
          <p className="text-xs text-muted">Capital locked in mouse peripherals with over 90 days turnover.</p>
        </div>
      </div>

      {/* AI Recommendations Table */}
      <div className="bg-surface border border-border rounded-2xl p-6 space-y-4 shadow-xl">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <span>🧠</span> Intelligent Stock Optimization Recommendations
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-surface-elevated/70 border-b border-border text-muted uppercase font-semibold">
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Current Stock</th>
                <th className="py-3 px-4">Depletion Rate</th>
                <th className="py-3 px-4">AI Suggested Reorder Qty</th>
                <th className="py-3 px-4">Suggested Date</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {lowStockPred.map(prod => (
                <tr key={prod.id} className="hover:bg-surface-elevated/40 transition">
                  <td className="py-3.5 px-4 font-bold text-foreground">{prod.name}</td>
                  <td className="py-3.5 px-4 text-muted">{prod.category}</td>
                  <td className="py-3.5 px-4 font-bold text-warning">{prod.stock} units</td>
                  <td className="py-3.5 px-4 text-muted">4.2 units/day</td>
                  <td className="py-3.5 px-4 font-bold text-primary">+50 units</td>
                  <td className="py-3.5 px-4 text-foreground">Sep 24, 2026</td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => navigate('/procurement/purchase-orders')}
                      className="px-3 py-1 bg-primary text-surface-dark font-semibold rounded-lg text-[10px] shadow hover:bg-primary-hover transition"
                    >
                      Generate PO
                    </button>
                  </td>
                </tr>
              ))}
              {fastMoving.slice(0, 2).map(prod => (
                <tr key={prod.id} className="hover:bg-surface-elevated/40 transition">
                  <td className="py-3.5 px-4 font-bold text-foreground">{prod.name}</td>
                  <td className="py-3.5 px-4 text-muted">{prod.category}</td>
                  <td className="py-3.5 px-4 font-bold text-success">{prod.stock} units</td>
                  <td className="py-3.5 px-4 text-muted">12.5 units/day</td>
                  <td className="py-3.5 px-4 font-bold text-primary">+150 units</td>
                  <td className="py-3.5 px-4 text-foreground">Oct 02, 2026</td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => navigate('/procurement/purchase-orders')}
                      className="px-3 py-1 bg-surface-elevated border border-border text-foreground hover:border-primary rounded-lg text-[10px] transition"
                    >
                      Schedule PO
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
