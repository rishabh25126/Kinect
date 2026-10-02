import React, { useState } from 'react';
import { useKinect } from '../../context/KinectContext';
import {
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  Building2,
  Calculator,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Send,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Lock,
  Globe,
  HelpCircle,
  Clock,
  Layers,
  PhoneCall,
  User,
  LogOut,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

export const CustomerPortalScreen: React.FC = () => {
  const {
    customers,
    selectedCustomerId,
    setSelectedCustomerId,
    setActiveView,
    language,
    setLanguage,
  } = useKinect();

  const customer = customers.find((c) => c.id === selectedCustomerId) || customers[0];

  // Journey state within desktop portal
  const [activeTab, setActiveTab] = useState<'dashboard' | 'opportunityOffer' | 'application' | 'wellness' | 'advisor'>('dashboard');

  // Rania calculator state
  const [loanAmount, setLoanAmount] = useState(1200000);
  const [tenureYears, setTenureYears] = useState(25);
  const interestRate = 4.24;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = tenureYears * 12;
  const estimatedMonthly = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
  );

  // Application step
  const [appStep, setAppStep] = useState<1 | 2 | 3>(1);
  const [propertyType, setPropertyType] = useState('Villa / Townhouse');
  const [confirmedSalary, setConfirmedSalary] = useState(customer.monthlyIncomeAED);
  const [consentChecked, setConsentChecked] = useState(true);
  const [isEvaluating, setIsEvaluating] = useState(false);

  // Tariq wellness state
  const [wellnessChoice, setWellnessChoice] = useState<'lower' | 'date' | 'advisor'>('lower');
  const [wellnessSubmitted, setWellnessSubmitted] = useState(false);

  // Advisor chat state
  const [advisorChannel, setAdvisorChannel] = useState<'chat' | 'call' | 'video'>('chat');
  const [selectedSlot, setSelectedSlot] = useState('Today at 15:30');
  const [advisorBooked, setAdvisorBooked] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'advisor' | 'customer'; text: string; time: string }>>([
    {
      sender: 'advisor',
      text:
        customer.id === 'cust-tariq'
          ? `Hello Tariq, I am Ahmed Mansoor from Emirates NBD. I am personally reviewing your accounts to structure a lower, stress-free monthly payment plan for you. How can I best help today?`
          : `Hello Rania, congratulations on your recent career milestone! I have reserved your indicative 4.24% home loan pre-approval and look forward to answering any questions.`,
      time: '09:30 AM',
    },
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const msg = chatInput.trim();
    setChatInput('');
    setChatMessages((prev) => [...prev, { sender: 'customer', text: msg, time: 'Just now' }]);

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'advisor',
          text:
            customer.id === 'cust-tariq'
              ? `Thank you, Tariq. I have set aside 20 minutes to review this together confidentially.`
              : `Thank you, Rania! I will secure this rate tier for your property search.`,
          time: 'Just now',
        },
      ]);
    }, 1000);
  };

  const isRania = customer.id === 'cust-rania';
  const isTariq = customer.id === 'cust-tariq';

  return (
    <div className="space-y-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Desktop Browser Sub-Nav / Customer Switcher Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0c2044] via-[#0d2757] to-[#0a1c3d] border border-blue-800/50 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center font-black text-slate-950 text-lg shadow-md">
            E
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white tracking-tight">
                Emirates NBD Online Banking (Desktop Portal)
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Customer View
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Customer experience for personalized moments, mortgage calculators, and wellness assistance
            </p>
          </div>
        </div>

        {/* Demo Customer Switcher & Back to Internal Workspace */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
            <span className="text-slate-400">Viewing as:</span>
            <select
              value={selectedCustomerId}
              onChange={(e) => {
                setSelectedCustomerId(e.target.value);
                setActiveTab('dashboard');
              }}
              aria-label="Select customer to view portal"
              className="bg-slate-800 text-amber-300 font-semibold rounded px-2 py-1 border border-slate-600 outline-none cursor-pointer"
            >
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.segment})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
            title="Toggle Arabic / English"
          >
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>{language === 'en' ? 'العربية (AR)' : 'English (EN)'}</span>
          </button>

          <button
            onClick={() => setActiveView('overview')}
            className="py-1.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Return to Kinect Workspace</span>
          </button>
        </div>
      </div>

      {/* Online Banking Secondary Desktop Navigation */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs font-medium">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`pb-2 transition-all ${
              activeTab === 'dashboard'
                ? 'text-amber-400 font-bold border-b-2 border-amber-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'ar' ? 'لوحة الحسابات الرئيسية' : 'Accounts & Cards Dashboard'}
          </button>

          {isRania && (
            <>
              <button
                onClick={() => setActiveTab('opportunityOffer')}
                className={`pb-2 transition-all flex items-center gap-1.5 ${
                  activeTab === 'opportunityOffer'
                    ? 'text-emerald-400 font-bold border-b-2 border-emerald-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Priority Home Financing Offer</span>
              </button>
              <button
                onClick={() => setActiveTab('application')}
                className={`pb-2 transition-all ${
                  activeTab === 'application'
                    ? 'text-emerald-400 font-bold border-b-2 border-emerald-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Digital Eligibility Check
              </button>
            </>
          )}

          {isTariq && (
            <button
              onClick={() => setActiveTab('wellness')}
              className={`pb-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'wellness'
                  ? 'text-blue-400 font-bold border-b-2 border-blue-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5 text-blue-400" />
              <span>Financial Wellness & Restructuring Support</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('advisor')}
            className={`pb-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'advisor'
                ? 'text-blue-400 font-bold border-b-2 border-blue-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
            <span>Dedicated Advisor Consultation</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <Lock className="w-3 h-3 text-emerald-400" />
          <span>256-bit Central Bank Secured Session</span>
        </div>
      </div>

      {/* VIEW 1: DASHBOARD OVERVIEW WITH CONTEXTUAL KINECT MOMENT */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* TOP CONTEXTUAL MOMENT CARD (DESKTOP BANNER) */}
          {isRania && (
            <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-950 border-2 border-emerald-500/40 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2 max-w-3xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Priority Banking Milestone Moment
                    </span>
                    <span className="text-xs text-slate-400">Pre-Qualified in 3 Minutes</span>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {language === 'ar'
                      ? 'قد يكون منزل أحلامك في دبي أقرب مما تتصورين، رانيا'
                      : 'A home in Dubai could be closer than you think, Rania'}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {language === 'ar'
                      ? 'بناءً على تقدمك المهني الأخير وعضويتك المميزة في الخدمات المصرفية للأولوية، يمكنك التأهل المبدئي لتمويل سكني يصل إلى 1.2 مليون درهم بأسعار تبدأ من 4.24% سنوياً.'
                      : 'Based on your recent career milestone and Priority Banking standing with Emirates NBD, you may qualify for indicative home financing up to AED 1.2M at preferred rates starting from 4.24% p.a.'}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
                    <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-emerald-500/30 text-emerald-300 font-bold">
                      Indicative Facility: AED 1,200,000
                    </div>
                    <div className="text-slate-300 font-sans">
                      Fixed rate from 4.24% p.a. • Zero processing fee for Priority
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
                  <button
                    onClick={() => setActiveTab('opportunityOffer')}
                    className="py-3 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 transition-all hover:scale-[1.02]"
                  >
                    <span>Calculate Monthly Repayments</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveTab('application')}
                    className="py-2.5 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold text-center border border-slate-700"
                  >
                    Instant Pre-Qualification Check
                  </button>
                </div>
              </div>
            </div>
          )}

          {isTariq && (
            <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-950/70 via-slate-900 to-slate-950 border-2 border-blue-500/40 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2 max-w-3xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                      <HeartHandshake className="w-3.5 h-3.5" />
                      Financial Wellness Support
                    </span>
                    <span className="text-xs text-slate-400">Strictly Confidential & Non-Punitive</span>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {language === 'ar'
                      ? 'هل ترغب في مزيد من المرونة المالية هذا الشهر، طارق؟'
                      : 'Would a little more financial flexibility help this month, Tariq?'}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {language === 'ar'
                      ? 'نحن هنا لدعمك لضمان سلاسة أمورك المالية اليومية. دعنا نساعدك في تبسيط التزاماتك الشهرية ضمن خطة واحدة مريحة تخفف أعباءك المالية.'
                      : 'We are here to support you with tailored ways to simplify your monthly commitments into one manageable plan that fits your current routine and reduces monthly payment pressure.'}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
                    <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-blue-500/30 text-blue-300 font-bold">
                      Potential Outflow Relief: ~AED 1,080 / month
                    </div>
                    <div className="text-slate-300 font-sans">
                      Dedicated Specialist: Ahmed Mansoor • Zero impact on credit standing
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
                  <button
                    onClick={() => setActiveTab('wellness')}
                    className="py-3 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-950/60 transition-all hover:scale-[1.02]"
                  >
                    <span>Explore Support Options</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveTab('advisor')}
                    className="py-2.5 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold text-center border border-slate-700"
                  >
                    Speak Privately with Advisor
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ACCOUNTS & BALANCES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{customer.productsHeld[0] || 'Priority Checking'}</span>
                <span className="font-mono">{customer.maskedId}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Available Balance</span>
                <span className="text-2xl font-bold font-mono text-white mt-1 block">
                  AED {customer.totalBalanceAED.toLocaleString()}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex gap-2 text-xs">
                <button className="flex-1 py-1.5 rounded-lg bg-blue-600/20 text-blue-300 border border-blue-500/30 font-medium">
                  Transfer Money
                </button>
                <button className="flex-1 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white font-medium">
                  Pay Bills
                </button>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Monthly Verified Inflow</span>
                <span className="text-emerald-400 font-bold">WPS Payroll</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Monthly Net Credits</span>
                <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">
                  AED {customer.monthlyIncomeAED.toLocaleString()}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                Status: Regular & Verified
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Credit Facilities</span>
                <span className="font-mono">Utilisation: {customer.creditUtilisationPct}%</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Monthly Outgoings</span>
                <span className="text-2xl font-bold font-mono text-slate-200 mt-1 block">
                  AED {customer.monthlySpendAED.toLocaleString()}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                DBR Ratio: {customer.creditUtilisationPct < 50 ? 'Compliant' : 'Elevated'}
              </div>
            </div>
          </div>

          {/* RECENT TRANSACTIONS TABLE (DESKTOP) */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Recent Account Activity
              </h3>
              <span className="text-xs text-blue-400 hover:underline cursor-pointer">Download Statement PDF</span>
            </div>

            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider bg-slate-950/40">
                  <th className="py-2.5 px-3 font-medium">Date</th>
                  <th className="py-2.5 px-3 font-medium">Description</th>
                  <th className="py-2.5 px-3 font-medium">Category</th>
                  <th className="py-2.5 px-3 font-medium">Account</th>
                  <th className="py-2.5 px-3 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {isRania ? (
                  <>
                    <tr className="hover:bg-slate-800/30">
                      <td className="py-3 px-3 font-mono text-slate-400">28 Sep 2026</td>
                      <td className="py-3 px-3 font-bold text-white">Standard Chartered DIFC — Payroll Credit</td>
                      <td className="py-3 px-3 text-emerald-400">Salary Credit</td>
                      <td className="py-3 px-3 text-slate-300 font-mono">Priority Checking</td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-emerald-400">+AED 48,500.00</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="py-3 px-3 font-mono text-slate-400">27 Sep 2026</td>
                      <td className="py-3 px-3 text-white">Spinneys Dubai Hills</td>
                      <td className="py-3 px-3 text-slate-400">Groceries</td>
                      <td className="py-3 px-3 text-slate-300 font-mono">Infinite Visa</td>
                      <td className="py-3 px-3 text-right font-mono text-slate-300">-AED 420.00</td>
                    </tr>
                  </>
                ) : (
                  <>
                    <tr className="hover:bg-slate-800/30">
                      <td className="py-3 px-3 font-mono text-slate-400">25 Sep 2026</td>
                      <td className="py-3 px-3 font-bold text-white">darna Credit Card — Minimum Payment</td>
                      <td className="py-3 px-3 text-rose-400">Credit Card Servicing</td>
                      <td className="py-3 px-3 text-slate-300 font-mono">Current Account</td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-rose-400">-AED 850.00</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="py-3 px-3 font-mono text-slate-400">22 Sep 2026</td>
                      <td className="py-3 px-3 text-white">DEWA Dubai Electricity</td>
                      <td className="py-3 px-3 text-slate-400">Utilities</td>
                      <td className="py-3 px-3 text-slate-300 font-mono">Current Account</td>
                      <td className="py-3 px-3 text-right font-mono text-slate-300">-AED 680.00</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 2: RANIA HOME LOAN OFFER & CALCULATOR (FULL DESKTOP) */}
      {activeTab === 'opportunityOffer' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-950 border border-emerald-500/40 shadow-xl space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                  Priority Banking Mortgage Privilege
                </span>
                <h2 className="text-2xl font-bold text-white mt-1">
                  Emirates NBD Home Financing Pre-Qualification
                </h2>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                  Preferred fixed introductory rates from 4.24% p.a. for 3 years, up to 80% LTV, with zero processing fees exclusively for Priority Banking clients.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 text-right font-mono shrink-0">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Indicative Facility</span>
                <span className="text-2xl font-bold text-emerald-300">AED 1,200,000</span>
              </div>
            </div>

            {/* Desktop Calculator Component */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-slate-800">
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-emerald-400" />
                  <span>Interactive Monthly Repayment Calculator</span>
                </h3>

                {/* Amount Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Financing Amount:</span>
                    <span className="font-mono font-bold text-white text-sm">
                      AED {loanAmount.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={400000}
                    max={3000000}
                    step={50000}
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>AED 400,000</span>
                    <span>AED 3,000,000</span>
                  </div>
                </div>

                {/* Tenure Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Loan Tenure:</span>
                    <span className="font-mono font-bold text-white text-sm">
                      {tenureYears} Years ({numberOfPayments} monthly installments)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={25}
                    step={1}
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>5 Years</span>
                    <span>25 Years</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Estimated Monthly Outgoing</span>
                    <span className="text-2xl font-bold font-mono text-emerald-300">
                      AED {estimatedMonthly.toLocaleString()} / mo
                    </span>
                  </div>
                  <div className="text-right text-[11px] text-slate-300">
                    <p>Introductory Rate: 4.24% p.a. fixed</p>
                    <p className="text-slate-400">DBR well below Central Bank 50% cap</p>
                  </div>
                </div>
              </div>

              {/* 3 Package Benefits */}
              <div className="lg:col-span-5 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Exclusive Priority Privileges Included
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white">Zero Processing Fee</p>
                      <p className="text-slate-400 text-[11px]">Save up to AED 12,000 on standard administration fees.</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white">Complimentary Property Valuation</p>
                      <p className="text-slate-400 text-[11px]">Certified Dubai Land Department valuation fee waived.</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white">Dedicated Mortgage Advisor</p>
                      <p className="text-slate-400 text-[11px]">Sara Al Blooshi assigned for end-to-end conveyance guidance.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab('application')}
                    className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Proceed to 3-Minute Digital Pre-Approval</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: APPLICATION & ELIGIBILITY CHECK (DESKTOP) */}
      {activeTab === 'application' && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6 max-w-4xl mx-auto">
          {/* 3 Step Desktop Progress */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 text-xs">
            <div className="flex items-center gap-3">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold ${
                appStep >= 1 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}>
                1
              </span>
              <div>
                <p className="font-bold text-white">Applicant Verification</p>
                <p className="text-[10px] text-slate-400">Pre-filled profile & income</p>
              </div>
            </div>

            <div className="h-0.5 w-16 bg-slate-800" />

            <div className="flex items-center gap-3">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold ${
                appStep >= 2 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}>
                2
              </span>
              <div>
                <p className="font-bold text-white">Central Bank DBR Check</p>
                <p className="text-[10px] text-slate-400">AECB Bureau Soft Pull</p>
              </div>
            </div>

            <div className="h-0.5 w-16 bg-slate-800" />

            <div className="flex items-center gap-3">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold ${
                appStep === 3 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}>
                3
              </span>
              <div>
                <p className="font-bold text-white">Pre-Approval Letter</p>
                <p className="text-[10px] text-slate-400">Indicative reference certificate</p>
              </div>
            </div>
          </div>

          {appStep === 1 && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] text-slate-400 mb-1 block">Full Legal Name</label>
                  <input
                    type="text"
                    disabled
                    value={customer.name}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 mb-1 block">Verified Monthly Salary (AED)</label>
                  <input
                    type="number"
                    value={confirmedSalary}
                    onChange={(e) => setConfirmedSalary(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-emerald-400 font-mono font-bold"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Verified via Standard Chartered DIFC Payroll Stream (WPS)
                  </span>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 mb-1 block">Property Category in UAE</label>
                <div className="grid grid-cols-4 gap-2">
                  {['Villa / Townhouse', 'Apartment', 'Off-Plan Premier', 'Refinance'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setPropertyType(t)}
                      className={`p-3 rounded-xl border text-center font-medium transition-all ${
                        propertyType === t
                          ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300 font-bold'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setAppStep(2)}
                  className="py-2.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2"
                >
                  <span>Continue to DBR Verification</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {appStep === 2 && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <p className="font-bold text-white">Central Bank DBR Policy Verification</p>
                <p className="text-slate-300 leading-relaxed">
                  Under Central Bank of the UAE consumer lending guidelines, total debt burden ratio must remain below 50%. Based on your verified DIFC payroll of AED 48,500 and clean liability profile, your DBR is estimated at 14%.
                </p>
              </div>

              <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                  className="mt-0.5 rounded accent-emerald-500"
                />
                <span className="text-slate-300 text-xs">
                  I consent to Emirates NBD validating my AECB credit records and income history for indicative home financing. (Soft inquiry with zero impact on credit score).
                </span>
              </label>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setAppStep(1)}
                  className="py-2.5 px-5 rounded-xl bg-slate-800 text-slate-300"
                >
                  Back
                </button>
                <button
                  disabled={!consentChecked || isEvaluating}
                  onClick={() => {
                    setIsEvaluating(true);
                    setTimeout(() => {
                      setIsEvaluating(false);
                      setAppStep(3);
                    }, 1400);
                  }}
                  className="py-2.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold flex items-center gap-2"
                >
                  {isEvaluating ? 'Evaluating CBUAE Criteria...' : 'Issue Pre-Approval Certificate'}
                </button>
              </div>
            </div>
          )}

          {appStep === 3 && (
            <div className="space-y-4 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                  Pre-Approval Status: Qualified
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  Congratulations, {customer.name}!
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-lg mx-auto">
                  You are indicatively qualified for Emirates NBD Priority Home Financing up to:
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 max-w-md mx-auto">
                <span className="text-3xl font-bold font-mono text-emerald-300">AED 1,200,000</span>
                <div className="text-xs text-slate-400 mt-1">
                  Reference: <span className="font-mono text-white">HL-2026-ENBD-8842</span>
                </div>
                <div className="text-xs text-slate-300 mt-2">
                  Fixed Rate: 4.24% p.a. • Estimated AED 6,500 / month
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => setActiveTab('advisor')}
                  className="py-2.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment with RM Sara Al Blooshi</span>
                </button>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="py-2.5 px-5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-medium"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 4: TARIQ FINANCIAL WELLNESS CENTER (FULL DESKTOP) */}
      {activeTab === 'wellness' && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6 max-w-4xl mx-auto">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex p-3 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white">
              Financial Peace of Mind & Restructuring Options
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Everyday financial commitments fluctuate. Emirates NBD provides confidential, practical options to realign payment schedules and consolidate balances to fit your current income.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div
              onClick={() => setWellnessChoice('lower')}
              className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2 ${
                wellnessChoice === 'lower'
                  ? 'border-blue-500 bg-blue-950/40 shadow-md'
                  : 'border-slate-800 bg-slate-950 hover:border-slate-700'
              }`}
            >
              <Layers className="w-5 h-5 text-blue-400" />
              <h4 className="font-bold text-white text-sm">Consolidate into Single Plan</h4>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Combine high-interest revolving card balances into a structured low-rate installment plan.
              </p>
              <div className="text-blue-300 font-mono text-[10px] bg-blue-900/30 p-1.5 rounded">
                Cashflow relief: ~AED 1,080 / month
              </div>
            </div>

            <div
              onClick={() => setWellnessChoice('date')}
              className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2 ${
                wellnessChoice === 'date'
                  ? 'border-blue-500 bg-blue-950/40 shadow-md'
                  : 'border-slate-800 bg-slate-950 hover:border-slate-700'
              }`}
            >
              <Clock className="w-5 h-5 text-blue-400" />
              <h4 className="font-bold text-white text-sm">Payment Date Realignment</h4>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Shift your monthly due dates to match your salary receipt date to avoid temporary liquidity gaps.
              </p>
            </div>

            <div
              onClick={() => setWellnessChoice('advisor')}
              className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2 ${
                wellnessChoice === 'advisor'
                  ? 'border-blue-500 bg-blue-950/40 shadow-md'
                  : 'border-slate-800 bg-slate-950 hover:border-slate-700'
              }`}
            >
              <PhoneCall className="w-5 h-5 text-blue-400" />
              <h4 className="font-bold text-white text-sm">Confidential Advisor Consultation</h4>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Connect 1-on-1 with Senior Advisor Ahmed Mansoor for confidential, judgment-free restructuring.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">
              Exploring support options does not alter current facilities or impact your credit bureau score.
            </span>
            <button
              onClick={() => {
                if (wellnessChoice === 'advisor') {
                  setActiveTab('advisor');
                } else {
                  setWellnessSubmitted(true);
                }
              }}
              className="py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
            >
              {wellnessChoice === 'advisor' ? 'Book Advisor Call' : 'Request Restructuring Proposal'}
            </button>
          </div>

          {wellnessSubmitted && (
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                Proposal request submitted confidentially. Senior Advisor Ahmed Mansoor will review your accounts and message you directly in the secure consultation tab.
              </span>
            </div>
          )}
        </div>
      )}

      {/* VIEW 5: DEDICATED ADVISOR CONSULTATION & CHAT (FULL DESKTOP) */}
      {activeTab === 'advisor' && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-base">
                {isTariq ? 'AM' : 'SB'}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  {isTariq ? 'Ahmed Mansoor' : 'Sara Al Blooshi'}
                </h3>
                <p className="text-xs text-slate-400">
                  {isTariq ? 'Senior Financial Wellness Specialist' : 'Priority Banking Relationship Manager'}
                </p>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Verified Emirates NBD Specialist • Online Now
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Selected Slot:</span>
              <span className="font-mono text-emerald-300 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                {selectedSlot}
              </span>
            </div>
          </div>

          {/* Secure Chat Box (Desktop) */}
          <div className="space-y-3">
            <div className="h-64 rounded-xl bg-slate-950 border border-slate-800 p-4 overflow-y-auto space-y-3 text-xs flex flex-col">
              {chatMessages.map((m, idx) => (
                <div
                  key={idx}
                  className={`max-w-[70%] p-3 rounded-2xl leading-relaxed ${
                    m.sender === 'customer'
                      ? 'ml-auto bg-blue-600 text-white rounded-br-xs'
                      : 'mr-auto bg-slate-800 text-slate-200 border border-slate-700/80 rounded-bl-xs'
                  }`}
                >
                  <p>{m.text}</p>
                  <span className="text-[10px] text-slate-400 block text-right mt-1 font-mono">
                    {m.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                placeholder="Type your confidential question here..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSendChat}
                className="py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
