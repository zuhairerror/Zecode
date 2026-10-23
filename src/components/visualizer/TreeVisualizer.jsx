import React from 'react';

export default function TreeVisualizer({ currentStep }) {
  if (!currentStep) return null;

  const nodes = Array.isArray(currentStep.data) ? currentStep.data : [];
  const activeId = currentStep.activeNodeId;
  const traversal = currentStep.traversalResult || [];
  const callStack = currentStep.callStack || [];

  // Coordinates mapping for standard 3-level binary tree
  const nodePositions = {
    '1': { x: 200, y: 50 },
    '2': { x: 100, y: 130 },
    '3': { x: 300, y: 130 },
    '4': { x: 240, y: 210 },
    '5': { x: 360, y: 210 }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[300px] p-6 bg-[#0B1120] rounded-xl border border-slate-800 shadow-inner">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full items-center">
        {/* SVG Tree View (3 cols on desktop) */}
        <div className="lg:col-span-3 flex flex-col items-center justify-center">
          <svg className="w-full max-w-[440px] h-[250px]" viewBox="0 0 400 250">
            {/* Edges */}
            {nodes.map(node => {
              const pos = nodePositions[node.id];
              if (!pos) return null;

              return (
                <React.Fragment key={`edges-${node.id}`}>
                  {node.left && nodePositions[node.left] && (
                    <line
                      x1={pos.x}
                      y1={pos.y}
                      x2={nodePositions[node.left].x}
                      y2={nodePositions[node.left].y}
                      stroke="#334155"
                      strokeWidth="2.5"
                      strokeDasharray="none"
                    />
                  )}
                  {node.right && nodePositions[node.right] && (
                    <line
                      x1={pos.x}
                      y1={pos.y}
                      x2={nodePositions[node.right].x}
                      y2={nodePositions[node.right].y}
                      stroke="#334155"
                      strokeWidth="2.5"
                      strokeDasharray="none"
                    />
                  )}
                </React.Fragment>
              );
            })}

            {/* Nodes */}
            {nodes.map(node => {
              const pos = nodePositions[node.id];
              if (!pos) return null;
              const isActive = activeId === node.id;

              return (
                <g key={`node-${node.id}`} className="transition-all duration-300">
                  {/* Glowing halo for active node */}
                  {isActive && (
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="28"
                      fill="none"
                      stroke="#06B6D4"
                      strokeWidth="3"
                      opacity="0.8"
                      className="animate-pulse"
                    />
                  )}
                  {/* Node Circle */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="20"
                    fill={isActive ? '#0891B2' : '#1E293B'}
                    stroke={isActive ? '#22D3EE' : '#475569'}
                    strokeWidth="2"
                  />
                  {/* Node Value */}
                  <text
                    x={pos.x}
                    y={pos.y + 5}
                    textAnchor="middle"
                    fill={isActive ? '#FFFFFF' : '#F8FAFC'}
                    fontSize="14"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {node.val}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Traversal Output Bar */}
          {traversal.length > 0 && (
            <div className="flex items-center gap-2 mt-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono">
              <span className="text-cyan-400 font-bold">Traversal Order:</span>
              <span className="text-slate-200">[{traversal.join(', ')}]</span>
            </div>
          )}
        </div>

        {/* Recursion Call Stack Panel (1 col on desktop) */}
        <div className="flex flex-col p-4 bg-slate-900/80 rounded-xl border border-slate-800">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
            Call Stack Depth
          </span>
          <div className="flex flex-col-reverse gap-1.5 min-h-[140px] justify-start">
            {callStack.length === 0 ? (
              <span className="text-xs text-slate-500 font-mono my-auto text-center">
                Stack Empty
              </span>
            ) : (
              callStack.map((frame, i) => (
                <div
                  key={i}
                  className="px-2.5 py-1.5 rounded bg-cyan-950/40 border border-cyan-800/40 text-cyan-300 font-mono text-[11px] truncate"
                >
                  {frame}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
