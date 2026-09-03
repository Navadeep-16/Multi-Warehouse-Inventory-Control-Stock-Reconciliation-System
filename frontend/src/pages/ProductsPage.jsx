import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Search, Trash2 } from 'lucide-react';
import { getProducts, createProduct, deleteProduct } from '../api/productApi';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { SlidePanel } from '../components/ui/SlidePanel';

export const ProductsPage = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const isManager = user?.role === 'MANAGER';
  
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ sku: '', name: '', unitPrice: '' });
  const [searchQuery, setSearchQuery] = useState('');

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setIsPanelOpen(false);
      setNewProduct({ sku: '', name: '', unitPrice: '' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });

  const handleCreate = (e) => {
    e.preventDefault();
    createMutation.mutate(newProduct);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Products Catalog</h1>
          <p className="text-muted mt-1">Manage global product catalog and pricing.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <Input 
              placeholder="Search products..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {isManager && (
            <Button onClick={() => setIsPanelOpen(true)}>
              <Plus className="w-4 h-4 mr-2" /> Add Product
            </Button>
          )}
        </div>
      </div>

      <div className="border border-border rounded-xl bg-surface shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Unit Price</TableHead>
              {isManager && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={4} className="text-center py-12 text-muted font-mono">LOADING_DATA...</TableCell></TableRow>
            ) : filteredProducts.length === 0 ? (
              <TableRow><TableCell colSpan={4} className="text-center py-12 text-muted">No products found matching your criteria.</TableCell></TableRow>
            ) : (
              filteredProducts.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-mono text-muted">{p.sku}</TableCell>
                  <TableCell className="font-medium text-foreground">{p.name}</TableCell>
                  <TableCell className="text-right font-mono text-foreground">${p.unitPrice.toFixed(2)}</TableCell>
                  {isManager && (
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="text-muted hover:text-danger hover:bg-danger/10" onClick={() => deleteMutation.mutate(p.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <SlidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} title="Add New Product">
        <form onSubmit={handleCreate} className="flex flex-col h-full">
          <div className="space-y-6 flex-1">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted uppercase tracking-wider text-[11px]">Stock Keeping Unit (SKU)</label>
              <Input placeholder="e.g. LAPTOP-001" value={newProduct.sku} onChange={e => setNewProduct({...newProduct, sku: e.target.value})} required className="font-mono" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted uppercase tracking-wider text-[11px]">Product Name</label>
              <Input placeholder="High-Performance Laptop" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted uppercase tracking-wider text-[11px]">Unit Price ($)</label>
              <Input type="number" step="0.01" placeholder="999.99" value={newProduct.unitPrice} onChange={e => setNewProduct({...newProduct, unitPrice: e.target.value})} required className="font-mono" />
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setIsPanelOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={createMutation.isPending}>
              {createMutation.isPending ? 'Creating...' : 'Create Product'}
            </Button>
          </div>
        </form>
      </SlidePanel>
    </div>
  );
};
