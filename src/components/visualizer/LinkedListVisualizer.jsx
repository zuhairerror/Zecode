import React from 'react';

export default function LinkedListVisualizer({ currentStep }) {
  if (!currentStep) return null;

  const nodes = Array.isArray(currentStep.data) ? currentStep.data : [];
  const pointers = currentStep.pointers || {};

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[280px] p-6 bg-[#0B1120] rounded-xl border border-slate-800 shadow-inner relative overflow-x-auto">
      {/* Pointers Legend Indicator */}
      <div className="flex items-center gap-6 mb-4 text-xs font-mono">
        {Object.entries(pointers).map(([ptrName, target]) => (
          <div key={ptrName} className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700">
            <span className="text-cyan-400 font-bold">{ptrName}:</span>
            <span className="text-slate-300">
              {typeof target === 'number' && nodes[target] ? `Node(${nodes[target].val})` : String(target)}
            </span>
          </div>
        ))}
      </div>

      {/* Linked List SVG / Nodes Track */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 py-8 px-4 overflow-x-auto max-w-full">
        {nodes.map((node, idx) => {
          const isCurr = pointers.curr === idx;
          const isPrev = pointers.prev === idx;
          const isNext = pointers.nxt === idx;

          let ringColor = 'border-slate-700 bg-slate-800/90 text-slate-200';
          let glow = '';

          if (isCurr) {
            ringColor = 'border-cyan-400 bg-cyan-950/60 text-cyan-200';
            glow = '0 0 16px rgba(6, 182, 212, 0.6)';
          } else if (isPrev) {
            ringColor = 'border-amber-400 bg-amber-950/60 text-amber-200';
            glow = '0 0 12px rgba(245, 158, 11, 0.4)';
          } else if (isNext) {
            ringColor = 'border-purple-400 bg-purple-950/60 text-purple-200';
          }

          return (
            <React.Fragment key={node.id}>
              {/* Linked List Node */}
              <div className="flex flex-col items-center relative">
                {/* Active Pointer Marker Above */}
                <div className="h-6 flex items-center justify-center mb-1">
                  {isCurr && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500 text-slate-950 font-bold">
                      curr
                    </span>
                  )}
                  {isPrev && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 font-bold">
                      prev
                    </span>
                  )}
                  {isNext && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500 text-slate-950 font-bold">
                      nxt
                    </span>
                  )}
                </div>

                {/* Node Box with Value and Pointer Split */}
                <div
                  className={`flex items-stretch rounded-xl border-2 transition-all duration-300 shadow-md ${ringColor}`}
                  style={{ boxShadow: glow || undefined }}
                >
                  <div className="px-4 py-3 font-mono font-bold text-lg border-r border-slate-700/80 min-w-[48px] text-center">
                    {node.val}
                  </div>
                  <div className="px-3 py-3 font-mono text-xs text-slate-400 flex items-center justify-center bg-slate-900/50 rounded-r-lg">
                    {node.next !== null ? `→ [${node.next}]` : 'null'}
                  </div>
                </div>

                {/* Node Index */}
                <span className="text-[10px] font-mono text-slate-500 mt-2">
                  Node #{idx}
                </span>
              </div>

              {/* Arrow Connector to Next Node */}
              {idx < nodes.length - 1 && (
                <div className="flex items-center text-cyan-400 px-1">
                  <svg className="w-8 h-6" viewBox="0 0 32 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="2" y1="12" x2="26" y2="12" />
                    <polyline points="18 5 26 12 18 19" />
                  </svg>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="text-xs text-slate-400 mt-4 text-center">
        Pointers dynamically update: prev (yellow), curr (cyan), and next (purple).
      </div>
    </div>
  );
}
