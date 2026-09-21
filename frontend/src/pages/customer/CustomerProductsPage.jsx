import React, { useState } from 'react';
import { useInventoryData } from '../../context/InventoryDataContext';
import { Search, ShoppingCart, Filter, Sparkles, Check, Package } from 'lucide-react';

export const CustomerProductsPage = () => {
  const { products, addToCart } = useInventoryData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200 select-none">
      {/* Header */}
      <div className="bg-[#0D141E] border border-[#1D2A3A] rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-[#E056FD]/15 text-[#E056FD] border border-[#E056FD]/30 uppercase tracking-wider">
              NEXORA RETAIL CATALOG
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F7FA] tracking-tight">
            Browse Products & Hardware
          </h1>
          <p className="text-[#7F8DA3] text-xs sm:text-sm mt-1">
            Official commercial pricing and available stock across distribution hubs.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0D141E] border border-[#1D2A3A] p-4 rounded-xl">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7F8DA3]" />
          <input
            type="text"
            placeholder="Search products or SKUs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#111A26] border border-[#1D2A3A] rounded-xl pl-9 pr-4 py-2 text-xs text-[#F5F7FA] focus:outline-none focus:border-[#E7B65A]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <Filter className="w-4 h-4 text-[#7F8DA3] shrink-0" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#E7B65A] text-[#070B11]'
                  : 'bg-[#111A26] text-[#7F8DA3] border border-[#1D2A3A] hover:text-[#F5F7FA]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(prod => (
          <div key={prod.id} className="bg-[#0D141E] border border-[#1D2A3A] hover:border-[#E7B65A]/50 rounded-2xl overflow-hidden flex flex-col justify-between group transition-all shadow-lg">
            <div className="p-4 space-y-3">
              <div className="h-44 bg-[#111A26] rounded-xl overflow-hidden flex items-center justify-center p-3 relative">
                <img 
                  src={prod.image || 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=500&q=80'} 
                  alt={prod.name} 
                  className="object-contain h-full w-full group-hover:scale-105 transition-transform"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-[#070B11]/80 text-[#E7B65A] border border-[#1D2A3A]">
                  {prod.category}
                </span>
              </div>

              <div>
                <div className="text-[10px] font-mono text-[#7F8DA3]">{prod.sku}</div>
                <h3 className="text-sm font-bold text-[#F5F7FA] mt-0.5 line-clamp-1">{prod.name}</h3>
                <p className="text-xs text-[#7F8DA3] line-clamp-2 mt-1">{prod.description || 'High-performance commercial product with full warranty.'}</p>
              </div>
            </div>

            <div className="p-4 pt-3 border-t border-[#1D2A3A] flex items-center justify-between bg-[#070B11]/40">
              <div>
                <div className="text-base font-bold font-mono text-[#F5F7FA]">
                  ${(prod.unitPrice || 999).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
                <div className="text-[10px] text-[#43C98B] font-bold">
                  {prod.stock > 0 ? `In Stock (${prod.stock} units)` : 'Out of Stock'}
                </div>
              </div>

              <button
                onClick={() => addToCart(prod)}
                disabled={prod.stock === 0}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  prod.stock === 0
                    ? 'bg-[#1D2A3A] text-[#7F8DA3] cursor-not-allowed'
                    : 'bg-[#E7B65A] hover:bg-[#f0c46e] text-[#070B11] shadow-[0_0_15px_rgba(231,182,90,0.2)]'
                }`}
              >
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
