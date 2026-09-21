import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventoryData } from '../../context/InventoryDataContext';

export default function PendingApprovalsPage() {
  const navigate = useNavigate();
  const { transfers, approveTransfer, rejectTransfer } = useInventoryData();

  const pendingTransfers = transfers.filter(t => t.status === 'Pending');

  return (
    <div className="space-y-6">
      {/* Header & Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 text-xs text-muted mb-1">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span>/</span>
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/transfers')}>Transfers</span>
          <span>/</span>
          <span className="text-primary font-medium">Pending Approvals</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Pending Transfer Approvals</h1>
          <p className="text-sm text-muted">Review and authorize inter-warehouse transfer requests requiring manager approval.</p>
        </div>
      </div>

      {/* Pending List Card */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 bg-surface-elevated/40 border-b border-border flex justify-between items-center">
          <span className="text-xs font-semibold text-foreground">
            Awaiting Manager Sign-Off ({pendingTransfers.length})
          </span>
        </div>

        {pendingTransfers.length === 0 ? (
          <div className="p-12 text-center text-muted text-sm">
            <span className="text-3xl block mb-2">✨</span>
            All stock transfer requests have been processed! No pending approvals.
          </div>
        ) : (
          <div className="divide-y divide-border/60">
            {pendingTransfers.map(tr => (
              <div key={tr.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-surface-elevated/20 transition">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-primary text-sm">{tr.code}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-warning/20 text-warning border border-warning/30">
                      Pending Approval
                    </span>
                    <span className="text-xs text-muted">Priority: {tr.priority}</span>
                  </div>
                  <h3 className="text-base font-bold text-foreground">{tr.product}</h3>
                  <div className="flex items-center gap-4 text-xs text-muted pt-1">
                    <span>From: <strong className="text-foreground">{tr.sourceWarehouse}</strong></span>
                    <span>→</span>
                    <span>To: <strong className="text-foreground">{tr.destWarehouse}</strong></span>
                    <span>Quantity: <strong className="text-primary">{tr.quantity} units</strong></span>
                  </div>
                  <p className="text-xs text-muted italic">Reason: {tr.reason}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => rejectTransfer(tr.id)}
                    className="px-4 py-2 bg-danger/20 text-danger hover:bg-danger/30 rounded-xl text-xs font-semibold border border-danger/30 transition"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => approveTransfer(tr.id)}
                    className="px-5 py-2 bg-success text-surface-dark hover:bg-success/90 rounded-xl text-xs font-semibold shadow-lg transition"
                  >
                    Approve & Dispatch
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
