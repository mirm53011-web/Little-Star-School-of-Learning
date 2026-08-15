import React from 'react';
import { Star, Check } from 'lucide-react';

interface HorizontalProgressBarProps {
  className?: string;
  variant?: 'amber' | 'emerald' | 'blue' | 'slate';
  height?: 'xs' | 'sm' | 'md';
  label?: string;
  showStarGlow?: boolean;
}

export const HorizontalProgressBar: React.FC<HorizontalProgressBarProps> = ({
  className = '',
  variant = 'amber',
  height = 'sm',
  label,
  showStarGlow = true
}) => {
  const heightClasses = {
    xs: 'h-1',
    sm: 'h-1.5',
    md: 'h-2.5'
  };

  const bgClasses = {
    amber: 'bg-amber-950/40 border-amber-500/20',
    emerald: 'bg-emerald-950/40 border-emerald-500/20',
    blue: 'bg-blue-950/40 border-blue-500/20',
    slate: 'bg-slate-800/80 border-slate-700'
  };

  const barGradients = {
    amber: 'from-amber-600 via-amber-400 to-yellow-300',
    emerald: 'from-emerald-600 via-emerald-400 to-teal-300',
    blue: 'from-blue-600 via-sky-400 to-cyan-300',
    slate: 'from-slate-500 via-slate-300 to-slate-100'
  };

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {label && (
        <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
          <span className="flex items-center space-x-1.5">
            {showStarGlow && <Star className="w-3 h-3 text-amber-400 fill-amber-400 animate-pulse" />}
            <span>{label}</span>
          </span>
          <span className="text-[10px] text-amber-400 font-mono tracking-wider uppercase">Processing</span>
        </div>
      )}
      <div className={`w-full overflow-hidden rounded-full ${heightClasses[height]} ${bgClasses[variant]} border relative shadow-inner`}>
        <div
          className={`h-full w-full bg-gradient-to-r ${barGradients[variant]} animate-progress-bar rounded-full shadow-[0_0_12px_rgba(245,158,11,0.5)]`}
        />
      </div>
    </div>
  );
};

interface ActionButtonProgressProps {
  label?: string;
  isCompleted?: boolean;
  completedLabel?: string;
  className?: string;
}

export const ActionButtonProgress: React.FC<ActionButtonProgressProps> = ({
  label = 'Saving...',
  isCompleted = false,
  completedLabel = 'Saved ✓',
  className = ''
}) => {
  if (isCompleted) {
    return (
      <span className={`inline-flex items-center space-x-1.5 font-bold text-slate-950 ${className}`}>
        <Check className="w-4 h-4" />
        <span>{completedLabel}</span>
      </span>
    );
  }

  return (
    <div className={`inline-flex flex-col items-center justify-center min-w-[100px] py-0.5 space-y-1 ${className}`}>
      <div className="w-full h-1 bg-slate-950/20 overflow-hidden rounded-full relative">
        <div className="h-full w-full bg-slate-950 animate-progress-bar rounded-full" />
      </div>
      <span className="text-[11px] font-bold tracking-tight leading-none text-slate-950">
        {label}
      </span>
    </div>
  );
};

interface FullPageLoaderProps {
  message?: string;
  subMessage?: string;
}

export const FullPageLoader: React.FC<FullPageLoaderProps> = ({
  message = 'Loading Little Star School of Learning...',
  subMessage = 'Connecting to real-time Firestore database'
}) => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 select-none">
      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 text-center backdrop-blur-md">
        {/* Star Icon Brand */}
        <div className="relative mx-auto w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shadow-lg shadow-amber-500/5">
          <Star className="w-8 h-8 text-amber-400 fill-amber-400/30 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold font-display text-white tracking-wide">
            Little Star School of Learning
          </h2>
          <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
            Batpora, Shopian
          </p>
          <p className="text-xs text-slate-400 pt-1">
            {message}
          </p>
        </div>

        {/* Clean Horizontal Loading Bar */}
        <div className="pt-2">
          <HorizontalProgressBar
            variant="amber"
            height="sm"
            showStarGlow={false}
          />
        </div>

        <p className="text-[11px] text-slate-500 font-medium">
          {subMessage}
        </p>
      </div>
    </div>
  );
};

export default HorizontalProgressBar;
