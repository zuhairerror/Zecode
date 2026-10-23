import React from 'react';
import { Clock, HardDrive, Info } from 'lucide-react';

export default function ComplexityCard({ complexity }) {
  if (!complexity) return null;

  const { time, space } = complexity;

  return (
    <div className="surface-card flex flex-col gap-4 p-5 sm:p-6 shadow-md border-white/[0.08]">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <Info className="w-4 h-4 text-cyan-400" />
          Complexity Analysis
        </h4>
        <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
          Big-O Bounds
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Time Complexity Card */}
        <div className="flex flex-col p-4 bg-black/40 rounded-xl border border-white/[0.06]">
          <div className="flex items-center gap-2 mb-2 text-cyan-400">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider">
              Time Complexity
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 my-2 text-center">
            <div className="bg-white/[0.03] p-2 rounded-lg border border-white/[0.06]">
              <span className="block text-[10px] uppercase text-slate-400 font-mono">Best</span>
              <span className="text-xs font-mono font-bold text-emerald-400">{time?.best || 'O(1)'}</span>
            </div>
            <div className="bg-white/[0.03] p-2 rounded-lg border border-white/[0.06]">
              <span className="block text-[10px] uppercase text-slate-400 font-mono">Average</span>
              <span className="text-xs font-mono font-bold text-amber-400">{time?.average || 'O(N)'}</span>
            </div>
            <div className="bg-white/[0.03] p-2 rounded-lg border border-white/[0.06]">
              <span className="block text-[10px] uppercase text-slate-400 font-mono">Worst</span>
              <span className="text-xs font-mono font-bold text-rose-400">{time?.worst || 'O(N)'}</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mt-2">
            {time?.explanation || 'Proportional to operations performed.'}
          </p>
        </div>

        {/* Space Complexity Card */}
        <div className="flex flex-col p-4 bg-black/40 rounded-xl border border-white/[0.06]">
          <div className="flex items-center gap-2 mb-2 text-cyan-400">
            <HardDrive className="w-3.5 h-3.5" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider">
              Space Complexity
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 my-2 text-center">
            <div className="bg-white/[0.03] p-2 rounded-lg border border-white/[0.06]">
              <span className="block text-[10px] uppercase text-slate-400 font-mono">Auxiliary</span>
              <span className="text-xs font-mono font-bold text-cyan-300">{space?.auxiliary || 'O(1)'}</span>
            </div>
            <div className="bg-white/[0.03] p-2 rounded-lg border border-white/[0.06]">
              <span className="block text-[10px] uppercase text-slate-400 font-mono">Total</span>
              <span className="text-xs font-mono font-bold text-purple-300">{space?.total || 'O(N)'}</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mt-2">
            {space?.explanation || 'Additional memory allocated during execution.'}
          </p>
        </div>
      </div>
    </div>
  );
}
