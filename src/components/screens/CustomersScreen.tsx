import React, { useState } from 'react';
import { useKinect } from '../../context/KinectContext';
import { ModeBadge } from '../common/ModeBadge';
import { ConfidenceChip } from '../common/ConfidenceChip';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  ChevronRight, 
  Smartphone, 
  UserCheck, 
  Sparkles, 
  ShieldAlert,
  ArrowUpDown,
  Download
} from 'lucide-react';

export const CustomersScreen: React.FC = () => {
  const {
    customers,
    signals,
    viewCustomerDetail,
    viewSignalDetail,
    openMobileSimulator,
    globalSearch,
    setGlobalSearch,
  } = useKinect();

  const [savedView, setSavedView] = useState<'all' | 'my' | 'highValue' | 'opportunity' | 'protection'>('all');
  const [segmentFilter, setSegmentFilter] = useState<string>('all');
  const [modeFilter, setModeFilter] = useState<'all' | 'opportunity' | 'protection'>('all');
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  const filteredCustomers = customers.filter((cust) => {
    // Search filter
    const matchesSearch =
      cust.name.toLowerCase().includes(globalSearch.toLowerCase()) ||
      cust.maskedId.toLowerCase().includes(globalSearch.toLowerCase()) ||
      cust.segment.toLowerCase().includes(globalSearch.toLowerCase());

    if (!matchesSearch) return false;

    // Saved view filter
    if (savedView === 'my' && cust.rmOwner !== 'Sara Al Blooshi') return false;
    if (savedView === 'highValue' && cust.totalBalanceAED < 300000) return false;
    if (savedView === 'opportunity') {
      const s = signals.find((sig) => sig.customerId === cust.id);
      if (s?.mode !== 'opportunity') return false;
    }
    if (savedView === 'protection') {
      const s = signals.find((sig) => sig.customerId === cust.id);
      if (s?.mode !== 'protection') return false;
    }

    // Segment filter
    if (segmentFilter !== 'all' && cust.segment !== segmentFilter) return false;

    // Mode filter
    if (modeFilter !== 'all') {
      const s = signals.find((sig) => sig.customerId === cust.id);
      if (s?.mode !== modeFilter) return false;
    }

    return true;
  });

  return (
    <div className="space-y-4">
      {/* Top Controls & Saved Views */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Saved View Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {[
              { id: 'all', label: 'All Customers' },
              { id: 'my', label: 'My Portfolio (Sara)' },
              { id: 'highValue', label: 'High Balance (AED >300k)' },
              { id: 'opportunity', label: 'Opportunity Detected' },
              { id: 'protection', label: 'Protection Needed' },
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => setSavedView(v.id as any)}
                className={`py-1.5 px-3 rounded-xl font-medium transition-all ${
                  savedView === v.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilterDrawer(!showFilterDrawer)}
              className={`py-1.5 px-3 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                showFilterDrawer
                  ? 'bg-blue-600/20 text-blue-300 border-blue-500'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Expandable Filter Drawer */}
        {showFilterDrawer && (
          <div className="pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Kinect Mode</label>
              <select
                value={modeFilter}
                onChange={(e) => setModeFilter(e.target.value as any)}
                aria-label="Filter by Kinect mode"
                className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1.5 text-xs outline-none"
              >
                <option value="all">All Modes</option>
                <option value="opportunity">Opportunity Only</option>
                <option value="protection">Protection Only</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Customer Segment</label>
              <select
                value={segmentFilter}
                onChange={(e) => setSegmentFilter(e.target.value)}
                aria-label="Filter by customer segment"
                className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1.5 text-xs outline-none"
              >
                <option value="all">All Segments</option>
                <option value="Priority Banking">Priority Banking</option>
                <option value="Private Banking">Private Banking</option>
                <option value="Mass Affluent">Mass Affluent</option>
                <option value="Emerging Wealth">Emerging Wealth</option>
                <option value="Business Banking">Business Banking</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setModeFilter('all');
                  setSegmentFilter('all');
                  setGlobalSearch('');
                }}
                className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Customers Table */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              Customer Portfolio
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
              {filteredCustomers.length} accounts
            </span>
          </div>

          <span className="text-xs text-slate-400">
            Click any customer row to view full 360 profile & transaction timeline
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider bg-slate-950/40">
                <th className="py-3 px-4 font-medium">Customer & ID</th>
                <th className="py-3 px-4 font-medium">Segment</th>
                <th className="py-3 px-4 font-medium">Relationship Value</th>
                <th className="py-3 px-4 font-medium">Active Kinect Signal</th>
                <th className="py-3 px-4 font-medium">Confidence</th>
                <th className="py-3 px-4 font-medium">Recommended Action</th>
                <th className="py-3 px-4 font-medium">RM Owner</th>
                <th className="py-3 px-4 font-medium text-right">Preview</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredCustomers.map((cust) => {
                const activeSignal = signals.find((s) => s.id === cust.activeSignalId);

                return (
                  <tr
                    key={cust.id}
                    onClick={() => viewCustomerDetail(cust.id)}
                    className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={cust.avatar}
                          alt={cust.name}
                          className="w-9 h-9 rounded-full object-cover border border-slate-700 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-white text-xs group-hover:text-blue-300 transition-colors">
                            {cust.name}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                            <span>{cust.maskedId}</span>
                            <span>• {cust.relationshipYears} yrs</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                        {cust.segment}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-white text-xs">
                        AED {cust.totalBalanceAED.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Spend: AED {cust.monthlySpendAED.toLocaleString()}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      {activeSignal ? (
                        <div className="space-y-1">
                          <ModeBadge mode={activeSignal.mode} size="sm" />
                          <div className="font-medium text-slate-200 text-[11px] truncate max-w-[170px]">
                            {activeSignal.name}
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-400 font-medium text-xs">No active signal</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {activeSignal ? (
                        <ConfidenceChip confidence={activeSignal.confidence} size="sm" />
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 max-w-[200px]">
                      <div className="text-slate-300 text-[11px] truncate">
                        {activeSignal?.suggestedAction || 'Periodic portfolio review'}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {cust.contactPreference}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-300">
                      <div>{cust.rmOwner}</div>
                      <div className="text-[10px] text-slate-400">Contact: {cust.lastContactDate}</div>
                    </td>

                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => {
                          openMobileSimulator(cust.id, activeSignal?.mode === 'opportunity' ? 'opportunityDetail' : 'wellness');
                        }}
                        className="py-1 px-2.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 text-xs font-medium inline-flex items-center gap-1.5 transition-all"
                        title="Simulate on customer's phone"
                      >
                        <Smartphone className="w-3.5 h-3.5 text-amber-300" />
                        <span>Mobile</span>
                      </button>
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
