import React from 'react';
import { Mode } from '../../types';
import { Sparkles, ShieldAlert } from 'lucide-react';

interface ModeBadgeProps {
  mode: Mode;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const ModeBadge: React.FC<ModeBadgeProps> = ({ mode, size = 'md', showIcon = true }) => {
  const isOpp = mode === 'opportunity';

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1.5 gap-2 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border tracking-wide uppercase ${sizeClasses[size]} ${
        isOpp
          ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300'
          : 'bg-rose-950/70 border-rose-500/40 text-rose-300'
      }`}
    >
      {showIcon && (
        isOpp ? <Sparkles className="w-3 h-3 text-emerald-400" /> : <ShieldAlert className="w-3 h-3 text-rose-400" />
      )}
      <span>{isOpp ? 'Opportunity' : 'Protection'}</span>
    </span>
  );
};
