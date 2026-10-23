import React from 'react';
import { Eye } from 'lucide-react';

export default function StateInspector({ variables = {} }) {
  const entries = Object.entries(variables);

  return (
    <div className="surface-card flex flex-col p-3.5 sm:p-4 shadow-md border-white/[0.08]">
      <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-white/[0.06]">
        <Eye className="w-3.5 h-3.5 text-cyan-400" />
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
          Live State Inspector
        </h4>
        <span className="text-[10px] font-mono text-slate-500 ml-auto">
          {entries.length} variables
        </span>
      </div>

      {entries.length === 0 ? (
        <span className="text-xs font-mono text-slate-500 py-1">
          No active variables tracked in this step.
        </span>
      ) : (
        <div className="flex flex-wrap gap-2 max-h-[140px] overflow-y-auto">
          {entries.map(([key, val]) => (
            <div
              key={key}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs font-mono"
            >
              <span className="text-cyan-400 font-semibold">{key}:</span>
              <span className="text-amber-300 font-mono font-bold">
                {typeof val === 'object' ? JSON.stringify(val) : String(val)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
