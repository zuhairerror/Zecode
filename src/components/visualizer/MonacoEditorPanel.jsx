import React, { useRef, useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import {
  Play,
  RotateCcw,
  Sparkles,
  Terminal,
  Clock,
  Cpu,
  SlidersHorizontal,
  Copy,
  Check
} from 'lucide-react';

export default function MonacoEditorPanel({
  language,
  onLanguageChange,
  code,
  onCodeChange,
  onRunCode,
  onVisualize,
  onResetCode,
  currentLine,
  isExecuting,
  executionResult,
  customInput,
  onCustomInputChange
}) {
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const decorationsRef = useRef([]);
  const [copied, setCopied] = useState(false);
  const [showInputDrawer, setShowInputDrawer] = useState(false);

  // Handle editor mounting
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Define custom dark navy theme for Monaco
    monaco.editor.defineTheme('zecode-navy', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { background: '0B1120', token: '' },
        { token: 'keyword', foreground: '22D3EE', fontStyle: 'bold' },
        { token: 'identifier', foreground: 'F8FAFC' },
        { token: 'string', foreground: 'FCD34D' },
        { token: 'number', foreground: 'F59E0B' },
        { token: 'comment', foreground: '64748B', fontStyle: 'italic' },
        { token: 'delimiter', foreground: '94A3B8' }
      ],
      colors: {
        'editor.background': '#070B14',
        'editor.foreground': '#F8FAFC',
        'editor.lineHighlightBackground': '#0F172A',
        'editorCursor.foreground': '#06B6D4',
        'editorLineNumber.foreground': '#475569',
        'editorLineNumber.activeForeground': '#22D3EE',
        'editor.selectionBackground': '#0891B240'
      }
    });

    monaco.editor.setTheme('zecode-navy');
  };

  // Synchronize active code line highlighting
  useEffect(() => {
    if (!editorRef.current || !monacoRef.current) return;

    if (currentLine && currentLine > 0) {
      decorationsRef.current = editorRef.current.deltaDecorations(
        decorationsRef.current,
        [
          {
            range: new monacoRef.current.Range(currentLine, 1, currentLine, 1),
            options: {
              isWholeLine: true,
              className: 'monaco-highlight-line',
              glyphMarginClassName: 'monaco-highlight-line-glyph'
            }
          }
        ]
      );
      editorRef.current.revealLineInCenterIfOutsideViewport(currentLine);
    } else {
      decorationsRef.current = editorRef.current.deltaDecorations(decorationsRef.current, []);
    }
  }, [currentLine]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Language mapper for Monaco
  const getMonacoLang = (lang) => {
    switch (lang.toLowerCase()) {
      case 'c': return 'c';
      case 'cpp': return 'cpp';
      case 'java': return 'java';
      case 'python': return 'python';
      default: return 'javascript';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#070B14] rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
      {/* Editor Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-[#0F172A] border-b border-slate-800">
        {/* Language Tabs */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
          {[
            { id: 'python', label: 'Python 3' },
            { id: 'cpp', label: 'C++' },
            { id: 'java', label: 'Java' },
            { id: 'c', label: 'C' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onLanguageChange(item.id)}
              className={`px-3 py-1 text-xs font-mono font-medium rounded transition-all ${
                language === item.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Custom Input Toggle */}
          <button
            onClick={() => setShowInputDrawer(!showInputDrawer)}
            className={`btn-secondary text-xs py-1.5 px-2.5 ${
              showInputDrawer ? 'border-cyan-400 text-cyan-300' : ''
            }`}
            title="Configure Custom Test Input"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Input</span>
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopyCode}
            className="btn-secondary text-xs py-1.5 px-2.5"
            title="Copy Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {/* Reset Code */}
          <button
            onClick={onResetCode}
            className="btn-secondary text-xs py-1.5 px-2.5"
            title="Reset to Starter Solution"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Visualize Execution Button */}
          <button
            onClick={onVisualize}
            className="btn-secondary text-xs py-1.5 px-3 border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/20"
            title="Run Algorithm Animation"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-bold">Visualize</span>
          </button>

          {/* Run Code Button */}
          <button
            onClick={onRunCode}
            disabled={isExecuting}
            className="btn-primary text-xs py-1.5 px-3"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isExecuting ? 'Running...' : 'Run Code'}</span>
          </button>
        </div>
      </div>

      {/* Custom Input Drawer (Optional Expandable) */}
      {showInputDrawer && (
        <div className="p-3 bg-slate-900 border-b border-slate-800 flex flex-col gap-1.5 text-xs font-mono">
          <label className="text-slate-400">Custom Standard Input / Parameters:</label>
          <input
            type="text"
            value={customInput}
            onChange={(e) => onCustomInputChange(e.target.value)}
            placeholder="e.g. [2, 7, 11, 15] or target=9"
            className="bg-slate-950 border border-slate-700 rounded px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-400"
          />
        </div>
      )}

      {/* Monaco Code Editor */}
      <div className="flex-1 min-h-[360px] relative">
        <Editor
          height="100%"
          language={getMonacoLang(language)}
          value={code}
          onChange={(val) => onCodeChange(val || '')}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            fontSize: 13,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            glyphMargin: true,
            lineNumbers: 'on',
            automaticLayout: true,
            tabSize: 4,
            renderLineHighlight: 'all',
            padding: { top: 12, bottom: 12 }
          }}
        />
      </div>

      {/* Execution Console / Output Tray */}
      <div className="border-t border-slate-800 bg-[#0F172A] flex flex-col max-h-[180px]">
        {/* Console Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-bold uppercase tracking-wider">Terminal Output</span>
            {executionResult && (
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  executionResult.error ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                }`}
              >
                {executionResult.status || (executionResult.error ? 'Error' : 'Success')}
              </span>
            )}
          </div>

          {executionResult && (
            <div className="flex items-center gap-3 text-[11px]">
              {executionResult.executionTime && (
                <span className="flex items-center gap-1 text-slate-400">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  {executionResult.executionTime}
                </span>
              )}
              {executionResult.engine && (
                <span className="flex items-center gap-1 text-slate-500 hidden sm:inline-flex">
                  <Cpu className="w-3 h-3" />
                  {executionResult.engine}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Console Content */}
        <div className="p-3 font-mono text-xs overflow-y-auto max-h-[140px] bg-[#070B14]">
          {isExecuting ? (
            <div className="flex items-center gap-2 text-cyan-400">
              <span className="animate-spin text-base">⟳</span>
              <span>Compiling and running code in secure sandbox...</span>
            </div>
          ) : executionResult ? (
            executionResult.error ? (
              <pre className="text-rose-400 whitespace-pre-wrap leading-relaxed">
                {executionResult.error}
              </pre>
            ) : (
              <pre className="text-emerald-300 whitespace-pre-wrap leading-relaxed">
                {executionResult.output || 'Code executed successfully with no output.'}
              </pre>
            )
          ) : (
            <span className="text-slate-600">
              Run or visualize your code to view sandbox execution output and traces.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
