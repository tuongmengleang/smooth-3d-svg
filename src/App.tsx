import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CalendarDays,
  CalendarX2,
  CalendarCheck2,
  Globe2,
  ChevronRight,
  Sun,
  Moon,
  Play,
  Pause,
  Copy,
  Check,
  Palmtree,
  Home,
  HeartPulse,
  Sparkles,
  RefreshCw,
  Sliders,
  Layers,
  Code2,
} from 'lucide-react';
import { LayeredEmptyIcon } from './components/LayeredEmptyIcon';
import { LeavePlanEmptyIcon } from './components/LeavePlanEmptyIcon';

type ViewMode = 'leave-planner' | 'global-directory' | 'side-by-side';
type LeaveType = 'vacation' | 'remote' | 'sick' | 'personal';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('leave-planner');
  const [isLeaveEmpty, setIsLeaveEmpty] = useState<boolean>(true);
  const [isDirectorySearching, setIsDirectorySearching] = useState<boolean>(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [leaveType, setLeaveType] = useState<LeaveType>('vacation');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [showCodeSnippet, setShowCodeSnippet] = useState<boolean>(false);

  // Sync dark mode class to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Infinite cycle for demonstration when auto-play is enabled
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      if (viewMode === 'leave-planner' || viewMode === 'side-by-side') {
        setIsLeaveEmpty(prev => !prev);
      }
      if (viewMode === 'global-directory' || viewMode === 'side-by-side') {
        setIsDirectorySearching(prev => !prev);
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [isAutoPlaying, viewMode]);

  // Days count mapping
  const daysCountMap: Record<LeaveType, number> = {
    vacation: 5,
    remote: 4,
    sick: 2,
    personal: 1,
  };

  const currentDays = daysCountMap[leaveType];

  const handleCopyCode = () => {
    const code = `<LeavePlanEmptyIcon 
  isEmpty={${isLeaveEmpty}} 
  leaveType="${leaveType}" 
  daysCount={${currentDays}} 
/>`;
    navigator.clipboard?.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className={`min-h-screen bg-neutral-100 dark:bg-[#0f0f10] text-neutral-900 dark:text-neutral-100 flex flex-col font-sans transition-colors duration-300 selection:bg-neutral-800 selection:text-white`}>
      
      {/* Top Global Navigation Bar */}
      <header className="h-16 border-b border-neutral-200 dark:border-neutral-800/80 bg-white/80 dark:bg-[#161618]/80 backdrop-blur-md sticky top-0 z-50 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between gap-4">
          
          {/* Brand & Breadcrumb */}
          <div className="flex items-center gap-2 sm:gap-3 text-sm">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-b from-neutral-100 to-neutral-200 dark:from-[#2e2e2e] dark:to-[#1e1e1e] flex items-center justify-center border border-neutral-300/80 dark:border-white/10 shadow-sm shrink-0">
              <CalendarDays className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <span className="text-neutral-900 dark:text-white font-semibold tracking-tight">Empty States</span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span className="text-neutral-500 dark:text-neutral-400 hidden sm:inline">3D Clay Animations</span>
            </div>
          </div>

          {/* Center Tabs: View Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-neutral-200/70 dark:bg-neutral-800/60 border border-neutral-300/40 dark:border-neutral-700/50 text-xs font-medium">
            <button
              onClick={() => setViewMode('leave-planner')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'leave-planner'
                  ? 'bg-white dark:bg-[#252528] text-neutral-900 dark:text-white shadow-xs font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5 text-amber-500" />
              <span>Leave Plan</span>
              <span className="hidden md:inline text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-bold">
                NEW
              </span>
            </button>

            <button
              onClick={() => setViewMode('global-directory')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'global-directory'
                  ? 'bg-white dark:bg-[#252528] text-neutral-900 dark:text-white shadow-xs font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5 text-blue-500" />
              <span>Global Listing</span>
            </button>

            <button
              onClick={() => setViewMode('side-by-side')}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'side-by-side'
                  ? 'bg-white dark:bg-[#252528] text-neutral-900 dark:text-white shadow-xs font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-neutral-500" />
              <span>Side-by-Side</span>
            </button>
          </div>

          {/* Right Tools: Auto-Play, Code & Theme */}
          <div className="flex items-center gap-2">
            {/* Auto Play Toggle */}
            <button
              onClick={() => setIsAutoPlaying(prev => !prev)}
              title={isAutoPlaying ? "Pause auto transition cycle" : "Resume auto transition cycle"}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                isAutoPlaying
                  ? 'bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-400'
                  : 'bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300'
              }`}
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 animate-pulse" />
                  <span className="hidden lg:inline">Looping</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline">Play</span>
                </>
              )}
            </button>

            {/* Inspect / Snippet Toggle */}
            <button
              onClick={() => setShowCodeSnippet(prev => !prev)}
              className="p-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700/60 transition-colors"
              title="View Component Code"
            >
              <Code2 className="w-4 h-4" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(prev => !prev)}
              className="p-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700/60 transition-colors"
              title="Toggle Dark / Light Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700" />}
            </button>
          </div>
        </div>
      </header>

      {/* Code Snippet Drawer/Banner (Collapsible) */}
      <AnimatePresence>
        {showCodeSnippet && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-neutral-200 dark:border-neutral-800 bg-neutral-900 text-neutral-100"
          >
            <div className="max-w-4xl mx-auto p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="font-mono text-neutral-300">
                <span className="text-pink-400">&lt;LeavePlanEmptyIcon</span>{' '}
                <span className="text-amber-300">isEmpty</span>=&#123;
                <span className="text-cyan-300">{isLeaveEmpty ? 'true' : 'false'}</span>&#125;{' '}
                <span className="text-amber-300">leaveType</span>=
                <span className="text-emerald-300">"{leaveType}"</span>{' '}
                <span className="text-amber-300">daysCount</span>=&#123;
                <span className="text-purple-300">{currentDays}</span>&#125;{' '}
                <span className="text-pink-400">/&gt;</span>
              </div>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium transition-colors border border-neutral-700"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied to Clipboard' : 'Copy JSX Snippet'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 max-w-6xl mx-auto w-full">
        
        {/* VIEW 1: LEAVE PLANNER SELECTED DATES EMPTY STATE (Requested Feature) */}
        {(viewMode === 'leave-planner' || viewMode === 'side-by-side') && (
          <div className="w-full flex flex-col items-center">
            
            {/* Interactive Leave Controls Bar */}
            <div className="w-full max-w-md mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/70 dark:bg-[#18181b]/70 backdrop-blur-sm p-2 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 shadow-xs">
              
              {/* Leave Type Selector Chips */}
              <div className="flex items-center gap-1.5 w-full sm:w-auto justify-center">
                {(
                  [
                    { id: 'vacation', label: 'Vacation', icon: Palmtree },
                    { id: 'remote', label: 'Remote', icon: Home },
                    { id: 'sick', label: 'Medical', icon: HeartPulse },
                    { id: 'personal', label: 'Personal', icon: Sparkles },
                  ] as const
                ).map(item => {
                  const Icon = item.icon;
                  const isActive = leaveType === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setLeaveType(item.id)}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-xs font-semibold'
                          : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* State Manual Toggle Button */}
              <button
                onClick={() => {
                  setIsLeaveEmpty(prev => !prev);
                  // pause auto-play on explicit user click so they can inspect at their own pace
                  setIsAutoPlaying(false);
                }}
                className="w-full sm:w-auto px-3.5 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700/80 text-xs font-medium text-neutral-800 dark:text-neutral-200 transition-colors border border-neutral-200 dark:border-neutral-700 flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5 text-neutral-500" />
                <span>{isLeaveEmpty ? 'Simulate Select Dates' : 'Simulate Clear Dates'}</span>
              </button>
            </div>

            {/* Central 3D Empty State Card */}
            <motion.div
              layout
              className="w-full max-w-md bg-white dark:bg-[#18181a] rounded-[2.5rem] p-8 sm:p-10 flex flex-col items-center text-center ring-1 ring-neutral-200/90 dark:ring-neutral-800 shadow-[0_16px_48px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)] relative overflow-hidden"
            >
              {/* Subtle Ambient Background Aura based on state & leave type */}
              <AnimatePresence>
                {!isLeaveEmpty && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.6 }}
                    className="absolute -top-10 inset-x-0 h-48 bg-gradient-to-b from-amber-500/10 via-orange-500/5 to-transparent blur-3xl pointer-events-none"
                  />
                )}
              </AnimatePresence>

              {/* Leave Planner Header Ribbon / Context */}
              <div className="flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-[#202024] border border-neutral-200 dark:border-neutral-800 text-[11px] font-semibold text-neutral-600 dark:text-neutral-400">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span>Time-Off Planner • Q4 Schedule</span>
              </div>

              {/* The 3D Volumetric Animated Calendar Icon */}
              <div
                className="my-3 cursor-pointer group"
                onClick={() => {
                  setIsLeaveEmpty(prev => !prev);
                  setIsAutoPlaying(false);
                }}
                title="Click icon to toggle empty/selected state"
              >
                <LeavePlanEmptyIcon
                  isEmpty={isLeaveEmpty}
                  leaveType={leaveType}
                  daysCount={currentDays}
                />
              </div>

              {/* Text Information with Smooth Cross-fade */}
              <div className="min-h-[96px] flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  {isLeaveEmpty ? (
                    <motion.div
                      key="empty-text"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col items-center"
                    >
                      <h2 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-2 flex items-center gap-2">
                        <span>No leave dates selected</span>
                      </h2>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-[300px]">
                        Choose your departure and return dates on the calendar to reserve your time off and calculate balance.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="selected-text"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col items-center"
                    >
                      <h2 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-2 flex items-center gap-2">
                        <span>{currentDays} Days Selected</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                          Oct 18 – 22
                        </span>
                      </h2>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-[300px]">
                        Your {leaveType} request is ready for submission. 11 days will remain in your annual allowance.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Interactive Action Buttons */}
              <div className="w-full mt-6 pt-5 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setIsLeaveEmpty(prev => !prev);
                    setIsAutoPlaying(false);
                  }}
                  className={`w-full py-3 px-6 rounded-2xl text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
                    isLeaveEmpty
                      ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100'
                      : 'bg-neutral-100 dark:bg-[#252528] text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-[#2e2e32] border border-neutral-200 dark:border-neutral-700'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {isLeaveEmpty ? (
                      <motion.div
                        key="btn-select"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="flex items-center gap-2"
                      >
                        <CalendarDays className="w-4 h-4 text-amber-400" />
                        <span>Select Leave Dates (Oct 18 – 22)</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="btn-clear"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="flex items-center gap-2"
                      >
                        <CalendarX2 className="w-4 h-4 text-rose-500" />
                        <span>Clear Selected Dates</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>

                {/* Secondary Status indicator */}
                <div className="flex items-center justify-between text-[11px] text-neutral-400 dark:text-neutral-500 px-2">
                  <span>Balance: 16 Days Total</span>
                  <span>{isLeaveEmpty ? '0 Days used' : `${currentDays} Days in draft`}</span>
                  <span>{isLeaveEmpty ? '16 Days left' : `${16 - currentDays} Days left`}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* VIEW 2: GLOBAL DIRECTORY LISTING EMPTY STATE (Previous turn component) */}
        {viewMode === 'global-directory' && (
          <div className="w-full flex flex-col items-center">
            
            {/* Directory Controls */}
            <div className="w-full max-w-md mb-6 flex items-center justify-between gap-3 bg-white/70 dark:bg-[#18181b]/70 backdrop-blur-sm p-2 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 shadow-xs">
              <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400 px-2">
                Directory Filter: <strong className="text-neutral-900 dark:text-white">APAC Enterprise Nodes</strong>
              </span>
              <button
                onClick={() => {
                  setIsDirectorySearching(prev => !prev);
                  setIsAutoPlaying(false);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700/80 text-xs font-medium text-neutral-800 dark:text-neutral-200 transition-colors border border-neutral-200 dark:border-neutral-700 flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5 text-neutral-500" />
                <span>{isDirectorySearching ? 'Simulate Empty Results' : 'Simulate Scanning'}</span>
              </button>
            </div>

            {/* Global Directory Card */}
            <motion.div
              layout
              className="w-full max-w-md bg-white dark:bg-[#18181a] rounded-[2.5rem] p-8 sm:p-10 flex flex-col items-center text-center ring-1 ring-neutral-200/90 dark:ring-neutral-800 shadow-[0_16px_48px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)] relative overflow-hidden"
            >
              <div
                className="my-3 cursor-pointer group"
                onClick={() => {
                  setIsDirectorySearching(prev => !prev);
                  setIsAutoPlaying(false);
                }}
                title="Click icon to toggle empty/searching state"
              >
                <LayeredEmptyIcon isSearching={isDirectorySearching} />
              </div>

              <div className="min-h-[96px] flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isDirectorySearching ? "searching" : "empty"}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col items-center"
                  >
                    <h2 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-2">
                      {isDirectorySearching ? "Scanning global registry..." : "No active listings found"}
                    </h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-[300px]">
                      {isDirectorySearching
                        ? "Querying edge indexes across available regions. This typically takes just a moment."
                        : "We couldn't find any enterprise nodes matching your current query filters."}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="w-full mt-6 pt-5 border-t border-neutral-100 dark:border-neutral-800/80">
                <button
                  onClick={() => {
                    setIsDirectorySearching(true);
                    setTimeout(() => setIsDirectorySearching(false), 2600);
                  }}
                  disabled={isDirectorySearching}
                  className="w-full py-3 px-6 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors disabled:opacity-60 cursor-pointer disabled:cursor-default"
                >
                  {isDirectorySearching ? 'Scanning nodes...' : 'Clear filters & re-scan'}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* VIEW 3: SIDE-BY-SIDE GALLERY / DESIGN SYSTEM */}
        {viewMode === 'side-by-side' && (
          <div className="w-full mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-blue-500" />
                <span>Global Listing Component (Companion)</span>
              </h3>
              <button
                onClick={() => setIsDirectorySearching(prev => !prev)}
                className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white underline cursor-pointer"
              >
                Toggle Directory State
              </button>
            </div>
            <div className="w-full max-w-md mx-auto bg-white dark:bg-[#18181a] rounded-[2.5rem] p-6 flex flex-col items-center text-center ring-1 ring-neutral-200/90 dark:ring-neutral-800 shadow-sm">
              <LayeredEmptyIcon isSearching={isDirectorySearching} />
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                {isDirectorySearching ? 'Searching APAC directories...' : 'No files or directory listings'}
              </p>
            </div>
          </div>
        )}

      </main>

      {/* Footer Info */}
      <footer className="py-4 border-t border-neutral-200/80 dark:border-neutral-800/60 text-center text-xs text-neutral-400 dark:text-neutral-500 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 px-4">
        <span>3D Claymorphic Empty State System</span>
        <span className="hidden sm:inline">•</span>
        <span>Smooth Spring &amp; Sinusoidal Motion</span>
        <span className="hidden sm:inline">•</span>
        <span>Zero External Image Dependencies (Pure SVG &amp; CSS Math)</span>
      </footer>

    </div>
  );
}
