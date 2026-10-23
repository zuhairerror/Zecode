import React from 'react';

export default function GridVisualizer({ currentStep }) {
  if (!currentStep) return null;

  const grid = Array.isArray(currentStep.data) ? currentStep.data : [];
  const activeCell = currentStep.activeCell;
  const visitedCells = currentStep.visitedCells || [];

  // Color mappings
  const colorMap = {
    0: 'bg-slate-900 border-slate-700 text-slate-400',
    1: 'bg-sky-950/70 border-sky-600 text-sky-200',
    2: 'bg-cyan-500/30 border-cyan-400 text-cyan-200 shadow-cyan-500/30'
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[280px] p-6 bg-[#0B1120] rounded-xl border border-slate-800 shadow-inner">
      <div className="flex flex-col items-center">
        <span className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-4">
          2D Pixel Grid (Flood Fill)
        </span>

        {/* 2D Matrix */}
        <div className="grid gap-2.5 p-4 bg-slate-950 rounded-2xl border border-slate-800 shadow-xl">
          {grid.map((row, r) => (
            <div key={r} className="flex gap-2.5">
              {row.map((val, c) => {
                const isActive = activeCell && activeCell.r === r && activeCell.c === c;
                const isVisited = visitedCells.some(v => v.r === r && v.c === c);

                return (
                  <div
                    key={`${r}-${c}`}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 flex flex-col items-center justify-center font-mono font-bold text-lg transition-all duration-300 relative select-none ${
                      colorMap[val] || 'bg-slate-800 border-slate-700'
                    } ${isActive ? 'ring-4 ring-cyan-400 scale-105 z-10 shadow-lg shadow-cyan-500/50' : ''}`}
                  >
                    <span>{val}</span>
                    <span className="text-[9px] text-slate-400 absolute bottom-1 font-normal opacity-75">
                      ({r},{c})
                    </span>
                    {isActive && (
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 absolute top-1.5 right-1.5 animate-ping"></span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-5 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded bg-sky-950 border border-sky-600"></div>
            <span>Color 1 (Target)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded bg-cyan-500/30 border border-cyan-400"></div>
            <span>Color 2 (Filled)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded bg-slate-900 border border-slate-700"></div>
            <span>Color 0 (Boundary)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
