import React, { useState } from 'react';
import { useKinect } from '../../context/KinectContext';
import { ConfidenceChip } from '../common/ConfidenceChip';
import { ModeBadge } from '../common/ModeBadge';
import { EthicsNoticeBanner } from '../common/AiBadge';
import {
  ShieldAlert,
  Clock,
  HeartHandshake,
  UserCheck,
  ChevronRight,
  Smartphone,
  PhoneCall,
  Calendar,
  AlertCircle,
  HelpCircle,
  Shield
} from 'lucide-react';

export const ProtectionQueueScreen: React.FC = () => {
  const {
    signals,
    customers,
    viewSignalDetail,
    openRecommendationStudio,
    openMobileSimulator,
    dismissSignal,
  } = useKinect();

  const [dismissReasonModal, setDismissReasonModal] = useState<string | null>(null);

  const protSignals = signals.filter((s) => s.mode === 'protection');

  return (
    <div className="space-y-4">
      {/* Privacy and Ethics Guardrail Notice */}
      <EthicsNoticeBanner message="Ethics & Vulnerability Policy: Signals are decision support, not definitive conclusions. Celebratory or sales language is strictly prohibited. Mandatory human advisor review is required before customer contact." />

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-rose-500/30">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Urgent Cases</span>
          <span className="text-xl font-bold font-mono text-rose-400 mt-0.5 block">1 Customer</span>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Avg SLA Countdown</span>
          <span className="text-xl font-bold font-mono text-amber-300 mt-0.5 block">19 Hours Active</span>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Historical Prevention</span>
          <span className="text-xl font-bold font-mono text-emerald-400 mt-0.5 block">84% Success</span>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Advisor Sign-off</span>
          <span className="text-xl font-bold font-mono text-white mt-0.5 block">Required (100%)</span>
        </div>
      </div>

      {/* Main Protection Queue Table */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              Customers Who May Need Support
            </span>
          </div>

          <span className="text-xs text-slate-400">
            Sorted by Risk Severity × SLA Expiry
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider bg-slate-950/40">
                <th className="py-3 px-4 font-medium">Customer & Severity</th>
                <th className="py-3 px-4 font-medium">Corroborating Stress Signals</th>
                <th className="py-3 px-4 font-medium">Confidence</th>
                <th className="py-3 px-4 font-medium">Recommended Support Action</th>
                <th className="py-3 px-4 font-medium">SLA Deadline</th>
                <th className="py-3 px-4 font-medium">Advisor Owner</th>
                <th className="py-3 px-4 font-medium text-right">Review Options</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {protSignals.map((sig) => {
                const cust = customers.find((c) => c.id === sig.customerId);
                if (!cust) return null;

                return (
                  <tr
                    key={sig.id}
                    onClick={() => viewSignalDetail(sig.id)}
                    className="hover:bg-slate-800/50 transition-colors group cursor-pointer bg-rose-950/10"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={cust.avatar}
                          alt={cust.name}
                          className="w-9 h-9 rounded-full object-cover border border-rose-500/40 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-white text-xs group-hover:text-rose-300">
                            {cust.name}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {cust.maskedId} • {cust.segment}
                          </div>
                          <span className="inline-block mt-1 px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                            High Priority Stress
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-200">{sig.name}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        • 3 Minimum payments on credit card
                        <br />
                        • Liquid balance drawn down 72%
                        <br />
                        • App engagement dropped 82%
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <ConfidenceChip confidence={sig.confidence} size="sm" />
                    </td>

                    <td className="py-3.5 px-4 max-w-[220px]">
                      <div className="text-white font-medium">
                        ENBD Empower Restructuring Review
                      </div>
                      <div className="text-[10px] text-emerald-400 mt-0.5">
                        Consolidate revolving cards to lower outflow by ~AED 1,080/mo
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono">
                      <div className="inline-flex items-center gap-1 text-amber-300 font-bold text-xs bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span>19h Remaining</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Due today 16:00</div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-300">
                      <div className="font-medium">{sig.assignedOwner}</div>
                      <div className="text-[10px] text-slate-400">Senior Wellness Advisor</div>
                    </td>

                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openRecommendationStudio(sig.id)}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1 shadow-sm"
                        >
                          <HeartHandshake className="w-3.5 h-3.5 text-blue-200" />
                          <span>Review Support Options</span>
                        </button>
                        <button
                          onClick={() => openMobileSimulator(cust.id, 'wellness')}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                          title="Simulate Tariq's Mobile Check-in"
                        >
                          <Smartphone className="w-3.5 h-3.5 text-amber-300" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
