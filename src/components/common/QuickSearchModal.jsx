import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, CornerDownLeft, BookOpen } from 'lucide-react';
import { QUESTIONS_DATA } from '../../data/questionsData';

export default function QuickSearchModal({ isOpen, onClose, onSelectQuestion, setActivePage }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const filteredQuestions = query.trim()
    ? QUESTIONS_DATA.filter((q) => {
        const text = `${q.title} ${q.topic} ${q.description} ${q.difficulty}`.toLowerCase();
        return text.includes(query.toLowerCase());
      }).slice(0, 8)
    : QUESTIONS_DATA.slice(0, 6);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredQuestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredQuestions.length) % filteredQuestions.length);
    } else if (e.key === 'Enter' && filteredQuestions[selectedIndex]) {
      e.preventDefault();
      onSelectQuestion(filteredQuestions[selectedIndex]);
      setActivePage('visualizer');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#0A0F1D] border border-white/[0.12] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08] bg-[#0F172A]/70">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions, algorithms, topics (e.g. Dutch Flag, Two Sum, Binary Search)..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 rounded bg-white/[0.06] border border-white/[0.1] text-[10px] font-mono text-slate-400">
            ESC
          </kbd>
        </div>

        {/* Quick Filter Categories */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-white/[0.04] bg-white/[0.01] text-[11px] overflow-x-auto">
          <span className="text-slate-500 font-mono shrink-0">Popular:</span>
          {['Sorting', 'Two Pointers', 'Binary Search', 'Linked List', 'Trees'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2 py-0.5 rounded-full bg-white/[0.04] hover:bg-cyan-500/10 hover:text-cyan-300 text-slate-400 font-mono transition-colors shrink-0"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="max-h-[360px] overflow-y-auto p-2 flex flex-col gap-1">
          {filteredQuestions.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs font-mono">
              No matching algorithms or questions found for "{query}".
            </div>
          ) : (
            filteredQuestions.map((q, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={q.id}
                  onClick={() => {
                    onSelectQuestion(q);
                    setActivePage('visualizer');
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-cyan-500/10 border border-cyan-500/30 text-white'
                      : 'hover:bg-white/[0.03] text-slate-300 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-cyan-500/20 text-cyan-300'
                          : 'bg-white/[0.04] text-slate-400'
                      }`}
                    >
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm truncate font-display">{q.title}</span>
                        {q.sheetTag && (
                          <span
                            className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold uppercase tracking-wider ${
                              q.sheetTag === 'Basic'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : q.sheetTag === 'Pro'
                                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            }`}
                          >
                            {q.sheetTag}
                          </span>
                        )}
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/[0.06] text-slate-400">
                          {q.topic}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 truncate mt-0.5">
                        {q.description}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        q.difficulty === 'Easy'
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : q.difficulty === 'Medium'
                          ? 'bg-amber-500/15 text-amber-400'
                          : 'bg-rose-500/15 text-rose-400'
                      }`}
                    >
                      {q.difficulty}
                    </span>
                    {isSelected && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-cyan-400 font-semibold">
                        <span>Open</span>
                        <CornerDownLeft className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-[#070B14] border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <button
            onClick={() => {
              setActivePage('library');
              onClose();
            }}
            className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 font-sans"
          >
            <span>View All 26 Problems</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
