import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventoryData } from '../context/InventoryDataContext';

export default function UserActivityPage() {
  const navigate = useNavigate();
  const { auditLogs } = useInventoryData();

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs text-muted mb-1">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span>/</span>
          <span className="text-primary font-medium">My Activity</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Personal Activity Audit Trail</h1>
          <p className="text-sm text-muted">History of stock operations, barcode scans, transfers, and count submissions performed by your session.</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-surface-elevated/70 border-b border-border text-muted uppercase font-semibold">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Action Event</th>
                <th className="py-3 px-4">Module</th>
                <th className="py-3 px-4">Entity</th>
                <th className="py-3 px-4">Log Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {auditLogs.map(log => (
                <tr key={log.id} className="hover:bg-surface-elevated/40 transition">
                  <td className="py-3.5 px-4 font-mono text-muted text-[11px]">{log.timestamp}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-primary">{log.action}</td>
                  <td className="py-3.5 px-4 text-muted">{log.module}</td>
                  <td className="py-3.5 px-4 font-semibold text-foreground">{log.entity}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-success/20 text-success border border-success/30">
                      {log.status}
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
