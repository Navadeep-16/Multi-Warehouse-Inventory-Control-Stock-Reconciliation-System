import React, { useState } from 'react';
import { useInventoryData } from '../../context/InventoryDataContext';
import { Package, Plus, Search, Filter, Edit2, Trash2, Tag, DollarSign } from 'lucide-react';

export const AllProductsPage = () => {
  const { products, categories, brands, addProduct, deleteProduct, addToast } = useInventoryData();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    barcode: '',
    category: 'Electronics',
    brand: 'Apple',
    unit: 'pcs',
    unitCost: '',
    unitPrice: '',
    stock: ''
  });

  const filtered = products.filter(p => {
    if (selectedCategory && p.category !== selectedCategory) return false;
    if (selectedBrand && p.brand !== selectedBrand) return false;
    if (search) {
      const q = search.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.barcode.includes(q);
    }
    return true;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.sku) return;
    addProduct(formData);
    setShowAddModal(false);
    setFormData({ sku: '', name: '', barcode: '', category: 'Electronics', brand: 'Apple', unit: 'pcs', unitCost: '', unitPrice: '', stock: '' });
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Product Catalog</h1>
          <p className="text-muted text-sm mt-1">Manage product master data, SKUs, pricing structures, and active stock variants.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-primary text-background px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add New Product
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-surface border border-border p-4 rounded-xl flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-1 flex-wrap gap-4 items-center">
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input 
              type="text" 
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search product name, SKU, barcode..."
              className="w-full bg-surface-elevated border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary text-foreground placeholder:text-muted"
            />
          </div>

          <select 
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="bg-surface-elevated border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary text-foreground"
          >
            <option value="">All Categories</option>
            {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>

          <select 
            value={selectedBrand}
            onChange={e => setSelectedBrand(e.target.value)}
            className="bg-surface-elevated border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary text-foreground"
          >
            <option value="">All Brands</option>
            {brands.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
          </select>
        </div>

        <span className="text-xs font-mono text-muted">Total Products: <strong className="text-foreground">{filtered.length}</strong></span>
      </div>

      {/* Products Table */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-surface-elevated/60 text-muted uppercase text-[10px] tracking-wider font-bold border-b border-border">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">SKU / Barcode</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Brand</th>
                <th className="px-6 py-4">Cost Price</th>
                <th className="px-6 py-4">Selling Price</th>
                <th className="px-6 py-4">Total Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-surface-elevated/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover border border-border shrink-0" />
                      <div>
                        <div className="font-semibold text-foreground">{p.name}</div>
                        <div className="text-xs text-muted">Unit: {p.unit}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono">
                    <div className="text-foreground font-semibold">{p.sku}</div>
                    <div className="text-[11px] text-muted">{p.barcode}</div>
                  </td>
                  <td className="px-6 py-4 text-muted">{p.category}</td>
                  <td className="px-6 py-4 text-muted">{p.brand}</td>
                  <td className="px-6 py-4 font-mono">${p.unitCost.toFixed(2)}</td>
                  <td className="px-6 py-4 font-mono text-primary font-semibold">${p.unitPrice.toFixed(2)}</td>
                  <td className="px-6 py-4 font-mono font-bold">{p.stock}</td>
                  <td className="px-6 py-4">
                    <span className="bg-success/10 text-success text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => deleteProduct(p.id)} className="text-muted hover:text-danger p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <h3 className="font-heading font-bold text-lg text-foreground">Add New Product to Catalog</h3>
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-muted mb-1 font-semibold">SKU Code</label>
                  <input 
                    type="text" 
                    required
                    value={formData.sku}
                    onChange={e => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="PROD-SKU-01" 
                    className="w-full bg-surface-elevated border border-border rounded-lg p-2.5 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted mb-1 font-semibold">Barcode</label>
                  <input 
                    type="text" 
                    value={formData.barcode}
                    onChange={e => setFormData({ ...formData, barcode: e.target.value })}
                    placeholder="885909743019" 
                    className="w-full bg-surface-elevated border border-border rounded-lg p-2.5 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-muted mb-1 font-semibold">Product Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enterprise Wireless Mouse" 
                  className="w-full bg-surface-elevated border border-border rounded-lg p-2.5 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-muted mb-1 font-semibold">Category</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-surface-elevated border border-border rounded-lg p-2.5 text-foreground focus:border-primary focus:outline-none"
                  >
                    {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-muted mb-1 font-semibold">Brand</label>
                  <select 
                    value={formData.brand}
                    onChange={e => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full bg-surface-elevated border border-border rounded-lg p-2.5 text-foreground focus:border-primary focus:outline-none"
                  >
                    {brands.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-muted mb-1 font-semibold">Unit Cost ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    required
                    value={formData.unitCost}
                    onChange={e => setFormData({ ...formData, unitCost: e.target.value })}
                    placeholder="100.00" 
                    className="w-full bg-surface-elevated border border-border rounded-lg p-2.5 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted mb-1 font-semibold">Selling Price ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    required
                    value={formData.unitPrice}
                    onChange={e => setFormData({ ...formData, unitPrice: e.target.value })}
                    placeholder="149.99" 
                    className="w-full bg-surface-elevated border border-border rounded-lg p-2.5 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted mb-1 font-semibold">Initial Stock</label>
                  <input 
                    type="number" 
                    required
                    value={formData.stock}
                    onChange={e => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="50" 
                    className="w-full bg-surface-elevated border border-border rounded-lg p-2.5 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-muted hover:text-foreground">Cancel</button>
                <button type="submit" className="bg-primary text-background px-4 py-2 rounded-lg font-semibold hover:bg-accent">Add Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
