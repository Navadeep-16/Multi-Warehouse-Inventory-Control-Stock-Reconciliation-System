import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventoryData } from '../../context/InventoryDataContext';

export default function AllTransfersPage() {
  const navigate = useNavigate();
  const { transfers, approveTransfer, rejectTransfer } = useInventoryData();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredTransfers = transfers.filter(t => {
    const matchesSearch = t.code.toLowerCase().includes(search.toLowerCase()) ||
      t.product.toLowerCase().includes(search.toLowerCase()) ||
      t.sourceWarehouse.toLowerCase().includes(search.toLowerCase()) ||
      t.destWarehouse.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || t.status.toUpperCase() === statusFilter.toUpperCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header & Action */}
      <div>
        <div className="flex items-center gap-2 text-xs text-muted mb-1">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span>/</span>
          <span className="text-primary font-medium">Transfers</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Stock Transfers</h1>
            <p className="text-sm text-muted">Manage inter-warehouse stock movements, approvals, and dispatch tracking.</p>
          </div>
          <button
            onClick={() => navigate('/transfers/create')}
            className="px-4 py-2 bg-primary text-surface-dark font-semibold hover:bg-primary-hover rounded-xl text-xs shadow-lg transition flex items-center gap-1.5 self-start"
          >
            <span>+</span> Create Stock Transfer
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="p-4 bg-surface border border-border rounded-2xl flex flex-wrap gap-3 items-center justify-between">
        <div className="relative flex-1 min-w-[240px]">
          <span className="absolute left-3 top-2.5 text-muted text-xs">🔍</span>
          <input
            type="text"
            placeholder="Search transfer code, product, warehouse..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-surface-elevated border border-border rounded-xl pl-9 pr-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex gap-2">
          {['ALL', 'PENDING', 'APPROVED', 'COMPLETED', 'REJECTED'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                statusFilter === status
                  ? 'bg-primary/20 text-primary border border-primary/40'
                  : 'bg-surface-elevated text-muted hover:text-foreground border border-border'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Transfers Table */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-surface-elevated/70 border-b border-border text-muted uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">Transfer ID</th>
                <th className="py-3 px-4">Source Warehouse</th>
                <th className="py-3 px-4">Destination</th>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Requested By</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredTransfers.length === 0 ? (
                <tr>
                  <td colSpan="10" className="py-8 text-center text-muted">
                    No transfer orders match the criteria.
                  </td>
                </tr>
              ) : (
                filteredTransfers.map(tr => (
                  <tr key={tr.id} className="hover:bg-surface-elevated/40 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-primary">{tr.code}</td>
                    <td className="py-3.5 px-4 font-medium text-foreground">{tr.sourceWarehouse}</td>
                    <td className="py-3.5 px-4 font-medium text-foreground">{tr.destWarehouse}</td>
                    <td className="py-3.5 px-4 text-foreground">{tr.product}</td>
                    <td className="py-3.5 px-4 font-bold text-foreground">{tr.quantity} units</td>
                    <td className="py-3.5 px-4 text-muted">{tr.requestedBy}</td>
                    <td className="py-3.5 px-4 text-muted">{tr.date}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        tr.priority === 'High' ? 'bg-danger/20 text-danger border border-danger/30' : 'bg-surface-elevated text-muted'
                      }`}>
                        {tr.priority}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                        tr.status === 'Completed'
                          ? 'bg-success/20 text-success border border-success/30'
                          : tr.status === 'Pending'
                          ? 'bg-warning/20 text-warning border border-warning/30'
                          : tr.status === 'Rejected'
                          ? 'bg-danger/20 text-danger border border-danger/30'
                          : 'bg-primary/20 text-primary border border-primary/30'
                      }`}>
                        {tr.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {tr.status === 'Pending' && (
                        <div className="flex justify-end gap-1.5">
                          <button
                            onClick={() => approveTransfer(tr.id)}
                            className="px-2.5 py-1 bg-success/20 text-success hover:bg-success/30 rounded-lg text-[10px] font-semibold transition"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => rejectTransfer(tr.id)}
                            className="px-2.5 py-1 bg-danger/20 text-danger hover:bg-danger/30 rounded-lg text-[10px] font-semibold transition"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
