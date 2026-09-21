import React from 'react';
import { useInventoryData } from '../../context/InventoryDataContext';
import { DollarSign, Download, PieChart as PieChartIcon, BarChart3, TrendingUp, Layers } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

export const InventoryValuationPage = () => {
  const { inventoryItems, warehouses, categories, addToast } = useInventoryData();

  // Metrics
  const totalCostValuation = inventoryItems.reduce((sum, item) => sum + (item.available * item.unitCost), 0);
  const totalRetailValuation = inventoryItems.reduce((sum, item) => sum + (item.available * item.unitPrice), 0);
  const totalMargin = totalRetailValuation - totalCostValuation;
  const marginPct = totalCostValuation > 0 ? ((totalMargin / totalCostValuation) * 100).toFixed(1) : '0';

  // Warehouse breakdown
  const warehouseValuation = warehouses.map(wh => {
    const items = inventoryItems.filter(i => i.warehouse === wh.code);
    const cost = items.reduce((s, i) => s + (i.available * i.unitCost), 0);
    const retail = items.reduce((s, i) => s + (i.available * i.unitPrice), 0);
    return {
      name: wh.code,
      cost,
      retail,
      margin: retail - cost
    };
  });

  // Category breakdown
  const categoryValuation = categories.map(cat => {
    const items = inventoryItems.filter(i => i.category === cat.name);
    const cost = items.reduce((s, i) => s + (s.available * i.unitCost), 0) || items.reduce((s, i) => s + (i.available * i.unitCost), 0);
    return {
      name: cat.name,
      value: cost
    };
  });

  const COLORS = ['#D6A85F', '#7B93AD', '#6FAF8F', '#C89A52', '#C86B67'];

  const exportReport = () => {
    const headers = 'Warehouse,Cost Valuation,Retail Valuation,Expected Margin\n';
    const rows = warehouseValuation.map(w => `"${w.name}",${w.cost.toFixed(2)},${w.retail.toFixed(2)},${w.margin.toFixed(2)}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory_valuation_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    addToast('Valuation Report Exported successfully!');
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Inventory Valuation Analysis</h1>
          <p className="text-muted text-sm mt-1">Financial breakdown of stock assets, cost basis, retail market value, and margin yield.</p>
        </div>
        <button 
          onClick={exportReport}
          className="bg-primary text-background px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent transition-colors flex items-center gap-2"
        >
          <Download className="w-4 h-4" /> Export Valuation Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-surface border border-border rounded-xl p-6">
          <span className="text-xs font-semibold text-muted uppercase tracking-wider">Total Cost Basis</span>
          <div className="text-3xl font-bold font-mono text-primary mt-2">
            ${totalCostValuation.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-muted mt-2">Total procurement asset value</p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
          <span className="text-xs font-semibold text-muted uppercase tracking-wider">Estimated Retail Market Value</span>
          <div className="text-3xl font-bold font-mono text-foreground mt-2">
            ${totalRetailValuation.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-muted mt-2">Potential gross revenue</p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
          <span className="text-xs font-semibold text-muted uppercase tracking-wider">Projected Gross Margin</span>
          <div className="text-3xl font-bold font-mono text-success mt-2">
            ${totalMargin.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-success mt-2 font-semibold">+{marginPct}% average markup</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Warehouse Valuation Chart */}
        <div className="lg:col-span-2 bg-surface border border-border rounded-xl p-6">
          <h3 className="font-heading font-semibold text-foreground text-lg mb-2">Warehouse Cost vs. Retail Value</h3>
          <p className="text-xs text-muted mb-6">Asset concentration across fulfillment locations</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={warehouseValuation}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="name" stroke="#5A5D63" tick={{ fontSize: 12 }} />
                <YAxis stroke="#5A5D63" tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111720', borderColor: '#1E293B', color: '#F5F3EE' }}
                  formatter={(value) => [`$${value.toLocaleString()}`]}
                />
                <Legend />
                <Bar dataKey="cost" name="Cost Basis" fill="#D6A85F" radius={[4, 4, 0, 0]} />
                <Bar dataKey="retail" name="Retail Value" fill="#7B93AD" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share */}
        <div className="bg-surface border border-border rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-heading font-semibold text-foreground text-lg mb-2">Category Asset Share</h3>
            <p className="text-xs text-muted mb-4">Capital allocation by product category</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryValuation} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                    {categoryValuation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111720', borderColor: '#1E293B', color: '#F5F3EE' }}
                    formatter={(value) => [`$${value.toLocaleString()}`]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 border-t border-border pt-4">
            {categoryValuation.slice(0, 4).map((cat, idx) => (
              <div key={cat.name} className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                  <span className="text-muted">{cat.name}</span>
                </div>
                <span className="font-mono text-foreground font-semibold">${cat.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Warehouse Valuation Table */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <h3 className="font-heading font-semibold text-foreground text-lg mb-4">Regional Breakdown Table</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-mono">
            <thead className="bg-surface-elevated text-muted uppercase text-[10px] font-bold">
              <tr>
                <th className="px-6 py-3">Warehouse Code</th>
                <th className="px-6 py-3">Cost Valuation</th>
                <th className="px-6 py-3">Retail Valuation</th>
                <th className="px-6 py-3">Projected Profit Margin</th>
                <th className="px-6 py-3 text-right">Margin %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-xs">
              {warehouseValuation.map(w => {
                const marginP = w.cost > 0 ? ((w.margin / w.cost) * 100).toFixed(1) : '0';
                return (
                  <tr key={w.name} className="hover:bg-surface-elevated/40">
                    <td className="px-6 py-4 font-bold text-foreground">{w.name}</td>
                    <td className="px-6 py-4 text-primary">${w.cost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className="px-6 py-4 text-foreground">${w.retail.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className="px-6 py-4 text-success">${w.margin.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className="px-6 py-4 text-right font-bold text-success">+{marginP}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
