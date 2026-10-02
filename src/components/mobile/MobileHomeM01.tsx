import React, { useState } from 'react';
import { useKinect } from '../../context/KinectContext';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard, 
  Plus, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';

interface MobileHomeM01Props {
  onNavigate: (screen: 'home' | 'opportunityDetail' | 'application' | 'wellness' | 'advisor' | 'notifications') => void;
}

export const MobileHomeM01: React.FC<MobileHomeM01Props> = ({ onNavigate }) => {
  const { mobileCustomerId, customers, language } = useKinect();
  const customer = customers.find((c) => c.id === mobileCustomerId) || customers[0];
  const [showBalance, setShowBalance] = useState(true);
  const [dismissedCard, setDismissedCard] = useState(false);

  const isOpportunity = customer.id === 'cust-rania' || customer.id === 'cust-leila' || customer.id === 'cust-omar' || customer.id === 'cust-aisha';
  const isTariq = customer.id === 'cust-tariq';

  return (
    <div className="p-4 space-y-4">
      {/* Greeting & Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] text-slate-400">
            {language === 'ar' ? 'صباح الخير،' : 'Good morning,'}
          </span>
          <h2 className="text-base font-bold text-white tracking-tight">
            {customer.name.split(' ')[0]}
          </h2>
        </div>
        <button
          onClick={() => setShowBalance(!showBalance)}
          className="p-1.5 rounded-full bg-slate-800/80 text-slate-400 hover:text-white"
        >
          {showBalance ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Account Balance Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-950/80 via-slate-900 to-slate-950 border border-blue-900/40 shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{customer.productsHeld[0] || 'Priority Current Account'}</span>
          <span className="font-mono text-[10px] text-slate-400">{customer.maskedId}</span>
        </div>

        <div className="mt-2.5">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider">
            {language === 'ar' ? 'الرصيد المتاح' : 'Available Balance'}
          </div>
          <div className="text-xl font-bold font-mono text-white tracking-tight">
            {showBalance ? `AED ${customer.totalBalanceAED.toLocaleString('en-US')}` : '••••••••'}
          </div>
        </div>

        {/* Quick action buttons */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-4 gap-2 text-center text-[10px]">
          <button className="flex flex-col items-center gap-1 text-slate-300 hover:text-white">
            <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </div>
            <span>{language === 'ar' ? 'تحويل' : 'Transfer'}</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-300 hover:text-white">
            <div className="w-8 h-8 rounded-full bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <ArrowDownLeft className="w-4 h-4" />
            </div>
            <span>{language === 'ar' ? 'دفع فواتير' : 'Pay Bills'}</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-300 hover:text-white">
            <div className="w-8 h-8 rounded-full bg-amber-600/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
            <span>{language === 'ar' ? 'بطاقات' : 'Cards'}</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-300 hover:text-white">
            <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <span>{language === 'ar' ? 'المزيد' : 'More'}</span>
          </button>
        </div>
      </div>

      {/* Contextual Kinect Card Section */}
      {!dismissedCard && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              {language === 'ar' ? 'لحظتك المالية المخصصة' : 'Personalized For You'}
            </span>
            <span className="text-[9px] text-slate-400">Powered by Kinect</span>
          </div>

          {/* RANIA - OPPORTUNITY CARD */}
          {customer.id === 'cust-rania' && (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/70 via-slate-900 to-slate-950 border border-emerald-500/40 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Priority Milestone
                </span>
                <span className="text-[10px] text-slate-400">3 min pre-qualification</span>
              </div>

              <h3 className="mt-2 text-sm font-bold text-white leading-snug">
                {language === 'ar'
                  ? 'قد يكون منزل أحلامك في دبي أقرب مما تتصورين'
                  : 'A home in Dubai could be closer than you think'}
              </h3>

              <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                {language === 'ar'
                  ? 'بناءً على تقدمك المهني، يمكنك التأهل المبدئي لتمويل سكني يصل إلى 1.2 مليون درهم بأسعار تبدأ من 4.24% سنوياً.'
                  : 'Based on your recent career milestone, you may qualify for indicative home financing up to AED 1.2M at preferred rates starting from 4.24% p.a.'}
              </p>

              <div className="mt-3 py-2 px-3 rounded-lg bg-emerald-950/40 border border-emerald-500/20 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 text-[11px]">Indicative Eligibility</span>
                <span className="text-emerald-300 font-bold">AED 1,200,000</span>
              </div>

              <div className="mt-3.5 flex items-center gap-2">
                <button
                  onClick={() => onNavigate('opportunityDetail')}
                  className="flex-1 py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <span>{language === 'ar' ? 'استكشاف الخيارات' : 'Explore Options'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDismissedCard(true)}
                  className="py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 text-xs transition-colors"
                >
                  {language === 'ar' ? 'لاحقاً' : 'Not now'}
                </button>
              </div>

              <div className="mt-2 text-[9px] text-slate-400 text-center">
                Indicative amount. Subject to formal underwriting & valuation.
              </div>
            </div>
          )}

          {/* TARIQ - PROTECTION CARD */}
          {isTariq && (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-[#111928] to-slate-950 border border-blue-500/30 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-medium tracking-wider uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-blue-400" />
                  Financial Wellness
                </span>
                <span className="text-[10px] text-slate-400">Confidential</span>
              </div>

              <h3 className="mt-2 text-sm font-bold text-white leading-snug">
                {language === 'ar'
                  ? 'هل ترغب في مزيد من المرونة المالية هذا الشهر؟'
                  : 'Would a little more flexibility help this month?'}
              </h3>

              <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                {language === 'ar'
                  ? 'نحن هنا لمساعدتك على تبسيط نفقاتك الشهرية من خلال حلول مريحة ومصممة خصيصاً لك.'
                  : 'We are here to support you with tailored ways to simplify and lower your monthly card and loan payments into one manageable schedule.'}
              </p>

              <div className="mt-3.5 flex items-center gap-2">
                <button
                  onClick={() => onNavigate('wellness')}
                  className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <span>{language === 'ar' ? 'عرض خيارات الدعم' : 'See Support Options'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onNavigate('advisor')}
                  className="py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                >
                  {language === 'ar' ? 'تحدث إلينا' : 'Talk to us'}
                </button>
              </div>

              <div className="mt-2 text-[9px] text-slate-400 flex items-center gap-1 justify-center">
                <AlertCircle className="w-2.5 h-2.5 text-blue-400" />
                <span>Private & non-punitive. Exploring options does not affect credit.</span>
              </div>
            </div>
          )}

          {/* LEILA / OMAR / AISHA CARDS */}
          {customer.id === 'cust-leila' && (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-950 border border-indigo-500/40">
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-indigo-500/20 text-indigo-300">
                Family & Education
              </span>
              <h3 className="mt-1.5 text-sm font-bold text-white">Protect your growing family's future</h3>
              <p className="mt-1 text-xs text-slate-300">Explore the Family Shield & Child Education plan with guaranteed vesting.</p>
              <button
                onClick={() => onNavigate('opportunityDetail')}
                className="mt-3 w-full py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
              >
                View Family Plan
              </button>
            </div>
          )}

          {customer.id === 'cust-omar' && (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/60 via-slate-900 to-slate-950 border border-amber-500/40">
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-amber-500/20 text-amber-300">
                SME Working Capital
              </span>
              <h3 className="mt-1.5 text-sm font-bold text-white">Pre-approved supplier line up to AED 350k</h3>
              <p className="mt-1 text-xs text-slate-300">Accelerate B2B procurement with automated receivables financing.</p>
              <button
                onClick={() => onNavigate('opportunityDetail')}
                className="mt-3 w-full py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold"
              >
                Unlock SME Facility
              </button>
            </div>
          )}

          {customer.id === 'cust-aisha' && (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-yellow-950/50 via-slate-900 to-slate-950 border border-yellow-500/40">
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-yellow-500/20 text-yellow-300">
                Private Wealth
              </span>
              <h3 className="mt-1.5 text-sm font-bold text-white">Earn 5.25% p.a. on your idle cash</h3>
              <p className="mt-1 text-xs text-slate-300">Flexi-Fixed Deposit Booster preserves 25% penalty-free liquidity.</p>
              <button
                onClick={() => onNavigate('opportunityDetail')}
                className="mt-3 w-full py-2 rounded-xl bg-yellow-500 text-slate-950 text-xs font-bold"
              >
                Explore Wealth Booster
              </button>
            </div>
          )}
        </div>
      )}

      {/* Recent Transactions List */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>{language === 'ar' ? 'آخر المعاملات' : 'Recent Transactions'}</span>
          <button className="text-blue-400 hover:underline text-[11px]">
            {language === 'ar' ? 'عرض الكل' : 'View All'}
          </button>
        </div>

        <div className="bg-slate-900/60 rounded-xl border border-slate-800/80 divide-y divide-slate-800/60 text-xs">
          {customer.id === 'cust-rania' ? (
            <>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">Standard Chartered DIFC</p>
                  <p className="text-[10px] text-slate-400">Payroll Inflow • 28 Sep</p>
                </div>
                <span className="font-mono font-bold text-emerald-400">+AED 48,500</span>
              </div>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">Spinneys Dubai Hills</p>
                  <p className="text-[10px] text-slate-400">Groceries • 27 Sep</p>
                </div>
                <span className="font-mono text-slate-300">-AED 420</span>
              </div>
            </>
          ) : (
            <>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">darna Credit Card Payment</p>
                  <p className="text-[10px] text-slate-400">Minimum payment • 25 Sep</p>
                </div>
                <span className="font-mono font-bold text-rose-400">-AED 850</span>
              </div>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">DEWA Dubai Electricity</p>
                  <p className="text-[10px] text-slate-400">Utility • 22 Sep</p>
                </div>
                <span className="font-mono text-slate-300">-AED 680</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
