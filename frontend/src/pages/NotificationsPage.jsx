import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotificationsPage() {
  const navigate = useNavigate();

  const notifications = [
    { id: 1, title: 'Low Stock Warning', text: 'Dell UltraSharp 32" Monitor is below 15 units threshold.', time: '10 mins ago', type: 'warning' },
    { id: 2, title: 'Transfer Approved', text: 'Transfer TR-2026-002 from WH-SOUTH to WH-NORTH approved.', time: '1 hour ago', type: 'success' },
    { id: 3, title: 'Purchase Order Issued', text: 'PO-2026-8801 issued to Apple Commercial Direct.', time: '3 hours ago', type: 'info' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs text-muted mb-1">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span>/</span>
          <span className="text-primary font-medium">Notifications</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">System Alerts & Notifications</h1>
          <p className="text-sm text-muted">Real-time alerts for low stock warnings, PO approvals, and transfer status changes.</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl p-6 space-y-3 max-w-3xl">
        {notifications.map(n => (
          <div key={n.id} className="p-4 bg-surface-elevated rounded-xl border border-border flex justify-between items-start">
            <div className="space-y-1">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                n.type === 'warning' ? 'bg-warning/20 text-warning' : 'bg-primary/20 text-primary'
              }`}>
                {n.title}
              </span>
              <p className="text-xs text-foreground font-medium pt-1">{n.text}</p>
            </div>
            <span className="text-[11px] text-muted">{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
