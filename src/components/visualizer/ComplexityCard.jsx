import React from 'react';
import { Clock, HardDrive, Info } from 'lucide-react';

export default function ComplexityCard({ complexity }) {
  if (!complexity) return null;

  const { time, space } = complexity;

  return (
    <div className="flex flex-col gap-4 p-5 bg-[#0F172A] rounded-xl border border-slate-800 shadow-md">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <Info className="w-4 h-4 text-cyan-400" />
          Complexity Analysis
        </h4>
        <span className="text-[10px] font-mono text-cyan-400/80 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
          Theoretical Bounds
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Time Complexity Card */}
        <div className="flex flex-col p-4 bg-slate-900/80 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2 mb-2 text-cyan-400">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider">
              Time Complexity
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 my-2 text-center">
            <div className="bg-slate-950/70 p-2 rounded border border-slate-800">
              <span className="block text-[10px] uppercase text-slate-400 font-mono">Best</span>
              <span className="text-xs font-mono font-bold text-emerald-400">{time?.best || 'O(1)'}</span>
            </div>
            <div className="bg-slate-950/70 p-2 rounded border border-slate-800">
              <span className="block text-[10px] uppercase text-slate-400 font-mono">Average</span>
              <span className="text-xs font-mono font-bold text-amber-400">{time?.average || 'O(N)'}</span>
            </div>
            <div className="bg-slate-950/70 p-2 rounded border border-slate-800">
              <span className="block text-[10px] uppercase text-slate-400 font-mono">Worst</span>
              <span className="text-xs font-mono font-bold text-rose-400">{time?.worst || 'O(N)'}</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mt-1">
            {time?.explanation || 'Proportional to operations performed.'}
          </p>
        </div>

        {/* Space Complexity Card */}
        <div className="flex flex-col p-4 bg-slate-900/80 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2 mb-2 text-cyan-400">
            <HardDrive className="w-4 h-4" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider">
              Space Complexity
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 my-2 text-center">
            <div className="bg-slate-950/70 p-2 rounded border border-slate-800">
              <span className="block text-[10px] uppercase text-slate-400 font-mono">Auxiliary</span>
              <span className="text-xs font-mono font-bold text-cyan-300">{space?.auxiliary || 'O(1)'}</span>
            </div>
            <div className="bg-slate-950/70 p-2 rounded border border-slate-800">
              <span className="block text-[10px] uppercase text-slate-400 font-mono">Total</span>
              <span className="text-xs font-mono font-bold text-purple-300">{space?.total || 'O(N)'}</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mt-1">
            {space?.explanation || 'Additional memory allocated during execution.'}
          </p>
        </div>
      </div>
    </div>
  );
}
