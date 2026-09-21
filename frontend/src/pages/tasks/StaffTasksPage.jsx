import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventoryData } from '../../context/InventoryDataContext';
import { CheckSquare, ArrowRight, Package, Truck, Clock, CheckCircle2 } from 'lucide-react';

export default function StaffTasksPage({ filter = 'all' }) {
  const navigate = useNavigate();
  const { staffTasks, updateStaffTaskStatus } = useInventoryData();

  const filtered = filter === 'pending' ? staffTasks.filter(t => t.status !== 'COMPLETED' && t.status !== 'DISPATCHED') :
                   filter === 'completed' ? staffTasks.filter(t => t.status === 'COMPLETED' || t.status === 'DISPATCHED') : 
                   staffTasks;

  const getNextAction = (status) => {
    switch (status) {
      case 'PENDING': return { label: 'Start Task', next: 'IN_PROGRESS', bg: 'bg-[#5B9CF6] text-[#070B11]' };
      case 'IN_PROGRESS': return { label: 'Pick Items', next: 'PICKED', bg: 'bg-[#E7B65A] text-[#070B11]' };
      case 'PICKED': return { label: 'Pack Order', next: 'PACKED', bg: 'bg-[#E7B65A] text-[#070B11]' };
      case 'PACKED': return { label: 'Ready for Transfer', next: 'READY_FOR_DISPATCH', bg: 'bg-[#5B9CF6] text-[#070B11]' };
      case 'READY_FOR_DISPATCH': return { label: 'Dispatch Order', next: 'DISPATCHED', bg: 'bg-[#43C98B] text-[#070B11]' };
      default: return null;
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200 select-none">
      <div>
        <div className="flex items-center gap-2 text-xs text-[#7F8DA3] mb-1">
          <span className="hover:text-[#F5F7FA] cursor-pointer" onClick={() => navigate('/staff-dashboard')}>Dashboard</span>
          <span>/</span>
          <span>Tasks</span>
          <span>/</span>
          <span className="text-[#E7B65A] font-medium capitalize">{filter} Tasks</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#F5F7FA] tracking-tight">Staff Duty & Task Fulfillment Center</h1>
          <p className="text-xs text-[#7F8DA3]">Fulfill Manager-approved customer orders: picking, packing, transfer, and dispatch execution.</p>
        </div>
      </div>

      <div className="bg-[#0D141E] border border-[#1D2A3A] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#111A26] border-b border-[#1D2A3A] text-[#7F8DA3] uppercase font-semibold">
                <th className="py-3.5 px-4">Task ID</th>
                <th className="py-3.5 px-4">Fulfillment Details</th>
                <th className="py-3.5 px-4">Items / Qty</th>
                <th className="py-3.5 px-4">Warehouse</th>
                <th className="py-3.5 px-4">Priority</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-center">Fulfillment Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1D2A3A]/60">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#7F8DA3]">
                    No tasks currently in this queue.
                  </td>
                </tr>
              ) : (
                filtered.map(t => {
                  const action = getNextAction(t.status);

                  return (
                    <tr key={t.id} className="hover:bg-[#111A26]/50 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#E7B65A]">{t.taskId || `TASK-${t.id}`}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#F5F7FA]">{t.title}</div>
                        <div className="text-[10px] text-[#7F8DA3]">Customer: {t.customer}</div>
                      </td>
                      <td className="py-3.5 px-4 text-[#F5F7FA] font-medium">{t.items}</td>
                      <td className="py-3.5 px-4 font-mono text-[#5B9CF6]">{t.warehouse || 'WH-EAST'}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#EF6461]/15 text-[#EF6461]">
                          {t.priority || 'HIGH'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
                          t.status === 'COMPLETED' || t.status === 'DISPATCHED' ? 'bg-[#43C98B]/20 text-[#43C98B] border-[#43C98B]/30' :
                          t.status === 'IN_PROGRESS' || t.status === 'PICKED' || t.status === 'PACKED' ? 'bg-[#E7B65A]/20 text-[#E7B65A] border-[#E7B65A]/30' :
                          'bg-[#5B9CF6]/20 text-[#5B9CF6] border-[#5B9CF6]/30'
                        }`}>
                          {t.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {action ? (
                          <button
                            onClick={() => updateStaffTaskStatus(t.id, action.next)}
                            className={`px-3 py-1.5 rounded-xl font-bold text-[11px] transition-all flex items-center gap-1 mx-auto shadow-md ${action.bg}`}
                          >
                            <span>{action.label}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        ) : (
                          <span className="text-[10px] text-[#43C98B] font-bold flex items-center justify-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Dispatched
                          </span>
                        )}
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
}
