import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventoryData } from '../../context/InventoryDataContext';

export default function ReconciliationDashPage() {
  const navigate = useNavigate();
  const { reconciliationSessions, discrepancies } = useInventoryData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-muted mb-1">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span>/</span>
          <span className="text-primary font-medium">Reconciliation</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Stock Reconciliation Dashboard</h1>
            <p className="text-sm text-muted">Audit system counts against physical stock audits to eliminate inventory shrinkage.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/reconciliation/physical-count')}
              className="px-4 py-2 bg-primary text-surface-dark font-semibold hover:bg-primary-hover rounded-xl text-xs shadow-lg transition"
            >
              + Start Physical Stock Count
            </button>
            <button
              onClick={() => navigate('/reconciliation/discrepancies')}
              className="px-4 py-2 bg-surface border border-border text-foreground hover:bg-surface-elevated rounded-xl text-xs font-semibold transition"
            >
              Review Discrepancies ({discrepancies.length})
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-surface border border-border rounded-2xl">
          <p className="text-xs text-muted uppercase font-semibold">Active Audit Sessions</p>
          <p className="text-2xl font-extrabold text-foreground mt-1">{reconciliationSessions.length}</p>
          <p className="text-[11px] text-muted mt-1">Quarterly cycle counts</p>
        </div>

        <div className="p-5 bg-surface border border-border rounded-2xl">
          <p className="text-xs text-muted uppercase font-semibold">Matched Items Ratio</p>
          <p className="text-2xl font-extrabold text-success mt-1">98.4%</p>
          <p className="text-[11px] text-success mt-1">High accuracy compliance</p>
        </div>

        <div className="p-5 bg-surface border border-border rounded-2xl">
          <p className="text-xs text-muted uppercase font-semibold">Open Discrepancies</p>
          <p className="text-2xl font-extrabold text-warning mt-1">{discrepancies.length}</p>
          <p className="text-[11px] text-warning mt-1">Action required</p>
        </div>

        <div className="p-5 bg-surface border border-border rounded-2xl">
          <p className="text-xs text-muted uppercase font-semibold">Total Stock Variance</p>
          <p className="text-2xl font-extrabold text-danger mt-1">-5 Units</p>
          <p className="text-[11px] text-muted mt-1">Shrinkage & misplacement</p>
        </div>
      </div>

      {/* Audit Sessions Table */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 bg-surface-elevated/40 border-b border-border flex justify-between items-center">
          <h3 className="text-sm font-bold text-foreground">Quarterly Reconciliation Sessions</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-surface-elevated/70 border-b border-border text-muted uppercase font-semibold">
                <th className="py-3 px-4">Session Code</th>
                <th className="py-3 px-4">Warehouse</th>
                <th className="py-3 px-4">Zone</th>
                <th className="py-3 px-4">Expected Stock</th>
                <th className="py-3 px-4">Physical Count</th>
                <th className="py-3 px-4">Variance</th>
                <th className="py-3 px-4">Progress</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {reconciliationSessions.map(session => (
                <tr key={session.id} className="hover:bg-surface-elevated/40 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-primary">{session.code}</td>
                  <td className="py-3.5 px-4 font-medium text-foreground">{session.warehouse}</td>
                  <td className="py-3.5 px-4 text-muted">{session.zone}</td>
                  <td className="py-3.5 px-4 text-foreground font-semibold">{session.expectedStock}</td>
                  <td className="py-3.5 px-4 text-foreground font-semibold">{session.physicalStock}</td>
                  <td className="py-3.5 px-4">
                    <span className={`font-bold ${session.variance < 0 ? 'text-danger' : 'text-success'}`}>
                      {session.variance} units
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="w-24 bg-surface-elevated rounded-full h-2 overflow-hidden border border-border">
                      <div
                        className="bg-primary h-full transition-all"
                        style={{ width: `${session.progress}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      session.status === 'Completed'
                        ? 'bg-success/20 text-success border border-success/30'
                        : 'bg-warning/20 text-warning border border-warning/30'
                    }`}>
                      {session.status}
                    </span>
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
