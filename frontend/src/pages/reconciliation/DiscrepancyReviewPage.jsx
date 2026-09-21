import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventoryData } from '../../context/InventoryDataContext';

export default function DiscrepancyReviewPage() {
  const navigate = useNavigate();
  const { discrepancies, approveDiscrepancy } = useInventoryData();

  return (
    <div className="space-y-6">
      {/* Header & Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 text-xs text-muted mb-1">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span>/</span>
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/reconciliation')}>Reconciliation</span>
          <span>/</span>
          <span className="text-primary font-medium">Discrepancy Review</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Stock Discrepancy Review</h1>
          <p className="text-sm text-muted">Investigate variances between system stock and physical count audit findings.</p>
        </div>
      </div>

      {/* Discrepancies Table */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 bg-surface-elevated/40 border-b border-border flex justify-between items-center">
          <span className="text-xs font-semibold text-foreground">
            Discrepancy Action Queue ({discrepancies.length})
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-surface-elevated/70 border-b border-border text-muted uppercase font-semibold">
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Warehouse</th>
                <th className="py-3 px-4">System Qty</th>
                <th className="py-3 px-4">Physical Qty</th>
                <th className="py-3 px-4">Variance</th>
                <th className="py-3 px-4">Variance %</th>
                <th className="py-3 px-4">Reason / Notes</th>
                <th className="py-3 px-4">Reviewer</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {discrepancies.length === 0 ? (
                <tr>
                  <td colSpan="10" className="py-8 text-center text-muted">
                    No open inventory discrepancies found!
                  </td>
                </tr>
              ) : (
                discrepancies.map(disc => (
                  <tr key={disc.id} className="hover:bg-surface-elevated/40 transition">
                    <td className="py-3.5 px-4 font-bold text-foreground">{disc.product}</td>
                    <td className="py-3.5 px-4 text-muted">{disc.warehouse}</td>
                    <td className="py-3.5 px-4 font-semibold text-foreground">{disc.systemQty}</td>
                    <td className="py-3.5 px-4 font-semibold text-primary">{disc.physicalQty}</td>
                    <td className="py-3.5 px-4 font-bold text-danger">{disc.variance}</td>
                    <td className="py-3.5 px-4 font-medium text-danger">{disc.variancePct}</td>
                    <td className="py-3.5 px-4 text-muted italic max-w-xs">{disc.reason}</td>
                    <td className="py-3.5 px-4 text-muted">{disc.reviewer}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                        disc.status === 'Approved & Adjusted'
                          ? 'bg-success/20 text-success border border-success/30'
                          : 'bg-warning/20 text-warning border border-warning/30'
                      }`}>
                        {disc.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {disc.status !== 'Approved & Adjusted' && (
                        <button
                          onClick={() => approveDiscrepancy(disc.id)}
                          className="px-3 py-1.5 bg-primary text-surface-dark font-semibold hover:bg-primary-hover rounded-xl text-[10px] shadow transition"
                        >
                          Approve Adjustment
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
