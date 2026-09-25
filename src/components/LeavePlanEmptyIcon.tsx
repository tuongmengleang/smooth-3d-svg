import { motion, AnimatePresence } from 'motion/react';

interface LeavePlanEmptyIconProps {
  isEmpty: boolean;
  leaveType?: 'vacation' | 'remote' | 'sick' | 'personal';
  daysCount?: number;
  className?: string;
}

export function LeavePlanEmptyIcon({
  isEmpty,
  leaveType = 'vacation',
  daysCount = 5,
  className = '',
}: LeavePlanEmptyIconProps) {
  // Calendar day cells representation (3 rows x 5 columns = 15 day matrix)
  // Selected range covers indices 6, 7, 8, 9, 10
  const totalDays = 15;
  const selectedIndices = [6, 7, 8, 9, 10];

  // Accent colors based on leave type
  const typeConfig = {
    vacation: {
      label: 'Annual Leave',
      accentBg: 'from-amber-400/90 to-orange-500/90 dark:from-amber-500 dark:to-orange-600',
      pillBg: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
      glow: 'rgba(245, 158, 11, 0.25)',
      icon: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ),
    },
    remote: {
      label: 'Remote Work',
      accentBg: 'from-cyan-400/90 to-blue-500/90 dark:from-cyan-500 dark:to-blue-600',
      pillBg: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
      glow: 'rgba(6, 182, 212, 0.25)',
      icon: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    sick: {
      label: 'Sick Leave',
      accentBg: 'from-rose-400/90 to-red-500/90 dark:from-rose-500 dark:to-red-600',
      pillBg: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30',
      glow: 'rgba(244, 63, 94, 0.25)',
      icon: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      ),
    },
    personal: {
      label: 'Personal Time',
      accentBg: 'from-violet-400/90 to-purple-500/90 dark:from-violet-500 dark:to-purple-600',
      pillBg: 'bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/30',
      glow: 'rgba(139, 92, 246, 0.25)',
      icon: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
  }[leaveType];

  return (
    <div className={`relative w-64 h-64 flex items-center justify-center select-none ${className}`}>
      {/* Dynamic Ground Ambient Shadow */}
      <motion.div
        className="absolute bottom-5 w-48 h-9 bg-black/10 dark:bg-black/50 rounded-[100%] blur-xl"
        animate={{
          scale: isEmpty ? [0.92, 1.02, 0.92] : [0.96, 1.06, 0.96],
          opacity: isEmpty ? [0.4, 0.55, 0.4] : [0.5, 0.7, 0.5],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Main 3D Floating Calendar Assemblage */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        animate={{
          y: isEmpty ? [-3, 4, -3] : [-4, 3, -4],
          rotate: isEmpty ? [-0.5, 0.8, -0.5] : [-0.8, 0.5, -0.8],
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Back Stand / Base Block giving volumetric 3D clay depth */}
        <div className="absolute -bottom-2 w-[164px] h-[142px] bg-neutral-300 dark:bg-[#1f1f1f] rounded-2xl shadow-inner border-t border-neutral-400/40 dark:border-[#2f2f2f]" />

        {/* Binder Top Rings (Two volumetric rounded clips holding the calendar pad) */}
        <div className="absolute -top-3 w-[124px] flex justify-between px-3 z-30 pointer-events-none">
          {/* Left Binder Ring */}
          <div className="w-4 h-7 rounded-full bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-300 dark:from-[#2e2e2e] dark:via-[#4e4e4e] dark:to-[#222222] shadow-[0_3px_5px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.6)] border border-neutral-400/50 dark:border-[#555]" />
          {/* Right Binder Ring */}
          <div className="w-4 h-7 rounded-full bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-300 dark:from-[#2e2e2e] dark:via-[#4e4e4e] dark:to-[#222222] shadow-[0_3px_5px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.6)] border border-neutral-400/50 dark:border-[#555]" />
        </div>

        {/* Calendar Main Ceramic/Clay Slab */}
        <div className="relative w-[156px] h-[138px] bg-gradient-to-b from-neutral-50 via-white to-neutral-100 dark:from-[#363636] dark:via-[#2d2d2d] dark:to-[#242424] rounded-2xl shadow-[0_20px_35px_rgba(0,0,0,0.12),inset_0_1.5px_2px_rgba(255,255,255,0.8)] dark:shadow-[0_22px_45px_rgba(0,0,0,0.65),inset_0_1.5px_2px_rgba(255,255,255,0.15)] border-t border-white/80 dark:border-white/15 overflow-hidden flex flex-col pt-2.5 px-3">
          
          {/* Header Strip with Month Accent & Binder Holes */}
          <div className="w-full flex items-center justify-between pb-2 border-b border-neutral-200/80 dark:border-neutral-700/60">
            {/* Binder Hole Inset 1 */}
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-[#1a1a1a] shadow-inner ml-2" />

            {/* Calendar Month / Header Pill */}
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-neutral-150 bg-neutral-200/50 dark:bg-[#1c1c1c]/80 border border-neutral-300/40 dark:border-[#383838]">
              <span className="text-[9px] font-semibold tracking-wider uppercase text-neutral-600 dark:text-neutral-300">
                OCTOBER
              </span>
            </div>

            {/* Binder Hole Inset 2 */}
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-[#1a1a1a] shadow-inner mr-2" />
          </div>

          {/* Weekday Micro-Dots (M T W T F) */}
          <div className="grid grid-cols-5 gap-1.5 pt-2 pb-1 text-center">
            {['M', 'T', 'W', 'T', 'F'].map((day, idx) => (
              <span
                key={idx}
                className="text-[8px] font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-tighter"
              >
                {day}
              </span>
            ))}
          </div>

          {/* Calendar 15-Day Grid Area */}
          <div className="relative grid grid-cols-5 gap-1.5 pt-0.5 flex-1">
            {Array.from({ length: totalDays }).map((_, i) => {
              const isSelectedDay = selectedIndices.includes(i);
              const isStart = i === selectedIndices[0];
              const isEnd = i === selectedIndices[selectedIndices.length - 1];

              return (
                <div key={i} className="relative h-4 flex items-center justify-center">
                  {/* Subtle Base Cell Indent */}
                  <div
                    className={`w-4 h-4 rounded-md flex items-center justify-center transition-colors duration-300 ${
                      isEmpty
                        ? 'bg-neutral-200/40 dark:bg-[#1e1e1e]/60'
                        : isSelectedDay
                        ? 'bg-transparent'
                        : 'bg-neutral-200/30 dark:bg-[#1e1e1e]/40'
                    }`}
                  >
                    {/* Ghost dot in empty state */}
                    {isEmpty ? (
                      <div className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                    ) : (
                      <span
                        className={`text-[8px] font-medium ${
                          isSelectedDay
                            ? 'text-white font-bold z-10'
                            : 'text-neutral-400 dark:text-neutral-600'
                        }`}
                      >
                        {i + 12}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* CONNECTED LEAVE RANGE BAR (When dates are selected) */}
            <AnimatePresence>
              {!isEmpty && (
                <motion.div
                  initial={{ scaleX: 0, opacity: 0, x: -10 }}
                  animate={{ scaleX: 1, opacity: 1, x: 0 }}
                  exit={{
                    scaleX: 0.1,
                    opacity: 0,
                    y: 8,
                    transition: { duration: 0.4, ease: 'easeIn' },
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 24,
                    delay: 0.1,
                  }}
                  className={`absolute top-[23px] left-0 right-0 h-4 rounded-full bg-gradient-to-r ${typeConfig.accentBg} shadow-[0_4px_12px_rgba(0,0,0,0.25)] flex items-center justify-between px-1 pointer-events-none z-0 origin-left`}
                  style={{
                    boxShadow: `0 3px 10px ${typeConfig.glow}, inset 0 1px 1px rgba(255,255,255,0.5)`,
                  }}
                >
                  {/* Start Pin dot */}
                  <motion.div
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="w-1.5 h-1.5 rounded-full bg-white shadow-sm"
                  />

                  {/* End Pin dot */}
                  <motion.div
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', delay: 0.5 }}
                    className="w-1.5 h-1.5 rounded-full bg-white shadow-sm"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* EMPTY STATE: Dotted Placeholder Range (Inviting Date Selection) */}
            <AnimatePresence>
              {isEmpty && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: [0.65, 1, 0.65],
                    scale: 1,
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    opacity: { repeat: Infinity, duration: 2.4, ease: 'easeInOut' },
                    scale: { duration: 0.3 },
                  }}
                  className="absolute top-[23px] left-0.5 right-0.5 h-4 rounded-full border-2 border-dashed border-neutral-300 dark:border-neutral-600/70 flex items-center justify-center pointer-events-none"
                >
                  <span className="text-[7.5px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                    Select Dates
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Floating Mini Date Chip / Leave Days Tag */}
        <AnimatePresence>
          {!isEmpty && (
            <motion.div
              initial={{ y: -15, opacity: 0, scale: 0.6 }}
              animate={{
                y: [-2, 2, -2],
                opacity: 1,
                scale: 1,
              }}
              exit={{
                y: -10,
                opacity: 0,
                scale: 0.6,
                transition: { duration: 0.25 },
              }}
              transition={{
                y: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
                opacity: { duration: 0.3 },
                scale: { type: 'spring', stiffness: 400, damping: 20 },
              }}
              className="absolute -top-7 -right-2 z-40"
            >
              <div
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold shadow-[0_8px_16px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.6)] backdrop-blur-sm border ${typeConfig.pillBg} bg-white/95 dark:bg-[#2a2a2a]/95`}
              >
                {typeConfig.icon}
                <span>{daysCount} Days</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State: Floating "No Dates" Subtle Indicator */}
        <AnimatePresence>
          {isEmpty && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{
                opacity: [0.6, 0.95, 0.6],
                y: [-1, 2, -1],
              }}
              exit={{ opacity: 0, y: -5, transition: { duration: 0.2 } }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: 'easeInOut',
              }}
              className="absolute -top-7 z-20 pointer-events-none"
            >
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-200/80 dark:bg-[#252525]/90 border border-neutral-300 dark:border-neutral-700/80 text-[9px] font-medium text-neutral-500 dark:text-neutral-400 shadow-sm backdrop-blur-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-pulse" />
                <span>No leave dates</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 3D Floating Action Badge (Bottom Right) */}
      {/* Matches the clay badge style with continuous floating, flipping smoothly between + and check/calendar */}
      <motion.div
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        className="absolute bottom-5 right-6 w-13 h-13 rounded-full bg-gradient-to-b from-white to-neutral-100 dark:from-[#3a3a3a] dark:to-[#2c2c2c] shadow-[0_12px_24px_rgba(0,0,0,0.16),inset_0_2px_3px_rgba(255,255,255,0.9)] dark:shadow-[0_14px_28px_rgba(0,0,0,0.6),inset_0_2px_3px_rgba(255,255,255,0.18)] border border-neutral-200 dark:border-[#4f4f4f] flex items-center justify-center z-30"
      >
        <AnimatePresence mode="wait">
          {isEmpty ? (
            /* PLUS (+) Icon: Prompts user to pick/add leave dates */
            <motion.div
              key="add-dates"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ type: 'spring', stiffness: 450, damping: 25 }}
              className="flex items-center justify-center"
            >
              <svg
                className="w-6 h-6 text-neutral-700 dark:text-neutral-100"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </motion.div>
          ) : (
            /* CONFIRMED / SCHEDULED Checkmark with subtle bounce */
            <motion.div
              key="dates-selected"
              initial={{ scale: 0, rotate: 90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -90 }}
              transition={{ type: 'spring', stiffness: 450, damping: 25 }}
              className="flex items-center justify-center"
            >
              <svg
                className="w-6 h-6 text-emerald-600 dark:text-emerald-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
