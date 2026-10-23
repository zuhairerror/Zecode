import React from 'react';
import { Info, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function StepExplanation({ step }) {
  if (!step) return null;

  const isSuccess = step.status === 'success';
  const isError = step.status === 'error';

  return (
    <div
      className={`surface-card flex items-start gap-3 p-3.5 sm:p-4 transition-all duration-200 border-white/[0.08] ${
        isSuccess
          ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
          : isError
          ? 'bg-rose-950/20 border-rose-500/30 text-rose-200'
          : ''
      }`}
    >
      <div className="mt-0.5 shrink-0">
        {isSuccess ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        ) : isError ? (
          <AlertTriangle className="w-4 h-4 text-rose-400" />
        ) : (
          <Info className="w-4 h-4 text-cyan-400" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span
            className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded ${
              isSuccess
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                : isError
                ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                : 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
            }`}
          >
            {step.action || 'EXECUTE'}
          </span>
          {step.codeLine && (
            <span className="text-[11px] font-mono text-slate-400 font-semibold">
              Line {step.codeLine}
            </span>
          )}
        </div>
        <p className="text-xs sm:text-sm font-sans leading-relaxed text-slate-200">
          {step.description}
        </p>
      </div>
    </div>
  );
}
