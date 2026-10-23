import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  Code2,
  Play,
  Pause,
  BookOpen,
  Layers,
  Bug,
  Terminal,
  Zap,
  RotateCcw,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { QUESTIONS_DATA } from '../data/questionsData';

export default function Home({ setActivePage, onSelectQuestion }) {
  // Showcase Question: Sort Colors (Dutch National Flag)
  const showcaseQuestion =
    QUESTIONS_DATA.find((q) => q.id === 'sort-colors') || QUESTIONS_DATA[0];

  // Live Dutch National Flag algorithm preview on Hero
  // Initial array: [2, 0, 2, 1, 1, 0]
  const heroDemoSteps = [
    {
      arr: [2, 0, 2, 1, 1, 0],
      low: 0,
      mid: 0,
      high: 5,
      active: [0],
      action: 'nums[mid=0] is 2 -> Swap with nums[high=5], high--',
      line: 10
    },
    {
      arr: [0, 0, 2, 1, 1, 2],
      low: 0,
      mid: 0,
      high: 4,
      active: [0, 5],
      action: 'Swapped 2 to high=5. Now inspect nums[mid=0] = 0',
      line: 11
    },
    {
      arr: [0, 0, 2, 1, 1, 2],
      low: 1,
      mid: 1,
      high: 4,
      active: [0],
      action: 'nums[mid=0] is 0 -> In 0s zone! low++, mid++',
      line: 5
    },
    {
      arr: [0, 0, 2, 1, 1, 2],
      low: 1,
      mid: 1,
      high: 4,
      active: [1],
      action: 'nums[mid=1] is 0 -> Swap with low=1, low++, mid++',
      line: 6
    },
    {
      arr: [0, 0, 2, 1, 1, 2],
      low: 2,
      mid: 2,
      high: 4,
      active: [2],
      action: 'nums[mid=2] is 2 -> Swap with nums[high=4], high--',
      line: 10
    },
    {
      arr: [0, 0, 1, 1, 2, 2],
      low: 2,
      mid: 2,
      high: 3,
      active: [2, 4],
      action: 'Swapped 2 to high=4. Now inspect nums[mid=2] = 1',
      line: 11
    },
    {
      arr: [0, 0, 1, 1, 2, 2],
      low: 2,
      mid: 3,
      high: 3,
      active: [2],
      action: 'nums[mid=2] is 1 -> In 1s zone! Advance mid to 3',
      line: 8
    },
    {
      arr: [0, 0, 1, 1, 2, 2],
      low: 2,
      mid: 4,
      high: 3,
      active: [3],
      action: 'nums[mid=3] is 1 -> Advance mid to 4. mid > high -> Done!',
      line: 8
    },
    {
      arr: [0, 0, 1, 1, 2, 2],
      low: 2,
      mid: 4,
      high: 3,
      active: [0, 1, 2, 3, 4, 5],
      action: 'Sorted! [0, 0, 1, 1, 2, 2] in linear O(N) single pass.',
      line: 14
    }
  ];

  const [heroStep, setHeroStep] = useState(0);
  const [heroIsPlaying, setHeroIsPlaying] = useState(true);

  useEffect(() => {
    let timer;
    if (heroIsPlaying) {
      timer = setInterval(() => {
        setHeroStep((prev) => (prev + 1) % heroDemoSteps.length);
      }, 1400);
    }
    return () => clearInterval(timer);
  }, [heroIsPlaying]);

  const handleHeroReset = () => {
    setHeroIsPlaying(false);
    setHeroStep(0);
  };

  const currentHeroStep = heroDemoSteps[heroStep];
  const popularQuestions = QUESTIONS_DATA.slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-radial-glow">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
          {/* Hero Left Content */}
          <div className="flex-1 text-center lg:text-left w-full min-w-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium mb-5 sm:mb-6">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Next-Gen Interactive Algorithm Platform</span>
            </div>

            {/* Required Headings */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.15]">
              Understand Code Visually.{' '}
              <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300">
                Master DSA, Step by Step.
              </span>
            </h1>

            {/* Required Description */}
            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Turn complex algorithms into interactive animations, execution traces, and clear explanations in C, C++, Python, and Java.
            </p>

            {/* Required CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={() => {
                  onSelectQuestion(showcaseQuestion);
                  setActivePage('visualizer');
                }}
                className="btn-primary text-sm py-3 px-6 justify-center shadow-lg shadow-cyan-500/25 group"
              >
                <span>Start Visualizing</span>
                <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setActivePage('library')}
                className="btn-secondary text-sm py-3 px-6 justify-center"
              >
                <BookOpen className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Explore DSA Questions</span>
              </button>
            </div>

            {/* Language & Showcase Badges */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-xs text-slate-400 font-mono">
              <span className="text-slate-500 uppercase tracking-wider font-semibold mr-1">Languages:</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-200">
                Python
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-200">
                C++
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-200">
                Java
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-200">
                C
              </span>
              <span className="hidden sm:inline-block px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300">
                ★ Dutch National Flag Showcase
              </span>
            </div>
          </div>

          {/* Hero Right: Live Animated Algorithm Preview (Dutch National Flag / Sort Colors) */}
          <div className="flex-1 w-full max-w-lg mx-auto lg:mx-0 min-w-0">
            <div className="p-4 sm:p-6 rounded-2xl bg-[#0F172A]/90 border border-slate-800 shadow-2xl relative glow-cyan w-full min-w-0">
              {/* Window Header */}
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                  <span className="text-xs font-mono text-cyan-300 ml-1.5 font-bold truncate">
                    dutch_national_flag.py
                  </span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <button
                    onClick={() => setHeroIsPlaying(!heroIsPlaying)}
                    className="p-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors"
                    title={heroIsPlaying ? 'Pause Preview' : 'Play Preview'}
                  >
                    {heroIsPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  </button>
                  <button
                    onClick={handleHeroReset}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors"
                    title="Reset Preview"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Three Pointer Indicators (low, mid, high) */}
              <div className="flex items-end justify-center gap-2.5 sm:gap-3.5 mb-2 min-h-[38px]">
                {currentHeroStep.arr.map((_, idx) => {
                  const ptrs = [];
                  if (idx === currentHeroStep.low) ptrs.push({ name: 'low', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' });
                  if (idx === currentHeroStep.mid) ptrs.push({ name: 'mid', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40' });
                  if (idx === currentHeroStep.high) ptrs.push({ name: 'high', color: 'bg-rose-500/20 text-rose-300 border-rose-400/40' });

                  return (
                    <div key={`ptr-${idx}`} className="w-9 sm:w-12 flex flex-col items-center justify-end">
                      {ptrs.length > 0 && (
                        <div className="flex flex-col items-center animate-pointer">
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
                          <span className="text-cyan-400 text-[10px] font-bold">▼</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Animated Elements: 0 = Red, 1 = White, 2 = Blue */}
              <div className="flex items-end justify-center gap-2.5 sm:gap-3.5 h-32 px-1 sm:px-2 pb-2">
                {currentHeroStep.arr.map((val, idx) => {
                  const isActive = currentHeroStep.active.includes(idx);
                  const isSorted = heroStep === heroDemoSteps.length - 1;

                  // Dutch National Flag color scheme
                  let colorStyle = 'bg-slate-800 border-slate-700 text-slate-200';
                  if (val === 0) {
                    colorStyle = 'bg-rose-500/20 border-rose-500/60 text-rose-300';
                  } else if (val === 1) {
                    colorStyle = 'bg-slate-300/20 border-slate-300/60 text-slate-100';
                  } else if (val === 2) {
                    colorStyle = 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300';
                  }

                  return (
                    <div key={idx} className="flex flex-col items-center justify-end h-full">
                      <div
                        className={`w-9 sm:w-12 h-20 rounded-xl border-2 flex flex-col items-center justify-center font-mono font-bold transition-all duration-300 ${colorStyle} ${
                          isActive
                            ? 'scale-105 shadow-lg shadow-cyan-500/30 ring-2 ring-cyan-400'
                            : ''
                        }`}
                      >
                        <span className="text-base sm:text-lg">{val}</span>
                        <span className="text-[9px] font-mono text-slate-400">
                          {val === 0 ? 'Red' : val === 1 ? 'White' : 'Blue'}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 mt-1">[{idx}]</span>
                    </div>
                  );
                })}
              </div>

              {/* Step Action Notification & Line Sync */}
              <div className="mt-4 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono flex items-center justify-between gap-2 min-w-0">
                <span className="text-cyan-300 truncate">{currentHeroStep.action}</span>
                <span className="text-amber-400 font-bold shrink-0">Line {currentHeroStep.line}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section (Required: Interactive Code Visualization, DSA Question Library, Step-by-Step Execution, Debugging and Variable Inspector) */}
      <section id="features" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#070B14] border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Platform Capabilities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-white">
              Engineered for Intuitive Learning
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed">
              Stop guessing pointer movements and recursive call stacks. Zecode turns abstract algorithmic logic into verified, observable steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {/* Feature 1: Interactive Code Visualization */}
            <div className="h-full flex flex-col justify-between p-6 rounded-2xl bg-glass-card border border-slate-800/80 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shrink-0">
                  <Layers className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Interactive Code Visualization</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Watch multi-pointer arrays (low, mid, high), linked lists, stacks, trees, and grids animate with clear state transitions.
                </p>
              </div>
            </div>

            {/* Feature 2: DSA Question Library */}
            <div className="h-full flex flex-col justify-between p-6 rounded-2xl bg-glass-card border border-slate-800/80 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shrink-0">
                  <BookOpen className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">DSA Question Library</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Curated curriculum organized across 13 core categories with starter code in C, C++, Python, and Java, test cases, and Big-O analysis.
                </p>
              </div>
            </div>

            {/* Feature 3: Step-by-Step Execution */}
            <div className="h-full flex flex-col justify-between p-6 rounded-2xl bg-glass-card border border-slate-800/80 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shrink-0">
                  <Play className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Step-by-Step Execution</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Play, pause, step forward, rewind, or jump to any step with precise speed controls and plain-English step explanations.
                </p>
              </div>
            </div>

            {/* Feature 4: Debugging and Variable Inspector */}
            <div className="h-full flex flex-col justify-between p-6 rounded-2xl bg-glass-card border border-slate-800/80 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shrink-0">
                  <Bug className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Debugging & Variable Inspector</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Live state inspector table tracking pointers, loop counters, and data structures synchronized directly with Monaco Editor code lines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular DSA Questions Section */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#0B1120] border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-white">
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
                className="h-full p-5 sm:p-6 rounded-2xl bg-[#0F172A] border border-slate-800 hover:border-cyan-500/50 hover:scale-[1.01] transition-all cursor-pointer flex flex-col justify-between group shadow-lg min-w-0"
              >
                <div>
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

                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mb-2 truncate">
                    {q.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {q.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs font-mono text-slate-500">
                  <span className="truncate mr-2">Time: {q.complexity?.time?.worst || 'O(N)'}</span>
                  <span className="text-cyan-400 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 shrink-0">
                    Solve & Visualize →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
