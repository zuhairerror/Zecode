import React from 'react';
import { Eye } from 'lucide-react';

export default function StateInspector({ variables = {} }) {
  const entries = Object.entries(variables);

  return (
    <div className="flex flex-col p-4 bg-[#0F172A] rounded-xl border border-slate-800 shadow-md">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800">
        <Eye className="w-4 h-4 text-cyan-400" />
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
          Live State Inspector
        </h4>
      </div>

      {entries.length === 0 ? (
        <span className="text-xs font-mono text-slate-500 py-2">
          No active variables tracked.
        </span>
      ) : (
        <div className="flex flex-wrap gap-2 max-h-[140px] overflow-y-auto">
          {entries.map(([key, val]) => (
            <div
              key={key}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono"
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
