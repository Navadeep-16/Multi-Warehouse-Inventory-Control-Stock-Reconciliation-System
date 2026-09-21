import React, { useState } from 'react';
import { useInventoryData } from '../../context/InventoryDataContext';
import { Tag, ShieldCheck, Plus, Search, Edit2, Trash2 } from 'lucide-react';

export const CategoriesBrandsPage = () => {
  const { categories, brands, addToast } = useInventoryData();
  const [activeTab, setActiveTab] = useState('categories'); // 'categories' | 'brands'
  const [search, setSearch] = useState('');

  const filteredCategories = categories.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  const filteredBrands = brands.filter(b => b.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Categories & Brands</h1>
          <p className="text-muted text-sm mt-1">Organize product classification hierarchies, brand definitions, and metadata tags.</p>
        </div>
        <button 
          onClick={() => addToast(`Added new ${activeTab === 'categories' ? 'category' : 'brand'}!`)}
          className="bg-primary text-background px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add {activeTab === 'categories' ? 'Category' : 'Brand'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border gap-6 text-sm font-semibold">
        <button 
          onClick={() => setActiveTab('categories')}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'categories' ? 'border-primary text-primary' : 'border-transparent text-muted hover:text-foreground'
          }`}
        >
          <Tag className="w-4 h-4" /> Product Categories ({categories.length})
        </button>
        <button 
          onClick={() => setActiveTab('brands')}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'brands' ? 'border-primary text-primary' : 'border-transparent text-muted hover:text-foreground'
          }`}
        >
          <ShieldCheck className="w-4 h-4" /> Brand Partners ({brands.length})
        </button>
      </div>

      {/* Search */}
      <div className="bg-surface border border-border p-4 rounded-xl">
        <div className="relative max-w-sm w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input 
            type="text" 
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={`Search ${activeTab}...`}
            className="w-full bg-surface-elevated border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary text-foreground placeholder:text-muted"
          />
        </div>
      </div>

      {/* Tab 1: Categories Grid */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map(cat => (
            <div key={cat.id} className="bg-surface border border-border rounded-xl p-6 hover:border-primary/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-heading font-bold text-foreground text-lg">{cat.name}</h3>
                  <span className="bg-primary/10 text-primary font-mono text-xs font-bold px-2.5 py-0.5 rounded">
                    {cat.productCount} SKUs
                  </span>
                </div>
                <p className="text-xs text-muted leading-relaxed mb-4">{cat.description}</p>
              </div>
              <div className="pt-4 border-t border-border flex justify-end gap-2 text-muted">
                <button className="hover:text-foreground p-1 text-xs flex items-center gap-1"><Edit2 className="w-3.5 h-3.5" /> Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Brands Grid */}
      {activeTab === 'brands' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBrands.map(b => (
            <div key={b.id} className="bg-surface border border-border rounded-xl p-6 hover:border-primary/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-heading font-bold text-foreground text-lg">{b.name}</h3>
                  <span className="bg-success/10 text-success text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                    {b.status}
                  </span>
                </div>
                <div className="text-xs text-muted space-y-1 mt-2 font-mono">
                  <div>Country: <span className="text-foreground">{b.country}</span></div>
                  <div>Catalog Products: <span className="text-primary font-bold">{b.productCount}</span></div>
                </div>
              </div>
              <div className="pt-4 border-t border-border flex justify-end gap-2 text-muted mt-4">
                <button className="hover:text-foreground p-1 text-xs flex items-center gap-1"><Edit2 className="w-3.5 h-3.5" /> Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
