import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BinLocationsPage() {
  const navigate = useNavigate();

  const bins = [
    { code: 'BIN-A1-01', zone: 'Zone A', aisle: 'Aisle 01', rack: 'Rack 04', status: 'Occupied', product: 'MacBook Pro 16"' },
    { code: 'BIN-A1-02', zone: 'Zone A', aisle: 'Aisle 01', rack: 'Rack 04', status: 'Occupied', product: 'Dell UltraSharp 32"' },
    { code: 'BIN-B2-08', zone: 'Zone B', aisle: 'Aisle 02', rack: 'Rack 02', status: 'Empty', product: '-' },
    { code: 'BIN-C3-15', zone: 'Zone C', aisle: 'Aisle 03', rack: 'Rack 01', status: 'Occupied', product: 'Samsung 990 PRO SSD' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs text-muted mb-1">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span>/</span>
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/warehouses')}>Warehouses</span>
          <span>/</span>
          <span className="text-primary font-medium">Bin Locations</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Warehouse Bin & Shelf Locations</h1>
          <p className="text-sm text-muted">Aisle, rack, and bin mapping for accurate pick and putaway operations.</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-surface-elevated/70 border-b border-border text-muted uppercase font-semibold">
                <th className="py-3 px-4">Bin Code</th>
                <th className="py-3 px-4">Zone</th>
                <th className="py-3 px-4">Aisle</th>
                <th className="py-3 px-4">Rack</th>
                <th className="py-3 px-4">Mapped SKU / Product</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {bins.map(bin => (
                <tr key={bin.code} className="hover:bg-surface-elevated/40 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-primary">{bin.code}</td>
                  <td className="py-3.5 px-4 text-foreground">{bin.zone}</td>
                  <td className="py-3.5 px-4 text-muted">{bin.aisle}</td>
                  <td className="py-3.5 px-4 text-muted">{bin.rack}</td>
                  <td className="py-3.5 px-4 font-semibold text-foreground">{bin.product}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                      bin.status === 'Occupied' ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-surface-elevated text-muted'
                    }`}>
                      {bin.status}
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
