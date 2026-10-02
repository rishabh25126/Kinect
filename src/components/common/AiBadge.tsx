import React from 'react';
import { Bot, AlertCircle } from 'lucide-react';

interface AiBadgeProps {
  reviewerRole?: string;
  size?: 'sm' | 'md';
}

export const AiBadge: React.FC<AiBadgeProps> = ({ reviewerRole, size = 'sm' }) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 font-medium ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
      }`}
      title="AI-generated content. Requires human confirmation before customer delivery."
    >
      <Bot className="w-3.5 h-3.5 text-indigo-400" />
      <span>AI generated — review required</span>
      {reviewerRole && (
        <span className="text-[10px] text-indigo-300/80 bg-indigo-900/60 px-1.5 py-0.2 rounded border border-indigo-500/30">
          {reviewerRole}
        </span>
      )}
    </span>
  );
};

export const EthicsNoticeBanner: React.FC<{ message?: string }> = ({
  message = 'Signals are decision support, not definitive conclusions. Human verification is required prior to sensitive outreach.',
}) => {
  return (
    <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-amber-950/30 border border-amber-600/30 text-amber-200 text-xs">
      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
      <span className="font-normal">{message}</span>
    </div>
  );
};
