import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  subtext?: string;
  icon?: React.ReactNode;
  highlight?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  unit,
  change,
  trend = 'neutral',
  subtext,
  icon,
  highlight = false,
}) => {
  return (
    <div
      className={`glass-panel glass-panel-hover rounded-2xl p-5 relative overflow-hidden transition-all duration-300 ${
        highlight
          ? 'ring-1 ring-emerald-500/40 bg-gradient-to-b from-slate-900/90 to-emerald-950/20'
          : ''
      }`}
    >
      {/* Decorative gradient glow top corner */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          {label}
        </span>
        {icon && (
          <div className="p-2 rounded-xl bg-slate-800/80 text-emerald-400 border border-slate-700/50">
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-3xl font-extrabold text-white tracking-tight">
          {value}
        </span>
        {unit && (
          <span className="text-sm font-medium text-slate-400">{unit}</span>
        )}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-800/50 text-xs">
        {change && (
          <div
            className={`inline-flex items-center gap-1 font-semibold ${
              trend === 'up'
                ? 'text-emerald-400'
                : trend === 'down'
                ? 'text-rose-400'
                : 'text-slate-400'
            }`}
          >
            {trend === 'up' && <TrendingUp className="w-3.5 h-3.5" />}
            {trend === 'down' && <TrendingDown className="w-3.5 h-3.5" />}
            {trend === 'neutral' && <Minus className="w-3.5 h-3.5" />}
            <span>{change}</span>
          </div>
        )}
        {subtext && (
          <span className="text-slate-500 truncate max-w-[140px]" title={subtext}>
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
};
