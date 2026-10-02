import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string;
  subtitle?: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendType?: 'positive' | 'negative' | 'neutral';
  icon?: LucideIcon;
  accentColor?: 'emerald' | 'rose' | 'amber' | 'blue' | 'slate';
  onClick?: () => void;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  subtitle,
  change,
  trend = 'up',
  trendType = 'positive',
  icon: Icon,
  accentColor = 'slate',
  onClick,
}) => {
  const accentClasses = {
    emerald: 'border-emerald-500/20 hover:border-emerald-500/40 bg-gradient-to-br from-slate-900/90 to-emerald-950/20',
    rose: 'border-rose-500/20 hover:border-rose-500/40 bg-gradient-to-br from-slate-900/90 to-rose-950/20',
    amber: 'border-amber-500/20 hover:border-amber-500/40 bg-gradient-to-br from-slate-900/90 to-amber-950/20',
    blue: 'border-blue-500/20 hover:border-blue-500/40 bg-gradient-to-br from-slate-900/90 to-blue-950/20',
    slate: 'border-slate-800 hover:border-slate-700 bg-slate-900/80',
  };

  const iconBgClasses = {
    emerald: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
    rose: 'bg-rose-500/10 text-rose-400 border border-rose-500/30',
    amber: 'bg-amber-500/10 text-amber-400 border border-amber-500/30',
    blue: 'bg-blue-500/10 text-blue-400 border border-blue-500/30',
    slate: 'bg-slate-800 text-slate-300 border border-slate-700',
  };

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-xl border transition-all duration-200 shadow-sm ${accentClasses[accentColor]} ${
        onClick ? 'cursor-pointer hover:shadow-md hover:translate-y-[-1px]' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</p>
        {Icon && (
          <div className={`p-2 rounded-lg ${iconBgClasses[accentColor]}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight text-white font-mono">{value}</span>
      </div>

      {(change || subtitle) && (
        <div className="mt-2.5 flex items-center justify-between text-xs">
          {change && (
            <span
              className={`inline-flex items-center gap-1 font-medium ${
                trendType === 'positive'
                  ? 'text-emerald-400'
                  : trendType === 'negative'
                  ? 'text-rose-400'
                  : 'text-slate-400'
              }`}
            >
              {trend === 'up' && <TrendingUp className="w-3 h-3" />}
              {trend === 'down' && <TrendingDown className="w-3 h-3" />}
              {change}
            </span>
          )}
          {subtitle && <span className="text-slate-400 truncate max-w-[170px]">{subtitle}</span>}
        </div>
      )}
    </div>
  );
};
