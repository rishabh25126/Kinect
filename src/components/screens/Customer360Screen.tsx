import React, { useState } from 'react';
import { useKinect } from '../../context/KinectContext';
import { ModeBadge } from '../common/ModeBadge';
import { ConfidenceChip } from '../common/ConfidenceChip';
import { AiBadge } from '../common/AiBadge';
import {
  User,
  Shield,
  Globe,
  CreditCard,
  TrendingUp,
  Clock,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Eye,
  EyeOff,
  Calendar,
  Layers,
  FileText,
  MessageSquare,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export const Customer360Screen: React.FC = () => {
  const {
    selectedCustomer,
    setSelectedCustomerId,
    signals,
    products,
    viewSignalDetail,
    openRecommendationStudio,
    setActiveView,
  } = useKinect();

  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'transactions' | 'signals' | 'products' | 'interactions'>('overview');
  const [maskSensitiveMerchants, setMaskSensitiveMerchants] = useState(true);

  if (!selectedCustomer) {
    return <div className="p-8 text-center text-slate-400">Please select a customer.</div>;
  }

  const activeSignal = signals.find((s) => s.id === selectedCustomer.activeSignalId);

  return (
    <div className="space-y-5">
      {/* Customer Header Bar */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0c2044] via-[#0e2752] to-[#091b3b] border border-blue-900/40 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={selectedCustomer.avatar}
            alt={selectedCustomer.name}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-blue-500/40 shadow-md"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-tight">
                {selectedCustomer.name}
              </h2>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-900/80 text-blue-300 border border-slate-700">
                {selectedCustomer.maskedId}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {selectedCustomer.segment}
              </span>
            </div>

            <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-300">
              <span>Tenure: <b className="text-white font-mono">{selectedCustomer.relationshipYears} yrs</b></span>
              <span>•</span>
              <span>RM Owner: <b className="text-white">{selectedCustomer.rmOwner}</b></span>
              <span>•</span>
              <span>Preference: <b className="text-white">{selectedCustomer.contactPreference}</b></span>
              <span>•</span>
              <span className="flex items-center gap-1">
                Risk Tier:
                <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                  selectedCustomer.riskTier === 'Low Risk'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : selectedCustomer.riskTier === 'Elevated Stress'
                    ? 'bg-rose-500/20 text-rose-300'
                    : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {selectedCustomer.riskTier}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {activeSignal && (
            <button
              onClick={() => openRecommendationStudio(activeSignal.id)}
              className="py-2 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-blue-950/40"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Generate Recommendation</span>
            </button>
          )}

          <button
            onClick={() => {
              setSelectedCustomerId(selectedCustomer.id);
              setActiveView('customerPortal');
            }}
            className="py-2 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>Customer Online Banking View</span>
          </button>
        </div>
      </div>

      {/* Financial Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Total Relationship</span>
          <span className="text-lg font-bold font-mono text-white mt-0.5 block">
            AED {selectedCustomer.totalBalanceAED.toLocaleString()}
          </span>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Monthly Income</span>
          <span className="text-lg font-bold font-mono text-emerald-400 mt-0.5 block">
            AED {selectedCustomer.monthlyIncomeAED.toLocaleString()}
          </span>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Monthly Spend</span>
          <span className="text-lg font-bold font-mono text-slate-200 mt-0.5 block">
            AED {selectedCustomer.monthlySpendAED.toLocaleString()}
          </span>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Credit Utilisation</span>
          <span className={`text-lg font-bold font-mono mt-0.5 block ${
            selectedCustomer.creditUtilisationPct > 70 ? 'text-rose-400' : 'text-slate-200'
          }`}>
            {selectedCustomer.creditUtilisationPct}%
          </span>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Products Held</span>
          <span className="text-lg font-bold font-mono text-blue-400 mt-0.5 block">
            {selectedCustomer.productsHeld.length} Facilities
          </span>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Engagement Trend</span>
          <span className="text-sm font-bold text-slate-200 mt-1 block">
            {selectedCustomer.engagementTrend}
          </span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-800 gap-2 text-xs font-medium">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'timeline', label: 'Financial Timeline' },
          { id: 'transactions', label: 'Transactions & Evidence' },
          { id: 'signals', label: 'Kinect Signals' },
          { id: 'products', label: 'Product Portfolio' },
          { id: 'interactions', label: 'Interactions & History' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`pb-2.5 px-3 transition-colors relative ${
              activeTab === t.id
                ? 'text-blue-400 font-bold border-b-2 border-blue-500'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Active Moment Spotlight (Left 2 Columns) */}
          <div className="lg:col-span-2 space-y-4">
            {activeSignal ? (
              <div className={`p-5 rounded-2xl border shadow-xl ${
                activeSignal.mode === 'opportunity'
                  ? 'bg-slate-900/90 border-emerald-500/40'
                  : 'bg-slate-900/90 border-rose-500/40'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ModeBadge mode={activeSignal.mode} />
                    <span className="text-xs text-slate-400 font-mono">Detected {activeSignal.detectedAt}</span>
                  </div>
                  <ConfidenceChip confidence={activeSignal.confidence} />
                </div>

                <h3 className="text-base font-bold text-white mt-3">{activeSignal.name}</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {activeSignal.oneSentenceExplanation}
                </p>

                <div className="mt-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Impact / Value</span>
                    <span className="font-mono font-bold text-white">{activeSignal.severityOrValue}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Recommended Action</span>
                    <span className="text-slate-300 truncate block">{activeSignal.suggestedAction}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Preferred Delivery</span>
                    <span className="text-blue-300 font-medium">{activeSignal.bestChannel}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                  <span className="text-slate-400">Rule Trigger: <code className="font-mono text-blue-300">{activeSignal.ruleExplanation.ruleName}</code></span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => viewSignalDetail(activeSignal.id)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium"
                    >
                      Deep Evidence Review
                    </button>
                    <button
                      onClick={() => openRecommendationStudio(activeSignal.id)}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold"
                    >
                      Recommendation Studio →
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-400">
                No active signal detected. Baseline monitored continuously.
              </div>
            )}

            {/* AI-Generated Customer Summary */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  AI Customer Profile Digest
                </span>
                <AiBadge reviewerRole="Relationship Manager" />
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedCustomer.summaryNotes}
              </p>
            </div>
          </div>

          {/* Right Column: Holdings & Consents */}
          <div className="space-y-4">
            {/* Products Held */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                Active Product Holdings
              </span>
              <div className="space-y-2">
                {selectedCustomer.productsHeld.map((p, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-white font-medium">{p}</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Active</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Regulatory Consent & Policy Status */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5 text-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                Consent & Contact Policy
              </span>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Marketing Consent:</span>
                <span className={`font-semibold ${selectedCustomer.consentMarketing ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {selectedCustomer.consentMarketing ? 'Opted In' : 'Suppressed'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Advisory Outreach:</span>
                <span className="font-semibold text-emerald-400">Approved</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Contact Frequency:</span>
                <span className="text-slate-300">Max 1 moment / 14 days</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FINANCIAL TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">6-Month Inflow, Outflow & Balance Progression</h3>
              <p className="text-xs text-slate-400">Correlated against signal detection markers and payroll verification</p>
            </div>
            <span className="text-xs font-mono text-slate-400">Core WPS Ledger Sync</span>
          </div>

          <div className="h-56 w-full pt-4">
            <svg className="w-full h-full" viewBox="0 0 600 160" preserveAspectRatio="none">
              <line x1="0" y1="40" x2="600" y2="40" stroke="#334155" strokeDasharray="3 3" strokeOpacity="0.4" />
              <line x1="0" y1="80" x2="600" y2="80" stroke="#334155" strokeDasharray="3 3" strokeOpacity="0.4" />
              <line x1="0" y1="120" x2="600" y2="120" stroke="#334155" strokeDasharray="3 3" strokeOpacity="0.4" />

              {selectedCustomer.id === 'cust-rania' ? (
                <>
                  {/* Rania: Inflow leap from 34k to 48.5k */}
                  <path
                    d="M 0 110 L 120 110 L 240 110 L 360 110 L 440 45 L 600 45"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                  />
                  {/* Outflow steady */}
                  <path
                    d="M 0 130 L 120 132 L 240 128 L 360 130 L 440 125 L 600 125"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                  {/* Milestone Marker Dot */}
                  <circle cx="440" cy="45" r="5" fill="#10b981" />
                  <text x="410" y="30" fill="#10b981" fontSize="10" fontWeight="bold">+41.2% Salary Leap</text>
                </>
              ) : (
                <>
                  {/* Tariq: Liquid balance drawdown & min payments */}
                  <path
                    d="M 0 60 L 120 80 L 240 110 L 360 130 L 480 145 L 600 150"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3"
                  />
                  <circle cx="360" cy="130" r="5" fill="#ef4444" />
                  <text x="320" y="120" fill="#ef4444" fontSize="10" fontWeight="bold">Min Payment Run</text>
                </>
              )}
            </svg>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                Monthly Inflow (WPS Payroll)
              </span>
              <span className="flex items-center gap-1.5 text-blue-400">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                Monthly Outflows
              </span>
            </div>
            <span>6-Month Lookback Window Active</span>
          </div>
        </div>
      )}

      {/* TAB 3: TRANSACTIONS & EVIDENCE */}
      {activeTab === 'transactions' && (
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Verified Transaction Stream</h3>
            <button
              onClick={() => setMaskSensitiveMerchants(!maskSensitiveMerchants)}
              className="text-xs text-blue-400 hover:underline flex items-center gap-1"
            >
              {maskSensitiveMerchants ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{maskSensitiveMerchants ? 'Sensitive Merchants Masked (Role Policy)' : 'Unmasked View'}</span>
            </button>
          </div>

          <div className="divide-y divide-slate-800 text-xs">
            {activeSignal?.evidenceItems.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">{item.description}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{item.date} • {item.category}</p>
                </div>
                <div className="text-right">
                  {item.amountAED && (
                    <span className="font-mono font-bold text-slate-200 block">
                      AED {item.amountAED.toLocaleString()}
                    </span>
                  )}
                  <span className={`inline-block px-1.5 py-0.2 rounded text-[10px] font-bold uppercase ${
                    item.impact === 'primary' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.impact}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SIGNALS */}
      {activeTab === 'signals' && (
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white">Signal Detection Registry</h3>
          <div className="space-y-3">
            {signals.filter((s) => s.customerId === selectedCustomer.id).map((sig) => (
              <div key={sig.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <ModeBadge mode={sig.mode} size="sm" />
                    <h4 className="text-xs font-bold text-white">{sig.name}</h4>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">{sig.oneSentenceExplanation}</p>
                </div>
                <div className="flex items-center gap-2">
                  <ConfidenceChip confidence={sig.confidence} />
                  <button
                    onClick={() => viewSignalDetail(sig.id)}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-white"
                  >
                    Evidence Studio
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: PRODUCTS */}
      {activeTab === 'products' && (
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white">Customer Product Holdings & Eligibility Matrix</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Pre-Approved Opportunities</span>
              <p className="text-slate-300">Emirates NBD Priority Home Financing up to AED 1.2M (DBR 14%)</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">Recommended Upgrade</span>
              <p className="text-slate-300">SkyShopper Visa Infinite Limit Increase to AED 75,000</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: INTERACTIONS */}
      {activeTab === 'interactions' && (
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-white">Omnichannel Touchpoint Log</h3>
          <div className="divide-y divide-slate-800 text-xs">
            <div className="py-2.5 flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">In-App Moment Scheduled</p>
                <p className="text-[10px] text-slate-400">Priority Mortgage Eligibility • Scheduled for 14:00</p>
              </div>
              <span className="text-blue-400 font-medium">Pending Delivery</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">Annual Priority Review Call</p>
                <p className="text-[10px] text-slate-400">With RM Sara Al Blooshi • 18 Sep 2026</p>
              </div>
              <span className="text-emerald-400 font-medium">Completed</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
