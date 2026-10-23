import React from 'react';

export default function ArrayVisualizer({ currentStep }) {
  if (!currentStep) return null;

  const data = Array.isArray(currentStep.data) ? currentStep.data : [];
  const highlighted = currentStep.highlightedIndices || [];
  const swapped = currentStep.swapIndices || [];
  const sorted = currentStep.sortedIndices || [];
  const matched = currentStep.matchedIndices || [];
  const pointers = currentStep.pointers || {};
  const isSortColors =
    currentStep.visualizerType === 'sort-colors' ||
    currentStep.visualizerType === 'array-three-pointer' ||
    (data.length > 0 && data.every((v) => v === 0 || v === 1 || v === 2));

  // Calculate max value for relative bar heights
  const maxVal = Math.max(
    ...data.map((v) => (typeof v === 'number' ? Math.abs(v) : 10)),
    10
  );

  // Group pointers by index
  const pointersByIndex = {};
  Object.entries(pointers).forEach(([name, idx]) => {
    if (typeof idx === 'number' && idx >= 0 && idx < data.length) {
      if (!pointersByIndex[idx]) pointersByIndex[idx] = [];
      pointersByIndex[idx].push(name);
    }
  });

  return (
    <div className="surface-card flex flex-col items-center justify-center w-full min-h-[300px] p-4 sm:p-6 border-white/[0.08] shadow-inner relative overflow-x-auto min-w-0">
      {/* Dutch National Flag Invariant Banner (if Sort Colors) */}
      {isSortColors && (
        <div className="w-full flex flex-wrap items-center justify-between gap-2 mb-4 px-3.5 py-2 rounded-xl bg-black/40 border border-white/[0.06] text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span className="text-slate-300 font-bold">Dutch National Flag Invariants:</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-rose-300">
              [0 .. low-1] = <strong className="text-rose-400">0 (Red)</strong>
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-200">
              [low .. mid-1] = <strong className="text-white">1 (White)</strong>
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-amber-300">
              [mid .. high] = <em>Unsorted</em>
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-cyan-300">
              [high+1 .. n-1] = <strong className="text-cyan-400">2 (Blue)</strong>
            </span>
          </div>
        </div>
      )}

      {/* Top Pointer Track */}
      <div className="flex items-end justify-center gap-2.5 sm:gap-4 mb-2 min-h-[46px]">
        {data.map((_, idx) => {
          const ptrList = pointersByIndex[idx] || [];
          return (
            <div key={`ptr-${idx}`} className="w-12 sm:w-16 flex flex-col items-center justify-end">
              {ptrList.length > 0 && (
                <div className="flex flex-col items-center animate-pointer">
                  <div className="flex flex-wrap justify-center gap-1">
                    {ptrList.map((p) => {
                      let ptrColor = 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40';
                      if (p === 'low') ptrColor = 'bg-emerald-500/25 text-emerald-300 border-emerald-400/50';
                      if (p === 'high') ptrColor = 'bg-purple-500/25 text-purple-300 border-purple-400/50';
                      if (p === 'mid') ptrColor = 'bg-cyan-500/25 text-cyan-300 border-cyan-400/50';

                      return (
                        <span
                          key={p}
                          className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded border shadow-sm ${ptrColor}`}
                        >
                          {p}
                        </span>
                      );
                    })}
                  </div>
                  <span className="text-cyan-400 text-xs mt-0.5 font-bold">▼</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Array Elements / Bars */}
      <div className="flex items-end justify-center gap-2.5 sm:gap-4 h-44 px-4 pb-2">
        {data.map((val, idx) => {
          const isHighlighted = highlighted.includes(idx);
          const isSwapped = swapped.includes(idx);
          const isSorted = sorted.includes(idx);
          const isMatched = matched.includes(idx);

          // State-based coloring
          let bgClass = 'bg-slate-800 border-slate-700 text-slate-200';
          let glowEffect = '';

          if (isSortColors) {
            // Authentic 0=Red, 1=White, 2=Blue coloring
            if (val === 0) {
              bgClass = 'bg-rose-500/25 border-rose-500/70 text-rose-200';
            } else if (val === 1) {
              bgClass = 'bg-slate-300/20 border-slate-200/70 text-slate-100';
            } else if (val === 2) {
              bgClass = 'bg-cyan-500/25 border-cyan-400/70 text-cyan-200';
            }
          }

          if (isMatched) {
            bgClass = 'bg-emerald-500/35 border-emerald-400 text-emerald-100';
            glowEffect = '0 0 18px rgba(16, 185, 129, 0.6)';
          } else if (isSwapped) {
            bgClass = 'bg-amber-500/35 border-amber-400 text-amber-100';
            glowEffect = '0 0 18px rgba(245, 158, 11, 0.6)';
          } else if (isHighlighted) {
            glowEffect = '0 0 18px rgba(6, 182, 212, 0.6)';
            if (!isSortColors) {
              bgClass = 'bg-cyan-500/30 border-cyan-400 text-cyan-100';
            }
          } else if (isSorted && !isSortColors) {
            bgClass = 'bg-cyan-500/20 border-cyan-500/40 text-cyan-200';
          }

          // Dynamic height for sorting visualization
          const heightPercent =
            typeof val === 'number' && maxVal > 0
              ? isSortColors
                ? val === 0
                  ? 55
                  : val === 1
                  ? 75
                  : 95
                : Math.max(35, Math.min(100, Math.round((Math.abs(val) / maxVal) * 100)))
              : 65;

          return (
            <div
              key={idx}
              className="flex flex-col items-center justify-end transition-all duration-300 group"
              style={{ height: '100%' }}
            >
              {/* Swap Badge */}
              {isSwapped && (
                <span className="text-[9px] font-mono font-bold text-amber-300 bg-amber-500/20 border border-amber-500/40 px-1 rounded mb-1 animate-pulse">
                  SWAP
                </span>
              )}

              {/* Element Container */}
              <div
                className={`w-12 sm:w-16 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-300 font-mono font-bold shadow-md select-none ${bgClass} ${
                  isHighlighted ? 'ring-2 ring-cyan-400' : ''
                }`}
                style={{
                  height: `${heightPercent}%`,
                  boxShadow: glowEffect || undefined,
                  transform: isSwapped
                    ? 'scale(1.1) translateY(-4px)'
                    : isHighlighted
                    ? 'scale(1.05)'
                    : 'scale(1)'
                }}
              >
                <span className="text-base sm:text-lg">{val}</span>
                {isSortColors && (
                  <span className="text-[10px] font-mono opacity-80">
                    {val === 0 ? 'Red' : val === 1 ? 'White' : 'Blue'}
                  </span>
                )}
              </div>

              {/* Index Number */}
              <span className="text-[11px] font-mono text-slate-500 mt-2 font-medium">
                [{idx}]
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-slate-400 border-t border-slate-800/80 pt-4 w-full">
        {isSortColors ? (
          <>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-rose-500/40 border border-rose-400"></div>
              <span>0 (Red)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-slate-300/40 border border-slate-300"></div>
              <span>1 (White)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-cyan-500/40 border border-cyan-400"></div>
              <span>2 (Blue)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-amber-500/40 border border-amber-400"></div>
              <span>Active Swap / Move</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-amber-500/40 border border-amber-400"></div>
              <span>Active / Comparing</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-rose-500/40 border border-rose-400"></div>
              <span>Swapping / Modifying</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-emerald-500/40 border border-emerald-400"></div>
              <span>Found / Target Match</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-cyan-500/20 border border-cyan-500/40"></div>
              <span>Sorted Section</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
