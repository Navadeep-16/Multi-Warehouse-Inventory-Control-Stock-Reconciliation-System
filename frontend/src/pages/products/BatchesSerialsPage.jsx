import React, { useState } from 'react';
import { useInventoryData } from '../../context/InventoryDataContext';
import { Layers, Search, Filter, Calendar, ShieldCheck } from 'lucide-react';

export const BatchesSerialsPage = () => {
  const { batches } = useInventoryData();
  const [search, setSearch] = useState('');

  const filtered = batches.filter(b => 
    b.batchNo.toLowerCase().includes(search.toLowerCase()) ||
    b.serialNo.toLowerCase().includes(search.toLowerCase()) ||
    b.product.toLowerCase().includes(search.toLowerCase()) ||
    b.warehouse.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-heading font-bold text-foreground">Batches & Serial Number Tracking</h1>
        <p className="text-muted text-sm mt-1">Traceability log for manufacturing batches, serial numbers, component expiry dates, and lot locations.</p>
      </div>

      {/* Toolbar */}
      <div className="bg-surface border border-border p-4 rounded-xl flex items-center justify-between">
        <div className="relative max-w-sm w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input 
            type="text" 
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search Batch #, Serial #, Product..."
            className="w-full bg-surface-elevated border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary text-foreground placeholder:text-muted"
          />
        </div>
        <span className="text-xs font-mono text-muted">Total Tracked Lots: <strong className="text-foreground">{filtered.length}</strong></span>
      </div>

      {/* Table */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-surface-elevated/60 text-muted uppercase text-[10px] tracking-wider font-bold border-b border-border">
              <tr>
                <th className="px-6 py-4">Batch Number</th>
                <th className="px-6 py-4">Serial Number</th>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Warehouse</th>
                <th className="px-6 py-4">Qty</th>
                <th className="px-6 py-4">Mfg. Date</th>
                <th className="px-6 py-4">Expiry Date</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-mono text-xs">
              {filtered.map(b => (
                <tr key={b.id} className="hover:bg-surface-elevated/40">
                  <td className="px-6 py-4 font-bold text-primary">{b.batchNo}</td>
                  <td className="px-6 py-4 text-foreground">{b.serialNo}</td>
                  <td className="px-6 py-4 font-sans font-semibold text-foreground">{b.product}</td>
                  <td className="px-6 py-4">
                    <span className="bg-surface-elevated border border-border px-2 py-1 rounded text-foreground">{b.warehouse}</span>
                  </td>
                  <td className="px-6 py-4 font-bold">{b.quantity}</td>
                  <td className="px-6 py-4 text-muted">{b.mfgDate}</td>
                  <td className="px-6 py-4 text-muted">{b.expiryDate}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="bg-success/10 text-success text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                      {b.status}
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
};
