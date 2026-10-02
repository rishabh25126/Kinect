import React, { useState } from 'react';
import { useKinect } from '../../context/KinectContext';
import { ModeBadge } from '../common/ModeBadge';
import { ConfidenceChip } from '../common/ConfidenceChip';
import { AiBadge, EthicsNoticeBanner } from '../common/AiBadge';
import {
  Sparkles,
  Bot,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Smartphone,
  MessageSquare,
  PhoneCall,
  Send,
  RotateCw,
  Sliders,
  Globe,
  Info,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export const RecommendationStudioScreen: React.FC = () => {
  const {
    selectedSignal,
    selectedCustomer,
    selectedRecommendation,
    products,
    approveRecommendation,
    openMobileSimulator,
    setActiveView,
    language,
    setLanguage,
  } = useKinect();

  const [activeChannel, setActiveChannel] = useState<'inApp' | 'push' | 'sms' | 'rmPoints'>('inApp');
  const [tone, setTone] = useState<'Warm' | 'Professional' | 'Concise'>('Warm');
  const [showAiDrawer, setShowAiDrawer] = useState(false);
  const [showSourceDocModal, setShowSourceDocModal] = useState(false);
  const [approvedState, setApprovedState] = useState(false);

  // Editable fields initialized from recommendation
  const rec = selectedRecommendation;
  const cust = selectedCustomer;
  const sig = selectedSignal;

  const [inAppTitle, setInAppTitle] = useState(rec?.messages.inApp.title || '');
  const [inAppBody, setInAppBody] = useState(rec?.messages.inApp.body || '');
  const [inAppCta, setInAppCta] = useState(rec?.messages.inApp.ctaText || 'Explore Options');

  if (!cust || !sig || !rec) {
    return <div className="p-8 text-center text-slate-400">Recommendation data not loaded.</div>;
  }

  const product = products.find((p) => p.id === rec.productId) || products[0];

  const handleApprove = () => {
    approveRecommendation(rec.id);
    setApprovedState(true);
    setTimeout(() => {
      setActiveView('actionCentre');
    }, 1200);
  };

  return (
    <div className="space-y-4">
      {/* Top Banner & AI Notice */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0b1e44] via-[#0d2757] to-[#0a1c3d] border border-blue-900/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <AiBadge reviewerRole={rec.aiMetadata.reviewerRoleRequired} />
            <span className="text-xs text-slate-400">
              Model: <code className="font-mono text-blue-300">{rec.aiMetadata.modelVersion}</code>
            </span>
          </div>
          <h2 className="text-base font-bold text-white tracking-tight mt-1">
            Grounded Recommendation Studio
          </h2>
          <p className="text-xs text-slate-300">
            Synthesizing verified core banking product terms into compliant, personalized customer actions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAiDrawer(!showAiDrawer)}
            className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 border border-slate-700"
          >
            <Info className="w-3.5 h-3.5 text-blue-400" />
            <span>AI Transparency Drawer</span>
          </button>
        </div>
      </div>

      {/* AI Transparency Drawer */}
      {showAiDrawer && (
        <div className="p-4 rounded-xl bg-slate-900 border border-blue-500/40 text-xs text-slate-300 space-y-2">
          <h4 className="font-bold text-blue-300 uppercase tracking-wider text-[11px]">
            AI Governance & Grounded Provenance
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-[11px] font-mono">
            <div>
              <span className="text-slate-400 block">Prompt Template:</span>
              <span className="text-white">{rec.aiMetadata.promptVersion}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Retrieved Source:</span>
              <span className="text-emerald-400 truncate block">{rec.aiMetadata.retrievedSources[0]}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Generation Time:</span>
              <span className="text-slate-200">{rec.aiMetadata.generationTimestamp}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Mandatory Reviewer:</span>
              <span className="text-amber-300">{rec.aiMetadata.reviewerRoleRequired}</span>
            </div>
          </div>
        </div>
      )}

      {/* THREE COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT COLUMN: CONTEXT (3 Cols) */}
        <div className="lg:col-span-3 space-y-3">
          {/* Customer Summary Card */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              1. Customer Context
            </span>

            <div className="flex items-center gap-2.5">
              <img src={cust.avatar} alt={cust.name} className="w-9 h-9 rounded-full object-cover" />
              <div>
                <h4 className="text-xs font-bold text-white">{cust.name}</h4>
                <p className="text-[10px] text-slate-400 font-mono">{cust.maskedId}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Segment:</span>
                <span className="text-amber-300 font-medium">{cust.segment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Monthly Inflow:</span>
                <span className="font-mono text-white">AED {cust.monthlyIncomeAED.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">DBR Ratio:</span>
                <span className="font-mono text-emerald-400">{cust.creditUtilisationPct}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Preferred Channel:</span>
                <span className="text-slate-200 truncate">{cust.contactPreference}</span>
              </div>
            </div>
          </div>

          {/* Triggering Signal Card */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Triggering Signal
            </span>
            <div className="flex items-center justify-between">
              <ModeBadge mode={sig.mode} size="sm" />
              <ConfidenceChip confidence={sig.confidence} size="sm" />
            </div>
            <h4 className="font-bold text-white text-xs mt-1">{sig.name}</h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">{sig.oneSentenceExplanation}</p>
          </div>

          {/* Existing Product Holdings */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Holdings Check (No Conflict)
            </span>
            {cust.productsHeld.map((p, i) => (
              <div key={i} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CENTRE COLUMN: GROUNDED RECOMMENDATION & RAG RETRIEVAL (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                2. Retrieved Product / Intervention
              </span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-blue-900/40 text-blue-300 border border-blue-500/30">
                {product.code}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white">{product.name}</h3>
              <p className="text-xs text-emerald-400 font-medium mt-0.5">
                {product.indicativeRateOrBenefit}
              </p>
            </div>

            {/* Match Rationale */}
            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-slate-300 space-y-1">
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block">
                Match Rationale
              </span>
              <p className="text-[11px] leading-relaxed">{rec.matchRationale}</p>
            </div>

            {/* Eligibility Requirements */}
            <div className="space-y-1.5 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Approved Eligibility Requirements
              </span>
              <div className="space-y-1">
                {product.eligibilitySummary.map((el, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{el}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Approved Source Document Link */}
            <div className="p-2.5 rounded-lg bg-blue-950/20 border border-blue-900/40 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <span className="text-[11px] text-slate-300 truncate max-w-[220px]">
                  {product.sourceDocument}
                </span>
              </div>
              <button
                onClick={() => setShowSourceDocModal(true)}
                className="text-[11px] text-blue-400 hover:underline flex items-center gap-0.5 shrink-0"
              >
                <span>View Source</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            {/* Alternatives */}
            <div className="pt-2 border-t border-slate-800 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Considered Alternatives
              </span>
              <div className="flex flex-wrap gap-1.5">
                {rec.alternatives.map((alt, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                    {alt}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: MESSAGE EDITOR & COMPLIANCE (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                3. Customer Message Composer
              </span>

              {/* Language Switcher */}
              <div className="flex gap-1 text-[10px]">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-1.5 py-0.5 rounded font-bold ${
                    language === 'en' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('ar')}
                  className={`px-1.5 py-0.5 rounded font-bold ${
                    language === 'ar' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  AR (العربية)
                </button>
              </div>
            </div>

            {/* Channel Tabs */}
            <div className="flex gap-1 p-1 rounded-lg bg-slate-950 border border-slate-800 text-xs">
              {[
                { id: 'inApp', label: 'In-App' },
                { id: 'push', label: 'Push' },
                { id: 'sms', label: 'SMS' },
                { id: 'rmPoints', label: 'RM Brief' },
              ].map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => setActiveChannel(ch.id as any)}
                  className={`flex-1 py-1 rounded text-center font-medium transition-all ${
                    activeChannel === ch.id
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {ch.label}
                </button>
              ))}
            </div>

            {/* Tone Selector */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">Tone Style:</span>
              <div className="flex gap-1">
                {(['Warm', 'Professional', 'Concise'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                      tone === t ? 'bg-slate-700 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Body Area */}
            {activeChannel === 'inApp' && (
              <div className="space-y-2 text-xs" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Headline</label>
                  <input
                    type="text"
                    value={language === 'ar' ? (rec.messages.inApp.titleAr || inAppTitle) : inAppTitle}
                    onChange={(e) => setInAppTitle(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-medium text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Body Text</label>
                  <textarea
                    rows={4}
                    value={language === 'ar' ? (rec.messages.inApp.bodyAr || inAppBody) : inAppBody}
                    onChange={(e) => setInAppBody(e.target.value)}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs outline-none leading-relaxed"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Call To Action (CTA)</label>
                  <input
                    type="text"
                    value={language === 'ar' ? (rec.messages.inApp.ctaTextAr || inAppCta) : inAppCta}
                    onChange={(e) => setInAppCta(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-medium text-xs outline-none"
                  />
                </div>
              </div>
            )}

            {activeChannel === 'push' && (
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono">Push Notification Preview</span>
                  <p className="font-bold text-white text-xs">{rec.messages.push.title}</p>
                  <p className="text-[11px] text-slate-300">{rec.messages.push.body}</p>
                </div>
              </div>
            )}

            {activeChannel === 'sms' && (
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono">SMS Payload (152 chars)</span>
                  <p className="text-[11px] text-slate-200 font-mono leading-relaxed">{rec.messages.sms.body}</p>
                </div>
              </div>
            )}

            {activeChannel === 'rmPoints' && (
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                    RM Talking Points
                  </span>
                  <p className="text-slate-300 italic text-[11px]">"{rec.messages.rmTalkingPoints.opener}"</p>
                  <ul className="list-disc pl-4 space-y-1 text-slate-300 text-[11px]">
                    {rec.messages.rmTalkingPoints.keyPoints.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                  <div className="text-[10px] text-amber-300 bg-amber-950/40 p-2 rounded border border-amber-600/30">
                    {rec.messages.rmTalkingPoints.guardrailNotice}
                  </div>
                </div>
              </div>
            )}

            {/* Real-time Compliance Verification */}
            <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 space-y-1 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
                <ShieldCheck className="w-4 h-4" />
                <span>Real-Time Compliance Verified</span>
              </div>
              <ul className="text-[10px] text-slate-300 space-y-0.5 pl-4 list-disc">
                {rec.complianceFlags.map((flag, i) => (
                  <li key={i}>{flag}</li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleApprove}
                disabled={approvedState}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-blue-950/40 transition-all"
              >
                {approvedState ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>Approved & Dispatched!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-white" />
                    <span>Approve & Schedule Action</span>
                  </>
                )}
              </button>

              <button
                onClick={() => openMobileSimulator(cust.id, sig.mode === 'opportunity' ? 'opportunityDetail' : 'wellness')}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700"
              >
                <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                <span>Live ENBD Mobile Preview</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Source Doc Modal */}
      {showSourceDocModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg p-5 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <span>Catalogue Source Document</span>
              </h3>
              <button onClick={() => setShowSourceDocModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl font-mono text-[11px] text-slate-300 space-y-1">
              <p>Document: {product.sourceDocument}</p>
              <p>Catalog Code: {product.code}</p>
              <p>Approved Version: {product.approvedVersion}</p>
              <p>Effective Date: {product.effectiveDate}</p>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold text-slate-200">Required Disclaimers:</span>
              <ul className="list-disc pl-4 text-slate-300 space-y-1 text-[11px]">
                {product.requiredDisclaimers.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold text-rose-300">Prohibited Claims:</span>
              <ul className="list-disc pl-4 text-slate-300 space-y-1 text-[11px]">
                {product.prohibitedClaims.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setShowSourceDocModal(false)}
              className="w-full py-2 bg-slate-800 text-white rounded-xl text-xs font-semibold"
            >
              Close Source View
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
