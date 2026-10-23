import React, { useState, useEffect } from 'react';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import QuestionLibrary from './pages/QuestionLibrary';
import QuestionDetail from './pages/QuestionDetail';
import CustomVisualizer from './pages/CustomVisualizer';
import AboutHelp from './pages/AboutHelp';
import AuthModal from './components/auth/AuthModal';
import QuickSearchModal from './components/common/QuickSearchModal';
import { QUESTIONS_DATA } from './data/questionsData';

export default function App() {
  // Sync initial page from window.location.pathname
  const getPageFromPath = () => {
    const path = window.location.pathname.replace(/^\//, '').toLowerCase();
    if (['library', 'visualizer', 'custom', 'about'].includes(path)) {
      return path;
    }
    return 'home';
  };

  const [activePage, setActivePageState] = useState(getPageFromPath);

  // Wrapper to update URL and state
  const setActivePage = (page) => {
    setActivePageState(page);
    const targetPath = page === 'home' ? '/' : `/${page}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ page }, '', targetPath);
    }
  };

  // Listen to browser Back/Forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setActivePageState(getPageFromPath());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Default to Sort Colors (Dutch National Flag) or Two Sum
  const [selectedQuestion, setSelectedQuestion] = useState(
    () => QUESTIONS_DATA.find((q) => q.id === 'sort-colors') || QUESTIONS_DATA[0]
  );

  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('zecode_auth_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global Ctrl+K / Cmd+K shortcut for quick search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Solved Questions State
  const [solvedIds, setSolvedIds] = useState(() => {
    try {
      const saved =
        localStorage.getItem('zecode_solved_questions') ||
        localStorage.getItem('vizorith_solved_questions');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Persist solved problems
  useEffect(() => {
    try {
      localStorage.setItem('zecode_solved_questions', JSON.stringify(solvedIds));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  }, [solvedIds]);

  const handleToggleSolved = (questionId) => {
    setSolvedIds((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('zecode_auth_user', JSON.stringify(user));
    } catch (e) {
      console.warn('Could not save user session:', e);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('zecode_auth_user');
    } catch (e) {
      console.warn('Could not clear user session:', e);
    }
  };

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activePage]);

  const handleSelectQuestion = (question) => {
    setSelectedQuestion(question);
    setActivePage('visualizer');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#060913] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Pages */}
      <main className="flex-1">
        {activePage === 'home' && (
          <Home
            setActivePage={setActivePage}
            onSelectQuestion={handleSelectQuestion}
          />
        )}

        {activePage === 'library' && (
          <QuestionLibrary
            onSelectQuestion={handleSelectQuestion}
            setActivePage={setActivePage}
            solvedIds={solvedIds}
          />
        )}

        {activePage === 'visualizer' && (
          <QuestionDetail
            question={selectedQuestion}
            allQuestions={QUESTIONS_DATA}
            onSelectQuestion={handleSelectQuestion}
            isSolved={solvedIds.includes(selectedQuestion.id)}
            onToggleSolved={handleToggleSolved}
          />
        )}

        {activePage === 'custom' && <CustomVisualizer />}

        {activePage === 'about' && <AboutHelp setActivePage={setActivePage} />}
      </main>

      {/* Global Footer */}
      <Footer setActivePage={setActivePage} />

      {/* Quick Search Modal */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectQuestion={handleSelectQuestion}
        setActivePage={setActivePage}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
    </div>
  );
}
