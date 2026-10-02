import React, { useState } from 'react';
import { useKinect } from '../../context/KinectContext';
import { ModeBadge } from '../common/ModeBadge';
import { ConfidenceChip } from '../common/ConfidenceChip';
import {
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  User,
  Shield,
  Smartphone,
  Layers,
  RotateCcw,
  Check
} from 'lucide-react';

export const SignalDetailScreen: React.FC = () => {
  const {
    selectedSignal,
    selectedCustomer,
    openRecommendationStudio,
    openMobileSimulator,
    dismissSignal,
    auditLogs,
    addAuditLog,
    currentUserRole,
  } = useKinect();

  const [feedback, setFeedback] = useState<'correct' | 'false_positive' | 'more_evidence' | null>(null);
  const [feedbackSaved, setFeedbackSaved] = useState(false);

  if (!selectedSignal || !selectedCustomer) {
    return <div className="p-8 text-center text-slate-400">Signal not found.</div>;
  }

  const handleFeedback = (type: 'correct' | 'false_positive' | 'more_evidence') => {
    setFeedback(type);
    setFeedbackSaved(true);
    addAuditLog({
      actor: currentUserRole === 'Relationship Manager' ? 'Sara Al Blooshi' : 'Ahmed Mansoor',
      actorRole: currentUserRole,
      customerName: selectedCustomer.name,
      action: `Signal Feedback Provided: ${type.toUpperCase()}`,
      beforeValue: 'Pending Review',
      afterValue: type,
      reason: `Advisor validated model evidence against customer history.`,
    });
  };

  return (
    <div className="space-y-5">
      {/* Header Bar */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0c2044] via-[#0e2752] to-[#091b3b] border border-blue-900/40 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <ModeBadge mode={selectedSignal.mode} />
            <ConfidenceChip confidence={selectedSignal.confidence} />
            <span className="text-xs text-slate-400 font-mono">Detected {selectedSignal.detectedAt}</span>
          </div>

          <h2 className="text-lg font-bold text-white tracking-tight mt-2">
            {selectedSignal.name}
          </h2>

          <div className="mt-1 flex items-center gap-2 text-xs text-slate-300">
            <span>Customer: <b className="text-white">{selectedCustomer.name}</b></span>
            <span>•</span>
            <span>Segment: <b className="text-amber-300">{selectedCustomer.segment}</b></span>
            <span>•</span>
            <span>Impact: <b className="text-emerald-400 font-mono">{selectedSignal.severityOrValue}</b></span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openRecommendationStudio(selectedSignal.id)}
            className="py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-blue-950/40"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Open Recommendation Studio →</span>
          </button>
          <button
            onClick={() => openMobileSimulator(selectedCustomer.id, selectedSignal.mode === 'opportunity' ? 'opportunityDetail' : 'wellness')}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            title="Preview in Mobile"
          >
            <Smartphone className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>

      {/* One-Sentence Plain Language Explanation */}
      <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/30 text-xs text-blue-200">
        <span className="font-bold text-white block mb-0.5 uppercase tracking-wider text-[10px]">
          Grounded Signal Rationale:
        </span>
        <p className="text-sm font-medium text-slate-100">{selectedSignal.oneSentenceExplanation}</p>
      </div>

      {/* 2-Column Layout: Evidence & Baseline vs. Rule & Factors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Columns: Evidence Timeline & Baseline Comparison */}
        <div className="lg:col-span-2 space-y-4">
          {/* Baseline Comparison Chart / Metrics */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Baseline vs. Observed Current Period
                </h3>
                <p className="text-[11px] text-slate-400">
                  Compared against customer's 6-month historical moving average
                </p>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">Statistical Variance Check</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {selectedSignal.baselineComparison.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block truncate">
                    {item.metric}
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-mono font-bold text-white">{item.currentValue}</span>
                    <span
                      className={`text-xs font-mono font-bold flex items-center ${
                        item.changePct > 0
                          ? selectedSignal.mode === 'opportunity' ? 'text-emerald-400' : 'text-rose-400'
                          : 'text-slate-400'
                      }`}
                    >
                      {item.changePct > 0 ? `+${item.changePct}%` : `${item.changePct}%`}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    Baseline: {item.baselineValue}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Evidence Event Stream */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Corroborating Event Evidence Stream
            </h3>
            <div className="space-y-2.5">
              {selectedSignal.evidenceItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <p className="font-semibold text-white">{item.description}</p>
                    <span className="text-[10px] font-mono text-slate-400">
                      Timestamp: {item.date} • Category: {item.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        item.impact === 'primary'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.impact} Factor
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contributing Multi-Factor Weights */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Model Factor Contribution Weights
            </h3>
            <div className="space-y-3 text-xs">
              {selectedSignal.contributingFactors.map((factor, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span className="font-medium">{factor.label}</span>
                    <span className="font-mono text-slate-400">
                      {factor.value} ({factor.contributionPct}% weight)
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${
                        selectedSignal.mode === 'opportunity' ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${factor.contributionPct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Rule Engine Trigger, Freshness, & Feedback */}
        <div className="space-y-4">
          {/* Rule Trigger Breakdown */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 text-xs">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Rule & Model Diagnostics
            </span>

            <div className="space-y-2">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Triggered Rule</span>
                <code className="text-[11px] font-mono text-blue-300 font-bold block mt-0.5">
                  {selectedSignal.ruleExplanation.ruleName}
                </code>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Configured Threshold</span>
                <span className="text-slate-300 block">{selectedSignal.ruleExplanation.threshold}</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Observed Value</span>
                <span className="text-emerald-300 font-mono font-bold block">
                  {selectedSignal.ruleExplanation.observedValue}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 block uppercase">ML Ensemble Model</span>
                <span className="text-slate-300 font-mono text-[11px] block">
                  {selectedSignal.ruleExplanation.modelVersion}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Data Freshness</span>
                <span className="text-emerald-400 text-[11px] flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {selectedSignal.ruleExplanation.dataFreshness}
                </span>
              </div>
            </div>
          </div>

          {/* Historical Aggregate Outcomes */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Similar Historical Cohort
            </span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {selectedSignal.historicalOutcomesNote}
            </p>
          </div>

          {/* Advisor Human Feedback Controls */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 text-xs">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Advisor Decision Support Feedback
            </span>
            <p className="text-[11px] text-slate-400">
              Provide feedback to continually refine precision in production:
            </p>

            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => handleFeedback('correct')}
                className={`py-1.5 px-1 rounded-lg border text-center font-medium transition-all ${
                  feedback === 'correct'
                    ? 'bg-emerald-600 text-white border-emerald-500'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                Correct
              </button>
              <button
                onClick={() => handleFeedback('false_positive')}
                className={`py-1.5 px-1 rounded-lg border text-center font-medium transition-all ${
                  feedback === 'false_positive'
                    ? 'bg-rose-600 text-white border-rose-500'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                False Pos
              </button>
              <button
                onClick={() => handleFeedback('more_evidence')}
                className={`py-1.5 px-1 rounded-lg border text-center font-medium transition-all ${
                  feedback === 'more_evidence'
                    ? 'bg-amber-600 text-white border-amber-500'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                Need More
              </button>
            </div>

            {feedbackSaved && (
              <span className="text-[10px] text-emerald-400 font-semibold block text-center">
                ✓ Feedback recorded in governance audit log.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
