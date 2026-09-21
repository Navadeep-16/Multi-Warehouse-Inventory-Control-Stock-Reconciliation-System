import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, Package, Warehouse, ShoppingCart, Bell, Hexagon, 
  Layers, ArrowRightLeft, Activity, Users, Settings, 
  BarChart2, FileText, ChevronDown, ChevronRight, ShieldCheck, 
  UserCircle, HelpCircle, Truck, Database, Smartphone, QrCode, CheckSquare, RotateCcw
} from 'lucide-react';

export const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isStaff = user?.role?.toUpperCase() === 'STAFF';

  // Manager Default Menu Structure
  const managerMenuGroups = [
    {
      group: 'CORE',
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
            { label: 'Categories & Brands', path: '/products/categories-brands' },
            { label: 'Batches & Serial Nos', path: '/products/batches-serials' }
          ]
        }
      ]
    },
    {
      group: 'OPERATIONS',
      items: [
        {
          label: 'Stock Operations', icon: Activity,
          submenus: [
            { label: 'Stock In (Receive)', path: '/operations/stock-in' },
            { label: 'Stock Out (Issue)', path: '/operations/stock-out' },
            { label: 'Stock Adjustments', path: '/operations/stock-adjustments' }
          ]
        },
        {
          label: 'Transfers', icon: ArrowRightLeft,
          submenus: [
            { label: 'All Transfers', path: '/transfers' },
            { label: 'Create Transfer', path: '/transfers/create' },
            { label: 'Pending Approvals', path: '/transfers/pending' }
          ]
        },
        {
          label: 'Reconciliation', icon: ShieldCheck,
          submenus: [
            { label: 'Reconciliation Dash', path: '/reconciliation' },
            { label: 'Physical Stock Count', path: '/reconciliation/physical-count' },
            { label: 'Discrepancy Review', path: '/reconciliation/discrepancies' }
          ]
        }
      ]
    },
    {
      group: 'SUPPLY CHAIN',
      items: [
        {
          label: 'Procurement', icon: Truck,
          submenus: [
            { label: 'Purchase Orders', path: '/procurement/purchase-orders' },
            { label: 'Purchase Requests', path: '/procurement/purchase-requests' }
          ]
        },
        { label: 'Orders', icon: ShoppingCart, path: '/orders' },
        { label: 'Suppliers', icon: Database, path: '/suppliers' },
        { label: 'Customers', icon: Users, path: '/customers' }
      ]
    },
    {
      group: 'INSIGHTS & TOOLS',
      items: [
        { label: 'Smart Inventory', icon: Smartphone, path: '/smart-inventory' },
        { label: 'Analytics', icon: BarChart2, path: '/analytics' },
        { label: 'Reports', icon: FileText, path: '/reports' },
        { label: 'Barcode/QR', icon: QrCode, path: '/barcode-qr' }
      ]
    },
    {
      group: 'ADMINISTRATION',
      items: [
        { label: 'Users & Roles', icon: UserCircle, path: '/users-roles' },
        { label: 'Audit Logs', icon: FileText, path: '/audit-logs' },
        { label: 'Settings', icon: Settings, path: '/settings' },
        { label: 'Help & Support', icon: HelpCircle, path: '/help-support' }
      ]
    }
  ];

  // EXACT STAFF MENU STRUCTURE SPECIFIED BY USER
  const staffMenuGroups = [
    {
      group: 'CORE',
      items: [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { 
          label: 'Inventory', icon: Layers, 
          submenus: [
            { label: 'All Inventory', path: '/inventory' },
            { label: 'Available Stock', path: '/inventory/available' },
            { label: 'Low Stock', path: '/inventory/low-stock' },
            { label: 'Out of Stock', path: '/inventory/out-of-stock' },
            { label: 'Expiring Soon', path: '/inventory/expiring' },
            { label: 'Stock Movement', path: '/inventory/movement' }
          ]
        },
        { 
          label: 'Products', icon: Package,
          submenus: [
            { label: 'All Products', path: '/products' },
            { label: 'Product Details', path: '/products/details' },
            { label: 'Batches & Serial Numbers', path: '/products/batches-serials' }
          ]
        },
        { 
          label: 'Warehouses', icon: Warehouse,
          submenus: [
            { label: 'My Warehouse', path: '/warehouses/my-warehouse' },
            { label: 'Locations & Zones', path: '/warehouses/locations' },
            { label: 'Bin Locations', path: '/warehouses/bin-locations' }
          ]
        },
        { 
          label: 'Orders', icon: ShoppingCart,
          submenus: [
            { label: 'All Orders', path: '/orders' },
            { label: 'Pending Orders', path: '/orders/pending' },
            { label: 'Processing Orders', path: '/orders/processing' },
            { label: 'Completed Orders', path: '/orders/completed' }
          ]
        }
      ]
    },
    {
      group: 'OPERATIONS',
      items: [
        {
          label: 'Stock Operations', icon: Activity,
          submenus: [
            { label: 'Stock In (Receive)', path: '/operations/stock-in' },
            { label: 'Stock Out (Issue)', path: '/operations/stock-out' },
            { label: 'Stock Adjustments', path: '/operations/stock-adjustments' },
            { label: 'Stock Returns', path: '/operations/stock-returns' }
          ]
        },
        {
          label: 'Transfers', icon: ArrowRightLeft,
          submenus: [
            { label: 'All Transfers', path: '/transfers' },
            { label: 'Create Transfer', path: '/transfers/create' },
            { label: 'My Transfer Requests', path: '/transfers/my-requests' },
            { label: 'Transfer History', path: '/transfers/history' }
          ]
        },
        {
          label: 'Reconciliation', icon: ShieldCheck,
          submenus: [
            { label: 'Physical Stock Count', path: '/reconciliation/physical-count' },
            { label: 'My Counting Tasks', path: '/reconciliation/my-tasks' },
            { label: 'Count History', path: '/reconciliation/history' }
          ]
        },
        {
          label: 'Returns', icon: RotateCcw,
          submenus: [
            { label: 'Customer Returns', path: '/returns/customer' },
            { label: 'Supplier Returns', path: '/returns/supplier' },
            { label: 'Return History', path: '/returns/history' }
          ]
        }
      ]
    },
    {
      group: 'TASKS',
      items: [
        {
          label: 'Tasks', icon: CheckSquare,
          submenus: [
            { label: 'My Tasks', path: '/tasks/my-tasks' },
            { label: 'Pending Tasks', path: '/tasks/pending' },
            { label: 'Completed Tasks', path: '/tasks/completed' },
            { label: 'Task History', path: '/tasks/history' }
          ]
        }
      ]
    },
    {
      group: 'TOOLS',
      items: [
        {
          label: 'Barcode / QR', icon: QrCode,
          submenus: [
            { label: 'Scan Product', path: '/barcode-qr/scan-product' },
            { label: 'Scan Location', path: '/barcode-qr/scan-location' },
            { label: 'Scan Serial Number', path: '/barcode-qr/scan-serial' }
          ]
        },
        {
          label: 'Reports', icon: FileText,
          submenus: [
            { label: 'Stock Report', path: '/reports/stock' },
            { label: 'Stock Movement Report', path: '/reports/stock-movement' },
            { label: 'Transfer Report', path: '/reports/transfer' },
            { label: 'Daily Activity Report', path: '/reports/daily-activity' }
          ]
        },
        { label: 'Notifications', icon: Bell, path: '/notifications' }
      ]
    },
    {
      group: 'ACCOUNT',
      items: [
        { label: 'My Profile', icon: UserCircle, path: '/profile' },
        { label: 'My Activity', icon: FileText, path: '/activity' },
        { label: 'Help & Support', icon: HelpCircle, path: '/help-support' },
        { label: 'Settings', icon: Settings, path: '/settings' }
      ]
    }
  ];

  const menuGroups = isStaff ? staffMenuGroups : managerMenuGroups;

  const [expandedMenus, setExpandedMenus] = useState(() => {
    const saved = localStorage.getItem('expandedMenus');
    const initial = saved ? JSON.parse(saved) : {};

    menuGroups.forEach(group => {
      group.items.forEach(item => {
        if (item.submenus) {
          const matches = item.submenus.some(sub => location.pathname === sub.path);
          if (matches) initial[item.label] = true;
        }
      });
    });

    return initial;
  });

  useEffect(() => {
    menuGroups.forEach(group => {
      group.items.forEach(item => {
        if (item.submenus) {
          const matches = item.submenus.some(sub => location.pathname === sub.path);
          if (matches) {
            setExpandedMenus(prev => ({ ...prev, [item.label]: true }));
          }
        }
      });
    });
  }, [location.pathname, isStaff]);

  useEffect(() => {
    localStorage.setItem('expandedMenus', JSON.stringify(expandedMenus));
  }, [expandedMenus]);

  const toggleMenu = (label) => {
    setExpandedMenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  return (
    <aside className="w-72 bg-surface border-r border-border flex flex-col h-screen sticky top-0 overflow-hidden shrink-0">
      {/* Logo Area */}
      <div className="p-6 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-3">
          <Hexagon className="w-8 h-8 text-primary" fill="currentColor" fillOpacity={0.2} />
          <span className="font-heading font-bold text-2xl tracking-[0.15em] text-foreground">NEXORA</span>
        </div>
        {isStaff && (
          <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-primary/20 text-primary border border-primary/30">
            STAFF
          </span>
        )}
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
                
                const isChildActive = hasSubmenus && item.submenus.some(sub => location.pathname === sub.path);
                const isParentActive = item.path ? location.pathname === item.path : isChildActive;

                return (
                  <div key={item.label}>
                    {hasSubmenus ? (
                      <button
                        onClick={() => toggleMenu(item.label)}
                        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 ${
                          isChildActive && !isExpanded
                            ? 'bg-surface-elevated text-primary border-l-2 border-primary shadow-[inset_0px_0px_16px_rgba(214,168,95,0.08)] font-semibold'
                            : 'text-muted hover:bg-surface-elevated hover:text-foreground'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5 text-muted" />
                          <span className="font-medium text-sm">{item.label}</span>
                        </div>
                        {isExpanded ? <ChevronDown className="w-4 h-4 text-muted" /> : <ChevronRight className="w-4 h-4 text-muted" />}
                      </button>
                    ) : (
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                            isActive
                              ? 'bg-surface-elevated text-primary border-l-2 border-primary shadow-[inset_0px_0px_16px_rgba(214,168,95,0.08)] font-semibold'
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
                            end
                            className={({ isActive }) =>
                              `block px-4 py-2 rounded-md text-sm transition-all duration-200 ${
                                isActive
                                  ? 'bg-primary/10 text-primary font-bold border-l-2 border-primary'
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

      {/* Clickable System Status Footer */}
      <NavLink 
        to="/system-status"
        className={({ isActive }) =>
          `p-4 border border-border m-4 rounded-xl flex items-center justify-between shrink-0 transition-all ${
            isActive 
              ? 'bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(214,168,95,0.15)]' 
              : 'bg-surface-elevated hover:border-primary/50 text-muted hover:text-foreground'
          }`
        }
      >
        <div className="flex items-center gap-2 text-sm">
          <Bell className="w-4 h-4" />
          <span className="font-medium">System Status</span>
        </div>
        <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse shadow-[0_0_8px_rgba(111,175,143,0.8)]"></div>
      </NavLink>
    </aside>
  );
};
