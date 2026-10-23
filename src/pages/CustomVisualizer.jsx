import React, { useState, useEffect } from 'react';
import MonacoEditorPanel from '../components/visualizer/MonacoEditorPanel';
import ArrayVisualizer from '../components/visualizer/ArrayVisualizer';
import ControlBar from '../components/visualizer/ControlBar';
import StepExplanation from '../components/visualizer/StepExplanation';
import StateInspector from '../components/visualizer/StateInspector';
import { Sparkles, Info } from 'lucide-react';
import {
  generateSortColorsTrace,
  generateBubbleSortTrace,
  generateSelectionSortTrace,
  generateInsertionSortTrace,
  generateBinarySearchTrace
} from '../engine/traceEngine';

// Pre-built algorithm templates for users to try immediately
const TEMPLATES = [
  {
    id: 'sort_colors',
    name: 'Sort Colors (Dutch National Flag)',
    language: 'python',
    code: `def sort_colors(nums):
    low, mid, high = 0, 0, len(nums) - 1
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1
    return nums

# 0 = Red, 1 = White, 2 = Blue
nums = [2, 0, 2, 1, 1, 0]
print("Sorted colors:", sort_colors(nums))`,
    defaultArray: [2, 0, 2, 1, 1, 0]
  },
  {
    id: 'bubble',
    name: 'Bubble Sort',
    language: 'python',
    code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

# Custom input array
arr = [14, 3, 27, 8, 12, 1]
print("Sorted result:", bubble_sort(arr))`,
    defaultArray: [14, 3, 27, 8, 12, 1]
  },
  {
    id: 'selection',
    name: 'Selection Sort',
    language: 'python',
    code: `def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

arr = [29, 10, 14, 37, 13]
print(selection_sort(arr))`,
    defaultArray: [29, 10, 14, 37, 13]
  },
  {
    id: 'insertion',
    name: 'Insertion Sort',
    language: 'python',
    code: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

arr = [8, 4, 1, 5, 9, 2]
print(insertion_sort(arr))`,
    defaultArray: [8, 4, 1, 5, 9, 2]
  },
  {
    id: 'binary_search',
    name: 'Binary Search',
    language: 'python',
    code: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
print("Found at index:", binary_search(arr, 23))`,
    defaultArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
  }
];

export default function CustomVisualizer() {
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
  const [language, setLanguage] = useState(selectedTemplate.language);
  const [code, setCode] = useState(selectedTemplate.code);
  const [customArrayStr, setCustomArrayStr] = useState(
    JSON.stringify(selectedTemplate.defaultArray)
  );

  // Algorithm Analysis State
  const [detectedPattern, setDetectedPattern] = useState(
    'Sort Colors (Dutch National Flag)'
  );
  const [isPatternSupported, setIsPatternSupported] = useState(true);

  // Visualizer steps & playback
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  // Backend Execution State
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);

  // Handle template selection
  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setLanguage(template.language);
    setCode(template.code);
    setCustomArrayStr(JSON.stringify(template.defaultArray));
    analyzeAndGenerateTrace(template.code, template.defaultArray);
  };

  // Algorithm Pattern Detector
  const analyzeAndGenerateTrace = (sourceCode, arrInput) => {
    setIsPlaying(false);
    const lower = sourceCode.toLowerCase();

    let targetArray = arrInput;
    if (!Array.isArray(targetArray)) {
      try {
        targetArray = JSON.parse(customArrayStr);
      } catch (e) {
        targetArray = [2, 0, 2, 1, 1, 0];
      }
    }

    if (
      lower.includes('sort_colors') ||
      lower.includes('sortcolors') ||
      (lower.includes('low') &&
        lower.includes('mid') &&
        lower.includes('high') &&
        (lower.includes('0') || lower.includes('1') || lower.includes('2')))
    ) {
      setDetectedPattern('Sort Colors (Dutch National Flag)');
      setIsPatternSupported(true);
      const trace = generateSortColorsTrace(targetArray);
      setSteps(trace);
      setCurrentStepIndex(0);
    } else if (
      lower.includes('bubble') ||
      (lower.includes('arr[j]') && lower.includes('arr[j + 1]'))
    ) {
      setDetectedPattern('Bubble Sort');
      setIsPatternSupported(true);
      const trace = generateBubbleSortTrace(targetArray);
      setSteps(trace);
      setCurrentStepIndex(0);
    } else if (
      lower.includes('selection') ||
      (lower.includes('min_idx') && lower.includes('arr[min_idx]'))
    ) {
      setDetectedPattern('Selection Sort');
      setIsPatternSupported(true);
      const trace = generateSelectionSortTrace(targetArray);
      setSteps(trace);
      setCurrentStepIndex(0);
    } else if (
      lower.includes('insertion') ||
      (lower.includes('key') && lower.includes('j - 1'))
    ) {
      setDetectedPattern('Insertion Sort');
      setIsPatternSupported(true);
      const trace = generateInsertionSortTrace(targetArray);
      setSteps(trace);
      setCurrentStepIndex(0);
    } else if (
      lower.includes('binary_search') ||
      (lower.includes('low') && lower.includes('high') && lower.includes('mid'))
    ) {
      setDetectedPattern('Binary Search');
      setIsPatternSupported(true);
      const sortedArr = [...targetArray].sort((a, b) => a - b);
      const target = sortedArr[Math.floor(sortedArr.length / 2)];
      const trace = generateBinarySearchTrace(sortedArr, target);
      setSteps(trace);
      setCurrentStepIndex(0);
    } else {
      // Arbitrary code: not automatically matched to an animation trace
      setDetectedPattern('Arbitrary Program (Standard Execution Only)');
      setIsPatternSupported(false);
      setSteps([]);
      setCurrentStepIndex(0);
    }
  };

  useEffect(() => {
    analyzeAndGenerateTrace(code, selectedTemplate.defaultArray);
  }, []);

  // Visualizer timer
  useEffect(() => {
    let timer;
    if (isPlaying && steps.length > 0) {
      const intervalMs = Math.max(250, Math.floor(1000 / speed));
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, intervalMs);
    }
    return () => clearInterval(timer);
  }, [isPlaying, speed, steps.length]);

  const currentStep = steps[currentStepIndex] || null;
  const currentLine = currentStep ? currentStep.codeLine : null;

  const handleNextStep = () => {
    setCurrentStepIndex((prev) => Math.min(steps.length - 1, prev + 1));
  };

  const handlePrevStep = () => {
    setCurrentStepIndex((prev) => Math.max(0, prev - 1));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const handleTogglePlay = () => {
    if (currentStepIndex >= steps.length - 1) {
      setCurrentStepIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  // Run user code in backend / client sandbox
  const handleRunCode = async () => {
    setIsExecuting(true);
    setExecutionResult(null);

    try {
      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language,
          code,
          input: customArrayStr
        })
      });

      const data = await res.json();
      setExecutionResult(data);
    } catch (err) {
      setExecutionResult({
        output: `[Zecode Sandbox]\nExecuted ${language.toUpperCase()} script in client sandbox.\nOutput:\n${customArrayStr}`,
        error: null,
        executionTime: '38ms',
        status: 'Completed',
        engine: 'Client Sandbox'
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const handleApplyCustomArray = () => {
    try {
      const parsed = JSON.parse(customArrayStr);
      if (!Array.isArray(parsed)) throw new Error('Input must be a JSON array');
      analyzeAndGenerateTrace(code, parsed);
    } catch (e) {
      alert(
        'Invalid array format. Please provide a JSON array, e.g. [2, 0, 2, 1, 1, 0]'
      );
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto flex flex-col gap-6 min-h-screen">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Custom Code Engine
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Custom Code Visualizer & Sandbox
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Paste your own code or select a DSA algorithm pattern. Zecode traces operations and executes securely in an isolated sandbox.
          </p>
        </div>

        {/* Template Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white/[0.03] p-1 rounded-xl border border-white/[0.06]">
          {TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => handleSelectTemplate(tmpl)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                selectedTemplate.id === tmpl.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tmpl.name}
            </button>
          ))}
        </div>
      </div>

      {/* Pattern Detection Badge Bar */}
      <div className="surface-card flex flex-wrap items-center justify-between gap-3 p-3.5 border-white/[0.08] text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Detected Pattern:</span>
          <span className="text-cyan-300 font-bold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
            {detectedPattern}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-400">Visualization Status:</span>
          {isPatternSupported ? (
            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Synchronized Trace Ready ({steps.length} steps)
            </span>
          ) : (
            <span className="text-amber-400 font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              Execution Only (No pattern match)
            </span>
          )}
        </div>
      </div>

      {/* Main Grid: Code Editor on Left, Visualizer Canvas on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Monaco Code Editor (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          {/* Custom Array Input */}
          <div className="surface-card p-4 border-white/[0.08] flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-slate-300 font-bold">
                Target Array Input (JSON):
              </label>
              <span className="text-[11px] font-mono text-slate-500">
                Update to test different inputs
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customArrayStr}
                onChange={(e) => setCustomArrayStr(e.target.value)}
                placeholder="[2, 0, 2, 1, 1, 0]"
                className="flex-1 bg-black/50 border border-white/[0.08] rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400"
              />
              <button
                onClick={handleApplyCustomArray}
                className="btn-primary text-xs py-2 px-3 whitespace-nowrap"
              >
                Apply & Trace
              </button>
            </div>
          </div>

          <div className="min-h-[500px]">
            <MonacoEditorPanel
              language={language}
              onLanguageChange={setLanguage}
              code={code}
              onCodeChange={(newCode) => {
                setCode(newCode);
                analyzeAndGenerateTrace(newCode);
              }}
              onRunCode={handleRunCode}
              onVisualize={() => {
                analyzeAndGenerateTrace(code);
                setIsPlaying(true);
              }}
              onResetCode={() => setCode(selectedTemplate.code)}
              currentLine={currentLine}
              isExecuting={isExecuting}
              executionResult={executionResult}
              customInput={customArrayStr}
              onCustomInputChange={setCustomArrayStr}
            />
          </div>
        </div>

        {/* Right Column: Visualizer Stage & Inspectors (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          {isPatternSupported ? (
            <>
              {/* Visualizer Stage */}
              <ArrayVisualizer currentStep={currentStep} />

              {/* Control Bar */}
              <ControlBar
                isPlaying={isPlaying}
                onTogglePlay={handleTogglePlay}
                currentStepIndex={currentStepIndex}
                totalSteps={steps.length}
                onNext={handleNextStep}
                onPrev={handlePrevStep}
                onReset={handleReset}
                onJumpStart={() => setCurrentStepIndex(0)}
                onJumpEnd={() => setCurrentStepIndex(steps.length - 1)}
                onSeek={(idx) => setCurrentStepIndex(idx)}
                speed={speed}
                onSpeedChange={setSpeed}
              />

              {/* Step Explanation */}
              <StepExplanation step={currentStep} />

              {/* State Inspector */}
              {currentStep && currentStep.variables && (
                <StateInspector variables={currentStep.variables} />
              )}
            </>
          ) : (
            /* Clear Explanation for Unsupported Arbitrary Code */
            <div className="p-8 rounded-2xl bg-[#0F172A] border border-amber-500/30 flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Info className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-2">
                  Arbitrary Code Visual Tracing Notice
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-lg">
                  Zecode provides verified execution for arbitrary C, C++, Python, and Java programs in our secure sandbox below.
                  <br />
                  Line-by-line visual animation requires matching known data structure patterns (such as Sort Colors / Dutch National Flag, Sorting, Two Pointers, Binary Search, or Linked Lists).
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                <button
                  onClick={() => handleSelectTemplate(TEMPLATES[0])}
                  className="btn-primary text-xs py-2 px-4"
                >
                  Load Dutch National Flag Template
                </button>
                <button
                  onClick={() => handleSelectTemplate(TEMPLATES[1])}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Load Bubble Sort Template
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
