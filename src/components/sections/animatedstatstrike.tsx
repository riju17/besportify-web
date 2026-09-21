'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { useThemeMode } from '@/components/theme/theme-provider';

const TOTAL_FRAMES = 100;
const BACKGROUND_COLOR = '#0b1113';

// Formats frame index to 3-digit zero-padded string (e.g. 1 -> "001", 100 -> "100")
function getFramePath(index: number): string {
  const frameNumber = String(index + 1).padStart(3, '0');
  return `/statstrike-scroll/ezgif-frame-${frameNumber}.jpg`;
}

/**
 * Calculates current frame based on scroll progress (0 to 1).
 * 0.0 -> 0.6: Explodes from Frame 0 to Frame 99 (Disassembly across 100 frames)
 * 0.6 -> 1.0: Smoothly reassembles from Frame 99 back to Frame 0
 */
function calculateFrameIndex(progress: number): number {
  const p = Math.max(0, Math.min(1, progress));
  if (p <= 0.6) {
    const fraction = p / 0.6;
    return Math.min(
      TOTAL_FRAMES - 1,
      Math.floor(fraction * (TOTAL_FRAMES - 1)),
    );
  } else {
    const fraction = (p - 0.6) / 0.4;
    return Math.max(
      0,
      Math.min(
        TOTAL_FRAMES - 1,
        Math.floor((1 - fraction) * (TOTAL_FRAMES - 1)),
      ),
    );
  }
}

export function AnimatedStatStrike() {
  const { theme } = useThemeMode();
  const isDark = theme === 'dark';

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [activeFrameDisplay, setActiveFrameDisplay] = useState(1);
  const [statusText, setStatusText] = useState('CALIBRATING TELEMETRY CORE...');

  // Framer Motion scroll tracking targeted to the 400vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth scroll transformations for the 4 story milestones (guaranteed across full [0, 1.0] range)
  // 0% Scroll: Hero Headline (Centered, Upper Stratum) - Dissolves cleanly without drifting into header
  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.04, 0.11, 1.0],
    [1, 0.9, 0, 0],
  );
  const heroY = useTransform(scrollYProgress, [0, 0.11, 1.0], [0, -15, -15]);
  const heroScale = useTransform(
    scrollYProgress,
    [0, 0.11, 1.0],
    [1, 0.97, 0.97],
  );
  const heroVisibility = useTransform(scrollYProgress, (v) =>
    v < 0.15 ? 'visible' : 'hidden',
  );
  const heroPointerEvents = useTransform(scrollYProgress, (v) =>
    v < 0.12 ? 'auto' : 'none',
  );

  // 30% Scroll: Feature #1 (Left Aligned) - Product begins expanding / separating
  const feat1Opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.26, 0.38, 0.46, 1.0],
    [0, 0, 1, 1, 0, 0],
  );
  const feat1X = useTransform(
    scrollYProgress,
    [0, 0.18, 0.26, 0.38, 0.46, 1.0],
    [-40, -40, 0, 0, -30, -30],
  );
  const feat1Visibility = useTransform(scrollYProgress, (v) =>
    v >= 0.15 && v < 0.48 ? 'visible' : 'hidden',
  );
  const feat1PointerEvents = useTransform(scrollYProgress, (v) =>
    v >= 0.22 && v < 0.42 ? 'auto' : 'none',
  );

  // 60% Scroll: Feature #2 (Right Aligned) - Product fully exploded, internal components visible
  const feat2Opacity = useTransform(
    scrollYProgress,
    [0, 0.48, 0.56, 0.68, 0.76, 1.0],
    [0, 0, 1, 1, 0, 0],
  );
  const feat2X = useTransform(
    scrollYProgress,
    [0, 0.48, 0.56, 0.68, 0.76, 1.0],
    [40, 40, 0, 0, 30, 30],
  );
  const feat2Visibility = useTransform(scrollYProgress, (v) =>
    v >= 0.46 && v < 0.78 ? 'visible' : 'hidden',
  );
  const feat2PointerEvents = useTransform(scrollYProgress, (v) =>
    v >= 0.52 && v < 0.72 ? 'auto' : 'none',
  );

  // 90% Scroll: CTA / Final Message (Upper Stratum Centered) - Product smoothly reassembles
  const ctaOpacity = useTransform(
    scrollYProgress,
    [0, 0.78, 0.86, 0.98, 1.0],
    [0, 0, 1, 1, 1],
  );
  const ctaY = useTransform(
    scrollYProgress,
    [0, 0.78, 0.88, 1.0],
    [25, 25, 0, 0],
  );
  const ctaScale = useTransform(
    scrollYProgress,
    [0, 0.78, 0.88, 1.0],
    [0.96, 0.96, 1, 1],
  );
  const ctaVisibility = useTransform(scrollYProgress, (v) =>
    v >= 0.75 ? 'visible' : 'hidden',
  );
  const ctaPointerEvents = useTransform(scrollYProgress, (v) =>
    v >= 0.82 ? 'auto' : 'none',
  );

  // Scroll cue indicator (fades out immediately as user scrolls, holds 0 to 1.0)
  const scrollCueOpacity = useTransform(
    scrollYProgress,
    [0, 0.04, 1.0],
    [1, 0, 0],
  );

  // Telemetry HUD readouts
  const hudProgress = useTransform(scrollYProgress, (v) => Math.round(v * 100));
  const [livePercent, setLivePercent] = useState(0);

  // Draw a frame to canvas with high-DPI retina rendering, contain-fit, and edge feathering
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetWidth = Math.round(rect.width * dpr);
    const targetHeight = Math.round(rect.height * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    // Fill background with exact matching dark tone
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, w, h);

    // Calculate contain fit scaling (maintains 16:9 native aspect ratio)
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = w / h;

    const isDesktop = w >= 768;
    const scaleMultiplier = isDesktop ? 0.84 : 0.92;

    let baseW: number;
    let baseH: number;

    if (canvasRatio > imgRatio) {
      baseH = h;
      baseW = baseH * imgRatio;
    } else {
      baseW = w;
      baseH = baseW / imgRatio;
    }

    const drawW = baseW * scaleMultiplier;
    const drawH = baseH * scaleMultiplier;

    const drawX = (w - drawW) / 2;
    // On desktop, offset downwards so the emblem sits gracefully in the lower-middle half,
    // ensuring zero collision with the hero header, subtitle, and top telemetry HUD.
    const verticalOffset = isDesktop
      ? Math.min(65, Math.max(35, h * 0.07))
      : 20;
    const drawY = (h - drawH) / 2 + verticalOffset;

    // Draw main frame
    ctx.drawImage(img, drawX, drawY, drawW, drawH);

    // Soft perimeter feathering to eliminate any edge seam on arbitrary aspect ratios
    const feather = Math.min(32, drawW * 0.04, drawH * 0.04);
    if (feather > 4) {
      // Left border feather
      const gradLeft = ctx.createLinearGradient(drawX, 0, drawX + feather, 0);
      gradLeft.addColorStop(0, BACKGROUND_COLOR);
      gradLeft.addColorStop(1, 'transparent');
      ctx.fillStyle = gradLeft;
      ctx.fillRect(drawX - 1, drawY, feather + 1, drawH);

      // Right border feather
      const gradRight = ctx.createLinearGradient(
        drawX + drawW - feather,
        0,
        drawX + drawW,
        0,
      );
      gradRight.addColorStop(0, 'transparent');
      gradRight.addColorStop(1, BACKGROUND_COLOR);
      ctx.fillStyle = gradRight;
      ctx.fillRect(drawX + drawW - feather, drawY, feather + 1, drawH);

      // Top border feather
      const gradTop = ctx.createLinearGradient(0, drawY, 0, drawY + feather);
      gradTop.addColorStop(0, BACKGROUND_COLOR);
      gradTop.addColorStop(1, 'transparent');
      ctx.fillStyle = gradTop;
      ctx.fillRect(drawX, drawY - 1, drawW, feather + 1);

      // Bottom border feather
      const gradBottom = ctx.createLinearGradient(
        0,
        drawY + drawH - feather,
        0,
        drawY + drawH,
      );
      gradBottom.addColorStop(0, 'transparent');
      gradBottom.addColorStop(1, BACKGROUND_COLOR);
      ctx.fillStyle = gradBottom;
      ctx.fillRect(drawX, drawY + drawH - feather, drawW, feather + 1);
    }

    ctx.restore();
  }, []);

  // Preload all 30 frames in memory
  useEffect(() => {
    let isMounted = true;
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    const updateStatus = (count: number) => {
      if (count < 25) setStatusText('INITIALIZING BALLISTIC DATA STREAMS...');
      else if (count < 50) setStatusText('MAPPING HAWKEYE 3D TRAJECTORIES...');
      else if (count < 75)
        setStatusText('CALIBRATING EXPLODED SENSOR ARRAY...');
      else if (count < 100)
        setStatusText('SYNCHRONIZING 100-FRAME TELEMETRY MATRIX...');
      else setStatusText('TELEMETRY MATRIX SYNCHRONIZED');
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);

      img.onload = () => {
        if (!isMounted) return;
        loadedCount += 1;
        const progress = Math.round((loadedCount / TOTAL_FRAMES) * 100);
        setLoadProgress(progress);
        updateStatus(loadedCount);

        // Draw initial frame as soon as frame 0 loads
        if (i === 0) {
          renderFrame(0);
        }

        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = images;
          setImagesLoaded(true);
          renderFrame(currentFrameRef.current);
        }
      };

      img.onerror = () => {
        if (!isMounted) return;
        loadedCount += 1;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = images;
          setImagesLoaded(true);
        }
      };

      images.push(img);
    }

    return () => {
      isMounted = false;
    };
  }, [renderFrame]);

  // Handle window resize smoothly
  useEffect(() => {
    function handleResize() {
      if (imagesLoaded) {
        renderFrame(currentFrameRef.current);
      }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [imagesLoaded, renderFrame]);

  // Re-render frame when theme changes
  useEffect(() => {
    if (imagesLoaded) {
      renderFrame(currentFrameRef.current);
    }
  }, [isDark, imagesLoaded, renderFrame]);

  // Subscribe to Framer Motion scroll changes
  useEffect(() => {
    if (!imagesLoaded) return;

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const frame = calculateFrameIndex(latest);
      setActiveFrameDisplay(frame + 1);

      if (frame !== currentFrameRef.current) {
        currentFrameRef.current = frame;
        if (rafIdRef.current === null) {
          rafIdRef.current = requestAnimationFrame(() => {
            renderFrame(currentFrameRef.current);
            rafIdRef.current = null;
          });
        }
      }
    });

    const unsubscribeHud = hudProgress.on('change', (val) => {
      setLivePercent(val);
    });

    return () => {
      unsubscribe();
      unsubscribeHud();
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [imagesLoaded, scrollYProgress, hudProgress, renderFrame]);

  return (
    <div
      ref={containerRef}
      className={`relative h-[400vh] w-full transition-colors duration-300 ${
        isDark
          ? 'bg-[#0b1113] selection:bg-red-600/30'
          : 'bg-[#ecf2f4] selection:bg-teal-500/30'
      }`}
      id="statstrike-canvas-hero"
    >
      {/* Preloader overlay */}
      <AnimatePresence>
        {!imagesLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed inset-0 z-50 flex flex-col items-center justify-center px-6 text-center transition-colors duration-300 ${
              isDark
                ? 'bg-[#0b1113] text-white/90'
                : 'bg-[#ecf2f4] text-slate-900'
            }`}
          >
            {/* High-tech telemetry radar spinner */}
            <div className="relative mb-8 flex h-32 w-32 items-center justify-center">
              {/* Outer pulsing ring */}
              <div
                className={`absolute inset-0 rounded-full border animate-ping ${
                  isDark ? 'border-teal-500/20' : 'border-teal-600/20'
                }`}
              />
              {/* Radar sweep ring */}
              <div
                className={`absolute inset-2 rounded-full border-t-transparent border-r-transparent animate-spin ${
                  isDark
                    ? 'border-b-teal-400 border-l-teal-500/30'
                    : 'border-b-teal-600 border-l-teal-600/40'
                }`}
              />
              {/* Counter-rotating segmented ring */}
              <div
                className="absolute inset-4 rounded-full border-2 border-dashed border-red-500/40"
                style={{ animation: 'spin 12s linear infinite reverse' }}
              />
              {/* Center emblem icon & progress */}
              <div className="flex flex-col items-center justify-center">
                <span className="font-mono text-xl font-bold tracking-tight">
                  {loadProgress}%
                </span>
                <span
                  className={`font-mono text-[9px] uppercase tracking-widest ${
                    isDark ? 'text-teal-400' : 'text-teal-700 font-bold'
                  }`}
                >
                  DECODING
                </span>
              </div>
            </div>

            {/* Brand Title */}
            <div className="space-y-2">
              <div
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-widest ${
                  isDark
                    ? 'border-white/10 bg-white/5 text-teal-400'
                    : 'border-slate-300 bg-white/80 text-teal-700 shadow-sm'
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full animate-pulse ${
                    isDark ? 'bg-teal-400' : 'bg-teal-600'
                  }`}
                />
                STATSTRIKE CORE CALIBRATION
              </div>
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                Preparing High-Speed Telemetry
              </h2>
              <p
                className={`font-mono text-xs ${isDark ? 'text-white/50' : 'text-slate-500'}`}
              >
                {statusText}
              </p>
            </div>

            {/* Loading progress bar */}
            <div
              className={`mt-8 h-1 w-64 max-w-full overflow-hidden rounded-full ${
                isDark ? 'bg-white/10' : 'bg-slate-200'
              }`}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-teal-400 via-cyan-400 to-red-500"
                style={{ width: `${loadProgress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
            <span
              className={`mt-3 font-mono text-[10px] uppercase tracking-[0.25em] ${
                isDark ? 'text-white/40' : 'text-slate-500'
              }`}
            >
              FRAME{' '}
              {String(Math.round((loadProgress / 100) * TOTAL_FRAMES)).padStart(
                3,
                '0',
              )}{' '}
              {' // '} {TOTAL_FRAMES}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Canvas Viewport */}
      <div
        className={`sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden transition-colors duration-300 ${
          isDark ? 'bg-[#0b1113]' : 'bg-[#ecf2f4]'
        }`}
      >
        {/* Canvas element with hardware-accelerated theme inversion & hue-rotation */}
        <canvas
          ref={canvasRef}
          className="h-full w-full object-contain pointer-events-none"
          style={{
            backgroundColor: isDark ? '#0b1113' : '#ecf2f4',
            filter: isDark ? 'none' : 'invert(1) hue-rotate(180deg)',
            transition: 'filter 300ms ease, background-color 300ms ease',
          }}
        />

        {/* Ambient Subtle Grid & Vignette Overlay */}
        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
            isDark
              ? 'bg-[radial-gradient(ellipse_at_center,transparent_40%,#0b1113_95%)] opacity-80'
              : 'bg-[radial-gradient(ellipse_at_center,transparent_40%,#ecf2f4_95%)] opacity-60'
          }`}
        />

        {/* Telemetry HUD Elements: Corner Coordinates & Live Sensors */}
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between pt-24 sm:pt-28 pb-8 px-6 sm:px-10 select-none">
          {/* Top Bar Telemetry */}
          <div
            className={`flex items-start justify-between font-mono text-[10px] tracking-wider uppercase transition-colors duration-300 ${
              isDark ? 'text-white/50' : 'text-slate-600'
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex h-2 w-2 rounded-full animate-ping ${
                  isDark ? 'bg-teal-400' : 'bg-teal-600'
                }`}
              />
              <span
                className={
                  isDark ? 'text-white/80' : 'text-slate-900 font-semibold'
                }
              >
                CORE STATUS: STREAMING
              </span>
              <span
                className={`hidden sm:inline ${isDark ? 'text-white/30' : 'text-slate-400'}`}
              >
                |
              </span>
              <span className="hidden sm:inline">HAWKEYE 3D // 1000 FPS</span>
            </div>
            <div
              className={`flex items-center gap-4 text-right rounded-xl px-3 py-1.5 backdrop-blur-md border ${
                isDark
                  ? 'border-white/10 bg-[#0b1113]/80 text-white/80'
                  : 'border-slate-300/80 bg-white/85 text-slate-800 shadow-md'
              }`}
            >
              <div>
                <span className={isDark ? 'text-white/30' : 'text-slate-500'}>
                  FRAME:{' '}
                </span>
                <span
                  className={`font-semibold ${isDark ? 'text-teal-400' : 'text-teal-700'}`}
                >
                  {String(activeFrameDisplay).padStart(3, '0')}
                </span>
                <span className={isDark ? 'text-white/30' : 'text-slate-500'}>
                  {' '}
                  / {String(TOTAL_FRAMES).padStart(3, '0')}
                </span>
              </div>
              <div className="hidden sm:block">
                <span className={isDark ? 'text-white/30' : 'text-slate-500'}>
                  PHASE:{' '}
                </span>
                <span
                  className={`font-semibold ${isDark ? 'text-white/90' : 'text-slate-900'}`}
                >
                  {livePercent < 30
                    ? '01_ASSEMBLED'
                    : livePercent < 60
                      ? '02_EXPANDING'
                      : livePercent < 85
                        ? '03_EXPLODED'
                        : '04_REASSEMBLED'}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Bar Telemetry */}
          <div
            className={`flex items-end justify-between font-mono text-[10px] tracking-wider uppercase transition-colors duration-300 ${
              isDark ? 'text-white/50' : 'text-slate-600'
            }`}
          >
            <div className="space-y-1">
              <div
                className={`text-[9px] ${isDark ? 'text-white/30' : 'text-slate-400'}`}
              >
                SYSTEM GEOMETRY
              </div>
              <div
                className={
                  isDark ? 'text-white/70' : 'text-slate-800 font-semibold'
                }
              >
                WAGON RADAR 360° // BALLISTIC CORE
              </div>
            </div>

            {/* Scroll progress dial */}
            <div
              className={`flex items-center gap-3 rounded-full border px-3 py-1.5 backdrop-blur-md ${
                isDark
                  ? 'border-white/10 bg-white/5 text-white/90'
                  : 'border-slate-300/80 bg-white/85 text-slate-900 shadow-md'
              }`}
            >
              <div
                className={`h-1.5 w-16 overflow-hidden rounded-full ${
                  isDark ? 'bg-white/10' : 'bg-slate-200'
                }`}
              >
                <div
                  className={`h-full transition-all duration-100 ${
                    isDark ? 'bg-teal-400' : 'bg-teal-600'
                  }`}
                  style={{ width: `${livePercent}%` }}
                />
              </div>
              <span className="font-semibold">{livePercent}%</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* STORY OVERLAYS (4 Scroll-Synced Narrative Milestones)       */}
        {/* ============================================================ */}

        <div className="pointer-events-none absolute inset-0 z-30">
          {/* -------------------------------------------------------- */}
          {/* 0% SCROLL: HERO HEADLINE (Centered, Upper Stratum)       */}
          {/* -------------------------------------------------------- */}
          <motion.div
            style={{
              opacity: heroOpacity,
              y: heroY,
              scale: heroScale,
              visibility: heroVisibility,
              pointerEvents: heroPointerEvents,
            }}
            className="absolute inset-x-0 top-24 sm:top-28 lg:top-32 flex flex-col items-center text-center px-4 sm:px-6 select-none"
          >
            <div className="mx-auto flex flex-col items-center text-center max-w-3xl space-y-3 sm:space-y-4">
              <div
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 font-mono text-[11px] font-semibold tracking-wider backdrop-blur-md ${
                  isDark
                    ? 'border-teal-500/30 bg-teal-500/10 text-teal-400 shadow-[0_0_20px_rgba(20,184,166,0.15)]'
                    : 'border-teal-600/30 bg-teal-50/90 text-teal-800 shadow-sm'
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full animate-pulse ${
                    isDark ? 'bg-teal-400' : 'bg-teal-600'
                  }`}
                />
                <span>NEXT-GEN CRICKET INTELLIGENCE</span>
              </div>

              <h1
                className={`font-display text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.12] ${
                  isDark ? 'text-white/90' : 'text-slate-950'
                }`}
              >
                Every Ball. Every Angle.{' '}
                <span
                  className={`bg-clip-text text-transparent ${
                    isDark
                      ? 'bg-gradient-to-r from-white/90 via-teal-200 to-teal-400'
                      : 'bg-gradient-to-r from-slate-950 via-teal-700 to-teal-600'
                  }`}
                >
                  Deconstructed.
                </span>
              </h1>

              <p
                className={`max-w-xl text-xs sm:text-sm md:text-base leading-relaxed ${
                  isDark ? 'text-white/60' : 'text-slate-600'
                }`}
              >
                StatStrike fuses high-precision telemetry, Hawkeye pitch
                dynamics, and 360° wagon-wheel analytics into a unified tactical
                intelligence core.
              </p>

              {/* Scroll cue prompt */}
              <motion.div
                style={{ opacity: scrollCueOpacity }}
                className={`pt-2 sm:pt-3 flex flex-col items-center gap-1.5 ${
                  isDark ? 'text-white/40' : 'text-slate-500'
                }`}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.25em]">
                  Scroll to explode architecture
                </span>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className={`rounded-full border p-1.5 ${
                    isDark
                      ? 'border-white/20 text-white/70'
                      : 'border-slate-300 text-slate-700 bg-white/60 shadow-sm'
                  }`}
                >
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* -------------------------------------------------------- */}
          {/* 30% SCROLL: FEATURE / MESSAGE #1 (Left Aligned)          */}
          {/* -------------------------------------------------------- */}
          <motion.div
            style={{
              opacity: feat1Opacity,
              x: feat1X,
              visibility: feat1Visibility,
              pointerEvents: feat1PointerEvents,
            }}
            className="absolute inset-y-0 left-4 sm:left-10 lg:left-16 flex items-center justify-start max-w-md lg:max-w-lg select-none"
          >
            <div
              className={`space-y-4 rounded-2xl border p-5 sm:p-7 backdrop-blur-xl shadow-2xl ${
                isDark
                  ? 'border-white/10 bg-[#0b1113]/85 text-white/90 shadow-black/60'
                  : 'border-slate-200/90 bg-white/90 text-slate-900 shadow-slate-900/10'
              }`}
            >
              <div
                className={`flex items-center justify-between border-b pb-3 ${
                  isDark ? 'border-white/10' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full animate-pulse ${
                      isDark ? 'bg-cyan-400' : 'bg-cyan-600'
                    }`}
                  />
                  <span
                    className={`font-mono text-xs font-semibold uppercase tracking-widest ${
                      isDark ? 'text-cyan-400' : 'text-cyan-700'
                    }`}
                  >
                    01 // SENSOR FUSION LAYER
                  </span>
                </div>
                <span
                  className={`font-mono text-[10px] ${
                    isDark ? 'text-white/40' : 'text-slate-500'
                  }`}
                >
                  30% SCROLL
                </span>
              </div>

              <div className="space-y-2">
                <h2
                  className={`font-display text-xl sm:text-2xl font-bold tracking-tight ${
                    isDark ? 'text-white/90' : 'text-slate-950'
                  }`}
                >
                  Precision-Engineered Layer by Layer
                </h2>
                <p
                  className={`text-xs sm:text-sm leading-relaxed ${
                    isDark ? 'text-white/60' : 'text-slate-600'
                  }`}
                >
                  From ultra-high-speed pitch telemetry to multi-axis rotational
                  tracking, each calibrated stratum isolates delivery vectors
                  and aerodynamic swing deviation in real time.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[10px] sm:text-[11px]">
                <div
                  className={`rounded-lg border p-2 sm:p-2.5 ${
                    isDark
                      ? 'border-white/5 bg-white/5'
                      : 'border-slate-200/80 bg-slate-50/90'
                  }`}
                >
                  <div
                    className={`text-[9px] uppercase ${isDark ? 'text-white/40' : 'text-slate-500'}`}
                  >
                    Optical Sensor
                  </div>
                  <div
                    className={`font-semibold ${isDark ? 'text-teal-300' : 'text-teal-700'}`}
                  >
                    1000 FPS TRACKING
                  </div>
                </div>
                <div
                  className={`rounded-lg border p-2 sm:p-2.5 ${
                    isDark
                      ? 'border-white/5 bg-white/5'
                      : 'border-slate-200/80 bg-slate-50/90'
                  }`}
                >
                  <div
                    className={`text-[9px] uppercase ${isDark ? 'text-white/40' : 'text-slate-500'}`}
                  >
                    Pitch Impact
                  </div>
                  <div
                    className={`font-semibold ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}
                  >
                    0.2MM ACCURACY
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* -------------------------------------------------------- */}
          {/* 60% SCROLL: FEATURE / MESSAGE #2 (Right Aligned)         */}
          {/* -------------------------------------------------------- */}
          <motion.div
            style={{
              opacity: feat2Opacity,
              x: feat2X,
              visibility: feat2Visibility,
              pointerEvents: feat2PointerEvents,
            }}
            className="absolute inset-y-0 right-4 sm:right-10 lg:right-16 flex items-center justify-end max-w-md lg:max-w-lg select-none"
          >
            <div
              className={`space-y-4 rounded-2xl border p-5 sm:p-7 backdrop-blur-xl shadow-2xl text-right ${
                isDark
                  ? 'border-white/10 bg-[#0b1113]/85 text-white/90 shadow-black/60'
                  : 'border-slate-200/90 bg-white/90 text-slate-900 shadow-slate-900/10'
              }`}
            >
              <div
                className={`flex items-center justify-between border-b pb-3 flex-row-reverse ${
                  isDark ? 'border-white/10' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono text-xs font-semibold uppercase tracking-widest ${
                      isDark ? 'text-red-400' : 'text-red-600'
                    }`}
                  >
                    02 // KINETIC EXPLODED CORE
                  </span>
                  <span
                    className={`h-2 w-2 rounded-full animate-pulse ${
                      isDark ? 'bg-red-400' : 'bg-red-600'
                    }`}
                  />
                </div>
                <span
                  className={`font-mono text-[10px] ${
                    isDark ? 'text-white/40' : 'text-slate-500'
                  }`}
                >
                  60% SCROLL
                </span>
              </div>

              <div className="space-y-2">
                <h2
                  className={`font-display text-xl sm:text-2xl font-bold tracking-tight ${
                    isDark ? 'text-white/90' : 'text-slate-950'
                  }`}
                >
                  Uncompromising Depth. Total Tactical Clarity.
                </h2>
                <p
                  className={`text-xs sm:text-sm leading-relaxed ${
                    isDark ? 'text-white/60' : 'text-slate-600'
                  }`}
                >
                  Peel back the surface to inspect dual-core ballistic spheres,
                  laser-etched calibration chassis, and optical telemetry rings
                  engineered for the highest pressure match situations.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[10px] sm:text-[11px] text-left">
                <div
                  className={`rounded-lg border p-2 sm:p-2.5 ${
                    isDark
                      ? 'border-white/5 bg-white/5'
                      : 'border-slate-200/80 bg-slate-50/90'
                  }`}
                >
                  <div
                    className={`text-[9px] uppercase ${isDark ? 'text-white/40' : 'text-slate-500'}`}
                  >
                    Internal Cores
                  </div>
                  <div
                    className={`font-semibold ${isDark ? 'text-red-400' : 'text-red-600'}`}
                  >
                    DUAL BALLISTIC PU
                  </div>
                </div>
                <div
                  className={`rounded-lg border p-2 sm:p-2.5 ${
                    isDark
                      ? 'border-white/5 bg-white/5'
                      : 'border-slate-200/80 bg-slate-50/90'
                  }`}
                >
                  <div
                    className={`text-[9px] uppercase ${isDark ? 'text-white/40' : 'text-slate-500'}`}
                  >
                    Latency
                  </div>
                  <div
                    className={`font-semibold ${isDark ? 'text-white/90' : 'text-slate-900'}`}
                  >
                    &lt; 1.2MS INGEST
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* -------------------------------------------------------- */}
          {/* 90% SCROLL: CTA / FINAL MESSAGE (Upper Stratum Centered) */}
          {/* -------------------------------------------------------- */}
          <motion.div
            style={{
              opacity: ctaOpacity,
              y: ctaY,
              scale: ctaScale,
              visibility: ctaVisibility,
              pointerEvents: ctaPointerEvents,
            }}
            className="absolute inset-x-0 top-24 sm:top-28 lg:top-32 flex flex-col items-center text-center px-4 sm:px-6 select-none"
          >
            <div className="mx-auto flex flex-col items-center text-center max-w-2xl space-y-3 sm:space-y-4">
              <div
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 font-mono text-[11px] font-semibold tracking-wider backdrop-blur-md ${
                  isDark
                    ? 'border-teal-500/30 bg-teal-500/10 text-teal-400'
                    : 'border-teal-600/30 bg-teal-50 text-teal-800'
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isDark ? 'bg-teal-400' : 'bg-teal-600'
                  }`}
                />
                <span>03 // REASSEMBLED &amp; BATTLE TESTED</span>
              </div>

              <h2
                className={`font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.12] ${
                  isDark ? 'text-white/90' : 'text-slate-950'
                }`}
              >
                Engineered for Champions.{' '}
                <span
                  className={`bg-clip-text text-transparent ${
                    isDark
                      ? 'bg-gradient-to-r from-teal-300 via-cyan-200 to-white/90'
                      : 'bg-gradient-to-r from-teal-700 via-cyan-800 to-slate-950'
                  }`}
                >
                  Ready for Match Day.
                </span>
              </h2>

              <p
                className={`max-w-lg text-xs sm:text-sm md:text-base leading-relaxed ${
                  isDark ? 'text-white/60' : 'text-slate-600'
                }`}
              >
                When victory is decided by millimeters, elite franchises and
                analysts count on StatStrike to uncover game-defining edges.
              </p>

              {/* Action buttons with dynamic pointer events */}
              <motion.div
                style={{
                  pointerEvents: ctaPointerEvents,
                }}
                className="flex flex-wrap items-center justify-center gap-3 pt-2"
              >
                <a
                  href="/contact"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-teal-500 px-6 py-3 font-sans text-xs sm:text-sm font-semibold text-slate-950 transition-all duration-300 hover:bg-teal-400 hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] hover:scale-105"
                >
                  <span>Request Live Demo</span>
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>

                <a
                  href="#statstrike-software-timeline"
                  className={`inline-flex items-center gap-2 rounded-xl border px-5 py-3 font-sans text-xs sm:text-sm font-medium backdrop-blur-md transition-all duration-300 ${
                    isDark
                      ? 'border-white/20 bg-white/5 text-white/80 hover:border-white/40 hover:bg-white/10 hover:text-white'
                      : 'border-slate-300 bg-white/90 text-slate-700 hover:border-slate-400 hover:bg-white hover:text-slate-950 shadow-sm'
                  }`}
                >
                  <span>Explore UI Timeline</span>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AnimatedStatStrike;
