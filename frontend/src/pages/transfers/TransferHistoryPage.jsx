import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventoryData } from '../../context/InventoryDataContext';

export default function TransferHistoryPage() {
  const navigate = useNavigate();
  const { transfers } = useInventoryData();

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs text-muted mb-1">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span>/</span>
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/transfers')}>Transfers</span>
          <span>/</span>
          <span className="text-primary font-medium">Transfer History</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Inter-Warehouse Transfer History Log</h1>
          <p className="text-sm text-muted">Complete audit log of completed, in-transit, and archived stock movements.</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-surface-elevated/70 border-b border-border text-muted uppercase font-semibold">
                <th className="py-3 px-4">Transfer Code</th>
                <th className="py-3 px-4">Source Hub</th>
                <th className="py-3 px-4">Dest Hub</th>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {transfers.map(tr => (
                <tr key={tr.id} className="hover:bg-surface-elevated/40 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-primary">{tr.code}</td>
                  <td className="py-3.5 px-4 font-semibold text-foreground">{tr.sourceWarehouse}</td>
                  <td className="py-3.5 px-4 font-semibold text-foreground">{tr.destWarehouse}</td>
                  <td className="py-3.5 px-4 text-foreground">{tr.product}</td>
                  <td className="py-3.5 px-4 font-bold text-foreground font-mono">{tr.quantity} units</td>
                  <td className="py-3.5 px-4 text-muted">{tr.date}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                      tr.status === 'Completed' ? 'bg-success/20 text-success border border-success/30' : 'bg-primary/20 text-primary border border-primary/30'
                    }`}>
                      {tr.status}
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
