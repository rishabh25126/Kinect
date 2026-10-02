import React, { useState } from 'react';
import { useKinect } from '../../context/KinectContext';
import { 
  CheckCircle2, 
  Calculator, 
  HelpCircle, 
  ChevronRight, 
  Building2, 
  Sparkles,
  Info
} from 'lucide-react';

interface MobileOpportunityM02Props {
  onNavigate: (screen: 'home' | 'opportunityDetail' | 'application' | 'wellness' | 'advisor' | 'notifications') => void;
}

export const MobileOpportunityM02: React.FC<MobileOpportunityM02Props> = ({ onNavigate }) => {
  const { language } = useKinect();
  const [loanAmount, setLoanAmount] = useState(1200000);
  const [tenureYears, setTenureYears] = useState(25);
  const interestRate = 4.24; // 4.24% p.a.

  // Simple monthly payment calculation: M = P [ r(1 + r)^n ] / [ (1 + r)^n – 1]
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = tenureYears * 12;
  const estimatedMonthly = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
  );

  return (
    <div className="p-4 space-y-4 pb-8">
      {/* Hero Badge */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950 border border-emerald-500/30 text-center relative overflow-hidden">
        <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-2">
          <Building2 className="w-6 h-6" />
        </div>
        <span className="block text-[10px] font-bold uppercase tracking-widest text-emerald-400">
          Priority Banking Privilege
        </span>
        <h2 className="text-lg font-bold text-white mt-1">
          {language === 'ar' ? 'تمويل عقاري سكني مسبق التأهيل' : 'Indicative Home Financing'}
        </h2>
        <p className="text-xs text-slate-300 mt-1">
          {language === 'ar'
            ? 'معدلات فائدة تفضيلية تبدأ من 4.24% سنوياً للأعضاء المميزين'
            : 'Preferred fixed introductory rates from 4.24% p.a. with 0% processing fee'}
        </p>

        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-xs font-mono text-emerald-300">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Indicative Limit: AED 1,200,000</span>
        </div>
      </div>

      {/* Why this suits you card */}
      <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-2">
        <div className="flex items-center gap-1.5 text-slate-200 font-semibold text-xs">
          <Info className="w-4 h-4 text-blue-400" />
          <span>Why this suits you</span>
        </div>
        <p className="text-slate-300 text-[11px] leading-relaxed">
          Your steady payroll credits with Emirates NBD and your clean debt servicing profile qualify you for our streamlined Priority home buyer journey with accelerated pre-approval.
        </p>
      </div>

      {/* Interactive Repayment Calculator */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white flex items-center gap-1.5">
            <Calculator className="w-4 h-4 text-emerald-400" />
            Monthly Repayment Calculator
          </span>
          <span className="text-[10px] text-slate-400">4.24% p.a. fixed</span>
        </div>

        {/* Loan Amount Slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px]">
            <span className="text-slate-400">Financing Amount</span>
            <span className="font-mono font-bold text-white">AED {loanAmount.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={400000}
            max={3000000}
            step={50000}
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
          />
          <div className="flex justify-between text-[9px] text-slate-400 font-mono">
            <span>AED 400k</span>
            <span>AED 3.0M</span>
          </div>
        </div>

        {/* Tenure Slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px]">
            <span className="text-slate-400">Tenure</span>
            <span className="font-mono font-bold text-white">{tenureYears} Years</span>
          </div>
          <input
            type="range"
            min={5}
            max={25}
            step={1}
            value={tenureYears}
            onChange={(e) => setTenureYears(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
          />
          <div className="flex justify-between text-[9px] text-slate-400 font-mono">
            <span>5 yrs</span>
            <span>25 yrs</span>
          </div>
        </div>

        {/* Calculated Monthly Box */}
        <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/20 flex items-center justify-between font-mono">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Estimated Monthly</span>
            <span className="text-lg font-bold text-emerald-300">AED {estimatedMonthly.toLocaleString()} / mo</span>
          </div>
          <div className="text-right text-[10px] text-slate-400">
            <span>Tenure: {numberOfPayments} payments</span>
          </div>
        </div>
      </div>

      {/* 3 Key Benefits */}
      <div className="space-y-2">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block px-1">
          Exclusive Package Benefits
        </span>

        <div className="space-y-1.5 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-200">Zero processing fees for Priority Banking clients</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-200">Complimentary property valuation waiver</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-200">Fast 15-minute digital indicative approval</span>
          </div>
        </div>
      </div>

      {/* Transparency Note */}
      <div className="text-[10px] text-slate-400 text-center leading-normal px-2">
        This suggestion is based on your account activity and Priority preferences. Indicative only; subject to Central Bank DBR regulations and formal underwriting.
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-1">
        <button
          onClick={() => onNavigate('application')}
          className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-950/50"
        >
          <span>Check Instant Pre-Qualification</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => onNavigate('advisor')}
            className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
          >
            Talk to Mortgage Specialist
          </button>
          <button
            onClick={() => onNavigate('home')}
            className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white text-xs"
          >
            Not Interested
          </button>
        </div>
      </div>
    </div>
  );
};
