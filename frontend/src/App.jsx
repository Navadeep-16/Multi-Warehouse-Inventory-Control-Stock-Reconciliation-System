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
import ExpiringInventoryPage from './pages/inventory/ExpiringInventoryPage';
import StockMovementPage from './pages/inventory/StockMovementPage';

// Warehouse pages
import { AllWarehousesPage } from './pages/warehouses/AllWarehousesPage';
import { LocationsZonesPage } from './pages/warehouses/LocationsZonesPage';
import { WarehouseCapacityPage } from './pages/warehouses/WarehouseCapacityPage';
import MyWarehousePage from './pages/warehouses/MyWarehousePage';
import BinLocationsPage from './pages/warehouses/BinLocationsPage';

// Product pages
import { AllProductsPage } from './pages/products/AllProductsPage';
import { CategoriesBrandsPage } from './pages/products/CategoriesBrandsPage';
import { BatchesSerialsPage } from './pages/products/BatchesSerialsPage';
import ProductDetailsPage from './pages/products/ProductDetailsPage';

// Operations pages
import { StockInPage } from './pages/operations/StockInPage';
import StockOutPage from './pages/operations/StockOutPage';
import StockAdjustmentsPage from './pages/operations/StockAdjustmentsPage';
import StockReturnsPage from './pages/operations/StockReturnsPage';

// Transfer pages
import AllTransfersPage from './pages/transfers/AllTransfersPage';
import CreateTransferPage from './pages/transfers/CreateTransferPage';
import PendingApprovalsPage from './pages/transfers/PendingApprovalsPage';
import MyTransferRequestsPage from './pages/transfers/MyTransferRequestsPage';
import TransferHistoryPage from './pages/transfers/TransferHistoryPage';

// Reconciliation pages
import ReconciliationDashPage from './pages/reconciliation/ReconciliationDashPage';
import PhysicalStockCountPage from './pages/reconciliation/PhysicalStockCountPage';
import DiscrepancyReviewPage from './pages/reconciliation/DiscrepancyReviewPage';
import MyCountingTasksPage from './pages/reconciliation/MyCountingTasksPage';
import CountHistoryPage from './pages/reconciliation/CountHistoryPage';

// Returns & Tasks pages
import ReturnsPage from './pages/returns/ReturnsPage';
import StaffTasksPage from './pages/tasks/StaffTasksPage';

// Procurement pages
import PurchaseOrdersPage from './pages/procurement/PurchaseOrdersPage';
import PurchaseRequestsPage from './pages/procurement/PurchaseRequestsPage';

// Main module & user pages
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
import NotificationsPage from './pages/NotificationsPage';
import ProfilePage from './pages/ProfilePage';
import UserActivityPage from './pages/UserActivityPage';
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
              <Route path="/inventory/expiring" element={<ProtectedRoute><MainLayout><ExpiringInventoryPage /></MainLayout></ProtectedRoute>} />
              <Route path="/inventory/movement" element={<ProtectedRoute><MainLayout><StockMovementPage /></MainLayout></ProtectedRoute>} />
              
              {/* Warehouses */}
              <Route path="/warehouses" element={<ProtectedRoute><MainLayout><AllWarehousesPage /></MainLayout></ProtectedRoute>} />
              <Route path="/warehouses/locations" element={<ProtectedRoute><MainLayout><LocationsZonesPage /></MainLayout></ProtectedRoute>} />
              <Route path="/warehouses/capacity" element={<ProtectedRoute><MainLayout><WarehouseCapacityPage /></MainLayout></ProtectedRoute>} />
              <Route path="/warehouses/my-warehouse" element={<ProtectedRoute><MainLayout><MyWarehousePage /></MainLayout></ProtectedRoute>} />
              <Route path="/warehouses/bin-locations" element={<ProtectedRoute><MainLayout><BinLocationsPage /></MainLayout></ProtectedRoute>} />
              
              {/* Products */}
              <Route path="/products" element={<ProtectedRoute><MainLayout><AllProductsPage /></MainLayout></ProtectedRoute>} />
              <Route path="/products/details" element={<ProtectedRoute><MainLayout><ProductDetailsPage /></MainLayout></ProtectedRoute>} />
              <Route path="/products/categories-brands" element={<ProtectedRoute><MainLayout><CategoriesBrandsPage /></MainLayout></ProtectedRoute>} />
              <Route path="/products/batches-serials" element={<ProtectedRoute><MainLayout><BatchesSerialsPage /></MainLayout></ProtectedRoute>} />
              
              {/* Orders */}
              <Route path="/orders" element={<ProtectedRoute><MainLayout><OrdersPage /></MainLayout></ProtectedRoute>} />
              <Route path="/orders/pending" element={<ProtectedRoute><MainLayout><OrdersPage /></MainLayout></ProtectedRoute>} />
              <Route path="/orders/processing" element={<ProtectedRoute><MainLayout><OrdersPage /></MainLayout></ProtectedRoute>} />
              <Route path="/orders/completed" element={<ProtectedRoute><MainLayout><OrdersPage /></MainLayout></ProtectedRoute>} />

              {/* Operations */}
              <Route path="/operations/stock-in" element={<ProtectedRoute><MainLayout><StockInPage /></MainLayout></ProtectedRoute>} />
              <Route path="/operations/stock-out" element={<ProtectedRoute><MainLayout><StockOutPage /></MainLayout></ProtectedRoute>} />
              <Route path="/operations/stock-adjustments" element={<ProtectedRoute><MainLayout><StockAdjustmentsPage /></MainLayout></ProtectedRoute>} />
              <Route path="/operations/stock-returns" element={<ProtectedRoute><MainLayout><StockReturnsPage /></MainLayout></ProtectedRoute>} />
              
              {/* Transfers */}
              <Route path="/transfers" element={<ProtectedRoute><MainLayout><AllTransfersPage /></MainLayout></ProtectedRoute>} />
              <Route path="/transfers/create" element={<ProtectedRoute><MainLayout><CreateTransferPage /></MainLayout></ProtectedRoute>} />
              <Route path="/transfers/pending" element={<ProtectedRoute><MainLayout><PendingApprovalsPage /></MainLayout></ProtectedRoute>} />
              <Route path="/transfers/my-requests" element={<ProtectedRoute><MainLayout><MyTransferRequestsPage /></MainLayout></ProtectedRoute>} />
              <Route path="/transfers/history" element={<ProtectedRoute><MainLayout><TransferHistoryPage /></MainLayout></ProtectedRoute>} />
              
              {/* Reconciliation */}
              <Route path="/reconciliation" element={<ProtectedRoute><MainLayout><ReconciliationDashPage /></MainLayout></ProtectedRoute>} />
              <Route path="/reconciliation/physical-count" element={<ProtectedRoute><MainLayout><PhysicalStockCountPage /></MainLayout></ProtectedRoute>} />
              <Route path="/reconciliation/discrepancies" element={<ProtectedRoute><MainLayout><DiscrepancyReviewPage /></MainLayout></ProtectedRoute>} />
              <Route path="/reconciliation/my-tasks" element={<ProtectedRoute><MainLayout><MyCountingTasksPage /></MainLayout></ProtectedRoute>} />
              <Route path="/reconciliation/history" element={<ProtectedRoute><MainLayout><CountHistoryPage /></MainLayout></ProtectedRoute>} />

              {/* Returns */}
              <Route path="/returns/customer" element={<ProtectedRoute><MainLayout><ReturnsPage type="customer" /></MainLayout></ProtectedRoute>} />
              <Route path="/returns/supplier" element={<ProtectedRoute><MainLayout><ReturnsPage type="supplier" /></MainLayout></ProtectedRoute>} />
              <Route path="/returns/history" element={<ProtectedRoute><MainLayout><ReturnsPage type="history" /></MainLayout></ProtectedRoute>} />

              {/* Tasks */}
              <Route path="/tasks/my-tasks" element={<ProtectedRoute><MainLayout><StaffTasksPage filter="my-tasks" /></MainLayout></ProtectedRoute>} />
              <Route path="/tasks/pending" element={<ProtectedRoute><MainLayout><StaffTasksPage filter="pending" /></MainLayout></ProtectedRoute>} />
              <Route path="/tasks/completed" element={<ProtectedRoute><MainLayout><StaffTasksPage filter="completed" /></MainLayout></ProtectedRoute>} />
              <Route path="/tasks/history" element={<ProtectedRoute><MainLayout><StaffTasksPage filter="history" /></MainLayout></ProtectedRoute>} />
              
              {/* Procurement */}
              <Route path="/procurement/purchase-orders" element={<ProtectedRoute><MainLayout><PurchaseOrdersPage /></MainLayout></ProtectedRoute>} />
              <Route path="/procurement/purchase-requests" element={<ProtectedRoute><MainLayout><PurchaseRequestsPage /></MainLayout></ProtectedRoute>} />
              <Route path="/suppliers" element={<ProtectedRoute><MainLayout><SuppliersPage /></MainLayout></ProtectedRoute>} />
              <Route path="/customers" element={<ProtectedRoute><MainLayout><CustomersPage /></MainLayout></ProtectedRoute>} />
              
              {/* Tools */}
              <Route path="/smart-inventory" element={<ProtectedRoute><MainLayout><SmartInventoryPage /></MainLayout></ProtectedRoute>} />
              <Route path="/analytics" element={<ProtectedRoute><MainLayout><AnalyticsPage /></MainLayout></ProtectedRoute>} />
              <Route path="/reports" element={<ProtectedRoute><MainLayout><ReportsPage /></MainLayout></ProtectedRoute>} />
              <Route path="/reports/stock" element={<ProtectedRoute><MainLayout><ReportsPage /></MainLayout></ProtectedRoute>} />
              <Route path="/reports/stock-movement" element={<ProtectedRoute><MainLayout><ReportsPage /></MainLayout></ProtectedRoute>} />
              <Route path="/reports/transfer" element={<ProtectedRoute><MainLayout><ReportsPage /></MainLayout></ProtectedRoute>} />
              <Route path="/reports/daily-activity" element={<ProtectedRoute><MainLayout><ReportsPage /></MainLayout></ProtectedRoute>} />
              <Route path="/barcode-qr" element={<ProtectedRoute><MainLayout><BarcodeQRPage /></MainLayout></ProtectedRoute>} />
              <Route path="/barcode-qr/scan-product" element={<ProtectedRoute><MainLayout><BarcodeQRPage /></MainLayout></ProtectedRoute>} />
              <Route path="/barcode-qr/scan-location" element={<ProtectedRoute><MainLayout><BarcodeQRPage /></MainLayout></ProtectedRoute>} />
              <Route path="/barcode-qr/scan-serial" element={<ProtectedRoute><MainLayout><BarcodeQRPage /></MainLayout></ProtectedRoute>} />
              <Route path="/notifications" element={<ProtectedRoute><MainLayout><NotificationsPage /></MainLayout></ProtectedRoute>} />
              
              {/* Account & Admin */}
              <Route path="/profile" element={<ProtectedRoute><MainLayout><ProfilePage /></MainLayout></ProtectedRoute>} />
              <Route path="/activity" element={<ProtectedRoute><MainLayout><UserActivityPage /></MainLayout></ProtectedRoute>} />
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
