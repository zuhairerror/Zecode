import React from 'react';
import {
  Code2,
  Sparkles,
  Keyboard,
  Shield,
  Clock,
  Layers,
  HelpCircle,
  ExternalLink,
  Cpu
} from 'lucide-react';
import ZecodeLogo from '../components/common/ZecodeLogo';

export default function AboutHelp({ setActivePage }) {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col gap-10 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col gap-3 pb-8 border-b border-white/[0.08] text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 font-mono text-xs font-semibold w-fit mx-auto md:mx-0">
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span>Documentation & Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
          About Zecode
        </h1>
        <p className="text-sm text-slate-400 font-mono">
          Tagline: <span className="text-cyan-300 font-medium">See Your Code. Understand Every Step.</span>
        </p>
      </div>

      {/* Mission / Overview Card */}
      <div className="surface-card p-6 sm:p-8 flex flex-col gap-4 w-full min-w-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          Our Mission
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed font-sans">
          Most students and developers struggle with Data Structures and Algorithms not because code is difficult to write, but because memory mutations, pointer manipulations, and recursion happen invisibly inside the CPU.
        </p>
        <p className="text-sm text-slate-300 leading-relaxed font-sans">
          <strong className="text-white">Zecode</strong> solves this by recording atomic algorithm steps, synchronizing active execution lines in Monaco Editor, and displaying smooth animations of arrays, multi-pointers (such as Dijkstra's Dutch National Flag), linked lists, stacks, trees, and matrices with plain-English explanations.
        </p>
      </div>

      {/* How the Visualizer Works */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full min-w-0">
        <div className="surface-card p-6 flex flex-col gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">1. Trace Generator</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Rather than guessing animations from output, Zecode simulates real step-by-step algorithms, emitting immutable state snapshots.
          </p>
        </div>

        <div className="surface-card p-6 flex flex-col gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">2. Monaco Line Sync</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every step is mapped to its exact source-code line in Python, C++, Java, or C, dynamically highlighting the active statement.
          </p>
        </div>

        <div className="surface-card p-6 flex flex-col gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">3. Isolated Sandbox</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Arbitrary user code runs securely via Judge0 or an isolated sandbox server with strict timeouts and memory boundaries.
          </p>
        </div>
      </div>

      {/* Keyboard Shortcuts Reference */}
      <div className="surface-card p-6 flex flex-col gap-4 w-full min-w-0">
        <h2 className="text-lg font-bold font-display text-white flex items-center gap-2">
          <Keyboard className="w-5 h-5 text-cyan-400" />
          Keyboard Shortcuts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs font-mono">
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#080C16] border border-white/[0.06]">
            <span className="text-slate-400">Play / Pause</span>
            <kbd className="px-2 py-1 rounded bg-[#0D1527] text-cyan-300 border border-white/[0.1] shadow-sm">Space</kbd>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#080C16] border border-white/[0.06]">
            <span className="text-slate-400">Next Step</span>
            <kbd className="px-2 py-1 rounded bg-[#0D1527] text-cyan-300 border border-white/[0.1] shadow-sm">→</kbd>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#080C16] border border-white/[0.06]">
            <span className="text-slate-400">Previous Step</span>
            <kbd className="px-2 py-1 rounded bg-[#0D1527] text-cyan-300 border border-white/[0.1] shadow-sm">←</kbd>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#080C16] border border-white/[0.06]">
            <span className="text-slate-400">Reset Visualizer</span>
            <kbd className="px-2 py-1 rounded bg-[#0D1527] text-cyan-300 border border-white/[0.1] shadow-sm">R</kbd>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#080C16] border border-white/[0.06]">
            <span className="text-slate-400">First Step</span>
            <kbd className="px-2 py-1 rounded bg-[#0D1527] text-cyan-300 border border-white/[0.1] shadow-sm">Home</kbd>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#080C16] border border-white/[0.06]">
            <span className="text-slate-400">Last Step</span>
            <kbd className="px-2 py-1 rounded bg-[#0D1527] text-cyan-300 border border-white/[0.1] shadow-sm">End</kbd>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="flex flex-col gap-4 w-full min-w-0">
        <h2 className="text-xl font-bold font-display text-white">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3.5 text-xs font-sans">
          <div className="surface-card p-5">
            <h3 className="font-bold text-white text-sm mb-1.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              Can any arbitrary program be automatically visualized?
            </h3>
            <p className="text-slate-300 leading-relaxed">
              No platform can reliably guess how to animate arbitrary unconstrained Turing-complete code. Zecode honestly distinguishes between <strong className="text-cyan-300 font-semibold">verified code execution</strong> (which runs any valid C, C++, Python, or Java code) and <strong className="text-cyan-300 font-semibold">visual algorithmic tracing</strong> (which maps recognized data structures like arrays, pointers, stacks, trees, and grids into step-by-step animations).
            </p>
          </div>

          <div className="surface-card p-5">
            <h3 className="font-bold text-white text-sm mb-1.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              How do I configure remote Judge0 execution?
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Simply set <code className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono">JUDGE0_API_KEY</code> or <code className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono">RAPIDAPI_KEY</code> in your backend environment file (<code className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono">.env</code>). When configured, the backend automatically routes code execution to remote Judge0 sandboxes. If not configured, Zecode seamlessly uses safe local sandboxing.
            </p>
          </div>

          <div className="surface-card p-5">
            <h3 className="font-bold text-white text-sm mb-1.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              Are test cases and custom inputs supported?
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Yes! Every problem includes pre-tested sample test cases as well as a custom test runner where you can enter any custom array (e.g. <code className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono">[2, 0, 2, 1, 1, 0]</code>) to see the visualizer run on your custom data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
