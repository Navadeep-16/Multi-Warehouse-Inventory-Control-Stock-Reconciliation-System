import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventoryData } from '../context/InventoryDataContext';

export default function HelpSupportPage() {
  const navigate = useNavigate();
  const { addToast } = useInventoryData();

  const [openFaq, setOpenFaq] = useState(null);
  const [issueForm, setIssueForm] = useState({ subject: '', description: '', priority: 'Medium' });

  const faqs = [
    {
      q: 'How does inter-warehouse stock transfer approval work?',
      a: 'When an operator creates a transfer request under Transfers -> Create Transfer, it enters a "Pending" state. A Warehouse Manager or Admin must navigate to Transfers -> Pending Approvals to authorize or reject the transfer. Upon approval, source stock decreases and destination stock increases automatically.'
    },
    {
      q: 'What happens when I post a Stock In or Stock Out operation?',
      a: 'Posting a Stock In immediately increments both the specific warehouse inventory count and overall catalog stock. Stock Out decrements stock immediately and records an audit log under Operations.'
    },
    {
      q: 'How is physical stock count discrepancy calculated?',
      a: 'The Physical Stock Count workflow allows managers to record actual shelf count numbers. The system calculates the variance (Physical Count - System Expected Count). Discrepancies are queued under Discrepancy Review for manager approval before stock levels are updated.'
    },
    {
      q: 'Can I export inventory reports to Excel or PDF?',
      a: 'Yes, navigate to Insights & Tools -> Reports or All Inventory, where export buttons allow downloading complete CSV and PDF data dumps.'
    }
  ];

  const handleReportIssue = (e) => {
    e.preventDefault();
    addToast('Support ticket submitted successfully! Reference #TK-8812');
    setIssueForm({ subject: '', description: '', priority: 'Medium' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-muted mb-1">
          <span className="hover:text-foreground cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <span>/</span>
          <span className="text-primary font-medium">Help & Support</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Documentation & Support Portal</h1>
          <p className="text-sm text-muted">Knowledge base FAQs, system documentation, and enterprise helpdesk support.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FAQs Column */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-foreground">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-surface border border-border rounded-2xl overflow-hidden transition">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left font-bold text-sm text-foreground flex justify-between items-center hover:bg-surface-elevated/40"
                >
                  <span>{faq.q}</span>
                  <span className="text-primary text-xs">{openFaq === idx ? '▲' : '▼'}</span>
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-0 text-xs text-muted leading-relaxed border-t border-border/40">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Support Ticket Form */}
        <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-foreground">Submit Support Ticket</h2>
          <form onSubmit={handleReportIssue} className="space-y-3">
            <div>
              <label className="block text-xs text-muted mb-1">Issue Subject *</label>
              <input
                type="text"
                required
                value={issueForm.subject}
                onChange={e => setIssueForm({ ...issueForm, subject: e.target.value })}
                placeholder="Brief summary..."
                className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs text-muted mb-1">Priority</label>
              <select
                value={issueForm.priority}
                onChange={e => setIssueForm({ ...issueForm, priority: e.target.value })}
                className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High / Critical</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-muted mb-1">Detailed Description *</label>
              <textarea
                rows="4"
                required
                value={issueForm.description}
                onChange={e => setIssueForm({ ...issueForm, description: e.target.value })}
                placeholder="Describe your issue or feature request..."
                className="w-full bg-surface-elevated border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-primary text-surface-dark font-bold rounded-xl text-xs hover:bg-primary-hover shadow transition"
            >
              Send Support Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
