import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventoryData } from '../context/InventoryDataContext';

export default function BarcodeQRPage() {
  const navigate = useNavigate();
  const { products, addToast } = useInventoryData();

  const [scannedCode, setScannedCode] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(products[0] || null);
  const [activeTab, setActiveTab] = useState('lookup');

  const handleScanLookup = (e) => {
    e.preventDefault();
    const found = products.find(p => p.barcode === scannedCode || p.sku.toLowerCase() === scannedCode.toLowerCase());
    if (found) {
      setSelectedProduct(found);
      addToast(`Found matching product: ${found.name}`);
    } else {
      addToast(`No product matching barcode "${scannedCode}"`, 'warning');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-muted mb-1">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span>/</span>
          <span className="text-primary font-medium">Barcode / QR Scanner</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Barcode & QR Code Station</h1>
          <p className="text-sm text-muted">Scan, lookup SKU metadata, and generate print labels for warehouse shelves.</p>
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="flex gap-2 border-b border-border pb-2">
        <button
          onClick={() => setActiveTab('lookup')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === 'lookup'
              ? 'bg-primary text-surface-dark shadow'
              : 'bg-surface text-muted hover:text-foreground'
          }`}
        >
          🔍 Scanner & Lookup
        </button>
        <button
          onClick={() => setActiveTab('generator')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === 'generator'
              ? 'bg-primary text-surface-dark shadow'
              : 'bg-surface text-muted hover:text-foreground'
          }`}
        >
          🏷️ Label & QR Generator
        </button>
      </div>

      {activeTab === 'lookup' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Scanner Card */}
          <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-foreground">Scanner Input Station</h2>

            {/* Camera Viewfinder Simulation */}
            <div className="relative h-48 bg-surface-elevated rounded-xl border border-border flex flex-col items-center justify-center p-4 text-center overflow-hidden">
              <div className="w-40 h-24 border-2 border-dashed border-primary/60 rounded-lg flex items-center justify-center relative animate-pulse">
                <span className="text-xs text-primary font-mono">ALIGN BARCODE HERE</span>
              </div>
              <p className="text-xs text-muted mt-3">Camera access standby. Manual barcode entry active below.</p>
            </div>

            <form onSubmit={handleScanLookup} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-muted mb-1">Manual Barcode / SKU Input</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter EAN-13, UPC or SKU..."
                    value={scannedCode}
                    onChange={e => setScannedCode(e.target.value)}
                    className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-xs text-foreground font-mono focus:outline-none focus:border-primary"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-surface-dark font-semibold rounded-xl text-xs hover:bg-primary-hover transition"
                  >
                    Lookup
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Product Scanned Details Card */}
          {selectedProduct && (
            <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] uppercase font-bold text-primary">SCANNED METADATA</span>
                  <h3 className="text-lg font-bold text-foreground">{selectedProduct.name}</h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-success/20 text-success border border-success/30">
                  {selectedProduct.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs p-4 bg-surface-elevated rounded-xl border border-border">
                <div>
                  <span className="text-muted block text-[10px]">SKU CODE</span>
                  <span className="font-mono text-primary font-bold">{selectedProduct.sku}</span>
                </div>
                <div>
                  <span className="text-muted block text-[10px]">BARCODE ID</span>
                  <span className="font-mono text-foreground font-medium">{selectedProduct.barcode}</span>
                </div>
                <div>
                  <span className="text-muted block text-[10px]">TOTAL CATALOG STOCK</span>
                  <span className="font-bold text-foreground text-sm">{selectedProduct.stock} pcs</span>
                </div>
                <div>
                  <span className="text-muted block text-[10px]">RETAIL UNIT PRICE</span>
                  <span className="font-bold text-primary text-sm">${selectedProduct.unitPrice}</span>
                </div>
              </div>

              {/* Barcode Graphic */}
              <div className="p-4 bg-white rounded-xl text-black flex flex-col items-center justify-center space-y-1">
                <div className="font-mono text-2xl font-black tracking-widest">||| | |||| || | ||| ||||</div>
                <span className="font-mono text-xs text-slate-800">{selectedProduct.barcode}</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Generator View */
        <div className="bg-surface border border-border rounded-2xl p-6 space-y-4 max-w-2xl">
          <h2 className="text-lg font-bold text-foreground">Warehouse Label & QR Generator</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Select Product to Print Label</label>
              <select
                onChange={e => setSelectedProduct(products.find(p => p.id === parseInt(e.target.value, 10)))}
                className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
              >
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>
                ))}
              </select>
            </div>

            {selectedProduct && (
              <div className="p-6 bg-white text-black rounded-xl space-y-3 flex flex-col items-center text-center">
                <h3 className="font-bold text-sm tracking-wide">{selectedProduct.name}</h3>
                <p className="text-xs font-mono text-slate-600">SKU: {selectedProduct.sku}</p>
                <div className="font-mono text-3xl font-black tracking-widest my-2">|||| | ||| || |||| | ||</div>
                <span className="text-xs font-mono">{selectedProduct.barcode}</span>

                <button
                  onClick={() => addToast(`Printing barcode label for ${selectedProduct.sku}...`)}
                  className="mt-4 px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-black transition"
                >
                  🖨️ Print Label Sticker
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
