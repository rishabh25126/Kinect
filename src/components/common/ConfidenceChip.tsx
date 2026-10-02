import React from 'react';

interface ConfidenceChipProps {
  confidence: number; // 0 - 100
  label?: string;
  size?: 'sm' | 'md';
}

export const ConfidenceChip: React.FC<ConfidenceChipProps> = ({ confidence, label, size = 'md' }) => {
  const qualitativeLabel =
    label || (confidence >= 85 ? 'High Confidence' : confidence >= 70 ? 'Medium Confidence' : 'Needs Review');

  const colorScheme =
    confidence >= 85
      ? 'bg-blue-950/60 border-blue-500/30 text-blue-300'
      : confidence >= 70
      ? 'bg-amber-950/60 border-amber-500/30 text-amber-300'
      : 'bg-slate-800 border-slate-700 text-slate-300';

  const dotColor =
    confidence >= 85 ? 'bg-blue-400' : confidence >= 70 ? 'bg-amber-400' : 'bg-slate-400';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
      } ${colorScheme} font-mono font-medium`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      <span className="font-semibold">{confidence}%</span>
      <span className="text-[11px] font-sans opacity-90">• {qualitativeLabel}</span>
    </span>
  );
};
