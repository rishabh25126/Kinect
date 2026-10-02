import React, { useState } from 'react';
import { useKinect } from '../../context/KinectContext';
import { ModeBadge } from '../common/ModeBadge';
import { 
  Send, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Eye, 
  RotateCcw, 
  Sparkles, 
  HeartHandshake, 
  Globe,
  Check,
  X
} from 'lucide-react';
import { ActionItem } from '../../types';

export const ActionCentreScreen: React.FC = () => {
  const {
    actions,
    updateActionStatus,
    setSelectedCustomerId,
    setActiveView,
    viewCustomerDetail,
    viewSignalDetail,
  } = useKinect();

  const [activePipelineTab, setActivePipelineTab] = useState<string>('all');
  const [selectedActionForDrawer, setSelectedActionForDrawer] = useState<ActionItem | null>(null);

  const pipelineTabs = [
    { id: 'all', label: 'All Actions' },
    { id: 'Awaiting Approval', label: 'Awaiting Approval' },
    { id: 'Scheduled', label: 'Scheduled' },
    { id: 'Converted', label: 'Converted / Resolved' },
    { id: 'Draft', label: 'Draft' },
  ];

  const filtered = actions.filter((a) => {
    if (activePipelineTab === 'all') return true;
    return a.status === activePipelineTab;
  });

  return (
    <div className="space-y-4">
      {/* Top Pipeline Tabs */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {pipelineTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePipelineTab(tab.id)}
                className={`py-1.5 px-3 rounded-xl font-medium transition-all ${
                  activePipelineTab === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-400">
            {filtered.length} actions in active pipeline
          </span>
        </div>
      </div>

      {/* Action Table */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider bg-slate-950/40">
                <th className="py-3 px-4 font-medium">Customer</th>
                <th className="py-3 px-4 font-medium">Intervention / Action</th>
                <th className="py-3 px-4 font-medium">Mode</th>
                <th className="py-3 px-4 font-medium">Channel</th>
                <th className="py-3 px-4 font-medium">Owner</th>
                <th className="py-3 px-4 font-medium">Timing</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filtered.map((action) => (
                <tr
                  key={action.id}
                  onClick={() => setSelectedActionForDrawer(action)}
                  className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                >
                  <td className="py-3 px-4">
                    <span className="font-bold text-white group-hover:text-blue-300">
                      {action.customerName}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-medium text-slate-200">{action.actionTitle}</div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {action.indicativeValueOrRelief}
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <ModeBadge mode={action.mode} size="sm" />
                  </td>

                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                      {action.channel}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-slate-300">
                    {action.owner}
                  </td>

                  <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                    {action.scheduledOrSentTime}
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        action.status === 'Converted' || action.status === 'Resolved'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : action.status === 'Awaiting Approval'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : action.status === 'Scheduled'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {action.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1.5">
                      {action.status === 'Awaiting Approval' && (
                        <button
                          onClick={() => updateActionStatus(action.id, 'Scheduled')}
                          className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1 shadow-sm"
                          title="Sign off as Advisor"
                        >
                          <Check className="w-3 h-3" />
                          <span>Approve</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setSelectedCustomerId(action.customerId);
                          setActiveView('customerPortal');
                        }}
                        className="p-1 px-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 text-xs"
                        title="View in Customer Online Banking Portal"
                      >
                        <Globe className="w-3.5 h-3.5 text-amber-300" />
                        <span>Portal</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Detail Drawer */}
      {selectedActionForDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md p-5 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-mono">Action ID: {selectedActionForDrawer.id}</span>
                <h3 className="text-sm font-bold text-white">{selectedActionForDrawer.actionTitle}</h3>
              </div>
              <button
                onClick={() => setSelectedActionForDrawer(null)}
                className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl space-y-2 border border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-400">Customer:</span>
                <span className="font-bold text-white">{selectedActionForDrawer.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Mode:</span>
                <ModeBadge mode={selectedActionForDrawer.mode} size="sm" />
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Channel:</span>
                <span className="text-blue-300 font-medium">{selectedActionForDrawer.channel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Outcome / Note:</span>
                <span className="text-emerald-400 font-medium">
                  {selectedActionForDrawer.customerOutcome || 'Dispatched on schedule'}
                </span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  updateActionStatus(selectedActionForDrawer.id, 'Converted');
                  setSelectedActionForDrawer(null);
                }}
                className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold"
              >
                Mark as Converted
              </button>
              <button
                onClick={() => setSelectedActionForDrawer(null)}
                className="px-4 py-2 bg-slate-800 text-slate-300 hover:text-white rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
