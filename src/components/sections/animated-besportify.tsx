'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';

const TOTAL_FRAMES = 150;
const BACKGROUND_COLOR = '#09080a';

// Formats frame index to 3-digit zero-padded string (e.g. 1 -> "001", 150 -> "150")
function getFramePath(index: number): string {
  const frameNumber = String(index + 1).padStart(3, '0');
  return `/besportify-scroll/ezgif-frame-${frameNumber}.jpg`;
}

/**
 * Calculates current frame based on scroll progress (0 to 1).
 * 0.0 -> 0.6: Explodes from Frame 0 to Frame 149 (Disassembly across 150 frames)
 * 0.6 -> 1.0: Smoothly reassembles from Frame 149 back to Frame 0
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

export function AnimatedBeSportify() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [activeFrameDisplay, setActiveFrameDisplay] = useState(1);
  const [statusText, setStatusText] = useState(
    'CALIBRATING TELEMETRY SENSORS...',
  );

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

    // Fill background with exact matching dark obsidian tone
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, w, h);

    // Calculate contain fit scaling (maintains 16:9 native aspect ratio)
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = w / h;

    const isDesktop = w >= 768;
    const scaleMultiplier = isDesktop ? 0.86 : 0.94;

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
    // On desktop, offset slightly downwards so the emblem sits gracefully in the lower-middle half,
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

  // Preload all 150 frames in memory
  useEffect(() => {
    let isMounted = true;
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    const updateStatus = (count: number) => {
      if (count < 35) setStatusText('INITIALIZING BALLISTIC DATA STREAM...');
      else if (count < 75)
        setStatusText('MAPPING 360° SPATIAL TRACKING MESH...');
      else if (count < 115)
        setStatusText('CALIBRATING EXPLODED HARDWARE ARRAY...');
      else if (count < 150)
        setStatusText('SYNCHRONIZING 150-FRAME TELEMETRY MATRIX...');
      else setStatusText('BESPORTIFY TELEMETRY MATRIX SYNCHRONIZED');
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
      className="relative h-[400vh] w-full bg-[#09080a] selection:bg-red-600/30"
      id="besportify-canvas-hero"
    >
      {/* Preloader overlay */}
      <AnimatePresence>
        {!imagesLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#09080a] px-6 text-center"
          >
            {/* High-tech telemetry radar spinner */}
            <div className="relative mb-8 flex h-32 w-32 items-center justify-center">
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 rounded-full border border-red-500/20 animate-ping" />
              {/* Radar sweep ring */}
              <div className="absolute inset-2 rounded-full border border-t-red-500 border-r-transparent border-b-red-500/30 border-l-transparent animate-spin" />
              {/* Counter-rotating segmented ring */}
              <div
                className="absolute inset-4 rounded-full border-2 border-dashed border-teal-500/40"
                style={{ animation: 'spin 12s linear infinite reverse' }}
              />
              {/* Center emblem icon & progress */}
              <div className="flex flex-col items-center justify-center">
                <span className="font-mono text-xl font-bold tracking-tight text-white/90">
                  {loadProgress}%
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-red-400">
                  DECODING
                </span>
              </div>
            </div>

            {/* Brand Title */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs uppercase tracking-widest text-red-400">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
                BESPORTIFY CORE CALIBRATION
              </div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white/90 sm:text-3xl">
                Preparing Sports Intelligence Matrix
              </h2>
              <p className="font-mono text-xs text-white/50">{statusText}</p>
            </div>

            {/* Loading progress bar */}
            <div className="mt-8 h-1 w-64 max-w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-red-500 via-rose-400 to-teal-400"
                style={{ width: `${loadProgress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
            <span className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
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
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-[#09080a]">
        {/* Canvas element */}
        <canvas
          ref={canvasRef}
          className="h-full w-full object-contain"
          style={{
            backgroundColor: BACKGROUND_COLOR,
          }}
        />

        {/* Ambient Subtle Grid & Vignette Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#09080a_95%)] opacity-85" />

        {/* Telemetry HUD Elements: Corner Coordinates & Live Sensors */}
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between pt-24 sm:pt-28 pb-8 px-6 sm:px-10 select-none">
          {/* Top Bar Telemetry */}
          <div className="flex items-start justify-between gap-4 font-mono text-[10px] tracking-wider text-white/50 uppercase">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-2 w-2 rounded-full bg-red-400 animate-ping" />
              <span className="text-white/80">BESPORTIFY CORE: STREAMING</span>
              <span className="hidden text-white/30 sm:inline">|</span>
              <span className="hidden sm:inline">150-FRAME KINETIC MATRIX</span>
            </div>
            <div className="hidden shrink-0 items-center gap-4 text-right sm:flex">
              <div>
                <span className="text-white/30">FRAME: </span>
                <span className="font-semibold text-red-400">
                  {String(activeFrameDisplay).padStart(3, '0')}
                </span>
                <span className="text-white/30">
                  {' '}
                  / {String(TOTAL_FRAMES).padStart(3, '0')}
                </span>
              </div>
              <div className="hidden sm:block">
                <span className="text-white/30">PHASE: </span>
                <span className="font-semibold text-white/90">
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
          <div className="flex items-end justify-between font-mono text-[10px] tracking-wider text-white/50 uppercase">
            <div className="space-y-1">
              <div className="text-[9px] text-white/30">
                INTELLIGENCE PLATFORM
              </div>
              <div className="text-white/70">
                WAGON RADAR 360° // SPATIAL ENGINE
              </div>
            </div>

            {/* Scroll progress dial */}
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md">
              <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full bg-red-500 transition-all duration-100"
                  style={{ width: `${livePercent}%` }}
                />
              </div>
              <span className="font-semibold text-white/90">
                {livePercent}%
              </span>
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
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3.5 py-1 font-mono text-[11px] font-semibold tracking-wider text-red-400 backdrop-blur-md shadow-[0_0_20px_rgba(237,28,36,0.15)]">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
                <span>BESPORTIFY // NEXT-GEN ATHLETIC TELEMETRY</span>
              </div>

              <h1 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-white/90 leading-[1.12]">
                Precision Telemetry. Athletic Mastery.{' '}
                <span className="bg-gradient-to-r from-white/90 via-red-300 to-red-500 bg-clip-text text-transparent">
                  Deconstructed.
                </span>
              </h1>

              <p className="max-w-xl text-xs sm:text-sm md:text-base leading-relaxed text-white/60">
                BeSportify fuses spatial computer vision, biomechanical
                tracking, and real-time tactical intelligence into an elite
                decision platform.
              </p>

              {/* Scroll cue prompt */}
              <motion.div
                style={{ opacity: scrollCueOpacity }}
                className="pt-2 sm:pt-3 flex flex-col items-center gap-1.5 text-white/40"
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
                  className="rounded-full border border-white/20 p-1.5 text-white/70"
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
            className="absolute inset-y-0 left-4 hidden max-w-md items-center justify-start select-none sm:flex sm:left-10 lg:left-16 lg:max-w-lg"
          >
            <div className="space-y-4 rounded-2xl border border-white/10 bg-[#09080a]/85 p-5 sm:p-7 backdrop-blur-xl shadow-2xl shadow-black/60">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
                  <span className="font-mono text-xs font-semibold uppercase tracking-widest text-red-400">
                    01 // SPATIAL BIOMECHANICS &amp; FUSION
                  </span>
                </div>
                <span className="font-mono text-[10px] text-white/40">
                  30% SCROLL
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white/90">
                  Sub-Millimeter Athletic Ingestion
                </h2>
                <p className="text-xs sm:text-sm leading-relaxed text-white/60">
                  From ultra-high-speed pitch telemetry to multi-axis rotational
                  tracking, every calibrated stratum isolates delivery vectors
                  and kinetic swing mechanics in real time.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[10px] sm:text-[11px]">
                <div className="rounded-lg border border-white/5 bg-white/5 p-2 sm:p-2.5">
                  <div className="text-white/40 text-[9px] uppercase">
                    Optical Capture
                  </div>
                  <div className="font-semibold text-red-400">
                    1000 FPS TRACKING
                  </div>
                </div>
                <div className="rounded-lg border border-white/5 bg-white/5 p-2 sm:p-2.5">
                  <div className="text-white/40 text-[9px] uppercase">
                    Spatial Precision
                  </div>
                  <div className="font-semibold text-teal-300">
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
            className="absolute inset-y-0 right-4 hidden max-w-md items-center justify-end select-none sm:flex sm:right-10 lg:right-16 lg:max-w-lg"
          >
            <div className="space-y-4 rounded-2xl border border-white/10 bg-[#09080a]/85 p-5 sm:p-7 backdrop-blur-xl shadow-2xl shadow-black/60 text-right">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 flex-row-reverse">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold uppercase tracking-widest text-teal-400">
                    02 // KINETIC HARDWARE CORE
                  </span>
                  <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
                </div>
                <span className="font-mono text-[10px] text-white/40">
                  60% SCROLL
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white/90">
                  Tactical Depth. Zero-Latency Execution.
                </h2>
                <p className="text-xs sm:text-sm leading-relaxed text-white/60">
                  Inspect dual-core ballistic spheres, laser-etched standoff
                  chassis, and optical telemetry layers engineered for the
                  highest-pressure competitive fixtures.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[10px] sm:text-[11px] text-left">
                <div className="rounded-lg border border-white/5 bg-white/5 p-2 sm:p-2.5">
                  <div className="text-white/40 text-[9px] uppercase">
                    Telemetry Cores
                  </div>
                  <div className="font-semibold text-teal-300">
                    DUAL BALLISTIC PU
                  </div>
                </div>
                <div className="rounded-lg border border-white/5 bg-white/5 p-2 sm:p-2.5">
                  <div className="text-white/40 text-[9px] uppercase">
                    Latency
                  </div>
                  <div className="font-semibold text-white/90">
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
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3.5 py-1 font-mono text-[11px] font-semibold tracking-wider text-red-400 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                <span>03 // REASSEMBLED &amp; BATTLE READY</span>
              </div>

              <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white/90 leading-[1.12]">
                Engineered for Champions.{' '}
                <span className="bg-gradient-to-r from-red-400 via-rose-300 to-white/90 bg-clip-text text-transparent">
                  Ready for Game Day.
                </span>
              </h2>

              <p className="max-w-lg text-xs sm:text-sm md:text-base leading-relaxed text-white/60">
                When elite outcomes are decided by fractions of a second,
                world-class organizations count on BeSportify to build winning
                edges.
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
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-red-500 px-6 py-3 font-sans text-xs sm:text-sm font-semibold text-white transition-all duration-300 hover:bg-red-600 hover:shadow-[0_0_30px_rgba(237,28,36,0.4)] hover:scale-105"
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
                  href="#homepage-capabilities"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 font-sans text-xs sm:text-sm font-medium text-white/80 backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:text-white"
                >
                  <span>Explore Platform</span>
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

export default AnimatedBeSportify;
