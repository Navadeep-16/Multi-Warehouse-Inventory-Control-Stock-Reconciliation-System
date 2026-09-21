import React, { useState } from 'react';
import { useInventoryData } from '../../context/InventoryDataContext';
import { Activity, Plus, CheckCircle, Save, FileText, ArrowDownLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const StockInPage = () => {
  const { warehouses, products, suppliers, addStockIn, addToast } = useInventoryData();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    warehouseId: '1',
    supplierId: '1',
    productId: '1',
    quantity: '25',
    batchNo: `BCH-2026-${Math.floor(100 + Math.random() * 900)}`,
    serialNo: `SN-${Math.floor(100000 + Math.random() * 900000)}`,
    unitCost: '100.00',
    date: new Date().toISOString().split('T')[0],
    reference: `RCV-${Date.now().toString().slice(-6)}`,
    notes: 'Inbound shipment reception'
  });

  const handleProductChange = (e) => {
    const pId = e.target.value;
    const selected = products.find(p => p.id === parseInt(pId, 10));
    setForm({
      ...form,
      productId: pId,
      unitCost: selected ? selected.unitCost.toString() : '100.00'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addStockIn(form);
    navigate('/inventory');
  };

  const handleSaveDraft = () => {
    addToast('Stock In draft saved locally!', 'warning');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-border pb-6 flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-success/10 text-success flex items-center justify-center shrink-0">
          <ArrowDownLeft className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Stock In (Receive Inventory)</h1>
          <p className="text-muted text-sm mt-0.5">Inbound stock receiving workflow, batch lot tagging, and warehouse allocation.</p>
        </div>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-xl p-6 space-y-6 shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Reference Number</label>
            <input 
              type="text" 
              readOnly 
              value={form.reference} 
              className="w-full bg-surface-elevated/50 border border-border rounded-lg p-2.5 font-mono text-sm text-primary font-bold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Receive Date</label>
            <input 
              type="date" 
              value={form.date} 
              onChange={e => setForm({ ...form, date: e.target.value })}
              className="w-full bg-surface-elevated border border-border rounded-lg p-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Target Warehouse</label>
            <select 
              value={form.warehouseId} 
              onChange={e => setForm({ ...form, warehouseId: e.target.value })}
              className="w-full bg-surface-elevated border border-border rounded-lg p-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
            >
              {warehouses.map(w => <option key={w.id} value={w.id}>{w.code} - {w.name}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border">
          <div>
            <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Supplier Partner</label>
            <select 
              value={form.supplierId} 
              onChange={e => setForm({ ...form, supplierId: e.target.value })}
              className="w-full bg-surface-elevated border border-border rounded-lg p-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
            >
              {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Product to Receive</label>
            <select 
              value={form.productId} 
              onChange={handleProductChange}
              className="w-full bg-surface-elevated border border-border rounded-lg p-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
            >
              {products.map(p => <option key={p.id} value={p.id}>{p.sku} - {p.name}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-4 border-t border-border">
          <div>
            <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Quantity to Add</label>
            <input 
              type="number" 
              required
              min="1"
              value={form.quantity} 
              onChange={e => setForm({ ...form, quantity: e.target.value })}
              className="w-full bg-surface-elevated border border-border rounded-lg p-2.5 text-sm font-mono font-bold text-foreground focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Unit Cost ($)</label>
            <input 
              type="number" 
              step="0.01"
              required
              value={form.unitCost} 
              onChange={e => setForm({ ...form, unitCost: e.target.value })}
              className="w-full bg-surface-elevated border border-border rounded-lg p-2.5 text-sm font-mono text-foreground focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Batch Lot #</label>
            <input 
              type="text" 
              value={form.batchNo} 
              onChange={e => setForm({ ...form, batchNo: e.target.value })}
              className="w-full bg-surface-elevated border border-border rounded-lg p-2.5 text-sm font-mono text-foreground focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Serial # Prefix</label>
            <input 
              type="text" 
              value={form.serialNo} 
              onChange={e => setForm({ ...form, serialNo: e.target.value })}
              className="w-full bg-surface-elevated border border-border rounded-lg p-2.5 text-sm font-mono text-foreground focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Notes / Receiving Remarks</label>
          <textarea 
            rows={3}
            value={form.notes}
            onChange={e => setForm({ ...form, notes: e.target.value })}
            className="w-full bg-surface-elevated border border-border rounded-lg p-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
          ></textarea>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border">
          <button 
            type="button" 
            onClick={handleSaveDraft}
            className="bg-surface-elevated text-foreground px-5 py-2.5 rounded-lg text-sm font-semibold border border-border hover:border-primary/50 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4 text-muted" /> Save Draft
          </button>

          <div className="flex items-center gap-3">
            <button 
              type="button"
              onClick={() => navigate('/inventory')}
              className="px-5 py-2.5 text-sm font-semibold text-muted hover:text-foreground"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="bg-success text-background px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-success/90 transition-colors flex items-center gap-2 shadow-lg"
            >
              <CheckCircle className="w-4 h-4" /> Receive & Update Stock
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
