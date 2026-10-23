import React, { useState } from 'react';
import {
  Code2,
  BookOpen,
  PlaySquare,
  Sparkles,
  HelpCircle,
  Menu,
  X,
  Layers,
  User,
  LogOut,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import ZecodeLogo from './ZecodeLogo';

export default function Navbar({
  activePage,
  setActivePage,
  currentUser,
  onOpenAuth,
  onLogout
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Code2 },
    { id: 'library', label: 'DSA Library', icon: BookOpen },
    { id: 'visualizer', label: 'Visualizer', icon: PlaySquare },
    { id: 'custom', label: 'Custom Code', icon: Sparkles },
    { id: 'features', label: 'Features', icon: Layers },
    { id: 'about', label: 'About & Help', icon: HelpCircle }
  ];

  const handleNavClick = (id) => {
    if (id === 'features') {
      if (activePage !== 'home') {
        setActivePage('home');
        setTimeout(() => {
          const el = document.getElementById('features');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById('features');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setActivePage(id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#070B14]/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div
            onClick={() => setActivePage('home')}
            className="cursor-pointer shrink-0"
          >
            <ZecodeLogo size="md" showTagline={true} />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activePage === link.id;

              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Area: Sandbox Badge + Auth */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Sandbox Status Badge */}
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-300">Sandbox Ready</span>
            </div>

            {/* Auth Button or User Profile */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 transition-colors"
                >
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-slate-950 font-bold text-[10px]">
                    {currentUser.avatar || 'ZC'}
                  </div>
                  <span className="font-medium max-w-[100px] truncate">{currentUser.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {profileDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-xl bg-[#0F172A] border border-slate-800 shadow-2xl py-1.5 z-50 text-xs font-sans"
                    onMouseLeave={() => setProfileDropdownOpen(false)}
                  >
                    <div className="px-3.5 py-2 border-b border-slate-800">
                      <p className="font-bold text-white truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-400 font-mono truncate">{currentUser.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onOpenAuth();
                      }}
                      className="w-full px-3.5 py-2 text-left text-slate-300 hover:bg-slate-800 flex items-center gap-2"
                    >
                      <User className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Account Details</span>
                    </button>
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full px-3.5 py-2 text-left text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 border-t border-slate-800"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="btn-secondary text-xs py-1.5 px-3.5 font-semibold text-cyan-300 border-cyan-500/30 hover:border-cyan-400"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {!currentUser && (
              <button
                onClick={onOpenAuth}
                className="text-xs px-2.5 py-1 rounded-lg bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-medium"
              >
                Sign In
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0B1120] px-4 pt-2 pb-4 space-y-1 shadow-2xl">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activePage === link.id;

            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{link.label}</span>
              </button>
            );
          })}

          <div className="pt-3 mt-2 border-t border-slate-800/80 flex items-center justify-between px-2 text-xs font-mono">
            <span className="text-slate-400">Execution Sandbox</span>
            <div className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Online</span>
            </div>
          </div>

          {currentUser && (
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between px-2 text-xs">
              <span className="text-slate-300 truncate">{currentUser.email}</span>
              <button onClick={onLogout} className="text-rose-400 hover:underline">
                Log Out
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
