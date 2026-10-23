import React from 'react';

export default function StackVisualizer({ currentStep }) {
  if (!currentStep) return null;

  const stackData = currentStep.data?.stack || [];
  const string = currentStep.data?.string || '';
  const currentIdx = currentStep.data?.currentIndex ?? -1;
  const isError = currentStep.data?.error || false;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full min-h-[300px] p-6 bg-[#0B1120] rounded-xl border border-slate-800 shadow-inner">
      {/* Left / Input String Stream */}
      <div className="flex flex-col items-center max-w-sm">
        <span className="text-xs uppercase tracking-wider font-mono text-slate-400 mb-2">
          Input Characters
        </span>
        <div className="flex items-center gap-1.5 p-3 rounded-xl bg-slate-900 border border-slate-800 overflow-x-auto max-w-full">
          {string.split('').map((char, idx) => {
            const isProcessed = idx < currentIdx;
            const isCurrent = idx === currentIdx;

            return (
              <div
                key={idx}
                className={`w-9 h-10 rounded-lg flex flex-col items-center justify-center font-mono font-bold text-base transition-all duration-200 ${
                  isCurrent
                    ? 'bg-cyan-500 text-slate-950 scale-110 shadow-lg shadow-cyan-500/50'
                    : isProcessed
                    ? 'bg-slate-800/50 text-slate-500'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                <span>{char}</span>
                <span className="text-[9px] font-normal opacity-70">[{idx}]</span>
              </div>
            );
          })}
        </div>
        <span className="text-[11px] text-slate-500 mt-2 font-mono">
          Current: {currentIdx >= 0 && currentIdx < string.length ? `"${string[currentIdx]}" at index ${currentIdx}` : 'Done'}
        </span>
      </div>

      {/* Center Divider / Arrow */}
      <div className="hidden md:flex flex-col items-center text-slate-600">
        <span className="text-xs font-mono text-cyan-400">Push / Pop</span>
        <span className="text-2xl text-cyan-400">→</span>
      </div>

      {/* Right / Stack Container Tube */}
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-between w-44 mb-2 text-xs font-mono text-slate-400">
          <span>Stack</span>
          <span className="text-cyan-400">Depth: {stackData.length}</span>
        </div>

        {/* The Glass Stack Tube */}
        <div
          className={`w-44 min-h-[220px] max-h-[260px] p-2 flex flex-col-reverse justify-start items-center gap-2 rounded-b-xl border-x-2 border-b-2 bg-slate-900/60 overflow-y-auto ${
            isError ? 'border-rose-500 bg-rose-950/20' : 'border-cyan-500/60'
          }`}
        >
          {stackData.length === 0 ? (
            <div className="text-xs font-mono text-slate-600 my-auto text-center py-12">
              (Empty Stack)
            </div>
          ) : (
            stackData.map((item, idx) => {
              const isTop = idx === stackData.length - 1;
              return (
                <div
                  key={idx}
                  className={`w-full py-2.5 px-4 rounded-lg font-mono font-bold text-center flex items-center justify-between transition-all duration-300 ${
                    isTop
                      ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-200 shadow-md shadow-cyan-500/30'
                      : 'bg-slate-800/80 border border-slate-700 text-slate-300'
                  }`}
                >
                  <span className="text-base">{item}</span>
                  {isTop && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-cyan-400 text-slate-950">
                      TOP
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
