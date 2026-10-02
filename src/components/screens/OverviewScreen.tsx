import React, { useState } from 'react';
import { useKinect } from '../../context/KinectContext';
import { KpiCard } from '../common/KpiCard';
import { ModeBadge } from '../common/ModeBadge';
import { ConfidenceChip } from '../common/ConfidenceChip';
import {
  Sparkles,
  ShieldAlert,
  Coins,
  Clock,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  ArrowUpRight,
  PlayCircle,
  Activity,
  UserCheck,
  Globe,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';

export const OverviewScreen: React.FC = () => {
  const {
    customers,
    signals,
    actions,
    setActiveView,
    viewSignalDetail,
    viewCustomerDetail,
    runScenario,
    setSelectedCustomerId,
  } = useKinect();

  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  const oppSignals = signals.filter((s) => s.mode === 'opportunity');
  const protSignals = signals.filter((s) => s.mode === 'protection');

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Demo Scenario Launchers */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0b1e42] via-[#0d2757] to-[#0a1b3a] border border-blue-900/40 shadow-xl flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Live Engine Active
            </span>
            <span className="text-xs text-slate-400">Stream synchronized 2 mins ago</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight mt-1.5">
            Good morning, Sara — here are today's customer moments
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Dual-mode intelligence detected 4 high-propensity opportunities and 1 critical customer protection case requiring human advisory outreach.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              runScenario('rania');
              setActiveView('demoSimulator');
            }}
            className="py-2 px-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-950/40 transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
            <span>Run Rania Opportunity Story</span>
          </button>

          <button
            onClick={() => {
              runScenario('tariq');
              setActiveView('demoSimulator');
            }}
            className="py-2 px-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-rose-950/40 transition-all hover:scale-[1.02]"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-white" />
            <span>Run Tariq Protection Story</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row (6 Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5">
        <KpiCard
          title="New Opportunities"
          value="4"
          change="+2 today"
          trend="up"
          trendType="positive"
          subtitle="Top: Salary Increase"
          icon={Sparkles}
          accentColor="emerald"
          onClick={() => setActiveView('opportunityQueue')}
        />
        <KpiCard
          title="Protection Needed"
          value="1"
          change="SLA < 19h"
          trend="up"
          trendType="negative"
          subtitle="Tariq Hassan (Stress Triad)"
          icon={ShieldAlert}
          accentColor="rose"
          onClick={() => setActiveView('protectionQueue')}
        />
        <KpiCard
          title="Estimated Opp Value"
          value="AED 3.4M"
          change="+18% vs wk"
          trend="up"
          trendType="positive"
          subtitle="Pipeline loan & deposit"
          icon={Coins}
          accentColor="emerald"
        />
        <KpiCard
          title="Actions Due Today"
          value="3"
          change="1 awaiting sign-off"
          trend="neutral"
          trendType="neutral"
          subtitle="Human review required"
          icon={Clock}
          accentColor="amber"
          onClick={() => setActiveView('actionCentre')}
        />
        <KpiCard
          title="Conversion Rate"
          value="34.2%"
          change="+6.4% YoY"
          trend="up"
          trendType="positive"
          subtitle="Priority Banking benchmark"
          icon={TrendingUp}
          accentColor="blue"
          onClick={() => setActiveView('analytics')}
        />
        <KpiCard
          title="Prevented Risk Value"
          value="AED 480k"
          change="5 cases assisted"
          trend="up"
          trendType="positive"
          subtitle="Early restructuring relief"
          icon={ShieldCheck}
          accentColor="slate"
          onClick={() => setActiveView('analytics')}
        />
      </div>

      {/* Dual-Mode Summary Panel (Opportunity vs Protection) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Opportunity Stream Card */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/30 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Opportunity Engine Stream
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">
              4 Active Moments
            </span>
          </div>

          <p className="text-xs text-slate-300 mt-1.5">
            Surfacing verified positive financial expansions: salary leaps, infant milestones, commercial B2B liquidity, and idle balances.
          </p>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Average Confidence</span>
              <span className="text-base font-bold font-mono text-emerald-300">91.0%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Indicative Facility</span>
              <span className="text-base font-bold font-mono text-emerald-300">AED 3.4M</span>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Acceptance Rate</span>
              <span className="text-base font-bold font-mono text-emerald-300">38.4%</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Leading Signal: Salary Growth (Rania Al Mansoori)</span>
            <button
              onClick={() => setActiveView('opportunityQueue')}
              className="text-emerald-400 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Open Opportunity Queue</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Protection Stream Card */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-rose-500/30 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-pulse" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Protection & Vulnerability Stream
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-rose-400">
              1 Critical Case (SLA Active)
            </span>
          </div>

          <p className="text-xs text-slate-300 mt-1.5">
            Continuous ethics watchdog detecting liquidity drain, repeated minimum card payments, and avoidance behavior before formal delinquency.
          </p>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-500/20">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Signal Confidence</span>
              <span className="text-base font-bold font-mono text-rose-300">91.0%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-500/20">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">SLA Countdown</span>
              <span className="text-base font-bold font-mono text-amber-300">19 Hours</span>
            </div>
            <div className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-500/20">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Default Prevented</span>
              <span className="text-base font-bold font-mono text-emerald-300">84.0%</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Priority Case: Tariq Hassan (Assigned to Ahmed)</span>
            <button
              onClick={() => setActiveView('protectionQueue')}
              className="text-rose-400 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Review Support Options</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Priority Customer Moments Table */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Priority Detected Moments (5 Demo Benchmarks)
            </h3>
            <p className="text-xs text-slate-400">
              Click any customer row to inspect the grounded evidence, baseline variance, or launch mobile journey.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView('customers')}
              className="text-xs text-blue-400 hover:underline font-semibold"
            >
              View All 5 Customers →
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider">
                <th className="pb-2 font-medium">Customer</th>
                <th className="pb-2 font-medium">Mode</th>
                <th className="pb-2 font-medium">Detected Signal</th>
                <th className="pb-2 font-medium">Confidence</th>
                <th className="pb-2 font-medium">Potential / Relief</th>
                <th className="pb-2 font-medium">Age</th>
                <th className="pb-2 font-medium">Assigned Owner</th>
                <th className="pb-2 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-normal">
              {signals.map((sig) => {
                const cust = customers.find((c) => c.id === sig.customerId);
                if (!cust) return null;

                return (
                  <tr
                    key={sig.id}
                    className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                    onClick={() => viewSignalDetail(sig.id)}
                  >
                    <td className="py-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={cust.avatar}
                          alt={cust.name}
                          className="w-7 h-7 rounded-full object-cover border border-slate-700"
                        />
                        <div>
                          <p className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                            {cust.name}
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono">{cust.maskedId}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3">
                      <ModeBadge mode={sig.mode} size="sm" />
                    </td>

                    <td className="py-3">
                      <div>
                        <span className="font-medium text-slate-200">{sig.name}</span>
                        <span className="block text-[10px] text-slate-400">{sig.type}</span>
                      </div>
                    </td>

                    <td className="py-3">
                      <ConfidenceChip confidence={sig.confidence} size="sm" />
                    </td>

                    <td className="py-3 font-mono font-bold text-slate-200">
                      {sig.severityOrValue}
                    </td>

                    <td className="py-3 text-slate-400 font-mono text-[11px]">
                      {sig.detectedAt}
                    </td>

                    <td className="py-3 text-slate-300">
                      {sig.assignedOwner}
                    </td>

                    <td className="py-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => viewSignalDetail(sig.id)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
                          title="Inspect Evidence"
                        >
                          Evidence
                        </button>
                        <button
                          onClick={() => {
                            setSelectedCustomerId(cust.id);
                            setActiveView('customerPortal');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 flex items-center gap-1 font-medium"
                          title="View Customer Online Banking Portal"
                        >
                          <Globe className="w-3.5 h-3.5" />
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
      </div>

      {/* Analytics Mini-Grid: Volume Trends & Channel Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Signal Volume Trend Chart (Native SVG) */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Signal Detection Trend (Last 7 Days)
              </h3>
              <p className="text-[11px] text-slate-400">
                Daily volume of detected Opportunity vs. Protection moments across retail portfolio
              </p>
            </div>

            <div className="flex gap-1 text-[11px] font-mono">
              {(['7d', '30d', '90d'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={`px-2 py-0.5 rounded ${
                    timeRange === r ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Trend Chart */}
          <div className="h-44 w-full relative pt-2">
            <svg className="w-full h-full" viewBox="0 0 500 120" preserveAspectRatio="none">
              {/* Background horizontal grid lines */}
              <line x1="0" y1="20" x2="500" y2="20" stroke="#334155" strokeDasharray="3 3" strokeOpacity="0.4" />
              <line x1="0" y1="60" x2="500" y2="60" stroke="#334155" strokeDasharray="3 3" strokeOpacity="0.4" />
              <line x1="0" y1="100" x2="500" y2="100" stroke="#334155" strokeDasharray="3 3" strokeOpacity="0.4" />

              {/* Opportunity Green Area & Line */}
              <defs>
                <linearGradient id="oppGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="protGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              <path
                d="M 0 90 Q 70 70, 140 45 T 280 30 T 420 22 L 500 15 L 500 115 L 0 115 Z"
                fill="url(#oppGrad)"
              />
              <path
                d="M 0 90 Q 70 70, 140 45 T 280 30 T 420 22 L 500 15"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
              />

              {/* Protection Red Line */}
              <path
                d="M 0 105 Q 70 100, 140 95 T 280 85 T 420 75 L 500 70 L 500 115 L 0 115 Z"
                fill="url(#protGrad)"
              />
              <path
                d="M 0 105 Q 70 100, 140 95 T 280 85 T 420 75 L 500 70"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
              />
            </svg>

            {/* Legend */}
            <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Opportunity Moments (+24% WoW)
                </span>
                <span className="flex items-center gap-1.5 text-rose-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  Protection Alerts (Stable)
                </span>
              </div>
              <span className="font-mono text-slate-400">Peak: 142 moments/day</span>
            </div>
          </div>
        </div>

        {/* Channel Delivery Performance */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Channel Conversion Rate
          </h3>
          <p className="text-[11px] text-slate-400">
            Observed conversion across delivery touchpoints
          </p>

          <div className="space-y-3 text-xs pt-1">
            <div>
              <div className="flex justify-between text-slate-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  Online Banking / In-App Moment
                </span>
                <span className="font-mono font-bold text-emerald-400">38.4%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1.5">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '38.4%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-indigo-400" />
                  RM Advisor Consultation
                </span>
                <span className="font-mono font-bold text-emerald-400">46.2%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1.5">
                <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '46.2%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 font-medium">
                <span>Push Notification</span>
                <span className="font-mono font-bold text-slate-200">14.1%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1.5">
                <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: '14.1%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 font-medium">
                <span>Direct SMS</span>
                <span className="font-mono font-bold text-slate-200">8.3%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1.5">
                <div className="bg-slate-500 h-1.5 rounded-full" style={{ width: '8.3%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
