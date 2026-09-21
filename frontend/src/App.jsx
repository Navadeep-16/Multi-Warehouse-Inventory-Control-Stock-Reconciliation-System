import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { InventoryDataProvider } from './context/InventoryDataContext';

import { LoginPage } from './pages/LoginPage';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';

// Inventory pages
import { AllInventoryPage } from './pages/inventory/AllInventoryPage';
import { InventoryValuationPage } from './pages/inventory/InventoryValuationPage';

// Warehouse pages
import { AllWarehousesPage } from './pages/warehouses/AllWarehousesPage';
import { LocationsZonesPage } from './pages/warehouses/LocationsZonesPage';
import { WarehouseCapacityPage } from './pages/warehouses/WarehouseCapacityPage';

// Product pages
import { AllProductsPage } from './pages/products/AllProductsPage';
import { CategoriesBrandsPage } from './pages/products/CategoriesBrandsPage';
import { BatchesSerialsPage } from './pages/products/BatchesSerialsPage';

// Operations pages
import { StockInPage } from './pages/operations/StockInPage';
import StockOutPage from './pages/operations/StockOutPage';
import StockAdjustmentsPage from './pages/operations/StockAdjustmentsPage';

// Transfer pages
import AllTransfersPage from './pages/transfers/AllTransfersPage';
import CreateTransferPage from './pages/transfers/CreateTransferPage';
import PendingApprovalsPage from './pages/transfers/PendingApprovalsPage';

// Reconciliation pages
import ReconciliationDashPage from './pages/reconciliation/ReconciliationDashPage';
import PhysicalStockCountPage from './pages/reconciliation/PhysicalStockCountPage';
import DiscrepancyReviewPage from './pages/reconciliation/DiscrepancyReviewPage';

// Procurement pages
import PurchaseOrdersPage from './pages/procurement/PurchaseOrdersPage';
import PurchaseRequestsPage from './pages/procurement/PurchaseRequestsPage';

// Main module pages
import { OrdersPage } from './pages/OrdersPage';
import SuppliersPage from './pages/SuppliersPage';
import CustomersPage from './pages/CustomersPage';
import SmartInventoryPage from './pages/SmartInventoryPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ReportsPage from './pages/ReportsPage';
import BarcodeQRPage from './pages/BarcodeQRPage';
import UsersRolesPage from './pages/UsersRolesPage';
import AuditLogsPage from './pages/AuditLogsPage';
import SettingsPage from './pages/SettingsPage';
import HelpSupportPage from './pages/HelpSupportPage';
import SystemStatusPage from './pages/SystemStatusPage';
import NotFoundPage from './pages/NotFoundPage';

import { ProtectedRoute } from './components/ProtectedRoute';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';

const queryClient = new QueryClient();

const MainLayout = ({ children }) => (
  <div className="flex min-h-screen bg-background text-foreground">
    <Sidebar />
    <div className="flex-1 flex flex-col min-w-0">
      <TopBar />
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto page-transition">
        <div className="max-w-[1400px] mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <InventoryDataProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              
              {/* Dashboard */}
              <Route path="/dashboard" element={<ProtectedRoute><MainLayout><DashboardPage /></MainLayout></ProtectedRoute>} />
              
              {/* Inventory */}
              <Route path="/inventory" element={<ProtectedRoute><MainLayout><AllInventoryPage filterType="all" /></MainLayout></ProtectedRoute>} />
              <Route path="/inventory/available" element={<ProtectedRoute><MainLayout><AllInventoryPage filterType="available" /></MainLayout></ProtectedRoute>} />
              <Route path="/inventory/low-stock" element={<ProtectedRoute><MainLayout><AllInventoryPage filterType="low-stock" /></MainLayout></ProtectedRoute>} />
              <Route path="/inventory/out-of-stock" element={<ProtectedRoute><MainLayout><AllInventoryPage filterType="out-of-stock" /></MainLayout></ProtectedRoute>} />
              <Route path="/inventory/valuation" element={<ProtectedRoute><MainLayout><InventoryValuationPage /></MainLayout></ProtectedRoute>} />
              
              {/* Warehouses */}
              <Route path="/warehouses" element={<ProtectedRoute><MainLayout><AllWarehousesPage /></MainLayout></ProtectedRoute>} />
              <Route path="/warehouses/locations" element={<ProtectedRoute><MainLayout><LocationsZonesPage /></MainLayout></ProtectedRoute>} />
              <Route path="/warehouses/capacity" element={<ProtectedRoute><MainLayout><WarehouseCapacityPage /></MainLayout></ProtectedRoute>} />
              
              {/* Products */}
              <Route path="/products" element={<ProtectedRoute><MainLayout><AllProductsPage /></MainLayout></ProtectedRoute>} />
              <Route path="/products/categories-brands" element={<ProtectedRoute><MainLayout><CategoriesBrandsPage /></MainLayout></ProtectedRoute>} />
              <Route path="/products/batches-serials" element={<ProtectedRoute><MainLayout><BatchesSerialsPage /></MainLayout></ProtectedRoute>} />
              
              {/* Operations */}
              <Route path="/operations/stock-in" element={<ProtectedRoute><MainLayout><StockInPage /></MainLayout></ProtectedRoute>} />
              <Route path="/operations/stock-out" element={<ProtectedRoute><MainLayout><StockOutPage /></MainLayout></ProtectedRoute>} />
              <Route path="/operations/stock-adjustments" element={<ProtectedRoute><MainLayout><StockAdjustmentsPage /></MainLayout></ProtectedRoute>} />
              
              {/* Transfers */}
              <Route path="/transfers" element={<ProtectedRoute><MainLayout><AllTransfersPage /></MainLayout></ProtectedRoute>} />
              <Route path="/transfers/create" element={<ProtectedRoute><MainLayout><CreateTransferPage /></MainLayout></ProtectedRoute>} />
              <Route path="/transfers/pending" element={<ProtectedRoute><MainLayout><PendingApprovalsPage /></MainLayout></ProtectedRoute>} />
              
              {/* Reconciliation */}
              <Route path="/reconciliation" element={<ProtectedRoute><MainLayout><ReconciliationDashPage /></MainLayout></ProtectedRoute>} />
              <Route path="/reconciliation/physical-count" element={<ProtectedRoute><MainLayout><PhysicalStockCountPage /></MainLayout></ProtectedRoute>} />
              <Route path="/reconciliation/discrepancies" element={<ProtectedRoute><MainLayout><DiscrepancyReviewPage /></MainLayout></ProtectedRoute>} />
              
              {/* Supply Chain / Procurement */}
              <Route path="/procurement/purchase-orders" element={<ProtectedRoute><MainLayout><PurchaseOrdersPage /></MainLayout></ProtectedRoute>} />
              <Route path="/procurement/purchase-requests" element={<ProtectedRoute><MainLayout><PurchaseRequestsPage /></MainLayout></ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute><MainLayout><OrdersPage /></MainLayout></ProtectedRoute>} />
              <Route path="/suppliers" element={<ProtectedRoute><MainLayout><SuppliersPage /></MainLayout></ProtectedRoute>} />
              <Route path="/customers" element={<ProtectedRoute><MainLayout><CustomersPage /></MainLayout></ProtectedRoute>} />
              
              {/* Insights & Tools */}
              <Route path="/smart-inventory" element={<ProtectedRoute><MainLayout><SmartInventoryPage /></MainLayout></ProtectedRoute>} />
              <Route path="/analytics" element={<ProtectedRoute><MainLayout><AnalyticsPage /></MainLayout></ProtectedRoute>} />
              <Route path="/reports" element={<ProtectedRoute><MainLayout><ReportsPage /></MainLayout></ProtectedRoute>} />
              <Route path="/barcode-qr" element={<ProtectedRoute><MainLayout><BarcodeQRPage /></MainLayout></ProtectedRoute>} />
              
              {/* Administration & System */}
              <Route path="/users-roles" element={<ProtectedRoute><MainLayout><UsersRolesPage /></MainLayout></ProtectedRoute>} />
              <Route path="/audit-logs" element={<ProtectedRoute><MainLayout><AuditLogsPage /></MainLayout></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><MainLayout><SettingsPage /></MainLayout></ProtectedRoute>} />
              <Route path="/help-support" element={<ProtectedRoute><MainLayout><HelpSupportPage /></MainLayout></ProtectedRoute>} />
              <Route path="/system-status" element={<ProtectedRoute><MainLayout><SystemStatusPage /></MainLayout></ProtectedRoute>} />
              
              {/* 404 Catch-All */}
              <Route path="*" element={<ProtectedRoute><MainLayout><NotFoundPage /></MainLayout></ProtectedRoute>} />
            </Routes>
          </BrowserRouter>
        </InventoryDataProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
