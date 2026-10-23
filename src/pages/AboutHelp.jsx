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
      <div className="flex flex-col gap-2 pb-6 border-b border-slate-800 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>Documentation & Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
          About Zecode
        </h1>
        <p className="text-base text-slate-300 font-mono text-cyan-300">
          Tagline: See Your Code. Understand Every Step.
        </p>
      </div>

      {/* Mission / Overview Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#070B14] border border-cyan-500/20 shadow-xl flex flex-col gap-4 w-full min-w-0">
        <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          Our Mission
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed font-sans">
          Most students and developers struggle with Data Structures and Algorithms not because code is difficult to write, but because memory mutations, pointer manipulations, and recursion happen invisibly inside the CPU.
        </p>
        <p className="text-sm text-slate-300 leading-relaxed font-sans">
          <strong>Zecode</strong> solves this by recording atomic algorithm steps, synchronizing active execution lines in Monaco Editor, and displaying smooth animations of arrays, multi-pointers (such as Dijkstra's Dutch National Flag), linked lists, stacks, trees, and matrices with plain-English explanations.
        </p>
      </div>

      {/* How the Visualizer Works */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full min-w-0">
        <div className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800 flex flex-col gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">1. Trace Generator</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Rather than guessing animations from output, Zecode simulates real step-by-step algorithms, emitting immutable state snapshots.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800 flex flex-col gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">2. Monaco Line Sync</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every step is mapped to its exact source-code line in Python, C++, Java, or C, dynamically highlighting the active statement.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800 flex flex-col gap-3">
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
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0F172A] border border-slate-800 flex flex-col gap-4 w-full min-w-0">
        <h2 className="text-lg font-bold font-display text-white flex items-center gap-2">
          <Keyboard className="w-5 h-5 text-cyan-400" />
          Keyboard Shortcuts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs font-mono">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-slate-400">Play / Pause</span>
            <kbd className="px-2 py-1 rounded bg-slate-800 text-cyan-300 border border-slate-700">Space</kbd>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-slate-400">Next Step</span>
            <kbd className="px-2 py-1 rounded bg-slate-800 text-cyan-300 border border-slate-700">→</kbd>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-slate-400">Previous Step</span>
            <kbd className="px-2 py-1 rounded bg-slate-800 text-cyan-300 border border-slate-700">←</kbd>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-slate-400">Reset Visualizer</span>
            <kbd className="px-2 py-1 rounded bg-slate-800 text-cyan-300 border border-slate-700">R</kbd>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-slate-400">First Step</span>
            <kbd className="px-2 py-1 rounded bg-slate-800 text-cyan-300 border border-slate-700">Home</kbd>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-slate-400">Last Step</span>
            <kbd className="px-2 py-1 rounded bg-slate-800 text-cyan-300 border border-slate-700">End</kbd>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="flex flex-col gap-4 w-full min-w-0">
        <h2 className="text-xl font-bold font-display text-white">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4 text-xs font-sans">
          <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800">
            <h3 className="font-bold text-white text-sm mb-1">
              Can any arbitrary program be automatically visualized?
            </h3>
            <p className="text-slate-300 leading-relaxed">
              No platform can reliably guess how to animate arbitrary unconstrained Turing-complete code. Zecode honestly distinguishes between <em>verified code execution</em> (which runs any valid C, C++, Python, or Java code) and <em>visual algorithmic tracing</em> (which maps recognized data structures like arrays, pointers, stacks, trees, and grids into step-by-step animations).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800">
            <h3 className="font-bold text-white text-sm mb-1">
              How do I configure remote Judge0 execution?
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Simply set <code>JUDGE0_API_KEY</code> or <code>RAPIDAPI_KEY</code> in your backend environment file (<code>.env</code>). When configured, the backend automatically routes code execution to remote Judge0 sandboxes. If not configured, Zecode seamlessly uses safe local sandboxing.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800">
            <h3 className="font-bold text-white text-sm mb-1">
              Are test cases and custom inputs supported?
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Yes! Every problem includes pre-tested sample test cases as well as a custom test runner where you can enter any custom array (e.g. <code>[2, 0, 2, 1, 1, 0]</code>) to see the visualizer run on your custom data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
