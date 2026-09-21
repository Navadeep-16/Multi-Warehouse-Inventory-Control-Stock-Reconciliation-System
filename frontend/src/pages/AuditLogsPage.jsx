import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventoryData } from '../context/InventoryDataContext';

export default function AuditLogsPage() {
  const navigate = useNavigate();
  const { auditLogs } = useInventoryData();

  const [search, setSearch] = useState('');
  const [moduleFilter, setModuleFilter] = useState('ALL');

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.entity.toLowerCase().includes(search.toLowerCase());
    
    const matchesModule = moduleFilter === 'ALL' || log.module.toUpperCase() === moduleFilter.toUpperCase();

    return matchesSearch && matchesModule;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-muted mb-1">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span>/</span>
          <span className="text-primary font-medium">Audit Logs</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">System Audit & Activity Trail</h1>
          <p className="text-sm text-muted">Immutable system audit history capturing every login, stock update, transfer, and PO approval.</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 bg-surface border border-border rounded-2xl flex flex-wrap gap-3 items-center justify-between">
        <div className="relative flex-1 min-w-[240px]">
          <span className="absolute left-3 top-2.5 text-muted text-xs">🔍</span>
          <input
            type="text"
            placeholder="Search operator, action, entity code..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-surface-elevated border border-border rounded-xl pl-9 pr-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex gap-2">
          {['ALL', 'AUTH', 'OPERATIONS', 'TRANSFERS', 'PROCUREMENT'].map(mod => (
            <button
              key={mod}
              onClick={() => setModuleFilter(mod)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                moduleFilter === mod
                  ? 'bg-primary text-surface-dark shadow'
                  : 'bg-surface-elevated text-muted border border-border hover:text-foreground'
              }`}
            >
              {mod}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-surface-elevated/70 border-b border-border text-muted uppercase font-semibold">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">User Operator</th>
                <th className="py-3 px-4">Action Event</th>
                <th className="py-3 px-4">Module</th>
                <th className="py-3 px-4">Entity</th>
                <th className="py-3 px-4">IP Address</th>
                <th className="py-3 px-4">Previous Value</th>
                <th className="py-3 px-4">New Value</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-surface-elevated/40 transition">
                  <td className="py-3.5 px-4 font-mono text-muted text-[11px]">{log.timestamp}</td>
                  <td className="py-3.5 px-4 font-bold text-foreground">{log.user}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-primary">{log.action}</td>
                  <td className="py-3.5 px-4 text-muted">{log.module}</td>
                  <td className="py-3.5 px-4 font-semibold text-foreground">{log.entity}</td>
                  <td className="py-3.5 px-4 font-mono text-muted text-[11px]">{log.ip}</td>
                  <td className="py-3.5 px-4 text-muted font-mono text-[11px]">{log.oldValue}</td>
                  <td className="py-3.5 px-4 text-success font-mono font-semibold text-[11px]">{log.newValue}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-success/20 text-success border border-success/30">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
