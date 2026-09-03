import React from 'react';
import { motion } from 'framer-motion';

export const NexoraLogo = ({ className = "w-16 h-16", animate = false }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="nexora-gold" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D6A85F" />
        <stop offset="0.5" stopColor="#F0C982" />
        <stop offset="1" stopColor="#D6A85F" />
      </linearGradient>
    </defs>
    {animate ? (
      <>
        {/* Left vertical stroke */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: 0 }}
          d="M 22 78 L 22 22"
          stroke="url(#nexora-gold)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Diagonal stroke */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: 0.4 }}
          d="M 22 22 L 78 78"
          stroke="url(#nexora-gold)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Right vertical stroke */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: 0.8 }}
          d="M 78 78 L 78 22"
          stroke="url(#nexora-gold)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Connection nodes */}
        {[[22,22],[22,78],[78,22],[78,78],[50,50]].map(([cx,cy], i) => (
          <motion.circle
            key={i}
            cx={cx} cy={cy} r="3"
            fill="#F0C982"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.2 + i * 0.08 }}
          />
        ))}
      </>
    ) : (
      <>
        <path d="M 22 78 L 22 22 L 78 78 L 78 22" stroke="url(#nexora-gold)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {[[22,22],[22,78],[78,22],[78,78],[50,50]].map(([cx,cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3" fill="#F0C982" />
        ))}
      </>
    )}
  </svg>
);

export const CinematicIntro = ({ onComplete }) => {
  const [phase, setPhase] = React.useState(0);

  React.useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),    // Particles emerge
      setTimeout(() => setPhase(2), 800),     // N logo constructs
      setTimeout(() => setPhase(3), 2800),    // Light pulse
      setTimeout(() => setPhase(4), 3300),    // NEXORA wordmark
      setTimeout(() => setPhase(5), 4300),    // Tagline
      setTimeout(() => setPhase(6), 5300),    // Network expands
      setTimeout(() => setPhase(7), 6500),    // Compress & transition
      setTimeout(() => onComplete(), 7200),   // Done
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      animate={{ opacity: phase >= 7 ? 0 : 1 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#050608' }}
    >
      {/* Ambient particles */}
      {phase >= 1 && (
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: `${50 + (Math.random() - 0.5) * 80}%`,
                y: `${50 + (Math.random() - 0.5) * 80}%`,
                opacity: 0,
                scale: 0,
              }}
              animate={{
                x: `${50 + (Math.random() - 0.5) * 30}%`,
                y: `${50 + (Math.random() - 0.5) * 30}%`,
                opacity: [0, 0.4, 0.1],
                scale: 1,
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: 'easeOut',
              }}
              className="absolute rounded-full"
              style={{
                width: 2 + Math.random() * 3,
                height: 2 + Math.random() * 3,
                backgroundColor: i % 3 === 0 ? '#D6A85F' : i % 3 === 1 ? '#F0C982' : '#64748B',
              }}
            />
          ))}

          {/* Connecting lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            {[
              'M 30% 40% L 50% 50% L 70% 40%',
              'M 40% 60% L 50% 50% L 60% 60%',
              'M 35% 30% L 50% 50% L 65% 70%',
            ].map((d, i) => (
              <motion.path
                key={i}
                d={d}
                fill="none"
                stroke="#D6A85F"
                strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 1.5, delay: 0.3 + i * 0.2 }}
              />
            ))}
          </svg>
        </div>
      )}

      {/* Warehouse network expansion */}
      {phase >= 6 && (
        <motion.div
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{
            scale: phase >= 7 ? 3 : 1.2,
            opacity: phase >= 7 ? 0 : 0.25,
          }}
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {[
            { name: 'Hyderabad', x: '35%', y: '35%' },
            { name: 'Bangalore', x: '40%', y: '60%' },
            { name: 'Chennai', x: '60%', y: '55%' },
            { name: 'Mumbai', x: '25%', y: '45%' },
            { name: 'Delhi', x: '55%', y: '25%' },
          ].map((city, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              className="absolute flex flex-col items-center gap-1"
              style={{ left: city.x, top: city.y }}
            >
              <div className="w-2 h-2 rounded-full bg-[#D6A85F] shadow-[0_0_12px_rgba(214,168,95,0.5)]" />
              <span className="text-[8px] font-bold tracking-[0.2em] uppercase" style={{ color: '#A6A9AF' }}>
                {city.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Central content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* N Logo */}
        {phase >= 2 && (
          <motion.div
            animate={{
              scale: phase === 3 ? 1.08 : phase >= 7 ? 0.6 : 1,
              filter: phase === 3 ? 'brightness(1.4) drop-shadow(0 0 30px rgba(214,168,95,0.4))' : 'brightness(1)',
            }}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
          >
            <NexoraLogo className="w-20 h-20 md:w-24 md:h-24" animate={true} />
          </motion.div>
        )}

        {/* Wordmark */}
        {phase >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: phase >= 7 ? 0 : 1, y: phase >= 7 ? -50 : 0 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="mt-8 flex flex-col items-center"
          >
            <div className="flex overflow-hidden">
              {'NEXORA'.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: [0.33, 1, 0.68, 1] }}
                  className="text-3xl md:text-4xl font-display tracking-[0.2em]"
                  style={{ color: '#F5F3EE' }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Tagline */}
            {phase >= 5 && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.5, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-4 text-[10px] md:text-xs tracking-[0.35em] uppercase"
                style={{ color: '#A6A9AF' }}
              >
                Intelligent Inventory Platform
              </motion.p>
            )}
          </motion.div>
        )}
      </div>

      {/* Skip button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2 }}
        onClick={onComplete}
        className="absolute bottom-8 right-8 text-[10px] tracking-[0.2em] uppercase hover:opacity-100 transition-opacity"
        style={{ color: '#5A5D63' }}
      >
        Skip →
      </motion.button>
    </motion.div>
  );
};
