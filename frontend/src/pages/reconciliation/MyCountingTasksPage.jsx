import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyCountingTasksPage() {
  const navigate = useNavigate();

  const countingTasks = [
    { id: 1, zone: 'Zone A - High Value Electronics', warehouse: 'WH-EAST', rack: 'Rack A4', due: 'Today 17:00', status: 'In Progress' },
    { id: 2, zone: 'Zone B - Peripherals & Cables', warehouse: 'WH-EAST', rack: 'Rack B2', due: 'Tomorrow 12:00', status: 'Assigned' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs text-muted mb-1">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span>/</span>
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/reconciliation')}>Reconciliation</span>
          <span>/</span>
          <span className="text-primary font-medium">My Counting Tasks</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Assigned Shelf Counting Tasks</h1>
          <p className="text-sm text-muted">Physical shelf stock audit assignments for active shift duty.</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-surface-elevated/70 border-b border-border text-muted uppercase font-semibold">
                <th className="py-3 px-4">Zone</th>
                <th className="py-3 px-4">Warehouse</th>
                <th className="py-3 px-4">Target Rack / Bin</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {countingTasks.map(t => (
                <tr key={t.id} className="hover:bg-surface-elevated/40 transition">
                  <td className="py-3.5 px-4 font-bold text-foreground">{t.zone}</td>
                  <td className="py-3.5 px-4 text-muted">{t.warehouse}</td>
                  <td className="py-3.5 px-4 font-mono text-primary font-bold">{t.rack}</td>
                  <td className="py-3.5 px-4 text-muted">{t.due}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-warning/20 text-warning border border-warning/30">
                      {t.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => navigate('/reconciliation/physical-count')}
                      className="px-3 py-1 bg-primary text-surface-dark font-semibold rounded-lg text-[10px] shadow hover:bg-primary-hover transition"
                    >
                      Start Count →
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
