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
    <div className="flex flex-col gap-3 p-4 bg-[#0F172A] rounded-xl border border-slate-800 shadow-lg w-full min-w-0">
      {/* Step Scrubber Bar */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono text-cyan-400 font-bold whitespace-nowrap min-w-[75px]">
          Step {totalSteps > 0 ? currentStepIndex + 1 : 0} / {totalSteps}
        </span>
        <div className="relative flex-1 min-w-0 flex items-center">
          <input
            type="range"
            min="0"
            max={Math.max(0, totalSteps - 1)}
            value={currentStepIndex}
            onChange={(e) => onSeek(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>
        <span className="text-xs font-mono text-slate-400 min-w-[40px] text-right">
          {Math.round(progressPercent)}%
        </span>
      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
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
            className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all duration-200 ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/30'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/40 glow-cyan'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span className="text-xs uppercase tracking-wider font-mono">Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
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
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Speed Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Speed:</span>
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
            {[0.5, 1, 1.5, 2, 3].map((val) => (
              <button
                key={val}
                onClick={() => onSpeedChange(val)}
                className={`px-2 py-0.5 text-xs font-mono rounded transition-all ${
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
