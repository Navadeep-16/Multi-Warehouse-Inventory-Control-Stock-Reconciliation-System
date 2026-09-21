import React, { useState } from 'react';
import { useInventoryData } from '../../context/InventoryDataContext';
import { Warehouse as WarehouseIcon, MapPin, User, Package, Layers, Plus, Search, Edit3 } from 'lucide-react';

export const AllWarehousesPage = () => {
  const { warehouses, addToast } = useInventoryData();
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWh, setNewWh] = useState({ code: '', name: '', location: '', manager: '', capacity: 50000 });

  const filtered = warehouses.filter(w => 
    w.name.toLowerCase().includes(search.toLowerCase()) ||
    w.code.toLowerCase().includes(search.toLowerCase()) ||
    w.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newWh.code || !newWh.name) return;
    addToast(`Warehouse ${newWh.code} created successfully!`);
    setShowAddModal(false);
    setNewWh({ code: '', name: '', location: '', manager: '', capacity: 50000 });
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Warehouse Network</h1>
          <p className="text-muted text-sm mt-1">Manage physical fulfillment facilities, capacity allocations, and logistics managers.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-primary text-background px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Warehouse
        </button>
      </div>

      {/* Search */}
      <div className="bg-surface border border-border p-4 rounded-xl flex items-center justify-between">
        <div className="relative max-w-sm w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input 
            type="text" 
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search warehouse code, name, location..."
            className="w-full bg-surface-elevated border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary text-foreground placeholder:text-muted"
          />
        </div>
        <span className="text-xs font-mono text-muted">Active Facilities: <strong className="text-foreground">{filtered.length}</strong></span>
      </div>

      {/* Warehouse Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((wh) => {
          const pct = Math.round((wh.utilization / wh.capacity) * 100);
          return (
            <div key={wh.id} className="bg-surface border border-border rounded-xl p-6 hover:border-primary/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-mono font-bold">
                      {wh.code.slice(3, 5)}
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-foreground text-lg">{wh.name}</h3>
                      <span className="text-xs font-mono text-muted">{wh.code}</span>
                    </div>
                  </div>
                  <span className="bg-success/10 text-success text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {wh.status}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-muted mb-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-foreground">{wh.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-info shrink-0" />
                    <span>Manager: <strong className="text-foreground">{wh.manager}</strong></span>
                  </div>
                </div>

                {/* Capacity Bar */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-muted">Storage Capacity</span>
                    <span className="text-foreground font-bold">{wh.utilization.toLocaleString()} / {wh.capacity.toLocaleString()} units ({pct}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-border rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all ${pct >= 85 ? 'bg-danger' : pct >= 65 ? 'bg-warning' : 'bg-success'}`}
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Card Footer Stats */}
              <div className="pt-4 border-t border-border grid grid-cols-2 gap-4 text-center">
                <div className="bg-surface-elevated p-2.5 rounded-lg border border-border/50">
                  <div className="text-xs text-muted">SKU Variants</div>
                  <div className="text-lg font-bold font-mono text-foreground mt-0.5">{wh.productCount}</div>
                </div>
                <div className="bg-surface-elevated p-2.5 rounded-lg border border-border/50">
                  <div className="text-xs text-muted">Stock On Hand</div>
                  <div className="text-lg font-bold font-mono text-primary mt-0.5">{wh.stockUnits.toLocaleString()}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Warehouse Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-heading font-bold text-lg text-foreground">Add New Warehouse</h3>
            <form onSubmit={handleCreate} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs text-muted mb-1 font-semibold">Warehouse Code (e.g. WH-EAST)</label>
                <input 
                  type="text" 
                  required
                  value={newWh.code}
                  onChange={e => setNewWh({ ...newWh, code: e.target.value })}
                  placeholder="WH-CODE" 
                  className="w-full bg-surface-elevated border border-border rounded-lg p-2.5 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-muted mb-1 font-semibold">Facility Name</label>
                <input 
                  type="text" 
                  required
                  value={newWh.name}
                  onChange={e => setNewWh({ ...newWh, name: e.target.value })}
                  placeholder="New Logistics Hub" 
                  className="w-full bg-surface-elevated border border-border rounded-lg p-2.5 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-muted mb-1 font-semibold">Location / Address</label>
                <input 
                  type="text" 
                  value={newWh.location}
                  onChange={e => setNewWh({ ...newWh, location: e.target.value })}
                  placeholder="City, State, Country" 
                  className="w-full bg-surface-elevated border border-border rounded-lg p-2.5 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-muted mb-1 font-semibold">Warehouse Manager</label>
                <input 
                  type="text" 
                  value={newWh.manager}
                  onChange={e => setNewWh({ ...newWh, manager: e.target.value })}
                  placeholder="Manager Name" 
                  className="w-full bg-surface-elevated border border-border rounded-lg p-2.5 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-muted hover:text-foreground">Cancel</button>
                <button type="submit" className="bg-primary text-background px-4 py-2 rounded-lg font-semibold hover:bg-accent">Create Facility</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
