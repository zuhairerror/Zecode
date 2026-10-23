import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  Code2,
  Play,
  Pause,
  BookOpen,
  Cpu,
  Layers,
  Bug,
  Terminal,
  Zap,
  RotateCcw,
  CheckCircle2,
  Clock,
  Compass
} from 'lucide-react';
import { QUESTIONS_DATA } from '../data/questionsData';

export default function Home({ setActivePage, onSelectQuestion }) {
  // Showcase Question: Sort Colors (Dutch National Flag)
  const showcaseQuestion =
    QUESTIONS_DATA.find((q) => q.id === 'sort-colors') || QUESTIONS_DATA[0];

  // Authentic Dutch National Flag algorithm preview
  const demoSteps = [
    {
      arr: [2, 0, 2, 1, 1, 0],
      low: 0,
      mid: 0,
      high: 5,
      active: [0, 5],
      action: 'nums[mid=0] is 2: Swap with nums[high=5]',
      code: 'nums[mid], nums[high] = nums[high], nums[mid]',
      line: 11
    },
    {
      arr: [0, 0, 2, 1, 1, 2],
      low: 0,
      mid: 0,
      high: 4,
      active: [0],
      action: 'nums[mid=0] is 0: In place. low++, mid++',
      code: 'nums[low], nums[mid] = nums[mid], nums[low]',
      line: 6
    },
    {
      arr: [0, 0, 2, 1, 1, 2],
      low: 1,
      mid: 1,
      high: 4,
      active: [1],
      action: 'nums[mid=1] is 0: In place. low++, mid++',
      code: 'low += 1; mid += 1',
      line: 7
    },
    {
      arr: [0, 0, 2, 1, 1, 2],
      low: 2,
      mid: 2,
      high: 4,
      active: [2, 4],
      action: 'nums[mid=2] is 2: Swap with nums[high=4]',
      code: 'nums[mid], nums[high] = nums[high], nums[mid]',
      line: 11
    },
    {
      arr: [0, 0, 1, 1, 2, 2],
      low: 2,
      mid: 2,
      high: 3,
      active: [2],
      action: 'nums[mid=2] is 1: Mid section, advance mid++',
      code: 'mid += 1',
      line: 9
    },
    {
      arr: [0, 0, 1, 1, 2, 2],
      low: 2,
      mid: 3,
      high: 3,
      active: [3],
      action: 'nums[mid=3] is 1: Advance mid. mid > high',
      code: 'while mid <= high:',
      line: 3
    },
    {
      arr: [0, 0, 1, 1, 2, 2],
      low: 2,
      mid: 4,
      high: 3,
      active: [0, 1, 2, 3, 4, 5],
      action: 'Partition complete! [0, 0, 1, 1, 2, 2] sorted',
      code: 'return nums',
      line: 13
    }
  ];

  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setStepIndex((prev) => (prev + 1) % demoSteps.length);
      }, 1400);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const currentStep = demoSteps[stepIndex];
  const popularQuestions = QUESTIONS_DATA.slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b border-white/[0.06]">
        {/* Subtle Background Radial Glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/10 blur-[120px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 relative z-10">
          {/* Left Column: Hero Copy */}
          <div className="flex-1 text-center lg:text-left w-full min-w-0">
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-mono font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>INTERACTIVE CODE LEARNING</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.12]">
              Stop Guessing.{' '}
              <span className="block mt-1 sm:mt-1.5 text-gradient-cyan">
                Start Visualizing.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-5 text-sm sm:text-base lg:text-lg text-slate-300 max-w-xl leading-relaxed mx-auto lg:mx-0">
              Turn complex algorithms into clear, interactive animations. Understand every comparison, swap, pointer movement, and execution step.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 w-full sm:w-auto">
              <button
                onClick={() => {
                  onSelectQuestion(showcaseQuestion);
                  setActivePage('visualizer');
                }}
                className="btn-primary text-sm py-3 px-6 justify-center"
              >
                <span>Start Visualizing</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <button
                onClick={() => setActivePage('library')}
                className="btn-secondary text-sm py-3 px-6 justify-center"
              >
                <BookOpen className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Explore DSA Library</span>
              </button>
            </div>

            {/* Small Language Labels */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs font-mono text-slate-400">
              <span className="text-slate-500 text-[11px] uppercase tracking-wider font-semibold mr-1">
                Languages:
              </span>
              {['C++', 'Python', 'Java', 'C'].map((lang) => (
                <span
                  key={lang}
                  className="px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-slate-300 text-[11px]"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Code Workspace Preview */}
          <div className="flex-1 w-full max-w-lg mx-auto lg:mx-0 min-w-0">
            <div className="surface-card p-4 sm:p-5 shadow-2xl relative w-full border-white/[0.1]">
              {/* Window Titlebar */}
              <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08] mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70"></div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 ml-1.5 font-medium truncate">
                    dutch_flag.py — Sort Colors
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
                  </button>
                  <button
                    onClick={() => {
                      setIsPlaying(false);
                      setStepIndex(0);
                    }}
                    className="p-1.5 rounded-lg bg-white/[0.06] text-slate-300 hover:text-white transition-colors"
                    title="Reset"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Code Line Peek */}
              <div className="mb-3.5 p-2 rounded-lg bg-black/40 border border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400 truncate">
                  <strong className="text-cyan-400">L{currentStep.line}:</strong> {currentStep.code}
                </span>
                <span className="text-emerald-400 text-[10px] font-bold shrink-0 ml-2">RUNNING</span>
              </div>

              {/* Pointer Track (low, mid, high) */}
              <div className="flex items-end justify-center gap-2 sm:gap-3 mb-1 min-h-[34px]">
                {currentStep.arr.map((_, idx) => {
                  const ptrs = [];
                  if (idx === currentStep.low) ptrs.push({ name: 'low', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40' });
                  if (idx === currentStep.mid) ptrs.push({ name: 'mid', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40' });
                  if (idx === currentStep.high) ptrs.push({ name: 'high', color: 'bg-rose-500/20 text-rose-300 border-rose-400/40' });

                  return (
                    <div key={`ptr-${idx}`} className="w-9 sm:w-11 flex flex-col items-center justify-end">
                      {ptrs.length > 0 && (
                        <div className="flex flex-col items-center">
                          <div className="flex flex-wrap justify-center gap-0.5">
                            {ptrs.map((p) => (
                              <span
                                key={p.name}
                                className={`text-[9px] font-mono font-bold px-1 py-0.2 rounded border ${p.color}`}
                              >
                                {p.name}
                              </span>
                            ))}
                          </div>
                          <span className="text-cyan-400 text-[9px] font-bold leading-none mt-0.5">▼</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Array Elements: 0 = Red, 1 = White, 2 = Blue */}
              <div className="flex items-end justify-center gap-2 sm:gap-3 h-28 px-1 pb-1">
                {currentStep.arr.map((val, idx) => {
                  const isActive = currentStep.active.includes(idx);
                  let colorClass = 'bg-slate-800/80 border-slate-700 text-slate-200';
                  if (val === 0) colorClass = 'bg-rose-500/20 border-rose-500/50 text-rose-200';
                  if (val === 1) colorClass = 'bg-slate-300/20 border-slate-200/50 text-slate-100';
                  if (val === 2) colorClass = 'bg-cyan-500/20 border-cyan-400/50 text-cyan-200';

                  return (
                    <div key={idx} className="flex flex-col items-center justify-end h-full">
                      <div
                        className={`w-9 sm:w-11 h-18 rounded-lg border flex flex-col items-center justify-center font-mono font-bold transition-all duration-200 ${colorClass} ${
                          isActive ? 'ring-2 ring-cyan-400 scale-105 shadow-md shadow-cyan-500/20' : ''
                        }`}
                      >
                        <span className="text-sm sm:text-base">{val}</span>
                        <span className="text-[8px] opacity-75 font-mono">
                          {val === 0 ? 'Red' : val === 1 ? 'White' : 'Blue'}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-slate-500 mt-1">[{idx}]</span>
                    </div>
                  );
                })}
              </div>

              {/* Step Notification Banner */}
              <div className="mt-3.5 p-2.5 rounded-lg bg-black/40 border border-white/[0.06] text-xs font-mono flex items-center justify-between gap-2 min-w-0">
                <span className="text-cyan-300 truncate text-[11px]">{currentStep.action}</span>
                <span className="text-slate-500 text-[10px] shrink-0 font-bold">
                  Step {stepIndex + 1}/{demoSteps.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust and Features Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/[0.06] bg-[#070B15]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
              Why Learn With Zecode
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-400">
              Built specifically to demystify complex algorithms through verified, step-by-step clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* 1. See Code Execute */}
            <div className="surface-card p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 mb-4">
                  <Play className="w-5 h-5 fill-current" />
                </div>
                <h3 className="text-base font-bold text-white mb-1.5 font-display">
                  See Code Execute.
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Watch multi-pointer arrays, linked lists, stacks, trees, and matrices animate in real-time as statements run.
                </p>
              </div>
            </div>

            {/* 2. Explore DSA Problems */}
            <div className="surface-card p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 mb-4">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-1.5 font-display">
                  Explore DSA Problems.
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Practice curated problems organized across 13 core topics with starter solutions in Python, C++, Java, and C.
                </p>
              </div>
            </div>

            {/* 3. Debug Step by Step */}
            <div className="surface-card p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400 mb-4">
                  <Bug className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-1.5 font-display">
                  Debug Step by Step.
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Inspect variables, pointer positions, and memory states at every atomic operation without guessing.
                </p>
              </div>
            </div>

            {/* 4. Learn at Your Own Pace */}
            <div className="surface-card p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mb-4">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-1.5 font-display">
                  Learn at Your Own Pace.
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Control execution speed, pause anywhere, rewind to previous states, or test arbitrary custom inputs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular DSA Questions Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/[0.06] bg-[#060913]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-display text-white">
                Popular Curated Questions
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-400">
                Explore hand-crafted problems with verified solutions and interactive visual execution traces.
              </p>
            </div>

            <button
              onClick={() => setActivePage('library')}
              className="btn-secondary text-xs py-2 px-3.5 self-start sm:self-auto shrink-0 flex items-center gap-1.5 hover:text-cyan-300"
            >
              <span>View All Questions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {popularQuestions.map((q) => (
              <div
                key={q.id}
                onClick={() => {
                  onSelectQuestion(q);
                  setActivePage('visualizer');
                }}
                className="surface-card p-5 sm:p-6 cursor-pointer flex flex-col justify-between group min-w-0"
              >
                <div>
                  {/* Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3 min-w-0">
                    <span className="badge badge-topic truncate">{q.topic}</span>
                    <span
                      className={`badge shrink-0 ${
                        q.difficulty === 'Easy'
                          ? 'badge-easy'
                          : q.difficulty === 'Medium'
                          ? 'badge-medium'
                          : 'badge-hard'
                      }`}
                    >
                      {q.difficulty}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-2 truncate font-display">
                    {q.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {q.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3.5 border-t border-white/[0.06] text-xs font-mono text-slate-400">
                  <span className="truncate mr-2">Time: {q.complexity?.time?.worst || 'O(N)'}</span>
                  <span className="text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 shrink-0">
                    Solve & Visualize →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#070B15] to-[#060913] relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center surface-card p-8 sm:p-12 border-cyan-500/20 relative">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-4">
            <Sparkles className="w-6 h-6" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-white">
            Ready to Master Algorithms Step by Step?
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Jump into our interactive visualizer now with Dutch National Flag, sorting algorithms, and pointer traversals.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                onSelectQuestion(showcaseQuestion);
                setActivePage('visualizer');
              }}
              className="btn-primary text-sm py-2.5 px-6"
            >
              <span>Start Visualizing Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActivePage('library')}
              className="btn-secondary text-sm py-2.5 px-6"
            >
              <span>Browse DSA Curriculum</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
