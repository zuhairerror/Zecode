import React from 'react';
import { Shield, Terminal, Heart } from 'lucide-react';
import ZecodeLogo from './ZecodeLogo';

export default function Footer({ setActivePage }) {
  const handleNavClick = (pageId) => {
    if (pageId === 'features') {
      setActivePage('home');
      setTimeout(() => {
        const el = document.getElementById('features');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      setActivePage(pageId);
    }
  };

  return (
    <footer className="bg-[#070B14] border-t border-slate-800/80 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div onClick={() => setActivePage('home')} className="cursor-pointer mb-1.5">
            <ZecodeLogo size="sm" showTagline={false} />
          </div>
          <p className="text-xs text-slate-400 font-mono max-w-sm">
            See Your Code. Understand Every Step. Built for developers, students, and engineers mastering DSA.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
          <button onClick={() => handleNavClick('home')} className="hover:text-cyan-400 transition-colors">
            Home
          </button>
          <button onClick={() => handleNavClick('library')} className="hover:text-cyan-400 transition-colors">
            DSA Library
          </button>
          <button onClick={() => handleNavClick('visualizer')} className="hover:text-cyan-400 transition-colors">
            Visualizer
          </button>
          <button onClick={() => handleNavClick('custom')} className="hover:text-cyan-400 transition-colors">
            Custom Code
          </button>
          <button onClick={() => handleNavClick('features')} className="hover:text-cyan-400 transition-colors">
            Features
          </button>
          <button onClick={() => handleNavClick('about')} className="hover:text-cyan-400 transition-colors">
            About & Architecture
          </button>
        </div>

        {/* Badges & Tech Stack */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 font-mono">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            Isolated Sandbox
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800">
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            C • C++ • Python • Java
          </span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-mono">
        <span>© {new Date().getFullYear()} Zecode. All rights reserved.</span>
        <span className="mt-2 sm:mt-0">Dijkstra Dutch National Flag & Algorithm Tracing Platform</span>
      </div>
    </footer>
  );
}
