import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventoryData } from '../../context/InventoryDataContext';

export default function StockMovementPage() {
  const navigate = useNavigate();
  const { stockOperations } = useInventoryData();

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs text-muted mb-1">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span>/</span>
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/inventory')}>Inventory</span>
          <span>/</span>
          <span className="text-primary font-medium">Stock Movement</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Stock Movement Ledger</h1>
          <p className="text-sm text-muted">Complete audit trail of all physical stock ins, dispatches, transfers, and adjustments.</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-surface-elevated/70 border-b border-border text-muted uppercase font-semibold">
                <th className="py-3 px-4">Ref Code</th>
                <th className="py-3 px-4">Operation Type</th>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Warehouse</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Operator</th>
                <th className="py-3 px-4">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {stockOperations.map(op => (
                <tr key={op.id} className="hover:bg-surface-elevated/40 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-primary">{op.reference}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                      op.type === 'Stock In' ? 'bg-success/20 text-success border border-success/30' :
                      op.type === 'Stock Out' ? 'bg-warning/20 text-warning border border-warning/30' :
                      'bg-primary/20 text-primary border border-primary/30'
                    }`}>
                      {op.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-foreground">{op.product}</td>
                  <td className="py-3.5 px-4 text-muted">{op.warehouse}</td>
                  <td className="py-3.5 px-4 font-bold text-foreground font-mono">
                    {op.type === 'Stock In' ? `+${op.quantity}` : `-${op.quantity}`} units
                  </td>
                  <td className="py-3.5 px-4 text-muted font-mono text-[11px]">{op.date}</td>
                  <td className="py-3.5 px-4 text-muted">{op.user}</td>
                  <td className="py-3.5 px-4 text-muted italic max-w-xs">{op.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
