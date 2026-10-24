import React, { useRef, useEffect, useState } from 'react';
import { Code2, X, Copy, Check, Terminal, Sparkles, ChevronRight } from 'lucide-react';

export default function SideCodeViewer({
  code,
  language,
  onLanguageChange,
  currentLine,
  currentStep,
  onClose,
  onLoadToEditor
}) {
  const [copied, setCopied] = useState(false);
  const activeLineRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-scroll active line into view smoothly
  useEffect(() => {
    if (activeLineRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [currentLine]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = (code || '').split('\n');

  const languages = [
    { id: 'python', label: 'Python 3' },
    { id: 'cpp', label: 'C++ 17' },
    { id: 'java', label: 'Java 17' },
    { id: 'c', label: 'C' }
  ];

  return (
    <div className="surface-card flex flex-col h-full border-cyan-500/30 overflow-hidden shadow-2xl bg-[#080C16] relative transition-all duration-300">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#0A0F1D] border-b border-white/[0.08] gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider truncate">
            Execution Code
          </span>
          {currentLine && currentLine > 0 && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shrink-0 font-semibold">
              Line {currentLine}
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Language Selector */}
          <div className="flex items-center bg-black/40 p-0.5 rounded-lg border border-white/[0.06]">
            {languages.map((l) => (
              <button
                key={l.id}
                onClick={() => onLanguageChange && onLanguageChange(l.id)}
                className={`px-2 py-0.5 text-[11px] font-mono rounded transition-all ${
                  language === l.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            title="Copy Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {/* Close / Collapse Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-rose-500/20 transition-colors"
              title="Collapse Code Panel"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Code Lines Container with Auto-Scroll & Real-Time Highlighting */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto overflow-x-auto p-2 font-mono text-xs leading-relaxed max-h-[380px] min-h-[260px] scrollbar-thin select-text"
      >
        <div className="flex flex-col min-w-full">
          {lines.map((lineText, idx) => {
            const lineNum = idx + 1;
            const isCurrent = currentLine === lineNum;

            return (
              <div
                key={lineNum}
                ref={isCurrent ? activeLineRef : null}
                className={`flex items-center py-0.5 px-2 rounded transition-all duration-150 ${
                  isCurrent
                    ? 'bg-cyan-500/25 border-l-4 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                    : 'hover:bg-white/[0.02] border-l-4 border-transparent'
                }`}
              >
                {/* Line Number & Pointer Marker */}
                <div className="w-9 shrink-0 flex items-center justify-between select-none pr-2 font-mono text-[11px]">
                  <span className={`${isCurrent ? 'text-cyan-300 font-bold' : 'text-slate-600'}`}>
                    {lineNum}
                  </span>
                  {isCurrent && (
                    <ChevronRight className="w-3 h-3 text-cyan-400 fill-current animate-pulse shrink-0" />
                  )}
                </div>

                {/* Line Code Content */}
                <pre className="flex-1 overflow-x-visible font-mono text-xs">
                  <code
                    className={`${
                      isCurrent
                        ? 'text-white font-semibold drop-shadow-sm'
                        : 'text-slate-300'
                    }`}
                  >
                    {lineText || ' '}
                  </code>
                </pre>
              </div>
            );
          })}
        </div>
      </div>

      {/* Execution Line Explanation Bar */}
      <div className="px-3 py-2 bg-[#0A0F1D] border-t border-white/[0.08] flex items-center justify-between gap-2 text-[11px] font-mono">
        <div className="flex items-center gap-1.5 text-cyan-300 truncate">
          <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="truncate">
            {currentStep
              ? currentStep.action || currentStep.description || 'Executing...'
              : 'Waiting to start...'}
          </span>
        </div>

        {onLoadToEditor && (
          <button
            onClick={onLoadToEditor}
            className="text-[10px] text-slate-400 hover:text-cyan-300 shrink-0 font-sans underline"
          >
            Edit in Monaco
          </button>
        )}
      </div>
    </div>
  );
}
