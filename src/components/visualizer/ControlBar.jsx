import React from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';

export default function ControlBar({
  isPlaying,
  onTogglePlay,
  currentStepIndex,
  totalSteps,
  onNext,
  onPrev,
  onReset,
  onJumpStart,
  onJumpEnd,
  onSeek,
  speed,
  onSpeedChange
}) {
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex >= totalSteps - 1;
  const progressPercent = totalSteps > 1 ? (currentStepIndex / (totalSteps - 1)) * 100 : 0;

  return (
    <div className="surface-card flex flex-col gap-3 p-3.5 sm:p-4 shadow-lg border-white/[0.08] w-full min-w-0">
      {/* Step Scrubber Bar */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono text-cyan-300 font-bold whitespace-nowrap min-w-[70px]">
          Step {totalSteps > 0 ? currentStepIndex + 1 : 0} / {totalSteps}
        </span>
        <div className="relative flex-1 min-w-0 flex items-center">
          <input
            type="range"
            min="0"
            max={Math.max(0, totalSteps - 1)}
            value={currentStepIndex}
            onChange={(e) => onSeek(Number(e.target.value))}
            className="w-full h-1.5 bg-white/[0.08] rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>
        <span className="text-xs font-mono text-slate-400 min-w-[36px] text-right font-medium">
          {Math.round(progressPercent)}%
        </span>
      </div>

      {/* Control Buttons Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-white/[0.04]">
        {/* Playback Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Jump to start */}
          <button
            onClick={onJumpStart}
            disabled={isFirst}
            title="First Step (Home)"
            className="btn-icon"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>

          {/* Previous Step */}
          <button
            onClick={onPrev}
            disabled={isFirst}
            title="Previous Step (Left Arrow)"
            className="btn-icon"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {/* Play / Pause Toggle */}
          <button
            onClick={onTogglePlay}
            title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
            className={`px-3.5 py-1.5 rounded-lg font-bold flex items-center gap-2 transition-all duration-150 ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/30'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span className="text-xs uppercase tracking-wider font-mono">Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span className="text-xs uppercase tracking-wider font-mono">
                  {isLast ? 'Replay' : 'Play'}
                </span>
              </>
            )}
          </button>

          {/* Next Step */}
          <button
            onClick={onNext}
            disabled={isLast}
            title="Next Step (Right Arrow)"
            className="btn-icon"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          {/* Jump to end */}
          <button
            onClick={onJumpEnd}
            disabled={isLast}
            title="Last Step (End)"
            className="btn-icon"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>

          {/* Reset */}
          <button
            onClick={onReset}
            title="Reset Visualizer (R)"
            className="btn-icon"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Speed Selector */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-slate-400 font-medium">Speed:</span>
          <div className="flex items-center gap-0.5 bg-white/[0.04] p-0.5 rounded-lg border border-white/[0.08]">
            {[0.5, 1, 1.5, 2, 3].map((val) => (
              <button
                key={val}
                onClick={() => onSpeedChange(val)}
                className={`px-2 py-0.5 text-[11px] font-mono rounded transition-all ${
                  speed === val
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {val}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
