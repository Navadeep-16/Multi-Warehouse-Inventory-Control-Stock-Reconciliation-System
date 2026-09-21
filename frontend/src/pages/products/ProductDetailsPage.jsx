import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventoryData } from '../../context/InventoryDataContext';

export default function ProductDetailsPage() {
  const navigate = useNavigate();
  const { products } = useInventoryData();
  const [selectedProd, setSelectedProd] = useState(products[0] || null);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs text-muted mb-1">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span>/</span>
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/products')}>Products</span>
          <span>/</span>
          <span className="text-primary font-medium">Product Details</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Product Master Inspection</h1>
            <p className="text-sm text-muted">Deep dive into SKU attributes, unit costs, pricing margins, and stock breakdown.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">Select SKU</h2>
          <div className="space-y-2">
            {products.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedProd(p)}
                className={`w-full text-left p-3 rounded-xl border text-xs transition ${
                  selectedProd?.id === p.id
                    ? 'bg-primary/10 border-primary text-primary font-bold'
                    : 'bg-surface-elevated border-border text-foreground hover:border-primary/40'
                }`}
              >
                <div className="font-semibold">{p.name}</div>
                <div className="text-[11px] text-muted font-mono">{p.sku}</div>
              </button>
            ))}
          </div>
        </div>

        {selectedProd && (
          <div className="lg:col-span-2 bg-surface border border-border rounded-2xl p-6 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{selectedProd.category} • {selectedProd.brand}</span>
                <h2 className="text-2xl font-bold text-foreground mt-1">{selectedProd.name}</h2>
                <p className="text-xs font-mono text-muted mt-1">SKU: {selectedProd.sku} | Barcode: {selectedProd.barcode}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-success/20 text-success border border-success/30">
                {selectedProd.status}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-surface-elevated rounded-xl border border-border text-xs">
              <div>
                <span className="text-muted block">Unit Cost</span>
                <span className="font-bold text-foreground text-sm">${selectedProd.unitCost}</span>
              </div>
              <div>
                <span className="text-muted block">Selling Price</span>
                <span className="font-bold text-primary text-sm">${selectedProd.unitPrice}</span>
              </div>
              <div>
                <span className="text-muted block">Profit Margin</span>
                <span className="font-bold text-success text-sm">${(selectedProd.unitPrice - selectedProd.unitCost).toFixed(2)}</span>
              </div>
              <div>
                <span className="text-muted block">Total Catalog Stock</span>
                <span className="font-bold text-foreground text-sm">{selectedProd.stock} pcs</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
