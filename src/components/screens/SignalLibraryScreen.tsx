import React, { useState } from 'react';
import { useKinect } from '../../context/KinectContext';
import { ModeBadge } from '../common/ModeBadge';
import { ConfidenceChip } from '../common/ConfidenceChip';
import { 
  Sliders, 
  Sparkles, 
  ShieldAlert, 
  Play, 
  CheckCircle2, 
  FileCode, 
  ChevronRight,
  Database
} from 'lucide-react';

export const SignalLibraryScreen: React.FC = () => {
  const { customers } = useKinect();
  const [activeTab, setActiveTab] = useState<'opportunity' | 'protection'>('opportunity');
  const [testResult, setTestResult] = useState<string | null>(null);
  const [selectedCustomerForTest, setSelectedCustomerForTest] = useState<string>('cust-rania');

  const signalRules = [
    {
      id: 'RULE-OPP-SALARY-EXPANSION-V2',
      name: 'Salary Expansion & Career Leap',
      mode: 'opportunity' as const,
      description: 'Monitors UAE WPS payroll inflow for >= +25% salary increase sustained across >= 2 payroll cycles with DBR under 30%.',
      lookback: '90 Days (2 Salary Cycles)',
      dataInputs: ['Core Banking WPS Stream', 'AECB Bureau Feed', 'DIFC Employer DB'],
      precision: '94.2%',
      version: 'v3.4.1',
      targetProduct: 'Emirates NBD Home Loan (PRD-HL-01)',
      owner: 'Retail Propensity Model Team',
    },
    {
      id: 'RULE-PROT-STRESS-TRIAD-V3',
      name: 'Compound Liquidity & Minimum Payment Strain',
      mode: 'protection' as const,
      description: 'Flags customers making >= 2 consecutive credit card minimum payments while experiencing >= 50% liquid balance drawdown.',
      lookback: '60 Days',
      dataInputs: ['Card Settlement Ledger', 'Demand Deposit Balance Stream', 'Digital App Analytics'],
      precision: '91.8%',
      version: 'v2.9.0',
      targetProduct: 'ENBD Empower Restructuring (PRD-CP-09)',
      owner: 'Credit Risk & Vulnerability Governance',
    },
    {
      id: 'RULE-OPP-LIFE-MILESTONE-FAMILY',
      name: 'Pediatric & Infant Life Stage Expansion',
      mode: 'opportunity' as const,
      description: 'Aggregates maternity, pediatric clinic, and infant retail expenditure exceeding AED 3,000 within 60 days.',
      lookback: '60 Days',
      dataInputs: ['Visa/Mastercard Merchant Category Codes (MCC)', 'Account Ledger'],
      precision: '88.5%',
      version: 'v1.8.0',
      targetProduct: 'Family Shield & Education Takaful (PRD-FS-04)',
      owner: 'Bancassurance Product Team',
    },
    {
      id: 'RULE-OPP-WEALTH-CASH-DRAG',
      name: 'Substantial Idle Liquidity in Checking',
      mode: 'opportunity' as const,
      description: 'Identifies uninvested checking account balances exceeding AED 500k held continuously for >= 60 days.',
      lookback: '90 Days',
      dataInputs: ['Core Checking Ledger', 'Treasury Rate Feeds'],
      precision: '96.1%',
      version: 'v4.0.0',
      targetProduct: 'Flexi-Fixed Deposit Booster (PRD-WTH-07)',
      owner: 'Private Client Wealth Management',
    },
  ];

  const filtered = signalRules.filter((r) => r.mode === activeTab);

  const handleTest = (ruleId: string) => {
    const cust = customers.find((c) => c.id === selectedCustomerForTest);
    if (!cust) return;

    if (ruleId === 'RULE-OPP-SALARY-EXPANSION-V2' && cust.id === 'cust-rania') {
      setTestResult(`[PASS] ${cust.name}: Salary delta +41.2% observed (AED 48,500). DBR 14% < 30%. Fires signal at 94% confidence.`);
    } else if (ruleId === 'RULE-PROT-STRESS-TRIAD-V3' && cust.id === 'cust-tariq') {
      setTestResult(`[PASS] ${cust.name}: 3 min payments, balance drain -72.4%, util 88%. Fires protection signal at 91% confidence.`);
    } else {
      setTestResult(`[NO TRIGGER] ${cust.name}: Thresholds not met for ${ruleId}. Customer remains in baseline state.`);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0b1e44] via-[#0d2757] to-[#0a1c3d] border border-blue-900/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight">
            Signal Library & Rule Definitions
          </h2>
          <p className="text-xs text-slate-300">
            Inspect algorithmic rules, input data feeds, lookback windows, and test against live customer accounts.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('opportunity')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'opportunity' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Opportunity Signals
          </button>
          <button
            onClick={() => setActiveTab('protection')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'protection' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Protection Signals
          </button>
        </div>
      </div>

      {/* Test Sandbox Drawer */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Test Rule against customer profile:</span>
          <select
            value={selectedCustomerForTest}
            onChange={(e) => {
              setSelectedCustomerForTest(e.target.value);
              setTestResult(null);
            }}
            aria-label="Select customer to test rule"
            className="bg-slate-800 border border-slate-700 text-slate-200 rounded px-2 py-1 text-xs"
          >
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.segment})
              </option>
            ))}
          </select>
        </div>

        {testResult && (
          <span className="font-mono text-[11px] text-emerald-400 bg-slate-950 p-1.5 rounded border border-slate-800">
            {testResult}
          </span>
        )}
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((rule) => (
          <div
            key={rule.id}
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 text-xs"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-blue-300 font-bold px-2 py-0.5 rounded bg-blue-950/60 border border-blue-500/30">
                {rule.id}
              </span>
              <span className="text-[10px] font-mono text-emerald-400">
                Precision: {rule.precision}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white">{rule.name}</h3>
              <p className="text-slate-300 text-[11px] mt-1 leading-relaxed">{rule.description}</p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl space-y-1.5 border border-slate-800/80 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-400">Lookback Window:</span>
                <span className="text-white font-mono">{rule.lookback}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Target Product:</span>
                <span className="text-emerald-400 truncate max-w-[200px]">{rule.targetProduct}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Model Version:</span>
                <span className="text-slate-300 font-mono">{rule.version}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Required Data Feeds</span>
              <div className="flex flex-wrap gap-1">
                {rule.dataInputs.map((inp, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-mono">
                    {inp}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => handleTest(rule.id)}
                className="py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5"
              >
                <Play className="w-3 h-3" />
                <span>Execute Test Run</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
