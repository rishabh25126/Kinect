import React, { useState } from 'react';
import { useKinect } from '../../context/KinectContext';
import { 
  FileCheck2, 
  ShieldCheck, 
  Search, 
  Bot, 
  UserCheck, 
  Download, 
  CheckCircle2,
  Lock,
  Layers
} from 'lucide-react';
import { AuditLogEntry } from '../../types';

export const AuditGovernanceScreen: React.FC = () => {
  const { auditLogs } = useKinect();
  const [search, setSearch] = useState('');
  const [selectedLog, setSelectedLog] = useState<AuditLogEntry | null>(auditLogs[0] || null);

  const filteredLogs = auditLogs.filter(
    (log) =>
      log.customerName.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.actor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0b1e44] via-[#0d2757] to-[#0a1c3d] border border-blue-900/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1">
              <Lock className="w-3 h-3 text-blue-400" />
              Immutable Ledger Active
            </span>
            <span className="text-xs text-slate-400">Cryptographically Signed Audit Records</span>
          </div>
          <h2 className="text-base font-bold text-white tracking-tight mt-1">
            Audit Trail & AI Governance
          </h2>
          <p className="text-xs text-slate-300">
            End-to-end traceability of customer treatment, AI inputs, model versions, retrieved sources, and human decisions.
          </p>
        </div>

        <button
          onClick={() => alert('Audit archive generated for UAE Central Bank compliance export.')}
          className="py-2 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Compliance Audit</span>
        </button>
      </div>

      {/* Fairness & Quality Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Human Override Rate</span>
          <span className="text-xl font-bold font-mono text-emerald-400 mt-0.5 block">4.8%</span>
          <span className="text-[10px] text-slate-400">95.2% accepted without modification</span>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">False Positive Rate</span>
          <span className="text-xl font-bold font-mono text-white mt-0.5 block">3.1%</span>
          <span className="text-[10px] text-slate-400">Well below 8% safety threshold</span>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Fairness Disparity</span>
          <span className="text-xl font-bold font-mono text-emerald-400 mt-0.5 block">0.02 (Parity)</span>
          <span className="text-[10px] text-slate-400">Equal coverage across retail segments</span>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Protection Escalation</span>
          <span className="text-xl font-bold font-mono text-amber-300 mt-0.5 block">100% Human Gate</span>
          <span className="text-[10px] text-slate-400">Zero automated outbound sends</span>
        </div>
      </div>

      {/* 2-Column: Audit Table (Left 7 Cols) vs Run Inspector (Right 5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Audit Log Table */}
        <div className="lg:col-span-7 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl overflow-hidden">
          <div className="p-3 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              Audit Event Stream ({filteredLogs.length})
            </span>

            <div className="relative w-48">
              <Search className="w-3 h-3 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter logs..."
                className="w-full pl-7 pr-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs text-white outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase tracking-wider bg-slate-950/40 font-mono">
                  <th className="py-2.5 px-3 font-medium">Timestamp</th>
                  <th className="py-2.5 px-3 font-medium">Actor</th>
                  <th className="py-2.5 px-3 font-medium">Customer</th>
                  <th className="py-2.5 px-3 font-medium">Action Event</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredLogs.map((log) => {
                  const isSelected = selectedLog?.id === log.id;

                  return (
                    <tr
                      key={log.id}
                      onClick={() => setSelectedLog(log)}
                      className={`hover:bg-slate-800/50 cursor-pointer transition-colors ${
                        isSelected ? 'bg-blue-950/40 border-l-2 border-blue-500' : ''
                      }`}
                    >
                      <td className="py-2.5 px-3 font-mono text-[10px] text-slate-400">
                        {log.timestamp.slice(11)}
                      </td>
                      <td className="py-2.5 px-3 text-slate-300">
                        <div className="font-semibold text-white">{log.actor}</div>
                        <div className="text-[10px] text-slate-400">{log.actorRole}</div>
                      </td>
                      <td className="py-2.5 px-3 font-medium text-white">
                        {log.customerName}
                      </td>
                      <td className="py-2.5 px-3 text-slate-300 font-medium">
                        {log.action}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Run Inspector */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 text-xs">
          {selectedLog ? (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] text-slate-400">{selectedLog.id}</span>
                  <h3 className="text-sm font-bold text-white mt-0.5">{selectedLog.action}</h3>
                </div>
                <span className="text-[10px] font-mono text-blue-300 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-500/30">
                  {selectedLog.timestamp}
                </span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl space-y-2 border border-slate-800 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Customer:</span>
                  <span className="font-bold text-white">{selectedLog.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Actor / Initiator:</span>
                  <span className="text-slate-200">{selectedLog.actor} ({selectedLog.actorRole})</span>
                </div>
                {selectedLog.beforeValue && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Prior State:</span>
                    <span className="text-slate-300 font-mono truncate max-w-[200px]">{selectedLog.beforeValue}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-400">Committed State:</span>
                  <span className="text-emerald-400 font-mono truncate max-w-[200px]">{selectedLog.afterValue}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Justification / Rule Reason
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  {selectedLog.reason}
                </p>
              </div>

              {(selectedLog.modelVersion || selectedLog.promptVersion || selectedLog.retrievedSourceDoc) && (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 font-mono text-[10px]">
                  <span className="text-blue-400 font-bold block uppercase tracking-wider">
                    Model & RAG Provenance
                  </span>
                  {selectedLog.modelVersion && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Model:</span>
                      <span className="text-white">{selectedLog.modelVersion}</span>
                    </div>
                  )}
                  {selectedLog.promptVersion && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Prompt:</span>
                      <span className="text-white">{selectedLog.promptVersion}</span>
                    </div>
                  )}
                  {selectedLog.retrievedSourceDoc && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Retrieved:</span>
                      <span className="text-emerald-400 truncate max-w-[180px]">{selectedLog.retrievedSourceDoc}</span>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="p-8 text-center text-slate-400">Select an audit event.</div>
          )}
        </div>
      </div>
    </div>
  );
};
