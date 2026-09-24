import React from 'react';
import { MapPinOff } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
}) => {
  return (
    <div className="glass-panel rounded-2xl p-12 text-center flex flex-col items-center justify-center max-w-lg mx-auto border border-dashed border-slate-800 my-6">
      <div className="w-14 h-14 rounded-2xl bg-slate-800/80 text-emerald-400 flex items-center justify-center mb-4 border border-slate-700/60 shadow-inner">
        {icon || <MapPinOff className="w-7 h-7 text-emerald-400" />}
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400 mb-6 max-w-md">{description}</p>

      {action && (
        <button
          onClick={action.onClick}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};
