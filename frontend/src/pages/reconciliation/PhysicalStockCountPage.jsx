import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventoryData } from '../../context/InventoryDataContext';

export default function PhysicalStockCountPage() {
  const navigate = useNavigate();
  const { warehouses, products, addToast } = useInventoryData();

  const [form, setForm] = useState({
    warehouseId: warehouses[0]?.id || 1,
    zone: 'Zone A - High Value Electronics',
    barcodeInput: '',
    productId: products[0]?.id || 1,
    physicalQty: 10,
    notes: ''
  });

  const [countsList, setCountsList] = useState([
    { id: 1, product: 'MacBook Pro 16" M3 Max', sku: 'PRO-MAC-16', expected: 95, physical: 95, status: 'Match' },
    { id: 2, product: 'Dell UltraSharp 32" 4K Monitor', sku: 'MON-DELL-32', expected: 15, physical: 12, status: 'Discrepancy' }
  ]);

  const handleAddCount = (e) => {
    e.preventDefault();
    const targetProd = products.find(p => p.id === parseInt(form.productId, 10)) || products[0];
    const newCount = {
      id: Date.now(),
      product: targetProd.name,
      sku: targetProd.sku,
      expected: targetProd.stock,
      physical: parseInt(form.physicalQty, 10),
      status: parseInt(form.physicalQty, 10) === targetProd.stock ? 'Match' : 'Discrepancy'
    };
    setCountsList([newCount, ...countsList]);
    addToast(`Recorded physical count for ${targetProd.name}`);
  };

  const handleFinalSubmit = () => {
    addToast('Physical count session submitted for discrepancy review!');
    navigate('/reconciliation/discrepancies');
  };

  return (
    <div className="space-y-6">
      {/* Header & Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 text-xs text-muted mb-1">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span>/</span>
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/reconciliation')}>Reconciliation</span>
          <span>/</span>
          <span className="text-primary font-medium">Physical Stock Count</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Physical Stock Count Workflow</h1>
            <p className="text-sm text-muted">Scan barcodes or record manual shelf counts to compare against system records.</p>
          </div>
          <button
            onClick={handleFinalSubmit}
            className="px-5 py-2 bg-primary text-surface-dark font-semibold hover:bg-primary-hover rounded-xl text-xs shadow-lg transition"
          >
            Submit Full Count Session
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Count Input Card */}
        <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-foreground">Record Item Count</h2>

          <form onSubmit={handleAddCount} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Warehouse Facility</label>
              <select
                value={form.warehouseId}
                onChange={e => setForm({ ...form, warehouseId: e.target.value })}
                className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
              >
                {warehouses.map(wh => (
                  <option key={wh.id} value={wh.id}>
                    {wh.name} ({wh.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-muted mb-1">Barcode / QR Quick Scan</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Scan barcode label..."
                  value={form.barcodeInput}
                  onChange={e => setForm({ ...form, barcodeInput: e.target.value })}
                  className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-xs text-foreground font-mono focus:outline-none focus:border-primary"
                />
                <button type="button" className="px-3 py-2 bg-surface-elevated border border-border text-primary rounded-xl text-xs">
                  📷
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-muted mb-1">Select Product</label>
              <select
                value={form.productId}
                onChange={e => setForm({ ...form, productId: e.target.value })}
                className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
              >
                {products.map(prod => (
                  <option key={prod.id} value={prod.id}>
                    {prod.name} ({prod.sku})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-muted mb-1">Physical Quantity Verified *</label>
              <input
                type="number"
                min="0"
                value={form.physicalQty}
                onChange={e => setForm({ ...form, physicalQty: e.target.value })}
                className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary font-bold text-primary"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-surface-elevated border border-border text-foreground hover:border-primary rounded-xl text-xs font-semibold transition"
            >
              + Add Item Count to Session
            </button>
          </form>
        </div>

        {/* Live Count Sheet */}
        <div className="lg:col-span-2 bg-surface border border-border rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-foreground">Session Audit Sheet</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-surface-elevated/70 border-b border-border text-muted uppercase font-semibold">
                  <th className="py-2.5 px-3">Product Name</th>
                  <th className="py-2.5 px-3">SKU</th>
                  <th className="py-2.5 px-3">Expected</th>
                  <th className="py-2.5 px-3">Physical Count</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {countsList.map(item => (
                  <tr key={item.id} className="hover:bg-surface-elevated/40 transition">
                    <td className="py-3 px-3 font-semibold text-foreground">{item.product}</td>
                    <td className="py-3 px-3 font-mono text-muted">{item.sku}</td>
                    <td className="py-3 px-3 text-foreground font-semibold">{item.expected}</td>
                    <td className="py-3 px-3 text-primary font-bold">{item.physical}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        item.status === 'Match'
                          ? 'bg-success/20 text-success border border-success/30'
                          : 'bg-warning/20 text-warning border border-warning/30'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
