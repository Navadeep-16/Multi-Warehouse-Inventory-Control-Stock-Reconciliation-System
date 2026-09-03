import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { CinematicIntro, NexoraLogo } from '../components/CinematicIntro';
import illuminatedWarehouseBg from '../assets/nexora_warehouse_illuminated.jpg';

/* ─── Reusable Animated Section ─── */
const RevealSection = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.33, 1, 0.68, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─── Animated Counter ─── */
const AnimCounter = ({ target, suffix = '', prefix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const num = parseFloat(target);
    const duration = 2000;
    const steps = 60;
    const increment = num / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= num) { setCount(num); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

/* ─── Line Reveal Typography ─── */
const LineReveal = ({ text, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: '110%' }}
        animate={isInView ? { y: 0 } : {}}
        transition={{ duration: 0.9, delay, ease: [0.33, 1, 0.68, 1] }}
        className={className}
      >
        {text}
      </motion.div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   LANDING PAGE
   ═══════════════════════════════════════════════ */
export const LandingPage = () => {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(() => {
    if (sessionStorage.getItem('nexora_intro_seen')) return false;
    return true;
  });

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem('nexora_intro_seen', 'true');
    setShowIntro(false);
  }, []);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.1], [0, -120]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  const [navSolid, setNavSolid] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const handler = () => setNavSolid(window.scrollY > 80);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (prefersReducedMotion || window.innerWidth < 768) return;
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 10; // Max 10px
      const y = (clientY / window.innerHeight - 0.5) * 10;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion]);

  return (
    <>
      <AnimatePresence>{showIntro && <CinematicIntro onComplete={handleIntroComplete} />}</AnimatePresence>

      {!showIntro && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          style={{ backgroundColor: '#050608', color: '#F5F3EE' }}
        >

          {/* ══════════ NAVIGATION ══════════ */}
          <nav
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
            style={{
              backgroundColor: navSolid ? 'rgba(5,6,8,0.85)' : 'transparent',
              backdropFilter: navSolid ? 'blur(20px) saturate(180%)' : 'none',
              borderBottom: navSolid ? '1px solid rgba(30,41,59,0.5)' : '1px solid transparent',
            }}
          >
            <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <NexoraLogo className="w-7 h-7" />
                <span className="font-display text-lg tracking-[0.15em]" style={{ color: '#F5F3EE' }}>NEXORA</span>
              </div>

              <div className="hidden lg:flex items-center gap-10 text-[13px] tracking-wide" style={{ color: '#A6A9AF' }}>
                {['Product', 'Features', 'Solutions', 'Analytics', 'Resources'].map(item => (
                  <a key={item} href="#" className="hover:text-[#F5F3EE] transition-colors duration-300">{item}</a>
                ))}
              </div>

              <div className="flex items-center gap-6">
                <button onClick={() => navigate('/login')} className="text-[13px] tracking-wide hover:text-[#F5F3EE] transition-colors" style={{ color: '#A6A9AF' }}>Login</button>
                <button
                  onClick={() => navigate('/login')}
                  className="text-[13px] tracking-wider font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(214,168,95,0.25)]"
                  style={{ backgroundColor: '#D6A85F', color: '#050608' }}
                >
                  Launch Dashboard →
                </button>
              </div>
            </div>
          </nav>

          {/* ══════════ HERO (ILLUMINATED CINEMATIC MOVING WAREHOUSE) ══════════ */}
          <motion.section
            style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
            className="relative min-h-screen flex items-center justify-center px-8 overflow-hidden"
          >
            {/* ── ILLUMINATED CINEMATIC MOVING WAREHOUSE BACKGROUND ── */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              {/* Layer 1: Slow Seamless Camera Push Background Image */}
              <motion.div
                className="absolute inset-0 w-full h-full bg-cover bg-center opacity-95"
                style={{
                  backgroundImage: `url(${illuminatedWarehouseBg})`,
                  filter: 'brightness(1.10) contrast(1.04)',
                  willChange: 'transform',
                }}
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        scale: [1.02, 1.08, 1.02],
                        x: [mousePos.x * -0.5, mousePos.x * -0.5 + 4, mousePos.x * -0.5],
                        y: [mousePos.y * -0.5, mousePos.y * -0.5 - 8, mousePos.y * -0.5],
                      }
                }
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
              />

              {/* Layer 2: Atmospheric Dust Motes Floating in Overhead Light Beams */}
              {!prefersReducedMotion && (
                <div className="absolute inset-0 opacity-45">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        left: `${18 + (i * 3.2)}%`,
                        top: `${10 + (i % 5) * 14}%`,
                        width: `${2 + (i % 3) * 2}px`,
                        height: `${2 + (i % 3) * 2}px`,
                        backgroundColor: '#D6A85F',
                        filter: 'blur(1px)',
                      }}
                      animate={{
                        y: [-25, 25, -25],
                        x: [-12, 12, -12],
                        opacity: [0.2, 0.7, 0.2],
                      }}
                      transition={{
                        duration: 6 + (i % 4) * 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Layer 3: Autonomous AGV Warehouse Robot Driving Down Central Aisle */}
              {!prefersReducedMotion && (
                <motion.div
                  className="absolute bottom-[23%] left-[27%] flex items-center gap-1 opacity-80"
                  animate={{
                    x: [-30, 45, -30],
                    y: [0, -3, 0],
                    scale: [0.95, 1.05, 0.95],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <div className="w-20 h-1.5 rounded-full shadow-[0_0_20px_#D6A85F]" style={{ backgroundColor: '#D6A85F' }} />
                  <div className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: '#F0C982' }} />
                </motion.div>
              )}

              {/* Layer 4: Forklift Headlight Sweeping Reflection in Midground Aisle */}
              {!prefersReducedMotion && (
                <motion.div
                  className="absolute bottom-[28%] right-[30%] opacity-70 pointer-events-none"
                  animate={{
                    x: [40, -40, 40],
                    opacity: [0.3, 0.75, 0.3],
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1,
                  }}
                >
                  <div className="w-28 h-2 rounded-full blur-[2px] shadow-[0_0_25px_#F0C982]" style={{ backgroundColor: 'rgba(240,201,130,0.5)' }} />
                </motion.div>
              )}

              {/* Layer 5: Distant Warehouse Workers Silhouette Activity */}
              {!prefersReducedMotion && (
                <div className="absolute top-[48%] left-[50%] -translate-x-1/2 flex items-center gap-4 opacity-40">
                  <motion.div
                    className="w-1.5 h-3 bg-[#F0C982] rounded-xs"
                    animate={{ x: [-15, 15, -15], opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="w-1.5 h-3 bg-[#D6A85F] rounded-xs"
                    animate={{ x: [10, -10, 10], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 9.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  />
                </div>
              )}

              {/* Layer 6: Automated Conveyor Belt Package Movement */}
              {!prefersReducedMotion && (
                <div className="absolute top-[55%] right-[15%] w-32 h-1 overflow-hidden opacity-35">
                  <motion.div
                    className="flex gap-4 w-[200%]"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                  >
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="w-3 h-1 bg-[#D6A85F] rounded-xs" />
                    ))}
                  </motion.div>
                </div>
              )}

              {/* Layer 7: Environmental Light & Floor Reflection Shimmer */}
              {!prefersReducedMotion && (
                <motion.div
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    background: 'radial-gradient(circle at 50% 60%, rgba(214,168,95,0.4) 0%, transparent 60%)',
                  }}
                  animate={{
                    opacity: [0.15, 0.3, 0.15],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              )}

              {/* Layer 8: Selective Vignette Overlay (10-15% Brighter Center-Right Aisle, Crisp Left Text Backdrop) */}
              <div
                className="absolute inset-0"
                style={{
                  background: `
                    radial-gradient(ellipse at 65% 48%, rgba(5,6,8,0.0) 0%, rgba(5,6,8,0.3) 55%, rgba(5,6,8,0.85) 100%),
                    radial-gradient(ellipse at 15% 50%, rgba(5,6,8,0.82) 0%, rgba(5,6,8,0.45) 60%, transparent 100%),
                    linear-gradient(to bottom, rgba(5,6,8,0.55) 0%, transparent 35%, rgba(5,6,8,0.8) 85%, #050608 100%)
                  `,
                }}
              />
            </div>

            {/* ── HERO CONTENT (Balanced Composition: Left Headline, Open Right Warehouse View) ── */}
            <div className="relative z-10 max-w-[1400px] mx-auto w-full pt-32 pb-20 flex flex-col justify-center">
              <div className="max-w-2xl lg:max-w-3xl">
                <div className="mb-12">
                  <div className="overflow-hidden mb-2">
                    <motion.div
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
                      className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[0.95] tracking-[-0.04em]"
                      style={{ color: '#F5F3EE' }}
                    >
                      CONTROL
                    </motion.div>
                  </div>
                  <div className="overflow-hidden mb-2">
                    <motion.div
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1, delay: 0.35, ease: [0.33, 1, 0.68, 1] }}
                      className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[0.95] tracking-[-0.04em]"
                      style={{ color: '#F5F3EE' }}
                    >
                      EVERY STOCK.
                    </motion.div>
                  </div>
                  <div className="h-4" />
                  <div className="overflow-hidden mb-2">
                    <motion.div
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
                      className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[0.95] tracking-[-0.04em]"
                      style={{ color: '#A6A9AF' }}
                    >
                      ACROSS
                    </motion.div>
                  </div>
                  <div className="overflow-hidden">
                    <motion.div
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1, delay: 0.65, ease: [0.33, 1, 0.68, 1] }}
                      className="text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[0.95] tracking-[-0.04em]"
                    >
                      <span className="font-display" style={{ color: '#A6A9AF' }}>EVERY </span>
                      <span className="font-editorial text-gradient-gold">Warehouse.</span>
                    </motion.div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="max-w-xl"
                >
                  <p className="text-base md:text-lg leading-relaxed mb-10" style={{ color: '#A6A9AF' }}>
                    NEXORA is an intelligent multi-warehouse inventory platform designed to help organizations track, transfer, reconcile and optimize inventory across their entire supply chain.
                  </p>

                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => navigate('/login')}
                      className="group flex items-center gap-3 text-sm font-semibold tracking-wider px-7 py-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(214,168,95,0.3)]"
                      style={{ backgroundColor: '#D6A85F', color: '#050608' }}
                    >
                      Explore NEXORA
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="group flex items-center gap-3 text-sm tracking-wider transition-colors hover:text-[#F5F3EE]" style={{ color: '#A6A9AF' }}>
                      <div className="w-10 h-10 rounded-full border flex items-center justify-center group-hover:border-[#D6A85F] transition-colors" style={{ borderColor: '#1E293B' }}>
                        <Play className="w-3.5 h-3.5 ml-0.5" />
                      </div>
                      Watch the experience
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* ══════════ TYPOGRAPHY SECTION ══════════ */}
          <section className="py-40 px-8">
            <div className="max-w-[1200px] mx-auto">
              <LineReveal text="INVENTORY" className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-[1] tracking-[-0.03em]" style={{ color: '#F5F3EE' }} />
              <LineReveal text="SHOULD NOT" className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-[1] tracking-[-0.03em]" style={{ color: '#5A5D63' }} delay={0.15} />
              <LineReveal text="BE A GUESS." className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-[1] tracking-[-0.03em] text-gradient-gold" delay={0.3} />

              <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
                {['SEE IT.', 'TRACK IT.', 'RECONCILE IT.', 'OPTIMIZE IT.'].map((t, i) => (
                  <RevealSection key={i} delay={i * 0.1}>
                    <div className="text-xl md:text-2xl font-display tracking-wide" style={{ color: i === 3 ? '#D6A85F' : '#A6A9AF' }}>{t}</div>
                  </RevealSection>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════ WAREHOUSE NETWORK ══════════ */}
          <section className="py-32 px-8 relative overflow-hidden" style={{ backgroundColor: '#0B1017' }}>
            <div className="max-w-[1200px] mx-auto relative z-10">
              <RevealSection>
                <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-6" style={{ color: '#D6A85F' }}>Global Network</p>
                <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.03em] mb-20" style={{ color: '#F5F3EE' }}>
                  ONE INVENTORY.<br />
                  <span style={{ color: '#5A5D63' }}>EVERY LOCATION.</span>
                </h2>
              </RevealSection>

              {/* Network Visualization */}
              <div className="relative h-[500px] md:h-[600px]">
                <svg className="absolute inset-0 w-full h-full">
                  {[
                    ['25%', '30%', '50%', '50%'],
                    ['50%', '50%', '75%', '35%'],
                    ['50%', '50%', '70%', '70%'],
                    ['50%', '50%', '20%', '65%'],
                    ['25%', '30%', '20%', '65%'],
                  ].map(([x1, y1, x2, y2], i) => (
                    <motion.line
                      key={i}
                      x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke="#D6A85F" strokeWidth="1" strokeOpacity="0.15"
                      strokeDasharray="4 4"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.2 * i }}
                    />
                  ))}
                </svg>

                {[
                  { name: 'Hyderabad', units: '12,400', capacity: '87%', x: '25%', y: '30%' },
                  { name: 'Bangalore', units: '8,200', capacity: '72%', x: '50%', y: '50%' },
                  { name: 'Chennai', units: '6,800', capacity: '65%', x: '75%', y: '35%' },
                  { name: 'Mumbai', units: '15,600', capacity: '91%', x: '20%', y: '65%' },
                  { name: 'Delhi', units: '10,300', capacity: '78%', x: '70%', y: '70%' },
                ].map((wh, i) => (
                  <RevealSection key={i} delay={0.3 + i * 0.15} className="absolute group cursor-default" style={{ left: wh.x, top: wh.y, transform: 'translate(-50%, -50%)' }}>
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full shadow-[0_0_20px_rgba(214,168,95,0.4)]" style={{ backgroundColor: '#D6A85F' }} />
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <div className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: '#A6A9AF' }}>{wh.name}</div>
                        <div className="text-xs font-display mt-1" style={{ color: '#F5F3EE' }}>{wh.units} units</div>
                      </div>
                      {/* Hover card */}
                      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                        <div className="p-4 rounded-xl border min-w-[180px]" style={{ backgroundColor: '#111720', borderColor: '#1E293B' }}>
                          <div className="text-xs font-bold tracking-wider uppercase mb-2" style={{ color: '#D6A85F' }}>{wh.name}</div>
                          <div className="space-y-1.5 text-[11px]" style={{ color: '#A6A9AF' }}>
                            <div className="flex justify-between"><span>Stock</span><span style={{ color: '#F5F3EE' }}>{wh.units}</span></div>
                            <div className="flex justify-between"><span>Capacity</span><span style={{ color: '#F5F3EE' }}>{wh.capacity}</span></div>
                            <div className="flex justify-between"><span>Transfers</span><span style={{ color: '#6FAF8F' }}>Active</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </RevealSection>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════ STOCK MOVEMENT FLOW ══════════ */}
          <section className="py-40 px-8">
            <div className="max-w-[1000px] mx-auto text-center">
              <RevealSection>
                <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-6" style={{ color: '#D6A85F' }}>Workflow</p>
                <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.03em] mb-24" style={{ color: '#F5F3EE' }}>
                  EVERY MOVEMENT<br />
                  <span style={{ color: '#5A5D63' }}>TELLS A STORY.</span>
                </h2>
              </RevealSection>

              <div className="space-y-0">
                {['RECEIVE', 'STORE', 'TRANSFER', 'COUNT', 'RECONCILE', 'OPTIMIZE'].map((step, i) => (
                  <RevealSection key={i} delay={i * 0.08}>
                    <div className="py-8 border-t flex items-center justify-between group cursor-default" style={{ borderColor: '#1E293B' }}>
                      <div className="flex items-center gap-6">
                        <span className="text-xs font-mono" style={{ color: '#5A5D63' }}>0{i + 1}</span>
                        <span className="font-display text-2xl md:text-3xl tracking-wide group-hover:text-[#D6A85F] transition-colors duration-500" style={{ color: '#F5F3EE' }}>{step}</span>
                      </div>
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500" style={{ color: '#D6A85F' }} />
                    </div>
                  </RevealSection>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════ RECONCILIATION ══════════ */}
          <section className="py-40 px-8" style={{ backgroundColor: '#0B1017' }}>
            <div className="max-w-[1200px] mx-auto">
              <RevealSection>
                <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-6" style={{ color: '#D6A85F' }}>Reconciliation</p>
                <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.03em] mb-24" style={{ color: '#F5F3EE' }}>
                  KNOW WHAT'S<br />
                  <span className="font-editorial text-gradient-gold">actually there.</span>
                </h2>
              </RevealSection>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 items-end">
                <RevealSection delay={0.1}>
                  <div className="text-center">
                    <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: '#A6A9AF' }}>System Stock</p>
                    <div className="font-display text-[5rem] md:text-[7rem] leading-none" style={{ color: '#F5F3EE' }}>
                      <AnimCounter target={1000} suffix="" prefix="" />
                    </div>
                  </div>
                </RevealSection>

                <RevealSection delay={0.2}>
                  <div className="text-center">
                    <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: '#A6A9AF' }}>Physical Stock</p>
                    <div className="font-display text-[5rem] md:text-[7rem] leading-none" style={{ color: '#C89A52' }}>
                      <AnimCounter target={970} />
                    </div>
                  </div>
                </RevealSection>

                <RevealSection delay={0.3}>
                  <div className="text-center">
                    <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: '#C86B67' }}>Shortage</p>
                    <div className="font-display text-[5rem] md:text-[7rem] leading-none" style={{ color: '#C86B67' }}>
                      -<AnimCounter target={30} />
                    </div>
                  </div>
                </RevealSection>
              </div>

              {/* Reconciliation Workflow */}
              <div className="mt-32 grid grid-cols-2 md:grid-cols-6 gap-4">
                {['Physical Count', 'Difference Detected', 'Manager Review', 'Approval', 'Adjustment', 'Audit Log'].map((step, i) => (
                  <RevealSection key={i} delay={0.1 * i}>
                    <div className="text-center p-4">
                      <div className="w-8 h-8 rounded-full border mx-auto mb-3 flex items-center justify-center text-[10px] font-bold"
                        style={{ borderColor: '#D6A85F', color: '#D6A85F' }}>{i + 1}</div>
                      <div className="text-[11px] tracking-wider uppercase" style={{ color: '#A6A9AF' }}>{step}</div>
                    </div>
                  </RevealSection>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════ AI / SMART INVENTORY ══════════ */}
          <section className="py-40 px-8">
            <div className="max-w-[1200px] mx-auto">
              <RevealSection>
                <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-6" style={{ color: '#D6A85F' }}>Intelligence</p>
                <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.03em] mb-6" style={{ color: '#F5F3EE' }}>
                  DON'T JUST<br />TRACK INVENTORY.
                </h2>
                <h2 className="font-editorial text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] text-gradient-gold mb-24">
                  Predict it.
                </h2>
              </RevealSection>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  { label: 'Current Stock', value: '120', color: '#F5F3EE' },
                  { label: 'Predicted Demand', value: '450', color: '#D6A85F' },
                  { label: 'Recommended Order', value: '400', color: '#6FAF8F' },
                ].map((item, i) => (
                  <RevealSection key={i} delay={i * 0.15}>
                    <div className="p-8 rounded-2xl border" style={{ backgroundColor: '#111720', borderColor: '#1E293B' }}>
                      <p className="text-xs tracking-[0.25em] uppercase mb-6" style={{ color: '#A6A9AF' }}>{item.label}</p>
                      <div className="font-display text-[4rem] leading-none" style={{ color: item.color }}>
                        <AnimCounter target={parseInt(item.value)} />
                      </div>
                    </div>
                  </RevealSection>
                ))}
              </div>

              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
                {['Demand Forecast', 'Stockout Risk', 'Reorder Point', 'Warehouse Selection'].map((cap, i) => (
                  <RevealSection key={i} delay={0.1 * i}>
                    <div className="py-4 px-5 rounded-xl border text-center" style={{ borderColor: '#1E293B' }}>
                      <div className="text-[11px] tracking-wider uppercase font-semibold" style={{ color: '#A6A9AF' }}>{cap}</div>
                    </div>
                  </RevealSection>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════ STATISTICS ══════════ */}
          <section className="py-40 px-8" style={{ backgroundColor: '#050608' }}>
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-0">
              {[
                { value: 99.9, suffix: '%', label: 'Inventory Visibility' },
                { value: 100, suffix: '+', label: 'Warehouses' },
                { value: 24, suffix: '/7', label: 'Monitoring' },
                { value: 50, suffix: 'K+', label: 'Products Managed' },
              ].map((stat, i) => (
                <RevealSection key={i} delay={i * 0.1}>
                  <div className="py-12 md:py-16 text-center border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0" style={{ borderColor: '#1E293B' }}>
                    <div className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-none mb-4" style={{ color: '#F5F3EE' }}>
                      <AnimCounter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs tracking-[0.25em] uppercase" style={{ color: '#5A5D63' }}>{stat.label}</div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </section>

          {/* ══════════ FEATURES (Editorial) ══════════ */}
          <section className="py-40 px-8" style={{ backgroundColor: '#0B1017' }}>
            <div className="max-w-[1200px] mx-auto">
              {[
                { num: '01', title: ['MULTI-WAREHOUSE', 'CONTROL'], desc: 'Manage inventory across unlimited locations with centralized visibility and distributed control.' },
                { num: '02', title: ['REAL-TIME', 'INVENTORY'], desc: 'Every stock movement is tracked instantly. No delays, no blind spots, no surprises.' },
                { num: '03', title: ['SMART', 'RECONCILIATION'], desc: 'Automatically detect discrepancies between system and physical stock with intelligent adjustment workflows.' },
                { num: '04', title: ['INTELLIGENT', 'TRANSFERS'], desc: 'AI-optimized warehouse-to-warehouse transfers based on demand, proximity, and cost analysis.' },
                { num: '05', title: ['PREDICTIVE', 'INVENTORY'], desc: 'Machine learning forecasts demand patterns, prevents stockouts, and recommends optimal reorder points.' },
              ].map((feature, i) => (
                <RevealSection key={i}>
                  <div className="py-20 border-t flex flex-col md:flex-row md:items-start gap-8 md:gap-20" style={{ borderColor: '#1E293B' }}>
                    <div className="flex-shrink-0">
                      <span className="text-xs font-mono" style={{ color: '#5A5D63' }}>{feature.num}</span>
                    </div>
                    <div className="flex-1">
                      {feature.title.map((line, j) => (
                        <div key={j} className="font-display text-[clamp(1.5rem,4vw,3.5rem)] leading-[1.1] tracking-[-0.02em]"
                          style={{ color: j === 0 ? '#F5F3EE' : '#D6A85F' }}>
                          {line}
                        </div>
                      ))}
                    </div>
                    <div className="md:max-w-sm flex-shrink-0">
                      <p className="text-sm leading-relaxed" style={{ color: '#A6A9AF' }}>{feature.desc}</p>
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </section>

          {/* ══════════ TRUST ══════════ */}
          <section className="py-32 px-8">
            <div className="max-w-[1000px] mx-auto text-center">
              <RevealSection>
                <p className="text-xs tracking-[0.3em] uppercase mb-16" style={{ color: '#5A5D63' }}>Trusted by modern operations</p>
              </RevealSection>

              <div className="grid grid-cols-3 md:grid-cols-6 gap-8 mb-32">
                {['TechNova', 'LogiCore', 'Inventix', 'RapidMart', 'SupplyMax', 'WareFlow'].map((name, i) => (
                  <RevealSection key={i} delay={i * 0.05}>
                    <div className="text-sm font-display tracking-wider opacity-30 hover:opacity-60 transition-opacity cursor-default" style={{ color: '#A6A9AF' }}>
                      {name}
                    </div>
                  </RevealSection>
                ))}
              </div>

              <RevealSection>
                <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.1] tracking-[-0.03em]" style={{ color: '#F5F3EE' }}>
                  ONE PLATFORM.<br />
                  <span className="text-gradient-gold">COMPLETE CONTROL.</span>
                </h2>
              </RevealSection>
            </div>
          </section>

          {/* ══════════ FINAL CTA ══════════ */}
          <section className="py-40 px-8 relative" style={{ backgroundColor: '#050608' }}>
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(214,168,95,0.3) 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }} />

            <div className="max-w-[1000px] mx-auto text-center relative z-10">
              <RevealSection>
                <NexoraLogo className="w-12 h-12 mx-auto mb-12 opacity-50" />
              </RevealSection>

              <RevealSection delay={0.1}>
                <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-[-0.03em] mb-8" style={{ color: '#F5F3EE' }}>
                  YOUR INVENTORY.<br />
                  <span className="font-editorial text-gradient-gold">Connected.</span>
                </h2>
              </RevealSection>

              <RevealSection delay={0.2}>
                <p className="text-lg leading-relaxed max-w-lg mx-auto mb-12" style={{ color: '#A6A9AF' }}>
                  Build a smarter, more visible and more reliable inventory operation with NEXORA.
                </p>
              </RevealSection>

              <RevealSection delay={0.3}>
                <button
                  onClick={() => navigate('/login')}
                  className="group inline-flex items-center gap-3 text-sm font-bold tracking-[0.15em] uppercase px-10 py-5 rounded-lg transition-all duration-500 hover:shadow-[0_0_40px_rgba(214,168,95,0.3)] hover:scale-[1.02]"
                  style={{ backgroundColor: '#D6A85F', color: '#050608' }}
                >
                  LAUNCH NEXORA
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                </button>
              </RevealSection>
            </div>
          </section>

          {/* ══════════ FOOTER ══════════ */}
          <footer className="py-20 px-8 border-t" style={{ borderColor: '#1E293B', backgroundColor: '#050608' }}>
            <div className="max-w-[1200px] mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <NexoraLogo className="w-6 h-6" />
                    <span className="font-display text-sm tracking-[0.15em]" style={{ color: '#F5F3EE' }}>NEXORA</span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: '#5A5D63' }}>
                    Intelligent Multi-Warehouse<br />Inventory Platform
                  </p>
                </div>

                {[
                  { title: 'Product', links: ['Features', 'Solutions', 'Analytics', 'Pricing'] },
                  { title: 'Resources', links: ['Documentation', 'Support', 'API Reference', 'Status'] },
                  { title: 'Company', links: ['About', 'Careers', 'Privacy', 'Terms'] },
                ].map((col, i) => (
                  <div key={i}>
                    <p className="text-[10px] font-bold tracking-[0.25em] uppercase mb-4" style={{ color: '#A6A9AF' }}>{col.title}</p>
                    <div className="space-y-3">
                      {col.links.map(link => (
                        <a key={link} href="#" className="block text-xs hover:text-[#F5F3EE] transition-colors" style={{ color: '#5A5D63' }}>{link}</a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: '#1E293B' }}>
                <p className="text-[11px] tracking-wider" style={{ color: '#5A5D63' }}>© 2026 NEXORA. All rights reserved.</p>
                <div className="flex gap-6">
                  {['Privacy', 'Terms', 'Security'].map(link => (
                    <a key={link} href="#" className="text-[11px] tracking-wider hover:text-[#A6A9AF] transition-colors" style={{ color: '#5A5D63' }}>{link}</a>
                  ))}
                </div>
              </div>
            </div>
          </footer>

        </motion.div>
      )}
    </>
  );
};
