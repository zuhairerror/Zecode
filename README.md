# Zecode — Professional Interactive Code Visualizer

> **Brand name:** Zecode  
> **Tagline:** See Your Code. Understand Every Step.

**Zecode** is a modern developer-tool and educational platform designed to turn complex Data Structures & Algorithms into synchronized step-by-step interactive animations, line-by-line execution traces, and clear explanations in **C**, **C++**, **Python**, and **Java**.

---

## 🚀 Key Features

1. **Synchronized Code Visualization Engine:**
   - Features **Sort Colors (0, 1, 2) using Dijkstra's Dutch National Flag algorithm** as the initial showcase with `low`, `mid`, `high` pointers, active comparisons, dynamic swaps, invariant partition tracking, and line highlighting.
   - Also visualizes binary search, bubble sort, selection sort, insertion sort, Two Sum, linked list reversal, valid parentheses stacks, binary tree traversals, and flood fill grids.
   - Synchronizes each atomic algorithm step with source code line numbers in the Monaco Editor.
   - Full playback controls: Play, Pause, Next Step, Previous Step, Jump to Start, Jump to End, Reset, and adjustable Speed ($0.5\times$ to $3\times$).
   - Plain-English step explanations for every operation.

2. **Curated DSA Question Library:**
   - Curated questions across 13 core categories:
     - Arrays and Strings
     - Searching and Sorting
     - Hashing
     - Two Pointers and Sliding Window
     - Linked Lists
     - Stacks and Queues
     - Recursion and Backtracking
     - Trees and Binary Search Trees
     - Heaps
     - Graphs
     - Greedy Algorithms
     - Dynamic Programming
     - Bit Manipulation
   - Clearly distinguishes verified interactive visualizations from questions listed for future visualizer support.
   - Complete problem descriptions, examples, constraints, starter solutions in 4 languages, and Big-O complexity cards.

3. **Monaco Code Editor & Sandbox:**
   - Monaco Editor with custom `zecode-navy` syntax theme.
   - Language selector: C, C++, Python, Java.
   - Secure execution in an isolated sandbox with standard output, runtime measurement, and memory inspection.
   - Custom test input runner allowing students to test arbitrary array values.

4. **Custom Code Visualizer & Pattern Detector:**
   - Paste arbitrary code or choose from pre-built algorithm templates (Dutch National Flag, Bubble Sort, Selection Sort, Insertion Sort, Binary Search).
   - Automatic algorithm pattern detector identifies sorting and searching algorithms to generate real-time visual traces.
   - Honest explanations for unsupported arbitrary programs.

5. **Authentication and Saved Progress:**
   - User authentication modal supporting Sign Up, Login, and Instant Demo login (`demo@zecode.dev`).
   - Tracks solved questions, saves user progress in local storage / session.
   - Respects reduced-motion accessibility preferences (`@media (prefers-reduced-motion)`).

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS
- **Code Editor:** Monaco Editor (`@monaco-editor/react`)
- **Icons & Effects:** `lucide-react`, `canvas-confetti`
- **Backend / Sandbox:** Node.js, Express, child-process sandboxing, Judge0 integration
- **Styling:** Custom Dark Navy (`#070B14`, `#0B1120`, `#0F172A`), Cyan/Turquoise accents (`#06B6D4`, `#22D3EE`), and subtle amber highlights

---

## 🏁 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Backend Server (Optional)
```bash
npm run server
```
*Runs at `http://localhost:5000`*

### 3. Start the Frontend Development Server
```bash
npm run dev
```
*Frontend runs at `http://localhost:5173`*

### 4. Build for Production
```bash
npm run build
```

---

## 🛡️ License
MIT License. © Zecode Platform.
