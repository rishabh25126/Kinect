import React, { useState } from 'react';
import { useKinect } from '../../context/KinectContext';
import { ConfidenceChip } from '../common/ConfidenceChip';
import { ModeBadge } from '../common/ModeBadge';
import { 
  Sparkles, 
  Coins, 
  Clock, 
  SlidersHorizontal, 
  LayoutList, 
  LayoutGrid, 
  HelpCircle,
  ArrowRight,
  ChevronRight,
  Globe,
  CheckCircle,
  XCircle
} from 'lucide-react';

export const OpportunityQueueScreen: React.FC = () => {
  const {
    signals,
    customers,
    viewSignalDetail,
    openRecommendationStudio,
    setSelectedCustomerId,
    setActiveView,
    dismissSignal,
  } = useKinect();

  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [showRankingExplanation, setShowRankingExplanation] = useState(false);

  const oppSignals = signals.filter((s) => s.mode === 'opportunity');

  return (
    <div className="space-y-4">
      {/* Top Banner & Ranking Logic info */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <ModeBadge mode="opportunity" size="sm" />
            <h2 className="text-base font-bold text-white">Opportunity Moments Queue</h2>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Prioritizing verified positive financial events (salary, family milestones, trade flows) for proactive customer value.
          </p>
        </div>

        <button
          onClick={() => setShowRankingExplanation(!showRankingExplanation)}
          className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-medium"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Explain Ranking Algorithm</span>
        </button>
      </div>

      {/* Ranking Drawer */}
      {showRankingExplanation && (
        <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-xs text-slate-300 space-y-2">
          <h4 className="font-bold text-emerald-300">Composite Propensity Ranking Formula:</h4>
          <p className="font-mono text-[11px] bg-slate-950 p-2 rounded border border-slate-800 text-emerald-200">
            Rank Score = (Signal Confidence × 0.40) + (Potential Relationship Value × 0.35) + (Time Sensitivity / Recency × 0.25)
          </p>
          <p className="text-slate-400 text-[11px]">
            Rania Al Mansoori ranks #1 due to confirmed +41% salary leap over 2 payroll cycles combined with AED 1.2M borrowing capacity and zero competing debt.
          </p>
        </div>
      )}

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">New Today</span>
          <span className="text-xl font-bold font-mono text-emerald-400 mt-0.5 block">2 Moments</span>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">High Confidence</span>
          <span className="text-xl font-bold font-mono text-white mt-0.5 block">4 of 4 (100%)</span>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Total Pipeline Value</span>
          <span className="text-xl font-bold font-mono text-emerald-300 mt-0.5 block">AED 3.45M</span>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">View Toggle</span>
          <div className="flex gap-1 mt-1">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1 rounded ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}
              title="Table View"
            >
              <LayoutList className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1 rounded ${viewMode === 'cards' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}
              title="Card View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Queue: Table View */}
      {viewMode === 'table' ? (
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider bg-slate-950/40">
                <th className="py-3 px-4 font-medium">Rank & Customer</th>
                <th className="py-3 px-4 font-medium">Detected Moment</th>
                <th className="py-3 px-4 font-medium">Confidence</th>
                <th className="py-3 px-4 font-medium">Suggested Facility</th>
                <th className="py-3 px-4 font-medium">Indicative Value</th>
                <th className="py-3 px-4 font-medium">Channel / Age</th>
                <th className="py-3 px-4 font-medium text-right">Studio Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {oppSignals.map((sig, idx) => {
                const cust = customers.find((c) => c.id === sig.customerId);
                if (!cust) return null;

                const isRania = cust.id === 'cust-rania';

                return (
                  <tr
                    key={sig.id}
                    onClick={() => viewSignalDetail(sig.id)}
                    className={`hover:bg-slate-800/50 transition-colors group cursor-pointer ${
                      isRania ? 'bg-emerald-950/20' : ''
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-bold text-slate-400">#{idx + 1}</span>
                        <img
                          src={cust.avatar}
                          alt={cust.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-700"
                        />
                        <div>
                          <div className="font-bold text-white text-xs group-hover:text-emerald-300">
                            {cust.name}
                          </div>
                          <div className="text-[10px] text-slate-400">{cust.segment}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-200">{sig.name}</div>
                      <div className="text-[10px] text-slate-400">{sig.type}</div>
                    </td>

                    <td className="py-3 px-4">
                      <ConfidenceChip confidence={sig.confidence} size="sm" />
                    </td>

                    <td className="py-3 px-4">
                      <div className="text-white font-medium">{sig.suggestedAction.split('(')[0]}</div>
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                      {sig.severityOrValue}
                    </td>

                    <td className="py-3 px-4 text-[11px] text-slate-400 font-mono">
                      <div>{sig.bestChannel}</div>
                      <div className="text-[10px] text-slate-400">{sig.detectedAt}</div>
                    </td>

                    <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openRecommendationStudio(sig.id)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1 shadow-sm"
                        >
                          <Sparkles className="w-3 h-3 text-amber-300" />
                          <span>Generate Draft</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedCustomerId(cust.id);
                            setActiveView('customerPortal');
                          }}
                          className="p-1 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 text-xs"
                          title="View in Customer Online Banking Portal"
                        >
                          <Globe className="w-3.5 h-3.5 text-amber-300" />
                          <span>Portal</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* Card View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {oppSignals.map((sig) => {
            const cust = customers.find((c) => c.id === sig.customerId);
            if (!cust) return null;

            return (
              <div
                key={sig.id}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={cust.avatar} alt={cust.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <h4 className="text-xs font-bold text-white">{cust.name}</h4>
                      <span className="text-[10px] text-slate-400">{cust.segment}</span>
                    </div>
                  </div>
                  <ConfidenceChip confidence={sig.confidence} size="sm" />
                </div>

                <div>
                  <h3 className="text-xs font-bold text-emerald-400">{sig.name}</h3>
                  <p className="text-[11px] text-slate-300 mt-0.5">{sig.oneSentenceExplanation}</p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Potential Value:</span>
                  <span className="text-emerald-300 font-bold">{sig.severityOrValue}</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <button
                    onClick={() => viewSignalDetail(sig.id)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    View Evidence →
                  </button>
                  <button
                    onClick={() => openRecommendationStudio(sig.id)}
                    className="py-1 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs"
                  >
                    Recommendation Studio
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
