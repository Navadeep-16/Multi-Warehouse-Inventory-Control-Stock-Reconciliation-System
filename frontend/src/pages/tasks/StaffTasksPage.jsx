import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function StaffTasksPage({ filter = 'all' }) {
  const navigate = useNavigate();

  const tasks = [
    { id: 1, title: 'Receive PO-2026-8803 Shipment', category: 'Stock Inbound', priority: 'High', due: 'Today 15:00', status: 'Completed' },
    { id: 2, title: 'Dispatch Order #ORD-2026-9003', category: 'Stock Out', priority: 'High', due: 'Today 16:30', status: 'Completed' },
    { id: 3, title: 'Zone A Physical Stock Count Audit', category: 'Shelf Count', priority: 'Medium', due: 'Today 18:00', status: 'Pending' },
    { id: 4, title: 'Print Replacement Barcode Stickers', category: 'Barcodes', priority: 'Low', due: 'Tomorrow 10:00', status: 'Pending' }
  ];

  const filtered = filter === 'pending' ? tasks.filter(t => t.status === 'Pending') :
                 filter === 'completed' ? tasks.filter(t => t.status === 'Completed') : tasks;

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs text-muted mb-1">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span>/</span>
          <span>Tasks</span>
          <span>/</span>
          <span className="text-primary font-medium capitalize">{filter} Tasks</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Staff Duty & Task Center</h1>
          <p className="text-sm text-muted">Daily receiving assignments, pick lists, rack audits, and fulfillment duties.</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-surface-elevated/70 border-b border-border text-muted uppercase font-semibold">
                <th className="py-3 px-4">Task Description</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Due Time</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-surface-elevated/40 transition">
                  <td className="py-3.5 px-4 font-bold text-foreground">{t.title}</td>
                  <td className="py-3.5 px-4 text-muted">{t.category}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      t.priority === 'High' ? 'bg-danger/20 text-danger' : 'bg-surface-elevated text-muted'
                    }`}>
                      {t.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-muted">{t.due}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                      t.status === 'Completed' ? 'bg-success/20 text-success border border-success/30' : 'bg-warning/20 text-warning border border-warning/30'
                    }`}>
                      {t.status}
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
