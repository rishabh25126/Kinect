import React, { useState } from 'react';
import { useKinect } from '../../context/KinectContext';
import { CheckCircle2, ShieldCheck, ArrowRight, Calendar, Sparkles } from 'lucide-react';

interface MobileApplicationM03Props {
  onNavigate: (screen: 'home' | 'opportunityDetail' | 'application' | 'wellness' | 'advisor' | 'notifications') => void;
}

export const MobileApplicationM03: React.FC<MobileApplicationM03Props> = ({ onNavigate }) => {
  const { customers, mobileCustomerId } = useKinect();
  const customer = customers.find((c) => c.id === mobileCustomerId) || customers[0];

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [propertyType, setPropertyType] = useState('Villa / Townhouse');
  const [confirmedSalary, setConfirmedSalary] = useState(customer.monthlyIncomeAED);
  const [consentChecked, setConsentChecked] = useState(true);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleRunCheck = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      setStep(3);
    }, 1500);
  };

  return (
    <div className="p-4 space-y-4">
      {/* 3-Step Indicator */}
      <div className="flex items-center justify-between px-2 pt-1">
        <div className="flex items-center gap-1.5">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              step >= 1 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
            }`}
          >
            1
          </div>
          <span className="text-[11px] text-slate-300">Details</span>
        </div>
        <div className={`h-0.5 w-8 ${step >= 2 ? 'bg-emerald-500' : 'bg-slate-800'}`} />
        <div className="flex items-center gap-1.5">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              step >= 2 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
            }`}
          >
            2
          </div>
          <span className="text-[11px] text-slate-300">Verification</span>
        </div>
        <div className={`h-0.5 w-8 ${step >= 3 ? 'bg-emerald-500' : 'bg-slate-800'}`} />
        <div className="flex items-center gap-1.5">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              step === 3 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
            }`}
          >
            3
          </div>
          <span className="text-[11px] text-slate-300">Result</span>
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">Confirm Your Financing Details</h3>
            <p className="text-xs text-slate-400">
              We have pre-filled your verified Emirates NBD Priority profile.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-[11px] text-slate-400 mb-1 block">Applicant Name</label>
              <input
                type="text"
                disabled
                value={customer.name}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-medium opacity-90"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 mb-1 block">Verified Monthly Salary (AED)</label>
              <input
                type="number"
                value={confirmedSalary}
                onChange={(e) => setConfirmedSalary(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono font-medium focus:border-emerald-500 outline-none"
              />
              <span className="text-[10px] text-emerald-400 mt-0.5 block">
                Verified via DIFC Payroll Stream (WPS)
              </span>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 mb-1 block">Target Property Type</label>
              <div className="grid grid-cols-2 gap-2">
                {['Villa / Townhouse', 'Apartment', 'Off-Plan Premier', 'Refinance'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setPropertyType(type)}
                    className={`py-2 px-3 rounded-xl border text-xs text-center font-medium transition-all ${
                      propertyType === type
                        ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                        : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setStep(2)}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2"
            >
              <span>Continue to Verification</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">Instant Credit Check Consent</h3>
            <p className="text-xs text-slate-400">
              Under Central Bank of the UAE guidelines, we evaluate your Debt Burden Ratio (DBR) instantaneously.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Soft inquiry: Zero impact on credit rating</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Priority underwriting priority channel</span>
            </div>
          </div>

          <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={consentChecked}
              onChange={(e) => setConsentChecked(e.target.checked)}
              className="mt-0.5 rounded accent-emerald-500"
            />
            <span className="text-[11px] leading-tight">
              I consent to Emirates NBD validating my AECB credit records and income history for indicative home financing.
            </span>
          </label>

          <div className="pt-3">
            <button
              disabled={!consentChecked || isEvaluating}
              onClick={handleRunCheck}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
            >
              {isEvaluating ? (
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  Evaluating Central Bank Criteria...
                </span>
              ) : (
                <span>Run Instant Pre-Approval</span>
              )}
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4 text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
            <Sparkles className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              Indicative Status: Approved
            </span>
            <h3 className="text-lg font-bold text-white">Congratulations, {customer.name.split(' ')[0]}!</h3>
            <p className="text-xs text-slate-300">
              You are indicatively qualified for Priority Home Financing up to:
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30">
            <div className="text-2xl font-bold font-mono text-emerald-300">AED 1,200,000</div>
            <div className="text-[10px] text-slate-400 mt-1">
              Indicative Ref: <span className="font-mono text-slate-200">HL-2026-ENBD-8842</span>
            </div>
            <div className="text-[11px] text-slate-300 mt-2">
              Fixed rate 4.24% p.a. • Estimated AED 6,500/mo
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={() => onNavigate('advisor')}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment with RM Sara</span>
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium"
            >
              Return to Banking Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
