import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventoryData } from '../context/InventoryDataContext';

export default function ReportsPage() {
  const navigate = useNavigate();
  const { addToast } = useInventoryData();

  const [dateRange, setDateRange] = useState('2026-09-01 to 2026-09-21');
  const [selectedWH, setSelectedWH] = useState('ALL');

  const reportModules = [
    { title: 'Inventory Master Report', description: 'Comprehensive SKU valuations, stock levels, and warehouse allocations.', icon: '📦' },
    { title: 'Stock Movement Audit Log', description: 'Detailed ledger of Stock In, Stock Out, and Adjustment transactions.', icon: '🔄' },
    { title: 'Warehouse Utilization Report', description: 'Volumetric capacity analysis across zones, aisles, and racks.', icon: '🏢' },
    { title: 'Purchase & Procurement Ledger', description: 'PO issuance, supplier fulfillment rates, and procurement expenditure.', icon: '📑' },
    { title: 'Sales Order Fulfillment Audit', description: 'Dispatched orders, delivery cycle times, and customer shipment logs.', icon: '🛒' },
    { title: 'Transfer & Movement Audit', description: 'Inter-warehouse transfers, pending approvals, and transit statuses.', icon: '⇄' },
    { title: 'Stock Reconciliation & Shrinkage Report', description: 'Physical count discrepancies, variance percentages, and audit sign-offs.', icon: '🛡️' },
    { title: 'System Security & Compliance Log', description: 'User login history, role permissions matrix, and system activity logs.', icon: '🔒' }
  ];

  const handleExportCSV = (title) => {
    addToast(`Exporting ${title} as CSV...`);
  };

  const handleExportPDF = (title) => {
    addToast(`Generating PDF export for ${title}...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-muted mb-1">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span>/</span>
          <span className="text-primary font-medium">Reports</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Enterprise Report Center</h1>
            <p className="text-sm text-muted">Generate, filter, and export detailed CSV & PDF audit reports across all modules.</p>
          </div>
        </div>
      </div>

      {/* Report Filter Bar */}
      <div className="p-4 bg-surface border border-border rounded-2xl flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <label className="block text-[10px] text-muted uppercase font-bold mb-1">Audit Date Range</label>
            <input
              type="text"
              value={dateRange}
              onChange={e => setDateRange(e.target.value)}
              className="bg-surface-elevated border border-border rounded-xl px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-[10px] text-muted uppercase font-bold mb-1">Warehouse Scope</label>
            <select
              value={selectedWH}
              onChange={e => setSelectedWH(e.target.value)}
              className="bg-surface-elevated border border-border rounded-xl px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary"
            >
              <option value="ALL">All Warehouses (Global)</option>
              <option value="WH-EAST">New York Logistics Hub (WH-EAST)</option>
              <option value="WH-WEST">San Francisco Fulfillment (WH-WEST)</option>
              <option value="WH-NORTH">Chicago Central Depot (WH-NORTH)</option>
              <option value="WH-SOUTH">Austin Distribution Center (WH-SOUTH)</option>
            </select>
          </div>
        </div>

        <span className="text-xs text-muted">
          Showing scope for: <strong className="text-primary">{selectedWH}</strong>
        </span>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reportModules.map(report => (
          <div key={report.title} className="p-5 bg-surface border border-border rounded-2xl flex flex-col justify-between space-y-4 hover:border-primary/50 transition">
            <div className="flex items-start gap-3">
              <span className="text-2xl p-2 bg-surface-elevated rounded-xl border border-border">{report.icon}</span>
              <div>
                <h3 className="text-sm font-bold text-foreground">{report.title}</h3>
                <p className="text-xs text-muted mt-0.5">{report.description}</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-border">
              <button
                onClick={() => handleExportCSV(report.title)}
                className="px-3 py-1.5 bg-surface-elevated border border-border text-foreground hover:border-primary rounded-xl text-xs font-semibold transition"
              >
                📊 Export CSV
              </button>
              <button
                onClick={() => handleExportPDF(report.title)}
                className="px-3 py-1.5 bg-primary text-surface-dark font-semibold hover:bg-primary-hover rounded-xl text-xs shadow transition"
              >
                📄 Export PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
