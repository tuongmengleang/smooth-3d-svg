import { motion, AnimatePresence } from 'motion/react';

const fileVariants = {
    searching: (i: number) => ({
        y: [5, -15 - (i * 4), 5],
        opacity: 1,
        transition: { repeat: Infinity, duration: 3, delay: i * 0.15, ease: "easeInOut" }
    }),
    empty: {
        y: 100,
        opacity: 0,
        transition: { duration: 0.6, ease: "anticipate" }
    }
};

export function LayeredEmptyIcon({ isSearching }: { isSearching: boolean }) {
    return (
        <div className="relative w-56 h-56 flex items-center justify-center">
            {/* Global Ground Shadow */}
            <motion.div
                className="absolute bottom-6 w-44 h-10 bg-black/10 dark:bg-black/40 rounded-[100%] blur-xl"
                animate={{ scale: isSearching ? [0.95, 1.05, 0.95] : [0.9, 1, 0.9] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Drawer Back Panel */}
            <div className="absolute bottom-16 w-[130px] h-[75px] bg-neutral-300 dark:bg-[#1c1c1c] rounded-t-xl border-t border-neutral-400 dark:border-[#2a2a2a] shadow-inner" />

            {/* File Stack Container (overflow to hide files when they drop, clipped at bottom) */}
            <div className="absolute bottom-16 w-[130px] h-[120px] flex justify-center items-end" style={{ clipPath: 'inset(-50px -50px 0 -50px)' }}>
                <AnimatePresence>
                    {isSearching && (
                        <>
                            {/* File 3 (Back) */}
                            <motion.div custom={2} variants={fileVariants} initial="empty" animate="searching" exit="empty" className="absolute bottom-0 w-[100px] h-[60px] bg-neutral-400 dark:bg-[#3c3c3c] rounded-b-md rounded-tr-md shadow-md border-t border-white/20" style={{ zIndex: 1 }}>
                                <div className="absolute bottom-full left-0 w-12 h-4 bg-neutral-400 dark:bg-[#3c3c3c] rounded-t-md border-t border-white/20" />
                            </motion.div>

                            {/* File 2 (Middle) */}
                            <motion.div custom={1} variants={fileVariants} initial="empty" animate="searching" exit="empty" className="absolute bottom-0 w-[110px] h-[65px] bg-neutral-200 dark:bg-[#4a4a4a] rounded-b-md rounded-t-md shadow-md border-t border-white/40" style={{ zIndex: 2 }}>
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-14 h-4 bg-neutral-200 dark:bg-[#4a4a4a] rounded-t-md border-t border-white/40" />
                            </motion.div>

                            {/* File 1 (Front) */}
                            <motion.div custom={0} variants={fileVariants} initial="empty" animate="searching" exit="empty" className="absolute bottom-0 w-[120px] h-[70px] bg-white dark:bg-[#5a5a5a] rounded-b-md rounded-tl-md shadow-lg border-t border-white/70 dark:border-white/20 flex flex-col items-center pt-4" style={{ zIndex: 3 }}>
                                <div className="absolute bottom-full right-0 w-16 h-4 bg-white dark:bg-[#5a5a5a] rounded-t-md border-t border-white/70 dark:border-white/20" />
                                <div className="w-16 h-1.5 rounded-full bg-neutral-200 dark:bg-[#3a3a3a] opacity-80 mb-2" />
                                <div className="w-12 h-1.5 rounded-full bg-neutral-200 dark:bg-[#3a3a3a] opacity-80" />
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>

            {/* Drawer Front Panel */}
            <motion.div
                animate={{ y: [-1, 1, -1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 w-[150px] h-[70px] bg-gradient-to-b from-neutral-100 to-neutral-200 dark:from-[#3a3a3a] dark:to-[#2e2e2e] rounded-xl shadow-[0_15px_25px_rgba(0,0,0,0.15),inset_0_2px_3px_rgba(255,255,255,0.6)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.6),inset_0_2px_3px_rgba(255,255,255,0.05)] border-t border-white/80 dark:border-white/10 flex flex-col items-center justify-start pt-4 z-10"
            >
                {/* Horizontal pill indent like the image */}
                <div className="w-14 h-2 bg-neutral-300/80 dark:bg-[#1a1a1a] rounded-full shadow-inner" />
            </motion.div>

            {/* Badge */}
            <motion.div
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                className="absolute bottom-4 right-8 w-14 h-14 bg-gradient-to-b from-white to-neutral-50 dark:from-[#888] dark:to-[#777] rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(255,255,255,0.8)] dark:shadow-[0_12px_24px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.2)] border border-neutral-200 dark:border-[#999] flex items-center justify-center z-20"
            >
                <AnimatePresence mode="wait">
                    {isSearching ? (
                        <motion.div
                            key="search"
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 90 }}
                            transition={{ duration: 0.3 }}
                        >
                            <svg className="w-6 h-6 text-neutral-600 dark:text-[#1c1c1c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="add"
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 90 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Matching the Plus sign from the provided design */}
                            <svg className="w-7 h-7 text-neutral-700 dark:text-[#1c1c1c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
