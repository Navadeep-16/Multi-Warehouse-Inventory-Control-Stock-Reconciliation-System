import React, { useState } from 'react';
import { useInventoryData } from '../../context/InventoryDataContext';
import { Layers, Grid, Plus, Edit2, Trash2, Search } from 'lucide-react';

export const LocationsZonesPage = () => {
  const { warehouses, addToast } = useInventoryData();
  const [selectedWarehouseId, setSelectedWarehouseId] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newZone, setNewZone] = useState({ name: '', aisles: 10, racks: 40, bins: 200 });

  const activeWarehouse = warehouses.find(w => w.id === parseInt(selectedWarehouseId, 10)) || warehouses[0];

  const handleAddZone = (e) => {
    e.preventDefault();
    if (!newZone.name) return;
    addToast(`Added new location zone "${newZone.name}" to ${activeWarehouse.code}`);
    setShowAddModal(false);
    setNewZone({ name: '', aisles: 10, racks: 40, bins: 200 });
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Locations & Zones Hierarchy</h1>
          <p className="text-muted text-sm mt-1">Manage warehouse zone layouts, aisles, racks, and bin location codes.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-primary text-background px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Location Zone
        </button>
      </div>

      {/* Warehouse Selector */}
      <div className="bg-surface border border-border p-4 rounded-xl flex items-center gap-4">
        <label className="text-xs text-muted font-semibold uppercase tracking-wider">Select Warehouse Facility:</label>
        <select 
          value={selectedWarehouseId}
          onChange={e => setSelectedWarehouseId(e.target.value)}
          className="bg-surface-elevated border border-border rounded-lg px-4 py-2 text-sm font-semibold text-foreground focus:border-primary focus:outline-none"
        >
          {warehouses.map(w => (
            <option key={w.id} value={w.id}>{w.code} - {w.name}</option>
          ))}
        </select>
      </div>

      {/* Zones Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {activeWarehouse.zones.map(z => (
          <div key={z.id} className="bg-surface border border-border rounded-xl p-6 space-y-4 hover:border-primary/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold bg-primary/10 text-primary px-2.5 py-1 rounded">
                Zone {z.id}
              </span>
              <div className="flex items-center gap-2 text-muted">
                <button className="hover:text-foreground p-1"><Edit2 className="w-3.5 h-3.5" /></button>
                <button className="hover:text-danger p-1"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>

            <div>
              <h3 className="font-heading font-bold text-foreground text-base">{z.name}</h3>
              <p className="text-xs text-muted mt-1">Location Path: <span className="font-mono text-foreground">{activeWarehouse.code} &gt; {z.id}</span></p>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border text-center font-mono">
              <div className="bg-surface-elevated p-2 rounded">
                <div className="text-[10px] text-muted uppercase">Aisles</div>
                <div className="text-sm font-bold text-foreground mt-0.5">{z.aisles}</div>
              </div>
              <div className="bg-surface-elevated p-2 rounded">
                <div className="text-[10px] text-muted uppercase">Racks</div>
                <div className="text-sm font-bold text-foreground mt-0.5">{z.racks}</div>
              </div>
              <div className="bg-surface-elevated p-2 rounded">
                <div className="text-[10px] text-muted uppercase">Bins</div>
                <div className="text-sm font-bold text-primary mt-0.5">{z.bins}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Zone Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-heading font-bold text-lg text-foreground">Add Zone to {activeWarehouse.code}</h3>
            <form onSubmit={handleAddZone} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs text-muted mb-1 font-semibold">Zone Name</label>
                <input 
                  type="text" 
                  required
                  value={newZone.name}
                  onChange={e => setNewZone({ ...newZone, name: e.target.value })}
                  placeholder="Zone D - Secure Storage" 
                  className="w-full bg-surface-elevated border border-border rounded-lg p-2.5 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-muted mb-1 font-semibold">Aisles</label>
                  <input 
                    type="number" 
                    value={newZone.aisles}
                    onChange={e => setNewZone({ ...newZone, aisles: e.target.value })}
                    className="w-full bg-surface-elevated border border-border rounded-lg p-2.5 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted mb-1 font-semibold">Racks</label>
                  <input 
                    type="number" 
                    value={newZone.racks}
                    onChange={e => setNewZone({ ...newZone, racks: e.target.value })}
                    className="w-full bg-surface-elevated border border-border rounded-lg p-2.5 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted mb-1 font-semibold">Bins</label>
                  <input 
                    type="number" 
                    value={newZone.bins}
                    onChange={e => setNewZone({ ...newZone, bins: e.target.value })}
                    className="w-full bg-surface-elevated border border-border rounded-lg p-2.5 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-muted hover:text-foreground">Cancel</button>
                <button type="submit" className="bg-primary text-background px-4 py-2 rounded-lg font-semibold hover:bg-accent">Create Zone</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
