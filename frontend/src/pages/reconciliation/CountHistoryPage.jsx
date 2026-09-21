import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventoryData } from '../../context/InventoryDataContext';

export default function CountHistoryPage() {
  const navigate = useNavigate();
  const { reconciliationSessions } = useInventoryData();

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs text-muted mb-1">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span>/</span>
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/reconciliation')}>Reconciliation</span>
          <span>/</span>
          <span className="text-primary font-medium">Count History</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Physical Stock Audit History</h1>
          <p className="text-sm text-muted">Archived physical count sessions, matched item logs, and variance audit records.</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-surface-elevated/70 border-b border-border text-muted uppercase font-semibold">
                <th className="py-3 px-4">Session Code</th>
                <th className="py-3 px-4">Warehouse</th>
                <th className="py-3 px-4">Zone</th>
                <th className="py-3 px-4">Expected</th>
                <th className="py-3 px-4">Physical Count</th>
                <th className="py-3 px-4">Variance</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {reconciliationSessions.map(session => (
                <tr key={session.id} className="hover:bg-surface-elevated/40 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-primary">{session.code}</td>
                  <td className="py-3.5 px-4 text-foreground font-medium">{session.warehouse}</td>
                  <td className="py-3.5 px-4 text-muted">{session.zone}</td>
                  <td className="py-3.5 px-4 font-bold text-foreground">{session.expectedStock}</td>
                  <td className="py-3.5 px-4 font-bold text-foreground">{session.physicalStock}</td>
                  <td className="py-3.5 px-4 font-bold text-warning">{session.variance} units</td>
                  <td className="py-3.5 px-4 text-muted">{session.date}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-success/20 text-success border border-success/30">
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
