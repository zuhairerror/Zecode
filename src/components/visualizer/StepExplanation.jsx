import React from 'react';
import { Info, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function StepExplanation({ step }) {
  if (!step) return null;

  const isSuccess = step.status === 'success';
  const isError = step.status === 'error';

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-xl border transition-all duration-300 ${
        isSuccess
          ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
          : isError
          ? 'bg-rose-950/20 border-rose-500/40 text-rose-200'
          : 'bg-[#0F172A] border-slate-800 text-slate-200'
      }`}
    >
      <div className="mt-0.5">
        {isSuccess ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        ) : isError ? (
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
        ) : (
          <Info className="w-5 h-5 text-cyan-400 shrink-0" />
        )}
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded ${
              isSuccess
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : isError
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
            }`}
          >
            {step.action || 'EXECUTE'}
          </span>
          {step.codeLine && (
            <span className="text-xs font-mono text-slate-400">
              Line {step.codeLine}
            </span>
          )}
        </div>
        <p className="text-sm font-sans leading-relaxed text-slate-200">
          {step.description}
        </p>
      </div>
    </div>
  );
}
