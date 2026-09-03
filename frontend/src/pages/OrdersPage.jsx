import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, ChevronDown, ChevronRight, ShoppingCart, CheckCircle2, Building2 } from 'lucide-react';
import { getOrders, placeOrder as createOrder } from '../api/orderApi';
import { getProducts } from '../api/productApi';
import { getWarehouses } from '../api/inventoryApi';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { SlidePanel } from '../components/ui/SlidePanel';
import { Badge } from '../components/ui/badge';

export const OrdersPage = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const isManager = user?.role === 'MANAGER';
  
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [orderStep, setOrderStep] = useState(1);
  const [newOrder, setNewOrder] = useState({ items: [], warehouseId: '' });
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedQty, setSelectedQty] = useState('');

  const { data: orders = [], isLoading: isLoadingOrders } = useQuery({ queryKey: ['orders'], queryFn: getOrders });
  const { data: products = [] } = useQuery({ queryKey: ['products'], queryFn: getProducts });
  const { data: warehouses = [] } = useQuery({ queryKey: ['warehouses'], queryFn: getWarehouses });

  const createMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      setIsPanelOpen(false);
      setOrderStep(1);
      setNewOrder({ items: [], warehouseId: '' });
    },
  });

  const toggleRow = (id) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  const handleAddItem = () => {
    if (!selectedProduct || !selectedQty) return;
    const p = products.find(x => x.id === selectedProduct);
    if (!p) return;
    
    setNewOrder({
      ...newOrder,
      items: [...newOrder.items, { productId: p.id, name: p.name, quantity: parseInt(selectedQty), unitPrice: p.unitPrice }]
    });
    setSelectedProduct('');
    setSelectedQty('');
  };

  const handleRemoveItem = (index) => {
    const updated = [...newOrder.items];
    updated.splice(index, 1);
    setNewOrder({ ...newOrder, items: updated });
  };

  const handleSubmitOrder = () => {
    const payload = {
      warehouseId: newOrder.warehouseId,
      items: newOrder.items.map(i => ({ productId: i.productId, quantity: i.quantity }))
    };
    createMutation.mutate(payload);
  };

  const getProductName = (id) => products.find(p => p.id === id)?.name || id;
  const getWarehouseName = (id) => warehouses.find(w => w.id === id)?.name || id;

  const orderTotal = newOrder.items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Order Management</h1>
          <p className="text-muted mt-1">Track customer orders and fulfillment status.</p>
        </div>
        {isManager && (
          <Button onClick={() => { setIsPanelOpen(true); setOrderStep(1); setNewOrder({ items: [], warehouseId: '' }); }}>
            <Plus className="w-4 h-4 mr-2" /> Place New Order
          </Button>
        )}
      </div>

      <div className="border border-border rounded-xl bg-surface shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Items</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingOrders ? (
              <TableRow><TableCell colSpan={6} className="text-center py-12 text-muted font-mono">LOADING_ORDERS...</TableCell></TableRow>
            ) : orders.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center py-12 text-muted">No orders found.</TableCell></TableRow>
            ) : (
              orders.map((o) => (
                <React.Fragment key={o.id}>
                  <TableRow className="cursor-pointer group" onClick={() => toggleRow(o.id)}>
                    <TableCell>
                      <button className="p-1 rounded hover:bg-surface-elevated text-muted group-hover:text-primary transition-colors">
                        {expandedOrderId === o.id ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </button>
                    </TableCell>
                    <TableCell className="font-mono text-primary font-medium">#{o.id.substring(0,8).toUpperCase()}</TableCell>
                    <TableCell><Badge status={o.status} /></TableCell>
                    <TableCell className="text-muted text-xs font-mono">{new Date(o.createdAt).toLocaleString()}</TableCell>
                    <TableCell className="text-right font-mono">{o.items.length}</TableCell>
                    <TableCell className="text-right font-mono font-bold text-foreground">
                      ${o.items.reduce((acc, i) => acc + (i.priceAtOrder * i.quantity), 0).toFixed(2)}
                    </TableCell>
                  </TableRow>
                  {expandedOrderId === o.id && (
                    <TableRow className="bg-surface-elevated/50 hover:bg-surface-elevated/50">
                      <TableCell colSpan={6} className="p-0 border-b border-border">
                        <div className="p-6 pl-16">
                          <h4 className="text-xs font-bold text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                            <ShoppingCart className="w-4 h-4" /> Order Line Items
                          </h4>
                          <div className="bg-surface border border-border rounded-lg overflow-hidden">
                            <Table>
                              <TableHeader>
                                <TableRow className="border-border">
                                  <TableHead className="h-8 bg-surface-elevated text-[10px]">Product</TableHead>
                                  <TableHead className="h-8 bg-surface-elevated text-[10px] text-right">Unit Price</TableHead>
                                  <TableHead className="h-8 bg-surface-elevated text-[10px] text-right">Qty</TableHead>
                                  <TableHead className="h-8 bg-surface-elevated text-[10px] text-right">Subtotal</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {o.items.map(item => (
                                  <TableRow key={item.id} className="border-border">
                                    <TableCell className="py-2 text-sm text-foreground">{getProductName(item.productId)}</TableCell>
                                    <TableCell className="py-2 text-right font-mono text-muted text-xs">${item.priceAtOrder.toFixed(2)}</TableCell>
                                    <TableCell className="py-2 text-right font-mono text-foreground text-sm">{item.quantity}</TableCell>
                                    <TableCell className="py-2 text-right font-mono text-primary font-medium text-sm">
                                      ${(item.priceAtOrder * item.quantity).toFixed(2)}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <SlidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} title="Place New Order">
        <div className="flex flex-col h-full">
          {/* Step indicator */}
          <div className="flex items-center justify-between mb-8 relative">
            <div className="absolute left-0 top-1/2 w-full h-px bg-border -z-10"></div>
            {[1, 2, 3].map(step => (
              <div key={step} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                orderStep === step ? 'bg-primary text-[#0A0E14] shadow-[0_0_12px_rgba(0,229,184,0.4)]' : 
                orderStep > step ? 'bg-success text-[#0A0E14]' : 'bg-surface-elevated border border-border text-muted'
              }`}>
                {orderStep > step ? <CheckCircle2 className="w-5 h-5" /> : step}
              </div>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto">
            {orderStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-heading font-semibold">1. Select Products</h3>
                <div className="bg-surface border border-border p-4 rounded-lg space-y-4">
                  <div>
                    <label className="text-[10px] text-muted uppercase tracking-wider font-bold mb-1 block">Product</label>
                    <select className="flex h-9 w-full rounded-md border border-border bg-surface-elevated px-3 py-1 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:border-primary"
                      value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)}>
                      <option value="">Select a product...</option>
                      {products.map(p => <option key={p.id} value={p.id}>{p.name} - ${p.unitPrice}</option>)}
                    </select>
                  </div>
                  <div className="flex gap-4 items-end">
                    <div className="flex-1">
                      <label className="text-[10px] text-muted uppercase tracking-wider font-bold mb-1 block">Quantity</label>
                      <Input type="number" min="1" value={selectedQty} onChange={e => setSelectedQty(e.target.value)} className="font-mono" />
                    </div>
                    <Button type="button" variant="secondary" onClick={handleAddItem}>Add</Button>
                  </div>
                </div>
                
                {newOrder.items.length > 0 && (
                  <div className="border border-border rounded-lg bg-surface overflow-hidden">
                    <Table>
                      <TableHeader><TableRow><TableHead>Item</TableHead><TableHead className="text-right">Qty</TableHead><TableHead></TableHead></TableRow></TableHeader>
                      <TableBody>
                        {newOrder.items.map((item, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="text-sm">{item.name}</TableCell>
                            <TableCell className="text-right font-mono">{item.quantity}</TableCell>
                            <TableCell className="text-right">
                              <button type="button" onClick={() => handleRemoveItem(idx)} className="text-danger hover:underline text-xs">Remove</button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            )}

            {orderStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-heading font-semibold">2. Select Warehouse</h3>
                <div className="space-y-3">
                  {warehouses.map(w => (
                    <button type="button" key={w.id} onClick={() => setNewOrder({...newOrder, warehouseId: w.id})}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        newOrder.warehouseId === w.id 
                        ? 'border-primary bg-primary/10 shadow-[inset_0_0_12px_rgba(0,229,184,0.1)]' 
                        : 'border-border bg-surface hover:bg-surface-elevated'
                      }`}>
                      <div className="font-medium text-foreground">{w.name}</div>
                      <div className="text-xs text-muted mt-1">{w.location}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {orderStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-heading font-semibold">3. Review & Confirm</h3>
                <div className="bg-surface-elevated rounded-xl p-6 border border-border space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Fulfillment Center</h4>
                    <p className="text-foreground font-medium flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-primary" />
                      {getWarehouseName(newOrder.warehouseId)}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Order Items</h4>
                    <ul className="space-y-2">
                      {newOrder.items.map((item, idx) => (
                        <li key={idx} className="flex justify-between items-center text-sm border-b border-border/50 pb-2 last:border-0 last:pb-0">
                          <span className="text-muted">{item.quantity}x {item.name}</span>
                          <span className="font-mono text-foreground">${(item.quantity * item.unitPrice).toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-border flex justify-between items-center">
                    <span className="text-sm font-bold uppercase tracking-wider text-foreground">Total</span>
                    <span className="text-xl font-mono font-bold text-primary">${orderTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-border flex justify-between items-center">
            <Button type="button" variant="ghost" onClick={() => orderStep > 1 ? setOrderStep(orderStep - 1) : setIsPanelOpen(false)}>
              {orderStep > 1 ? 'Back' : 'Cancel'}
            </Button>
            
            {orderStep < 3 ? (
              <Button type="button" onClick={() => setOrderStep(orderStep + 1)} disabled={
                (orderStep === 1 && newOrder.items.length === 0) || 
                (orderStep === 2 && !newOrder.warehouseId)
              }>
                Next Step
              </Button>
            ) : (
              <Button type="button" onClick={handleSubmitOrder} disabled={createMutation.isPending}>
                {createMutation.isPending ? 'Processing...' : 'Submit Order'}
              </Button>
            )}
          </div>
        </div>
      </SlidePanel>
    </div>
  );
};
