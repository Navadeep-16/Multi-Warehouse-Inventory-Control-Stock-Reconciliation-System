import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReturnsPage({ type = 'all' }) {
  const navigate = useNavigate();

  const returns = [
    { id: 1, rmaCode: 'RMA-2026-101', type: 'Customer Return', product: 'MacBook Pro 16"', qty: 1, customer: 'Acme Corp', status: 'Restocked', date: '2026-09-20' },
    { id: 2, rmaCode: 'RTV-2026-204', type: 'Supplier Return', product: 'Dell UltraSharp 32"', qty: 2, supplier: 'Dell Enterprise', status: 'In Transit', date: '2026-09-18' }
  ];

  const filtered = type === 'customer' ? returns.filter(r => r.type === 'Customer Return') :
                 type === 'supplier' ? returns.filter(r => r.type === 'Supplier Return') : returns;

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs text-muted mb-1">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span>/</span>
          <span>Returns</span>
          <span>/</span>
          <span className="text-primary font-medium capitalize">{type} Returns</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Returns & RMA Management</h1>
            <p className="text-sm text-muted">Customer return authorizations (RMA) and supplier return to vendor (RTV) audit log.</p>
          </div>
          <button
            onClick={() => navigate('/operations/stock-returns')}
            className="px-4 py-2 bg-primary text-surface-dark font-bold hover:bg-primary-hover rounded-xl text-xs shadow transition"
          >
            + Process New Return
          </button>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-surface-elevated/70 border-b border-border text-muted uppercase font-semibold">
                <th className="py-3 px-4">RMA / RTV Code</th>
                <th className="py-3 px-4">Return Type</th>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Party</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map(r => (
                <tr key={r.id} className="hover:bg-surface-elevated/40 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-primary">{r.rmaCode}</td>
                  <td className="py-3.5 px-4 font-semibold text-foreground">{r.type}</td>
                  <td className="py-3.5 px-4 font-semibold text-foreground">{r.product}</td>
                  <td className="py-3.5 px-4 font-bold text-foreground">{r.qty} units</td>
                  <td className="py-3.5 px-4 text-muted">{r.customer || r.supplier}</td>
                  <td className="py-3.5 px-4 text-muted">{r.date}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-success/20 text-success border border-success/30">
                      {r.status}
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
