import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Package, Warehouse, ShoppingCart, Bell, Hexagon, 
  Layers, ArrowRightLeft, Activity, Users, Settings, Search, 
  BarChart2, FileText, ChevronDown, ChevronRight, ShieldCheck, 
  UserCircle, HelpCircle, Truck, Database, Smartphone, QrCode
} from 'lucide-react';

export const Sidebar = () => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState(() => {
    const saved = localStorage.getItem('expandedMenus');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('expandedMenus', JSON.stringify(expandedMenus));
  }, [expandedMenus]);

  const toggleMenu = (label) => {
    setExpandedMenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const menuGroups = [
    {
      group: 'Core',
      items: [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { 
          label: 'Inventory', icon: Layers, 
          submenus: [
            { label: 'All Inventory', path: '/inventory' },
            { label: 'Available Stock', path: '/inventory/available' },
            { label: 'Low Stock', path: '/inventory/low-stock' },
            { label: 'Out of Stock', path: '/inventory/out-of-stock' },
            { label: 'Inventory Valuation', path: '/inventory/valuation' }
          ]
        },
        { 
          label: 'Warehouses', icon: Warehouse,
          submenus: [
            { label: 'All Warehouses', path: '/warehouses' },
            { label: 'Locations & Zones', path: '/warehouses/locations' },
            { label: 'Warehouse Capacity', path: '/warehouses/capacity' }
          ]
        },
        { 
          label: 'Products', icon: Package,
          submenus: [
            { label: 'All Products', path: '/products' },
            { label: 'Categories & Brands', path: '/products/categories' },
            { label: 'Batches & Serial Nos', path: '/products/batches' }
          ]
        }
      ]
    },
    {
      group: 'Operations',
      items: [
        {
          label: 'Stock Operations', icon: Activity,
          submenus: [
            { label: 'Stock In (Receive)', path: '/operations/stock-in' },
            { label: 'Stock Out (Issue)', path: '/operations/stock-out' },
            { label: 'Stock Adjustments', path: '/operations/adjustments' }
          ]
        },
        {
          label: 'Transfers', icon: ArrowRightLeft,
          submenus: [
            { label: 'All Transfers', path: '/transfers' },
            { label: 'Create Transfer', path: '/transfers/create' },
            { label: 'Pending Approvals', path: '/transfers/approvals' }
          ]
        },
        {
          label: 'Reconciliation', icon: ShieldCheck,
          submenus: [
            { label: 'Reconciliation Dash', path: '/reconciliation' },
            { label: 'Physical Stock Count', path: '/reconciliation/count' },
            { label: 'Discrepancy Review', path: '/reconciliation/review' }
          ]
        }
      ]
    },
    {
      group: 'Supply Chain',
      items: [
        {
          label: 'Procurement', icon: Truck,
          submenus: [
            { label: 'Purchase Orders', path: '/procurement/orders' },
            { label: 'Purchase Requests', path: '/procurement/requests' }
          ]
        },
        { label: 'Orders', icon: ShoppingCart, path: '/orders' },
        { label: 'Suppliers', icon: Database, path: '/suppliers' },
        { label: 'Customers', icon: Users, path: '/customers' }
      ]
    },
    {
      group: 'Insights & Tools',
      items: [
        { label: 'Smart Inventory', icon: Smartphone, path: '/smart-inventory' },
        { label: 'Analytics', icon: BarChart2, path: '/analytics' },
        { label: 'Reports', icon: FileText, path: '/reports' },
        { label: 'Barcode/QR', icon: QrCode, path: '/barcode' }
      ]
    },
    {
      group: 'Administration',
      items: [
        { label: 'Users & Roles', icon: UserCircle, path: '/admin/users' },
        { label: 'Audit Logs', icon: FileText, path: '/admin/audit' },
        { label: 'Settings', icon: Settings, path: '/settings' },
        { label: 'Help & Support', icon: HelpCircle, path: '/support' }
      ]
    }
  ];

  return (
    <aside className="w-72 bg-surface border-r border-border flex flex-col h-screen sticky top-0 overflow-hidden">
      {/* Logo Area */}
      <div className="p-6 flex items-center gap-3 border-b border-border">
        <Hexagon className="w-8 h-8 text-primary" fill="currentColor" fillOpacity={0.2} />
        <span className="font-heading font-bold text-2xl tracking-[0.15em] text-foreground">NEXORA</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-6 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        {menuGroups.map((group, groupIdx) => (
          <div key={groupIdx}>
            <h3 className="text-[10px] font-bold text-muted uppercase tracking-widest mb-3 px-4">
              {group.group}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isExpanded = expandedMenus[item.label];
                const hasSubmenus = item.submenus && item.submenus.length > 0;
                
                // Check if current path matches any submenu path
                const isActive = item.path 
                  ? location.pathname.startsWith(item.path)
                  : hasSubmenus && item.submenus.some(sub => location.pathname.startsWith(sub.path));

                return (
                  <div key={item.label}>
                    {hasSubmenus ? (
                      <button
                        onClick={() => toggleMenu(item.label)}
                        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 ${
                          isActive && !isExpanded
                            ? 'bg-surface-elevated text-primary border-l-2 border-primary shadow-[inset_0px_0px_16px_rgba(0,229,184,0.05)]'
                            : 'text-muted hover:bg-surface-elevated hover:text-foreground'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium text-sm">{item.label}</span>
                        </div>
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </button>
                    ) : (
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                            isActive
                              ? 'bg-surface-elevated text-primary border-l-2 border-primary shadow-[inset_0px_0px_16px_rgba(0,229,184,0.05)]'
                              : 'text-muted hover:bg-surface-elevated hover:text-foreground'
                          }`
                        }
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium text-sm">{item.label}</span>
                      </NavLink>
                    )}

                    {/* Submenus */}
                    {hasSubmenus && isExpanded && (
                      <div className="mt-1 mb-2 ml-4 pl-4 border-l border-border space-y-1">
                        {item.submenus.map(sub => (
                          <NavLink
                            key={sub.path}
                            to={sub.path}
                            className={({ isActive }) =>
                              `block px-4 py-2 rounded-md text-sm transition-all duration-200 ${
                                isActive
                                  ? 'bg-primary/10 text-primary font-semibold'
                                  : 'text-muted hover:bg-surface-elevated hover:text-foreground'
                              }`
                            }
                          >
                            {sub.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* System Status Footer */}
      <div className="p-4 border-t border-border m-4 rounded-xl bg-surface-elevated flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 text-muted text-sm">
          <Bell className="w-4 h-4" />
          <span>System Status</span>
        </div>
        <div className="w-2 h-2 rounded-full bg-success animate-pulse shadow-[0_0_8px_rgba(0,229,184,0.8)]"></div>
      </div>
    </aside>
  );
};
