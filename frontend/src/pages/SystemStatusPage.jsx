import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SystemStatusPage() {
  const navigate = useNavigate();
  const [lastChecked, setLastChecked] = useState(new Date().toLocaleTimeString());

  const services = [
    { name: 'API Gateway (Port 8080)', status: 'Operational', latency: '12ms', uptime: '99.99%', type: 'Gateway' },
    { name: 'Authentication Service (Port 8081)', status: 'Operational', latency: '18ms', uptime: '99.98%', type: 'Security' },
    { name: 'Product Service (Port 8082)', status: 'Operational', latency: '14ms', uptime: '100.0%', type: 'Catalog' },
    { name: 'Inventory Service (Port 8083)', status: 'Operational', latency: '15ms', uptime: '99.95%', type: 'Core' },
    { name: 'Order Service (Port 8084)', status: 'Operational', latency: '21ms', uptime: '99.92%', type: 'Orders' },
    { name: 'Eureka Service Discovery (Port 8761)', status: 'Operational', latency: '8ms', uptime: '100.0%', type: 'Discovery' },
    { name: 'Database Cluster (PostgreSQL / H2)', status: 'Healthy', latency: '4ms', uptime: '99.99%', type: 'Storage' },
    { name: 'Notification & Audit Event Stream', status: 'Operational', latency: '25ms', uptime: '99.90%', type: 'Async' },
    { name: 'Background Stock Calculation Jobs', status: 'Active', latency: '35ms', uptime: '100.0%', type: 'Workers' }
  ];

  const handleRefresh = () => {
    setLastChecked(new Date().toLocaleTimeString());
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-muted mb-1">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span>/</span>
          <span className="text-primary font-medium">System Status</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">System Infrastructure Health</h1>
            <p className="text-sm text-muted">Real-time telemetry, microservice statuses, database connectivity, and latency monitoring.</p>
          </div>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-surface border border-border text-foreground hover:bg-surface-elevated rounded-xl text-xs font-semibold transition flex items-center gap-2 self-start"
          >
            <span>🔄</span> Refresh Telemetry
          </button>
        </div>
      </div>

      {/* Global Status Banner */}
      <div className="p-5 bg-success/15 border border-success/40 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-3.5 h-3.5 rounded-full bg-success animate-ping"></span>
          <div>
            <h2 className="text-base font-bold text-success">All NEXORA Microservices Operational</h2>
            <p className="text-xs text-muted">Global system performance is running optimal at 100% capacity.</p>
          </div>
        </div>
        <div className="text-xs text-muted">
          Last checked: <strong className="text-foreground">{lastChecked}</strong>
        </div>
      </div>

      {/* Microservices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map(svc => (
          <div key={svc.name} className="p-5 bg-surface border border-border rounded-2xl space-y-3 hover:border-primary/50 transition">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] text-muted uppercase font-bold">{svc.type}</span>
                <h3 className="text-sm font-bold text-foreground">{svc.name}</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-success/20 text-success border border-success/30">
                {svc.status}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs pt-2 border-t border-border/50 text-muted">
              <span>Latency: <strong className="text-primary">{svc.latency}</strong></span>
              <span>Uptime: <strong className="text-foreground">{svc.uptime}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
