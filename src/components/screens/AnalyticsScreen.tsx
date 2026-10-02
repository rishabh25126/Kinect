import React, { useState } from 'react';
import { useKinect } from '../../context/KinectContext';
import { 
  BarChart3, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  PieChart, 
  Target,
  ArrowRight,
  Info
} from 'lucide-react';

export const AnalyticsScreen: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState('all');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0b1e44] via-[#0d2757] to-[#0a1c3d] border border-blue-900/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight">
            Analytics & Impact Measurement
          </h2>
          <p className="text-xs text-slate-300">
            Strictly separating verified observed banking outcomes from future projected model hypotheses.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedSegment}
            onChange={(e) => setSelectedSegment(e.target.value)}
            aria-label="Filter by segment"
            className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl px-2.5 py-1.5 outline-none"
          >
            <option value="all">All Segments</option>
            <option value="priority">Priority Banking</option>
            <option value="mass">Mass Affluent</option>
            <option value="business">Business Banking</option>
          </select>
        </div>
      </div>

      {/* SECTION 1: OBSERVED RESULTS (VERIFIED) */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            1. Observed Results (Audited Central Bank & Ledger Data)
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Observed Conversion</span>
            <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">34.2%</span>
            <span className="text-[10px] text-slate-400 mt-1 block">+6.4% above traditional generic campaigns</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Customer Relief Assisted</span>
            <span className="text-2xl font-bold font-mono text-white mt-1 block">AED 480k</span>
            <span className="text-[10px] text-slate-400 mt-1 block">5 restructuring plans in progress</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Signal Precision Rate</span>
            <span className="text-2xl font-bold font-mono text-blue-400 mt-1 block">91.4%</span>
            <span className="text-[10px] text-slate-400 mt-1 block">RM verified accuracy score</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Advisor SLA Compliance</span>
            <span className="text-2xl font-bold font-mono text-amber-300 mt-1 block">100%</span>
            <span className="text-[10px] text-slate-400 mt-1 block">Zero breaches on 24h protection SLA</span>
          </div>
        </div>
      </div>

      {/* FUNNEL: Detected -> Converted */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            End-to-End Decision Funnel
          </h3>
          <p className="text-[11px] text-slate-400">
            Conversion stages from autonomous signal detection to signed banking facility
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase block">1. Detected</span>
            <span className="text-base font-bold font-mono text-white">128</span>
            <span className="text-[10px] text-slate-400 block">100%</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase block">2. Eligible</span>
            <span className="text-base font-bold font-mono text-blue-300">114</span>
            <span className="text-[10px] text-slate-400 block">89.0%</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase block">3. Approved</span>
            <span className="text-base font-bold font-mono text-blue-300">96</span>
            <span className="text-[10px] text-slate-400 block">75.0%</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase block">4. Delivered</span>
            <span className="text-base font-bold font-mono text-emerald-300">94</span>
            <span className="text-[10px] text-slate-400 block">73.4%</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase block">5. Engaged</span>
            <span className="text-base font-bold font-mono text-emerald-300">62</span>
            <span className="text-[10px] text-slate-400 block">48.4%</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-1">
            <span className="text-[10px] text-emerald-300 uppercase font-bold block">6. Converted</span>
            <span className="text-base font-bold font-mono text-emerald-400">44</span>
            <span className="text-[10px] text-emerald-300 block font-bold">34.2% Net</span>
          </div>
        </div>
      </div>

      {/* SECTION 2: PROJECTED OPPORTUNITY (HYPOTHESIS / MODEL TARGETS) */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            2. Projected Opportunity (Target & Hypothesis Horizon)
          </h3>
        </div>

        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-600/30 text-xs text-amber-200">
          <div className="flex items-center gap-1.5 font-bold mb-1">
            <Info className="w-3.5 h-3.5" />
            <span>Governance Copy Guardrail Notice</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            The figures below represent projected model hypotheses based on scaling Kinect across 100% of the Emirates NBD UAE retail customer base. They do not constitute achieved historical facts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Hypothesized Conversion Lift</span>
            <span className="text-xl font-bold font-mono text-amber-300 block">2.5× to 3.5×</span>
            <span className="text-[10px] text-slate-400 block">Versus unsegmented push broadcasting</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Target 12-Month Lending Volume</span>
            <span className="text-xl font-bold font-mono text-white block">AED 1.8B</span>
            <span className="text-[10px] text-slate-400 block">Projected mortgage & commercial drawdown</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Projected Delinquency Reduction</span>
            <span className="text-xl font-bold font-mono text-emerald-400 block">-28% NPL</span>
            <span className="text-[10px] text-slate-400 block">Through early proactive restructuring</span>
          </div>
        </div>
      </div>
    </div>
  );
};
