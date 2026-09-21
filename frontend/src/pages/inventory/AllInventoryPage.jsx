import React, { useState } from 'react';
import { useInventoryData } from '../../context/InventoryDataContext';
import { Search, Filter, Download, Plus, ArrowUpDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AllInventoryPage = ({ filterType = 'all' }) => {
  const { inventoryItems, warehouses, categories, addToast } = useInventoryData();
  const [search, setSearch] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Filtering based on filterType and search options
  let filtered = inventoryItems.filter(item => {
    if (filterType === 'available' && item.available <= 0) return false;
    if (filterType === 'low-stock' && (item.available <= 0 || item.available > item.reorder)) return false;
    if (filterType === 'out-of-stock' && item.available !== 0) return false;

    if (selectedWarehouse && item.warehouse !== selectedWarehouse) return false;
    if (selectedCategory && item.category !== selectedCategory) return false;

    if (search) {
      const q = search.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q) ||
        item.warehouse.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Sorting
  filtered.sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }
    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const exportCSV = () => {
    const headers = 'SKU,Product Name,Category,Warehouse,Available,Reserved,Reorder Level,Unit Cost,Total Value,Status\n';
    const rows = filtered.map(i => `"${i.sku}","${i.name}","${i.category}","${i.warehouse}",${i.available},${i.reserved},${i.reorder},${i.unitCost},${(i.available * i.unitCost).toFixed(2)},"${i.status}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nexora_inventory_${filterType}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    addToast('CSV Exported successfully!');
  };

  const getPageTitle = () => {
    switch (filterType) {
      case 'available': return 'Available Stock';
      case 'low-stock': return 'Low Stock Items';
      case 'out-of-stock': return 'Out of Stock Items';
      default: return 'Global Inventory';
    }
  };

  const getPageSub = () => {
    switch (filterType) {
      case 'available': return 'Showing products currently in stock and ready for issue or transfer.';
      case 'low-stock': return 'Products running below configured reorder thresholds.';
      case 'out-of-stock': return 'Products with zero available inventory requiring urgent replenishment.';
      default: return 'Complete stock visibility across all warehouses and fulfillment nodes.';
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">{getPageTitle()}</h1>
          <p className="text-muted text-sm mt-1">{getPageSub()}</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={exportCSV} 
            className="bg-surface-elevated text-foreground px-4 py-2 rounded-lg text-sm font-semibold border border-border hover:border-primary/50 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <Link 
            to="/operations/stock-in" 
            className="bg-primary text-background px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Stock
          </Link>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-surface border border-border p-4 rounded-xl flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-1 flex-wrap gap-4 items-center min-w-[280px]">
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by SKU, Product, Warehouse..." 
              className="w-full bg-surface-elevated border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary text-foreground placeholder:text-muted"
            />
          </div>

          <select 
            value={selectedWarehouse}
            onChange={(e) => setSelectedWarehouse(e.target.value)}
            className="bg-surface-elevated border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary text-foreground"
          >
            <option value="">All Warehouses</option>
            {warehouses.map(w => (
              <option key={w.id} value={w.code}>{w.code} ({w.name})</option>
            ))}
          </select>

          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-surface-elevated border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary text-foreground"
          >
            <option value="">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="text-xs text-muted font-mono">
          Showing <span className="text-foreground font-bold">{filtered.length}</span> items
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-surface-elevated/60 text-muted uppercase text-[10px] tracking-wider font-bold border-b border-border">
              <tr>
                <th className="px-6 py-4 cursor-pointer hover:text-foreground" onClick={() => handleSort('sku')}>
                  <div className="flex items-center gap-1">
                    SKU / Product <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-4 cursor-pointer hover:text-foreground" onClick={() => handleSort('warehouse')}>
                  <div className="flex items-center gap-1">
                    Warehouse <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-4 cursor-pointer hover:text-foreground" onClick={() => handleSort('available')}>
                  <div className="flex items-center gap-1">
                    Available <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-4">Reserved</th>
                <th className="px-6 py-4">Reorder Level</th>
                <th className="px-6 py-4 cursor-pointer hover:text-foreground" onClick={() => handleSort('unitCost')}>
                  <div className="flex items-center gap-1">
                    Unit Cost <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-4">Total Value</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-muted">
                    No inventory records match your criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => {
                  const totalVal = item.available * item.unitCost;
                  return (
                    <tr key={item.id} className="hover:bg-surface-elevated/40 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-foreground font-mono">{item.sku}</div>
                        <div className="text-xs text-muted mt-0.5">{item.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-surface-elevated border border-border px-2.5 py-1 rounded text-xs font-mono text-foreground">{item.warehouse}</span>
                      </td>
                      <td className="px-6 py-4 font-mono font-bold">
                        <span className={item.available <= 0 ? 'text-danger' : item.available <= item.reorder ? 'text-warning' : 'text-foreground'}>
                          {item.available}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-muted">{item.reserved}</td>
                      <td className="px-6 py-4 font-mono text-muted">{item.reorder}</td>
                      <td className="px-6 py-4 font-mono">${item.unitCost.toFixed(2)}</td>
                      <td className="px-6 py-4 font-mono font-semibold text-primary">${totalVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          item.status === 'Healthy' ? 'bg-success/10 text-success' :
                          item.status === 'Overstock' ? 'bg-info/10 text-info' :
                          item.status === 'Low Stock' ? 'bg-warning/10 text-warning' :
                          'bg-danger/10 text-danger'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <Link to="/operations/stock-in" className="text-xs text-primary hover:underline font-semibold">Stock In</Link>
                        <span className="text-border">|</span>
                        <Link to="/transfers/create" className="text-xs text-muted hover:text-foreground font-semibold">Transfer</Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
