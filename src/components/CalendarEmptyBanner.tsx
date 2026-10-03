import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Check } from 'lucide-react';

interface CalendarCardProps {
  size: 'big' | 'small' | 'lg' | 'sm';
  isEmpty?: boolean;
  state?: 'empty' | 'selected';
  showText?: boolean;
  onToggle?: () => void;
  onAction?: () => void;
  className?: string;
}

/**
 * Individual Single Card representation (used inside DualCalendarCards)
 */
export function CalendarCard({
  size,
  isEmpty: propIsEmpty,
  state,
  showText = false,
  onToggle,
  onAction,
  className = '',
}: CalendarCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isBig = size === 'big' || size === 'lg';
  const isEmpty = propIsEmpty !== undefined ? propIsEmpty : state === 'empty';
  const handleAction = onToggle || onAction;

  return (
    <motion.div
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleAction}
      className={`relative select-none cursor-pointer overflow-hidden transition-all duration-300 ${
        isBig
          ? 'w-full max-w-[620px] h-36 sm:h-44 rounded-[2.75rem] sm:rounded-[3.25rem] px-6 sm:px-8 py-5 sm:py-6 gap-6 sm:gap-8'
          : 'w-[78%] sm:w-[460px] max-w-[460px] h-24 sm:h-28 rounded-[1.75rem] sm:rounded-[2.25rem] px-4 sm:px-6 py-3.5 sm:py-4 gap-4 sm:gap-6'
      } bg-[#eceef0] dark:bg-[#1a1c20] border border-neutral-300/30 dark:border-neutral-800/80 shadow-[0_6px_24px_rgba(0,0,0,0.02)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center ${className}`}
      animate={{
        y: isHovered ? -3 : 0,
        boxShadow: isHovered
          ? '0 14px 34px rgba(0,0,0,0.06)'
          : '0 6px 24px rgba(0,0,0,0.02)',
      }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
    >
      {/* Soft Clay Inset Highlight */}
      <div className="absolute inset-0 rounded-[inherit] pointer-events-none border-t border-white/80 dark:border-white/10 shadow-[inset_0_2px_4px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_2px_4px_rgba(255,255,255,0.04)]" />

      {/* LEFT: Elevated White Circular Disc */}
      <motion.div
        layout
        className={`relative shrink-0 rounded-full bg-white dark:bg-[#25282e] shadow-[0_8px_20px_rgba(0,0,0,0.06),inset_0_2px_3px_rgba(255,255,255,0.95)] dark:shadow-[0_10px_25px_rgba(0,0,0,0.45),inset_0_1.5px_2px_rgba(255,255,255,0.08)] border border-neutral-200/60 dark:border-neutral-700/50 flex items-center justify-center ${
          isBig ? 'w-20 h-20 sm:w-24 sm:h-24' : 'w-13 h-13 sm:w-16 sm:h-16'
        }`}
        animate={{
          y: isEmpty ? [-2.5, 2.5, -2.5] : [-3, 3, -3],
          scale: isHovered ? 1.04 : 1,
        }}
        transition={{
          y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
          scale: { type: 'spring', stiffness: 300, damping: 20 },
        }}
      >
        {/* Dynamic Soft Shadow underneath the icon inside the circle */}
        <motion.div
          className="absolute bottom-2 w-10 sm:w-14 h-3 bg-black/10 dark:bg-black/40 rounded-full blur-xs pointer-events-none"
          animate={{
            scale: [0.9, 1.08, 0.9],
            opacity: [0.35, 0.5, 0.35],
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* 3D FLOATING CALENDAR ICON (Faithful to the screenshot UI) */}
        <motion.div
          className={`relative z-10 ${
            isBig ? 'w-11 h-11 sm:w-14 sm:h-14' : 'w-7 h-7 sm:w-9 sm:h-9'
          }`}
          animate={{
            rotate: isEmpty ? [-1, 1, -1] : [-1.5, 1.5, -1.5],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-[#6b7280] dark:text-[#9ca3af] transition-colors duration-300 drop-shadow-[0_2px_3px_rgba(0,0,0,0.05)]"
          >
            {/* Top Left Binder Loop */}
            <rect
              x="17"
              y="3"
              width="4.5"
              height="8"
              rx="2.25"
              fill="currentColor"
            />
            {/* Top Right Binder Loop */}
            <rect
              x="34.5"
              y="3"
              width="4.5"
              height="8"
              rx="2.25"
              fill="currentColor"
            />

            {/* Calendar Header Bar with soft rounded top */}
            <path
              d="M10 14C10 11.2386 12.2386 9 15 9H41C43.7614 9 46 11.2386 46 14V17.5H10V14Z"
              fill="currentColor"
            />

            {/* Gap/Cut Line (Pure white in light mode, dark in dark mode) */}
            <rect
              x="10"
              y="17.5"
              width="36"
              height="2"
              fill="#ffffff"
              className="dark:fill-[#25282e]"
            />

            {/* Calendar Main Body with rounded bottom */}
            <path
              d="M10 19.5H46V41C46 44.3137 43.3137 47 40 47H16C12.6863 47 10 44.3137 10 41V19.5Z"
              fill="currentColor"
            />

            {/* 5 Distinct Calendar Grid Dots (Faithfully matching screenshot) */}
            {/* Row 1: 3 Dots */}
            <motion.circle
              cx="19"
              cy="27"
              r="2.2"
              fill="#ffffff"
              className="dark:fill-[#25282e]"
              animate={{
                scale: !isEmpty ? [1, 1.35, 1] : 1,
                fill: !isEmpty ? '#10b981' : '#ffffff',
              }}
              transition={{ repeat: Infinity, duration: 2.2, delay: 0 }}
            />
            <motion.circle
              cx="28"
              cy="27"
              r="2.2"
              fill="#ffffff"
              className="dark:fill-[#25282e]"
              animate={{
                scale: !isEmpty ? [1, 1.35, 1] : 1,
                fill: !isEmpty ? '#10b981' : '#ffffff',
              }}
              transition={{ repeat: Infinity, duration: 2.2, delay: 0.2 }}
            />
            <motion.circle
              cx="37"
              cy="27"
              r="2.2"
              fill="#ffffff"
              className="dark:fill-[#25282e]"
              animate={{
                scale: !isEmpty ? [1, 1.35, 1] : 1,
                fill: !isEmpty ? '#10b981' : '#ffffff',
              }}
              transition={{ repeat: Infinity, duration: 2.2, delay: 0.4 }}
            />

            {/* Row 2: 2 Dots */}
            <motion.circle
              cx="19"
              cy="36"
              r="2.2"
              fill="#ffffff"
              className="dark:fill-[#25282e]"
              animate={{
                scale: !isEmpty ? [1, 1.35, 1] : 1,
                fill: !isEmpty ? '#10b981' : '#ffffff',
              }}
              transition={{ repeat: Infinity, duration: 2.2, delay: 0.6 }}
            />
            <motion.circle
              cx="28"
              cy="36"
              r="2.2"
              fill="#ffffff"
              className="dark:fill-[#25282e]"
              animate={{
                scale: !isEmpty ? [1, 1.35, 1] : 1,
                fill: !isEmpty ? '#10b981' : '#ffffff',
              }}
              transition={{ repeat: Infinity, duration: 2.2, delay: 0.8 }}
            />
          </svg>

          {/* Connected Leave Date Ribbon (Appears when dates selected) */}
          <AnimatePresence>
            {!isEmpty && (
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                exit={{ scaleX: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 350, damping: 24 }}
                className="absolute top-[47%] left-[30%] right-[30%] h-[3px] bg-emerald-400 dark:bg-emerald-300 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)] origin-left pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* Overlapping Action Badge with Multi-Body 3D Floating Physics */}
          <motion.div
            className={`absolute -bottom-1 -right-1 rounded-full flex items-center justify-center border-2 border-white dark:border-[#25282e] shadow-[0_4px_10px_rgba(0,0,0,0.18),inset_0_1px_1.5px_rgba(255,255,255,0.6)] ${
              isBig
                ? 'w-6 h-6 sm:w-7 sm:h-7'
                : 'w-4.5 h-4.5 sm:w-5 sm:h-5'
            } ${
              isEmpty
                ? 'bg-[#6b7280] dark:bg-[#858d9a] text-white'
                : 'bg-emerald-500 text-white shadow-[0_4px_12px_rgba(16,185,129,0.4)]'
            }`}
            animate={{
              y: [-1.5, 1.5, -1.5],
              rotate: !isEmpty ? 360 : isHovered ? 90 : 0,
              scale: isHovered ? 1.12 : 1,
            }}
            transition={{
              y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.25 },
              rotate: { type: 'spring', stiffness: 380, damping: 22 },
              scale: { type: 'spring', stiffness: 400, damping: 20 },
            }}
          >
            <AnimatePresence mode="wait">
              {isEmpty ? (
                <motion.div
                  key="plus"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Plus
                    className={
                      isBig
                        ? 'w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]'
                        : 'w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]'
                    }
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="check"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Check
                    className={
                      isBig
                        ? 'w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3.5]'
                        : 'w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3.5]'
                    }
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* RIGHT: Pure White Solid Pills (NO SKELETON LOADING EFFECT) */}
      <div className="flex-1 flex flex-col justify-center min-w-0 pr-2">
        <AnimatePresence mode="wait">
          {!showText ? (
            /* SOLID PURE WHITE BARS (Exact matching representation from UI screenshot) */
            <motion.div
              key="solid-pills"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`flex flex-col ${
                isBig ? 'gap-3.5 sm:gap-4' : 'gap-2 sm:gap-2.5'
              } w-full`}
            >
              {/* Top Bar: Shorter white pill */}
              <motion.div
                className={`rounded-full bg-white dark:bg-[#25282e] shadow-xs ${
                  isBig
                    ? 'h-6 sm:h-7 w-36 sm:w-48'
                    : 'h-4 sm:h-4.5 w-24 sm:w-32'
                }`}
                animate={{
                  scale: isHovered ? 1.015 : 1,
                  x: isHovered ? 2 : 0,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              />

              {/* Bottom Bar: Longer white pill */}
              <motion.div
                className={`rounded-full bg-white dark:bg-[#25282e] shadow-xs ${
                  isBig
                    ? 'h-6 sm:h-7 w-64 sm:w-80 max-w-[85%]'
                    : 'h-4 sm:h-4.5 w-44 sm:w-56 max-w-[85%]'
                }`}
                animate={{
                  scale: isHovered ? 1.01 : 1,
                  x: isHovered ? 2 : 0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 25,
                  delay: 0.04,
                }}
              />
            </motion.div>
          ) : (
            /* OPTIONAL READABLE TEXT VIEW */
            <motion.div
              key="readable-text"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              className="flex flex-col"
            >
              <h4
                className={`font-semibold tracking-tight text-neutral-800 dark:text-neutral-100 truncate ${
                  isBig ? 'text-base sm:text-lg' : 'text-xs sm:text-sm'
                }`}
              >
                {isEmpty
                  ? 'No leave dates selected'
                  : 'Oct 18 – 22 (5 Days Planned)'}
              </h4>
              <p
                className={`text-neutral-500 dark:text-neutral-400 leading-snug line-clamp-1 mt-0.5 ${
                  isBig ? 'text-xs sm:text-sm' : 'text-[11px]'
                }`}
              >
                {isEmpty
                  ? 'Select dates on your calendar to schedule time off'
                  : 'Annual PTO approved • 11 days remaining'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export interface DualCalendarCardsProps {
  isEmpty?: boolean;
  state?: 'empty' | 'selected';
  showText?: boolean;
  onToggle?: () => void;
  onAction?: () => void;
  className?: string;
}

/**
 * PRIMARY COMPONENT: Combines the TWO CARDS (One Big, One Small) in a single component!
 * Exactly matches the layout and design from the user's screenshot.
 */
export function DualCalendarCards({
  isEmpty: propIsEmpty,
  state,
  showText = false,
  onToggle,
  onAction,
  className = '',
}: DualCalendarCardsProps) {
  const isEmpty = propIsEmpty !== undefined ? propIsEmpty : state === 'empty';
  const handleToggle = onToggle || onAction;

  return (
    <div className={`w-full max-w-2xl flex flex-col items-center gap-5 sm:gap-7 ${className}`}>
      {/* 1. Big Card (Top - Wider) */}
      <CalendarCard
        size="big"
        isEmpty={isEmpty}
        showText={showText}
        onToggle={handleToggle}
      />

      {/* 2. Small Card (Bottom) */}
      <CalendarCard
        size="small"
        isEmpty={isEmpty}
        showText={showText}
        onToggle={handleToggle}
      />
    </div>
  );
}

// Single component export aliases for drop-in usage
export const CalendarEmptyBanner = DualCalendarCards;
export default DualCalendarCards;
