import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CalendarDays,
  CalendarX2,
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
  Layers,
  Code2,
  LayoutTemplate,
  ToggleLeft,
  ToggleRight,
  MousePointerClick,
} from 'lucide-react';
import { LayeredEmptyIcon } from './components/LayeredEmptyIcon';
import { LeavePlanEmptyIcon } from './components/LeavePlanEmptyIcon';
import { DualCalendarCards } from './components/CalendarEmptyBanner';

type ViewMode = 'capsule-banner' | 'leave-planner' | 'global-directory' | 'all';
type LeaveType = 'vacation' | 'remote' | 'sick' | 'personal';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('capsule-banner');
  const [isBannerEmpty, setIsBannerEmpty] = useState<boolean>(true);
  const [isLeaveEmpty, setIsLeaveEmpty] = useState<boolean>(true);
  const [isDirectorySearching, setIsDirectorySearching] = useState<boolean>(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [showBannerText, setShowBannerText] = useState<boolean>(false);
  const [leaveType, setLeaveType] = useState<LeaveType>('vacation');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // Start in clean light mode as shown in the user's screenshot
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
      setIsBannerEmpty(prev => !prev);
      setIsLeaveEmpty(prev => !prev);
      if (viewMode === 'global-directory' || viewMode === 'all') {
        setIsDirectorySearching(prev => !prev);
      }
    }, 4000);

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
    let code = '';
    if (viewMode === 'capsule-banner') {
      code = `<DualCalendarCards
  isEmpty={${isBannerEmpty}}
  showText={${showBannerText}}
  onToggle={() => setIsEmpty(prev => !prev)}
/>`;
    } else {
      code = `<LeavePlanEmptyIcon 
  isEmpty={${isLeaveEmpty}} 
  leaveType="${leaveType}" 
  daysCount={${currentDays}} 
/>`;
    }
    navigator.clipboard?.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f5f6f8] dark:bg-[#0f0f12] text-neutral-900 dark:text-neutral-100 flex flex-col font-sans transition-colors duration-300 selection:bg-neutral-800 selection:text-white">
      
      {/* Top Global Navigation Bar */}
      <header className="h-16 border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white/85 dark:bg-[#161619]/85 backdrop-blur-md sticky top-0 z-50 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between gap-3">
          
          {/* Brand & Breadcrumb */}
          <div className="flex items-center gap-2 sm:gap-3 text-sm">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-b from-neutral-100 to-neutral-200 dark:from-[#2e2e2e] dark:to-[#1e1e1e] flex items-center justify-center border border-neutral-300/80 dark:border-white/10 shadow-xs shrink-0">
              <CalendarDays className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <span className="text-neutral-900 dark:text-white font-semibold tracking-tight">Empty States</span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span className="text-neutral-500 dark:text-neutral-400 hidden sm:inline">Motion System</span>
            </div>
          </div>

          {/* Center Tabs: View Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-neutral-200/60 dark:bg-neutral-800/60 border border-neutral-300/40 dark:border-neutral-700/50 text-xs font-medium overflow-x-auto">
            {/* NEW CAPSULE BANNER (Inspired by screenshot) */}
            <button
              onClick={() => setViewMode('capsule-banner')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all shrink-0 ${
                viewMode === 'capsule-banner'
                  ? 'bg-white dark:bg-[#252528] text-neutral-900 dark:text-white shadow-xs font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <LayoutTemplate className="w-3.5 h-3.5 text-indigo-500" />
              <span>Capsule Banner</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-500/20">
                NEW
              </span>
            </button>

            {/* 3D CLAY CALENDAR */}
            <button
              onClick={() => setViewMode('leave-planner')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all shrink-0 ${
                viewMode === 'leave-planner'
                  ? 'bg-white dark:bg-[#252528] text-neutral-900 dark:text-white shadow-xs font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5 text-amber-500" />
              <span>3D Calendar</span>
            </button>

            {/* GLOBAL DIRECTORY */}
            <button
              onClick={() => setViewMode('global-directory')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all shrink-0 ${
                viewMode === 'global-directory'
                  ? 'bg-white dark:bg-[#252528] text-neutral-900 dark:text-white shadow-xs font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5 text-blue-500" />
              <span>Global Listing</span>
            </button>

            {/* ALL / SIDE-BY-SIDE */}
            <button
              onClick={() => setViewMode('all')}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all shrink-0 ${
                viewMode === 'all'
                  ? 'bg-white dark:bg-[#252528] text-neutral-900 dark:text-white shadow-xs font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-neutral-500" />
              <span>All Icons</span>
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
                  <Pause className="w-3.5 h-3.5 animate-pulse text-emerald-600 dark:text-emerald-400" />
                  <span className="hidden lg:inline">Looping</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-neutral-500" />
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

      {/* Code Snippet Drawer (Collapsible) */}
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
                {viewMode === 'capsule-banner' ? (
                  <>
                    <span className="text-pink-400">&lt;DualCalendarCards</span>{' '}
                    <span className="text-amber-300">isEmpty</span>=&#123;
                    <span className="text-cyan-300">{isBannerEmpty ? 'true' : 'false'}</span>&#125;{' '}
                    <span className="text-amber-300">showText</span>=&#123;
                    <span className="text-cyan-300">{showBannerText ? 'true' : 'false'}</span>&#125;{' '}
                    <span className="text-pink-400">/&gt;</span>
                  </>
                ) : (
                  <>
                    <span className="text-pink-400">&lt;LeavePlanEmptyIcon</span>{' '}
                    <span className="text-amber-300">isEmpty</span>=&#123;
                    <span className="text-cyan-300">{isLeaveEmpty ? 'true' : 'false'}</span>&#125;{' '}
                    <span className="text-amber-300">leaveType</span>=
                    <span className="text-emerald-300">"{leaveType}"</span>{' '}
                    <span className="text-pink-400">/&gt;</span>
                  </>
                )}
              </div>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium transition-colors border border-neutral-700 shrink-0"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied' : 'Copy JSX'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 max-w-5xl mx-auto w-full">
        
        {/* ============================================================== */}
        {/* VIEW 1: CAPSULE EMPTY BANNER (Directly Inspired by Screenshot) */}
        {/* ============================================================== */}
        {viewMode === 'capsule-banner' && (
          <div className="w-full flex flex-col items-center">
            
            {/* Interactive Settings Bar */}
            <div className="w-full max-w-2xl mb-8 flex flex-wrap items-center justify-between gap-3 bg-white/80 dark:bg-[#18181b]/80 backdrop-blur-sm p-3 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 shadow-xs">
              
              {/* Toggle Solid Pills vs Real Text */}
              <button
                onClick={() => setShowBannerText(prev => !prev)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700/80 text-xs font-medium text-neutral-700 dark:text-neutral-300 transition-colors border border-neutral-200 dark:border-neutral-700"
              >
                {showBannerText ? (
                  <ToggleRight className="w-4 h-4 text-indigo-500" />
                ) : (
                  <ToggleLeft className="w-4 h-4 text-neutral-400" />
                )}
                <span>{showBannerText ? 'Showing Readable Text' : 'Solid White Pills (Exact Screenshot UI)'}</span>
              </button>

              {/* State Manual Toggle Button */}
              <button
                onClick={() => {
                  setIsBannerEmpty(prev => !prev);
                  setIsAutoPlaying(false);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                  isBannerEmpty
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-transparent shadow-xs'
                    : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30'
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{isBannerEmpty ? 'Simulate Select Dates' : 'Simulate Empty State'}</span>
              </button>
            </div>

            {/* THE SINGLE COMPONENT CONTAINING BOTH CARDS (ONE BIG, ONE SMALL) */}
            <div className="w-full max-w-2xl flex flex-col items-center">
              <div className="w-full flex items-center justify-between text-xs font-medium text-neutral-400 dark:text-neutral-500 px-2 mb-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                  Two Cards in One Component (Distinct Widths)
                </span>
                <span className="text-[11px] flex items-center gap-1 text-neutral-400">
                  <MousePointerClick className="w-3 h-3" /> Click cards to trigger 3D transition
                </span>
              </div>

              {/* Single Component containing both cards */}
              <DualCalendarCards
                isEmpty={isBannerEmpty}
                showText={showBannerText}
                onToggle={() => {
                  setIsBannerEmpty(prev => !prev);
                  setIsAutoPlaying(false);
                }}
              />
            </div>

            {/* Design Spec & Feature Notes */}
            <div className="w-full max-w-2xl mt-10 p-5 rounded-2xl bg-white/60 dark:bg-[#161619]/60 border border-neutral-200/80 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 flex flex-col gap-2.5">
              <div className="font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Enhanced Design Specs matching Screenshot Requirements:</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>Different Widths:</strong> Big card spans full width (`620px`) while small card is compact (`460px`).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>Clean Solid White Pills:</strong> Removed all skeleton loading effects for clean architectural bars.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>3D Calendar Smooth Transition:</strong> Continuous sinusoidal float, multi-body badge float, and ground shadow.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>Morphing Action Badge:</strong> Smooth spring rotation between Plus (+) and Confirmation Checkmark (✓).</span>
                </li>
              </ul>
            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 2: 3D CLAY CALENDAR LEAVE PLANNER */}
        {/* ============================================================== */}
        {viewMode === 'leave-planner' && (
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
                  className={`w-full py-3 px-6 rounded-2xl text-sm font-semibold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer ${
                    isLeaveEmpty
                      ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100'
                      : 'bg-neutral-100 dark:bg-[#252528] text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-[#2e2e32] border border-neutral-200 dark:border-neutral-700'
                  }`}
                >
                  {isLeaveEmpty ? (
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-amber-400" />
                      <span>Select Leave Dates (Oct 18 – 22)</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CalendarX2 className="w-4 h-4 text-rose-500" />
                      <span>Clear Selected Dates</span>
                    </div>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 3: GLOBAL DIRECTORY LISTING */}
        {/* ============================================================== */}
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

        {/* ============================================================== */}
        {/* VIEW 4: ALL COMPONENTS COMPARISON */}
        {/* ============================================================== */}
        {viewMode === 'all' && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* Item 1: Capsule Banner */}
            <div className="bg-white dark:bg-[#18181a] p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Capsule Empty Banner (Screenshot Match)
                </span>
                <button
                  onClick={() => setIsBannerEmpty(prev => !prev)}
                  className="text-xs text-indigo-500 hover:underline"
                >
                  Toggle State
                </button>
              </div>
              <DualCalendarCards
                isEmpty={isBannerEmpty}
                showText={false}
                onToggle={() => setIsBannerEmpty(prev => !prev)}
              />
            </div>

            {/* Item 2: 3D Volumetric Calendar */}
            <div className="bg-white dark:bg-[#18181a] p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 flex flex-col items-center text-center gap-4">
              <div className="w-full flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  3D Clay Calendar Pad
                </span>
                <button
                  onClick={() => setIsLeaveEmpty(prev => !prev)}
                  className="text-xs text-amber-500 hover:underline"
                >
                  Toggle State
                </button>
              </div>
              <LeavePlanEmptyIcon
                isEmpty={isLeaveEmpty}
                leaveType={leaveType}
                daysCount={5}
              />
            </div>

          </div>
        )}

      </main>

      {/* Footer Info */}
      <footer className="py-4 border-t border-neutral-200/80 dark:border-neutral-800/60 text-center text-xs text-neutral-400 dark:text-neutral-500 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 px-4">
        <span>Pure SVG &amp; CSS Math (No External Assets)</span>
        <span className="hidden sm:inline">•</span>
        <span>Fluid Motion Physics</span>
        <span className="hidden sm:inline">•</span>
        <span>Light &amp; Dark Theme Ready</span>
      </footer>

    </div>
  );
}
