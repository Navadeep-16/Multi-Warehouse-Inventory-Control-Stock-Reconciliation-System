import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventoryData } from '../../context/InventoryDataContext';

export default function PurchaseRequestsPage() {
  const navigate = useNavigate();
  const { purchaseRequests } = useInventoryData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-muted mb-1">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span>/</span>
          <span>Procurement</span>
          <span>/</span>
          <span className="text-primary font-medium">Purchase Requests</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Purchase Requisitions (PR)</h1>
            <p className="text-sm text-muted">Internal department stock request tickets awaiting procurement approval.</p>
          </div>
          <button
            onClick={() => navigate('/procurement/purchase-orders')}
            className="px-4 py-2 bg-primary text-surface-dark font-semibold hover:bg-primary-hover rounded-xl text-xs shadow-lg transition"
          >
            Convert PR to Purchase Order
          </button>
        </div>
      </div>

      {/* PR Table */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-surface-elevated/70 border-b border-border text-muted uppercase font-semibold">
                <th className="py-3 px-4">Request ID</th>
                <th className="py-3 px-4">Requested By</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Requested Products</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {purchaseRequests.map(pr => (
                <tr key={pr.id} className="hover:bg-surface-elevated/40 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-primary">{pr.requestCode}</td>
                  <td className="py-3.5 px-4 font-medium text-foreground">{pr.requestedBy}</td>
                  <td className="py-3.5 px-4 text-muted">{pr.department}</td>
                  <td className="py-3.5 px-4 font-semibold text-foreground">{pr.products}</td>
                  <td className="py-3.5 px-4 text-foreground font-bold">{pr.quantity} units</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      pr.priority === 'High' ? 'bg-danger/20 text-danger border border-danger/30' : 'bg-surface-elevated text-muted'
                    }`}>
                      {pr.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-muted">{pr.date}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                      pr.status === 'Approved'
                        ? 'bg-success/20 text-success border border-success/30'
                        : 'bg-warning/20 text-warning border border-warning/30'
                    }`}>
                      {pr.status}
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
