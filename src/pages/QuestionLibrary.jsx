import React, { useState, useMemo } from 'react';
import {
  Search,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Terminal,
  ArrowRight
} from 'lucide-react';
import { QUESTIONS_DATA, TOPICS, DIFFICULTIES } from '../data/questionsData';

export default function QuestionLibrary({ onSelectQuestion, setActivePage, solvedIds = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All'); // All, Solved, Unsolved
  const [visFilter, setVisFilter] = useState('All'); // All, Visualizer Ready, Sandbox Only

  // Filtered Questions
  const filteredQuestions = useMemo(() => {
    return QUESTIONS_DATA.filter((q) => {
      // 1. Search Query
      const matchesSearch =
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.description.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Topic Filter
      const matchesTopic = selectedTopic === 'All' || q.topic === selectedTopic;

      // 3. Difficulty Filter
      const matchesDifficulty =
        selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;

      // 4. Solved Filter
      const isSolved = solvedIds.includes(q.id);
      const matchesStatus =
        statusFilter === 'All' ||
        (statusFilter === 'Solved' && isSolved) ||
        (statusFilter === 'Unsolved' && !isSolved);

      // 5. Visualizer Availability Filter
      const matchesVis =
        visFilter === 'All' ||
        (visFilter === 'Visualizer Ready' && q.hasVisualizer) ||
        (visFilter === 'Sandbox Only' && !q.hasVisualizer);

      return matchesSearch && matchesTopic && matchesDifficulty && matchesStatus && matchesVis;
    });
  }, [searchQuery, selectedTopic, selectedDifficulty, statusFilter, visFilter, solvedIds]);

  const totalVisual = QUESTIONS_DATA.filter((q) => q.hasVisualizer).length;

  return (
    <div className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8 min-h-screen w-full overflow-x-hidden">
      {/* Header & Stats Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Curated Curriculum
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            DSA Question Library
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Browse and practice problems complete with test cases, starter code in 4 languages, and interactive visual traces.
          </p>
        </div>

        {/* Stats Pill */}
        <div className="grid grid-cols-3 sm:flex items-center gap-2 sm:gap-4 surface-card p-3 sm:p-4 rounded-xl border-white/[0.08] shrink-0 text-center sm:text-left">
          <div className="flex flex-col">
            <span className="text-[11px] font-mono text-slate-400">Curated</span>
            <span className="text-lg sm:text-xl font-bold font-mono text-white">{QUESTIONS_DATA.length}</span>
          </div>
          <div className="hidden sm:block h-7 w-px bg-white/[0.08]"></div>
          <div className="flex flex-col">
            <span className="text-[11px] font-mono text-slate-400">Solved</span>
            <span className="text-lg sm:text-xl font-bold font-mono text-emerald-400">
              {solvedIds.length} / {QUESTIONS_DATA.length}
            </span>
          </div>
          <div className="hidden sm:block h-7 w-px bg-white/[0.08]"></div>
          <div className="flex flex-col">
            <span className="text-[11px] font-mono text-slate-400">Visualizer Ready</span>
            <span className="text-lg sm:text-xl font-bold font-mono text-cyan-400">{totalVisual}</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="surface-card p-4 sm:p-5 flex flex-col gap-4 border-white/[0.08] w-full min-w-0">
        {/* Prominent Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-cyan-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${QUESTIONS_DATA.length} problems by title, topic, or keyword (e.g. 'Majority Element', 'Two Sum', '3 Sum')...`}
            className="w-full bg-black/50 border border-white/[0.1] rounded-xl pl-12 pr-10 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 font-sans transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3.5 text-xs text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-white/[0.06]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Bar: Difficulty & Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Difficulty Buttons */}
          <div className="flex items-center gap-1.5 bg-black/30 p-1 rounded-xl border border-white/[0.06] overflow-x-auto">
            <span className="text-[11px] font-mono text-slate-500 px-2 uppercase tracking-wider font-semibold">
              Difficulty:
            </span>
            {DIFFICULTIES.map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1 text-xs font-mono rounded-lg transition-all whitespace-nowrap ${
                  selectedDifficulty === diff
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Solved Status Filter */}
          <div className="flex items-center gap-1.5 bg-black/30 p-1 rounded-xl border border-white/[0.06] overflow-x-auto">
            <span className="text-[11px] font-mono text-slate-500 px-2 uppercase tracking-wider font-semibold">
              Status:
            </span>
            {['All', 'Solved', 'Unsolved'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 text-xs font-mono rounded-lg transition-all whitespace-nowrap ${
                  statusFilter === st
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Topics Filter Row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-thin">
          <span className="text-[11px] font-mono text-slate-500 shrink-0 uppercase tracking-wider font-semibold">
            Topics:
          </span>
          {TOPICS.map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedTopic === topic
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-400/40 font-semibold shadow-sm'
                  : 'bg-white/[0.03] text-slate-400 hover:text-slate-200 border border-white/[0.06]'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
        <span>
          Showing <strong className="text-white">{filteredQuestions.length}</strong> of{' '}
          {QUESTIONS_DATA.length} problems
        </span>
      </div>

      {/* Questions Grid */}
      {filteredQuestions.length === 0 ? (
        <div className="surface-card p-10 text-center border-white/[0.08]">
          <BookOpen className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-1">No matching problems found</h3>
          <p className="text-xs text-slate-400 mb-4">
            Try adjusting your search terms or clearing difficulty / topic filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTopic('All');
              setSelectedDifficulty('All');
              setStatusFilter('All');
              setVisFilter('All');
            }}
            className="btn-secondary text-xs py-2 px-4 mx-auto"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full">
          {filteredQuestions.map((q, idx) => {
            const isSolved = solvedIds.includes(q.id);

            return (
              <div
                key={q.id}
                onClick={() => {
                  onSelectQuestion(q);
                  setActivePage('visualizer');
                }}
                className="surface-card p-5 sm:p-6 cursor-pointer flex flex-col justify-between group shadow-lg min-w-0"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3 min-w-0">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-[11px] font-mono text-slate-500 shrink-0">#{idx + 1}</span>
                      <span className="badge badge-topic truncate">{q.topic}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`badge ${
                          q.difficulty === 'Easy'
                            ? 'badge-easy'
                            : q.difficulty === 'Medium'
                            ? 'badge-medium'
                            : 'badge-hard'
                        }`}
                      >
                        {q.difficulty}
                      </span>
                      {isSolved && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" title="Solved" />
                      )}
                    </div>
                  </div>

                  {/* Title and Sheet Tag */}
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors truncate font-display">
                      {q.title}
                    </h3>
                    {q.sheetTag && (
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0 ${
                          q.sheetTag === 'Basic'
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : q.sheetTag === 'Pro'
                            ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                            : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {q.sheetTag}
                      </span>
                    )}
                  </div>

                  {/* Description preview */}
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {q.description}
                  </p>
                </div>

                {/* Footer metadata */}
                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                  {q.hasVisualizer ? (
                    <div className="flex items-center gap-1.5 text-cyan-300 truncate">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="text-[11px] font-bold truncate">Visualizer Ready</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-slate-400 truncate">
                      <Terminal className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="text-[11px] truncate">Sandbox Execution</span>
                    </div>
                  )}

                  <span className="text-cyan-400 group-hover:translate-x-1 transition-transform font-bold flex items-center gap-1 shrink-0">
                    Visualize →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
