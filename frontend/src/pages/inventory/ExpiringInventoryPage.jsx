import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventoryData } from '../../context/InventoryDataContext';

export default function ExpiringInventoryPage() {
  const navigate = useNavigate();
  const { batches } = useInventoryData();

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs text-muted mb-1">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span>/</span>
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/inventory')}>Inventory</span>
          <span>/</span>
          <span className="text-primary font-medium">Expiring Soon</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Expiring Inventory Batches</h1>
            <p className="text-sm text-muted">Monitor lot batches nearing expiration to prevent inventory write-offs.</p>
          </div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-surface-elevated/70 border-b border-border text-muted uppercase font-semibold">
                <th className="py-3 px-4">Batch No</th>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Serial No</th>
                <th className="py-3 px-4">Mfg Date</th>
                <th className="py-3 px-4">Expiry Date</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Warehouse</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {batches.map(batch => (
                <tr key={batch.id} className="hover:bg-surface-elevated/40 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-primary">{batch.batchNo}</td>
                  <td className="py-3.5 px-4 font-semibold text-foreground">{batch.product}</td>
                  <td className="py-3.5 px-4 font-mono text-muted">{batch.serialNo}</td>
                  <td className="py-3.5 px-4 text-muted">{batch.mfgDate}</td>
                  <td className="py-3.5 px-4 font-bold text-warning">{batch.expiryDate}</td>
                  <td className="py-3.5 px-4 font-bold text-foreground">{batch.quantity} units</td>
                  <td className="py-3.5 px-4 text-muted">{batch.warehouse}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-success/20 text-success border border-success/30">
                      {batch.status}
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
