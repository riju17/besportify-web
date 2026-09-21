'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeMode } from '@/components/theme/theme-provider';

export interface TimelineStep {
  step: number;
  stageCode: string;
  moduleBadge: string;
  badgeTone: 'teal' | 'red' | 'cyan' | 'amber' | 'blue';
  title: string;
  summary: string;
  detailedAnalysis: string;
  keyFeatures: string[];
  imageSrc: string;
  imageDimensions: string;
  technicalTags: string[];
}

export const TIMELINE_STEPS: TimelineStep[] = [
  {
    step: 1,
    stageCode: '01 // SYSTEM INITIALIZATION',
    moduleBadge: 'CORE CLIENT LAUNCH',
    badgeTone: 'teal',
    title: 'System Launch & Central Architecture Core',
    summary:
      'The initial entry point of the StatStrike desktop client, engineered for high-performance offline scoring, low-latency database access, and centralized module navigation.',
    detailedAnalysis:
      'The clean, minimalist launch console provides immediate access to the four core software subsystems: File Management, Live Scoring Engine, Hardware & System Settings, and Tactical Analytical Reports. Designed for elite match venues where cloud reliance must be backed by bulletproof local runtime stability.',
    keyFeatures: [
      'Fast cold boot with zero external dependencies',
      'Local-first SQLite & telemetry caching architecture',
      'Unified top-bar navigation (File, Scoring, Settings, Reports)',
      'StatStrike proprietary brand emblem and environment status',
    ],
    imageSrc: '/statstrike-ui/1.jpeg',
    imageDimensions: '1600 × 956 px',
    technicalTags: ['DESKTOP RUNTIME', 'LOCAL CACHE', 'MODULE ROOT'],
  },
  {
    step: 2,
    stageCode: '02 // FIXTURE PROTOCOL',
    moduleBadge: 'MATCH SETUP & ROSTERS',
    badgeTone: 'blue',
    title: 'Match Configuration, Officials & Team Rosters',
    summary:
      'Comprehensive pre-match configuration interface establishing competition parameters, certified match officials, and full playing XI squads.',
    detailedAnalysis:
      'Prior to first ball delivery, operators establish the competition schema including Season, Match Type, Venue/Ground, Series, Timing, and Calendar Date. It enforces official integrity by registering both on-field umpires, TV umpire, reserve umpire, match referee, official scorers, and certified video analysts. Dual team rosters allow instantaneous assignment of captains, wicketkeepers, and active squad members.',
    keyFeatures: [
      'Multi-tiered competition metadata schema with quick modal add/edit',
      'Official designation: Umpires, Match Referee, Scorers & Analysts',
      'Two-column team roster builder with captain & keeper assignment',
      'Roster validation preventing invalid lineup submissions',
    ],
    imageSrc: '/statstrike-ui/2.jpeg',
    imageDimensions: '1600 × 952 px',
    technicalTags: ['SQUAD SCHEMA', 'OFFICIAL REGISTRY', 'MATCH INIT'],
  },
  {
    step: 3,
    stageCode: '03 // BALL INGESTION MATRIX',
    moduleBadge: 'LIVE TELEMETRY CODING',
    badgeTone: 'amber',
    title: 'Granular Ball-by-Ball Telemetry & Spatial Ingestion',
    summary:
      'The high-speed live coding cockpit used by professional match analysts to tag multi-dimensional pitch landing spots, delivery attributes, and batsman mechanics in real time.',
    detailedAnalysis:
      'This dense, ergonomic console allows an analyst to capture a complete delivery in under two seconds. Center stage features an interactive 2D pitch length map (Yorker, Full, Good, Back of a Length, Short Pitch) and a 360° radial wagon wheel with ball arrival trajectory. The right pane provides instant single-click buttons for 19 bowling delivery types (Outswing, Inswing, Reverse, Cutters, Knuckle Ball), batsman footwork/movement, bat contact zones (Mid of bat, Edges, Pad), fielding event loggers, and DRS appeal records.',
    keyFeatures: [
      'Interactive 2D pitch landing coordinate logger with length zones',
      '360° Wagon Wheel radial shot placement vector mapping',
      '19 bowling variations across Spin and Fast classifications',
      'Biomechanical batsman footwork tracking and ball speed (km/h) input',
      'Bat contact point isolation (Edges, Splice, Mid, Pad, Body)',
      'Fielder action log (Well Fielded, Slide N Stop, Brilliant Stop)',
    ],
    imageSrc: '/statstrike-ui/3.jpeg',
    imageDimensions: '1600 × 957 px',
    technicalTags: ['1000 FPS LOGGING', '2D PITCH MAP', '360° WAGON WHEEL'],
  },
  {
    step: 4,
    stageCode: '04 // BROADCAST SYNC',
    moduleBadge: 'LIVE OPERATIONS & VIDEO',
    badgeTone: 'red',
    title: 'Live Match Operations & Synchronized Video Feed',
    summary:
      'Mission-critical live match cockpit integrating real-time camera capture feeds with instantaneous ball scoring, over control, and dynamic run rates.',
    detailedAnalysis:
      'Here the live hardware video feed (external high-speed USB/SDI camera) is mapped frame-accurately to the active ball event stream. The operator monitors the live match situation (e.g. Gwalior Cheetahs vs Bhopal Leopards), current run rate, and dynamically updated required run rate. Dedicated controls allow immediate Start Ball, End Ball, Edit Ball, and End Over sequences while logging batsman strike rates, bowler spell figures, and over-by-over progress.',
    keyFeatures: [
      'Direct external hardware camera video display integration',
      'Frame-synchronized video timestamping linked to ball events',
      'Dynamic Current Run Rate (CRR) & Required Run Rate (RRR) engine',
      'Active batter & bowler live scorecard strip with over sequence ticker',
      'Instant operator ball controls: Start Ball, End Ball, Edit Ball',
    ],
    imageSrc: '/statstrike-ui/4.jpeg',
    imageDimensions: '1600 × 955 px',
    technicalTags: ['CAMERA INGEST', 'FRAME SYNC', 'LIVE SCOREBOARD'],
  },
  {
    step: 5,
    stageCode: '05 // OFFICIAL SCORECARD',
    moduleBadge: 'SCORECARD & VIDEO REELS',
    badgeTone: 'cyan',
    title: 'Official Inning Scorecard & 1-Click Video Replay Index',
    summary:
      'Broadcast-grade official inning scorecard tabulating complete batting and bowling figures with embedded one-click video review for every individual player.',
    detailedAnalysis:
      'The comprehensive scorecard module details every batter dismissal, runs, balls, dots, boundaries (4s/6s), and strike rates, alongside complete bowler spell metrics. Critically, each player row incorporates a dedicated video playback button (▶) that automatically compiles and streams every ball faced or bowled by that athlete, eliminating manual video cutting for coaching staff.',
    keyFeatures: [
      'Inning 1 and Inning 2 tabbed scorecards with print/export capabilities',
      'Embedded video clip trigger (▶) beside every batsman and bowler entry',
      'Sequential Fall of Wickets timeline with exact score and over citations',
      'Bowling analysis including maidens, dot balls, economy rate, and extras',
    ],
    imageSrc: '/statstrike-ui/5.jpeg',
    imageDimensions: '1600 × 841 px',
    technicalTags: ['1-CLICK VIDEO REEL', 'OFFICIAL LEDGER', 'FALL OF WICKETS'],
  },
  {
    step: 6,
    stageCode: '06 // PLAYER & MATCHUP DIAGNOSTICS',
    moduleBadge: 'BIOMETRIC HUD & ELEVATION',
    badgeTone: 'teal',
    title: 'Head-to-Head Player Telemetry & 3D Stance Elevation Matrix',
    summary:
      'Granular batter vs bowler matchup intelligence featuring a 3D batsman silhouette with ball arrival height, pitch data tables, and filtered video playlists.',
    detailedAnalysis:
      'This diagnostic screen isolates head-to-head tactical battles (e.g. Kartik Parihar vs Parth Sahani). It cross-tabulates a Pitch Data Matrix contrasting Line (Outside Leg, On Stump, Outside Off) against Length (Yorker, Full, Good, Back of Length, Short). Uniquely, it renders a physical 1ft to 6ft batsman silhouette showing exact ball arrival elevation at the crease, coupled with 360° wagon wheel lines, pitch scatter plots, and filtered video playlists by outcome (Dots, 1s, 4s, 6s, Wickets).',
    keyFeatures: [
      'Batter vs Bowler and Bowler vs Batter comparative matchup toggle',
      '6-ft batsman silhouette elevation grid plotting ball arrival height',
      'Pitch line & length frequency matrix cross-tabulation',
      'Multi-parameter filters: Over range slider (0–19), shot type, feet',
      'Instant video reel filters for dots, singles, boundaries, and dismissals',
    ],
    imageSrc: '/statstrike-ui/6.jpeg',
    imageDimensions: '1600 × 956 px',
    technicalTags: ['STANCE ELEVATION', 'LINE-LENGTH MATRIX', 'HEAD-TO-HEAD'],
  },
  {
    step: 7,
    stageCode: '07 // PARTNERSHIP METRICS',
    moduleBadge: 'PARTNERSHIP DYNAMICS',
    badgeTone: 'amber',
    title: 'Tactical Partnership Dynamics & Contribution Breakdown',
    summary:
      'Visual partnership evaluation mapping wicket-by-wicket scoring contributions, extras conceded, and momentum distribution across both innings.',
    detailedAnalysis:
      'The Partnerships view deconstructs the build-up of every batting stand (e.g. 1st Wicket: 90 runs off 44 balls; 3rd Wicket: 79 runs off 36 balls). Visual horizontal multi-tone proportional bars separate Batter 1 runs (yellow), conceded extras (blue), and Batter 2 runs (green), exposing scoring dominance and strike rotation efficiency during critical match intervals.',
    keyFeatures: [
      'Wicket-by-wicket chronological partnership breakdown',
      'Proportional three-tone contribution bars (Batter 1, Extras, Batter 2)',
      'Ball counts, individual scoring shares, and partnership run rates',
      'Direct comparison toggle between Inning 1 and Inning 2 stands',
    ],
    imageSrc: '/statstrike-ui/7.jpeg',
    imageDimensions: '1600 × 612 px',
    technicalTags: ['PARTNERSHIP STACKS', 'RUN CONTRIBUTION', 'MOMENTUM'],
  },
  {
    step: 8,
    stageCode: '08 // COMPARATIVE ANALYTICS',
    moduleBadge: 'MACRO MATCH CHARTS',
    badgeTone: 'cyan',
    title: 'Macro Match Analytics: Manhattan & Worm Trajectories',
    summary:
      'High-level macro match visualization providing comparative Manhattan scoring bars and Worm run curves with integrated wicket milestone markers.',
    detailedAnalysis:
      'The final analytical preface visualizes the match macro-narrative across all 20 overs. The Manhattan chart contrasts over-by-over runs scored by both teams, overlaying circular markers for every wicket lost. Directly beneath, the cumulative Worm chart plots comparative run scoring trajectories, illustrating momentum swings, run-rate inflection points, and the precise moment of victory.',
    keyFeatures: [
      'Comparative dual-team Manhattan chart with per-over scoring bars',
      'Fall-of-wicket circular badges integrated directly into over bars',
      'Continuous Worm curve displaying cumulative run accumulation',
      'Export-ready presentation format for post-match team tactical review',
    ],
    imageSrc: '/statstrike-ui/8.jpeg',
    imageDimensions: '1600 × 885 px',
    technicalTags: ['MANHATTAN CHART', 'WORM CURVE', 'MOMENTUM INFLECTION'],
  },
];

export function StatStrikeTimeline() {
  const { theme } = useThemeMode();
  const isDark = theme === 'dark';

  const [activeStep, setActiveStep] = useState<number>(1);
  const [modalStep, setModalStep] = useState<TimelineStep | null>(null);

  // Keyboard navigation for full-screen inspection modal
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!modalStep) return;
      if (e.key === 'Escape') {
        setModalStep(null);
      } else if (
        e.key === 'ArrowRight' &&
        modalStep.step < TIMELINE_STEPS.length
      ) {
        setModalStep(TIMELINE_STEPS[modalStep.step]);
      } else if (e.key === 'ArrowLeft' && modalStep.step > 1) {
        setModalStep(TIMELINE_STEPS[modalStep.step - 2]);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalStep]);

  const scrollToStep = (stepNumber: number) => {
    setActiveStep(stepNumber);
    const el = document.getElementById(`timeline-step-${stepNumber}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section
      id="statstrike-software-timeline"
      className={`relative z-20 py-24 sm:py-32 transition-colors duration-300 border-t overflow-hidden ${
        isDark
          ? 'bg-[#0b1113] text-white/90 border-white/10'
          : 'bg-slate-50/60 text-slate-900 border-slate-200/80'
      }`}
    >
      {/* Ambient background lighting */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute top-1/4 left-1/4 h-96 w-96 rounded-full blur-[140px] ${
            isDark ? 'bg-teal-500/10' : 'bg-teal-500/5'
          }`}
        />
        <div
          className={`absolute bottom-1/3 right-1/4 h-96 w-96 rounded-full blur-[140px] ${
            isDark ? 'bg-cyan-500/10' : 'bg-cyan-500/5'
          }`}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-4xl mx-auto">
          <div
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-xs font-semibold tracking-wider ${
              isDark
                ? 'border-teal-500/30 bg-teal-500/10 text-teal-400'
                : 'border-teal-600/30 bg-teal-50 text-teal-800 shadow-sm'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full animate-pulse ${
                isDark ? 'bg-teal-400' : 'bg-teal-600'
              }`}
            />
            <span>WORKING SOFTWARE PREFACES // 01 — 08</span>
          </div>

          <h2
            className={`font-display text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl ${
              isDark ? 'text-white/90' : 'text-slate-950'
            }`}
          >
            Inside the Interface:{' '}
            <span
              className={`bg-clip-text text-transparent ${
                isDark
                  ? 'bg-gradient-to-r from-white/90 via-teal-200 to-teal-400'
                  : 'bg-gradient-to-r from-slate-950 via-teal-700 to-teal-600'
              }`}
            >
              Software Timeline
            </span>
          </h2>

          <p
            className={`text-base sm:text-lg leading-relaxed max-w-3xl ${
              isDark ? 'text-white/60' : 'text-slate-600'
            }`}
          >
            Authentic screenshots from our active desktop client. Follow the
            chronological lifecycle of a match from fixture initialization, to
            live ball-by-ball telemetry ingestion, broadcast video
            synchronization, and deep tactical analytics.
          </p>
        </div>

        {/* Quick-Jump Step Navigator Bar */}
        <div className="mt-12 sticky top-20 z-30 overflow-x-auto pb-2 scrollbar-none">
          <div
            className={`flex items-center justify-start lg:justify-center gap-2 min-w-max p-2 rounded-2xl border backdrop-blur-xl shadow-2xl transition-colors duration-300 ${
              isDark
                ? 'border-white/10 bg-[#0b1113]/90'
                : 'border-slate-200/90 bg-white/90 shadow-xl'
            }`}
          >
            {TIMELINE_STEPS.map((s) => (
              <button
                key={s.step}
                onClick={() => scrollToStep(s.step)}
                className={`group flex items-center gap-2 rounded-xl px-3.5 py-2 font-mono text-xs tracking-wider transition-all duration-300 ${
                  activeStep === s.step
                    ? 'bg-teal-500 text-slate-950 font-bold shadow-[0_0_20px_rgba(20,184,166,0.35)] scale-[1.02]'
                    : isDark
                      ? 'text-white/60 hover:text-white hover:bg-white/5'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-md font-bold text-[10px] ${
                    activeStep === s.step
                      ? isDark
                        ? 'bg-[#0b1113] text-teal-400'
                        : 'bg-white text-teal-700 shadow-sm'
                      : isDark
                        ? 'border border-white/20 text-white/70 group-hover:border-white/40'
                        : 'border border-slate-300 text-slate-700 group-hover:border-slate-400'
                  }`}
                >
                  {String(s.step).padStart(2, '0')}
                </span>
                <span className="whitespace-nowrap hidden md:inline">
                  {s.moduleBadge}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* =================================================================== */}
        {/* CENTER TIMELINE WITH ALTERNATING LEFT/RIGHT IMAGES (1 - 8)         */}
        {/* =================================================================== */}
        <div className="relative mt-20 sm:mt-28">
          {/* Central Glowing Timeline Spine Line (Desktop) */}
          <div
            aria-hidden="true"
            className={`hidden lg:block absolute left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-gradient-to-b ${
              isDark
                ? 'from-teal-500/20 via-teal-500/60 to-teal-500/20 shadow-[0_0_12px_rgba(20,184,166,0.4)]'
                : 'from-teal-600/20 via-teal-600/50 to-teal-600/20 shadow-[0_0_8px_rgba(20,184,166,0.2)]'
            }`}
          />

          {/* Mobile Timeline Spine Line (Left aligned on small screens) */}
          <div
            aria-hidden="true"
            className={`lg:hidden absolute left-5 top-4 bottom-4 w-[2px] bg-gradient-to-b ${
              isDark
                ? 'from-teal-500/30 via-teal-500/60 to-teal-500/30'
                : 'from-teal-600/30 via-teal-600/50 to-teal-600/30'
            }`}
          />

          {/* Timeline Step Items */}
          <div className="space-y-20 sm:space-y-28">
            {TIMELINE_STEPS.map((step) => {
              const isEven = step.step % 2 === 0; // Even: Image on Right, Odd: Image on Left

              return (
                <div
                  id={`timeline-step-${step.step}`}
                  key={step.step}
                  className="relative group scroll-mt-36"
                >
                  {/* Center Node Badge (Desktop) */}
                  <div
                    aria-hidden="true"
                    className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex-col items-center justify-center"
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full border-2 font-mono text-sm font-bold transition-all duration-300 ${
                        isDark ? 'bg-[#0b1113]' : 'bg-white shadow-md'
                      } ${
                        activeStep === step.step
                          ? isDark
                            ? 'border-teal-400 text-teal-300 shadow-[0_0_24px_rgba(20,184,166,0.7)] scale-110'
                            : 'border-teal-600 text-teal-700 shadow-[0_0_16px_rgba(20,184,166,0.3)] scale-110'
                          : isDark
                            ? 'border-white/30 text-white/70 group-hover:border-teal-400/80 group-hover:text-teal-300'
                            : 'border-slate-300 text-slate-700 group-hover:border-teal-600 group-hover:text-teal-700'
                      }`}
                    >
                      {String(step.step).padStart(2, '0')}
                    </div>
                    <span
                      className={`mt-1 rounded px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest border ${
                        isDark
                          ? 'bg-[#0b1113]/90 text-teal-400/90 border-white/10'
                          : 'bg-white/95 text-teal-700 border-slate-200 shadow-sm'
                      }`}
                    >
                      STEP {step.step}
                    </span>
                  </div>

                  {/* Mobile Node Badge */}
                  <div className="lg:hidden flex items-center gap-3 mb-4 pl-1">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full border-2 font-mono text-xs font-bold ${
                        isDark
                          ? 'border-teal-400 bg-[#0b1113] text-teal-300 shadow-[0_0_12px_rgba(20,184,166,0.5)]'
                          : 'border-teal-600 bg-white text-teal-700 shadow-md'
                      }`}
                    >
                      {String(step.step).padStart(2, '0')}
                    </div>
                    <span
                      className={`font-mono text-xs font-semibold tracking-wider ${
                        isDark ? 'text-teal-400' : 'text-teal-700'
                      }`}
                    >
                      {step.stageCode}
                    </span>
                  </div>

                  {/* Alternating Two-Column Grid across the central timeline */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-center pl-10 lg:pl-0">
                    {/* ======================================================= */}
                    {/* IMAGE COLUMN: Left on Odd, Right on Even               */}
                    {/* ======================================================= */}
                    <div
                      className={`w-full ${
                        isEven ? 'lg:order-2 lg:pl-6' : 'lg:order-1 lg:pr-6'
                      }`}
                    >
                      <div
                        onClick={() => {
                          setActiveStep(step.step);
                          setModalStep(step);
                        }}
                        className={`group/img relative cursor-pointer overflow-hidden rounded-2xl border transition-all duration-500 hover:-translate-y-1 shadow-2xl ${
                          isDark
                            ? 'border-white/15 bg-[#0f1719] hover:border-teal-400/60 hover:shadow-[0_16px_48px_rgba(0,0,0,0.8)]'
                            : 'border-slate-200/90 bg-white hover:border-teal-500/60 hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)]'
                        }`}
                      >
                        {/* High-Resolution 1600px Screenshot Frame */}
                        <div
                          className={`relative aspect-[16/10] w-full overflow-hidden ${
                            isDark ? 'bg-[#060a0c]' : 'bg-slate-100'
                          }`}
                        >
                          <Image
                            src={step.imageSrc}
                            alt={step.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-contain transition-transform duration-500 ease-out group-hover/img:scale-[1.03]"
                          />
                          {/* Ambient inner shadow overlay */}
                          <div
                            className={`pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent ${
                              isDark
                                ? 'from-[#0b1113]/70 opacity-70'
                                : 'from-slate-900/40 opacity-40'
                            }`}
                          />

                          {/* Top-Left Telemetry Badge */}
                          <div className="absolute top-3 left-3">
                            <span
                              className={`rounded-md border px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wider backdrop-blur-md ${
                                isDark
                                  ? 'border-white/15 bg-[#0b1113]/85 text-teal-400'
                                  : 'border-slate-200 bg-white/90 text-teal-700 shadow-sm'
                              }`}
                            >
                              SCREENSHOT // {step.imageDimensions}
                            </span>
                          </div>

                          {/* Hover Fullscreen Prompt */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover/img:opacity-100 bg-black/45 backdrop-blur-[2px]">
                            <div
                              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 font-mono text-xs font-semibold shadow-2xl ${
                                isDark
                                  ? 'border-teal-400/60 bg-[#0b1113]/95 text-teal-300'
                                  : 'border-teal-600/60 bg-white/95 text-teal-800'
                              }`}
                            >
                              <svg
                                className={`h-4 w-4 ${isDark ? 'text-teal-400' : 'text-teal-600'}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                />
                              </svg>
                              <span>Click to Inspect 1600px 4K View</span>
                            </div>
                          </div>
                        </div>

                        {/* Card Footer Bar */}
                        <div
                          className={`flex items-center justify-between border-t px-4 py-2.5 font-mono text-[11px] ${
                            isDark
                              ? 'border-white/10 bg-[#0b1113] text-white/50'
                              : 'border-slate-200 bg-slate-50 text-slate-600'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`h-1.5 w-1.5 rounded-full animate-pulse ${
                                isDark ? 'bg-teal-400' : 'bg-teal-600'
                              }`}
                            />
                            <span>
                              PREFACE {String(step.step).padStart(2, '0')}{' '}
                              {' // '} 08
                            </span>
                          </div>
                          <span
                            className={`font-medium group-hover/img:underline ${
                              isDark ? 'text-teal-400/90' : 'text-teal-700'
                            }`}
                          >
                            INSPECT FULL SCREEN ↗
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ======================================================= */}
                    {/* DETAILS COLUMN: Right on Odd, Left on Even             */}
                    {/* ======================================================= */}
                    <div
                      className={`w-full space-y-5 rounded-2xl border p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 ${
                        isDark
                          ? 'border-white/10 bg-[#0f1719]/90 group-hover:border-white/20'
                          : 'border-slate-200/90 bg-white/90 group-hover:border-slate-300 shadow-xl'
                      } ${
                        isEven ? 'lg:order-1 lg:pr-6' : 'lg:order-2 lg:pl-6'
                      }`}
                    >
                      {/* Stage Code & Module Tag */}
                      <div
                        className={`flex flex-wrap items-center gap-2 border-b pb-3 ${
                          isDark ? 'border-white/10' : 'border-slate-200'
                        }`}
                      >
                        <span
                          className={`rounded-md border px-2.5 py-1 font-mono text-xs font-semibold ${
                            isDark
                              ? 'border-teal-500/30 bg-teal-500/10 text-teal-400'
                              : 'border-teal-600/30 bg-teal-50 text-teal-800'
                          }`}
                        >
                          {step.stageCode}
                        </span>
                        <span
                          className={`font-mono text-xs uppercase tracking-wider ${
                            isDark ? 'text-white/40' : 'text-slate-500'
                          }`}
                        >
                          {step.moduleBadge}
                        </span>
                      </div>

                      {/* Title & Summary */}
                      <div className="space-y-2">
                        <h3
                          className={`font-display text-2xl font-bold tracking-tight transition-colors ${
                            isDark
                              ? 'text-white/90 group-hover:text-teal-300'
                              : 'text-slate-950 group-hover:text-teal-700'
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p
                          className={`text-sm leading-relaxed ${
                            isDark ? 'text-white/60' : 'text-slate-600'
                          }`}
                        >
                          {step.summary}
                        </p>
                      </div>

                      {/* Detailed Architectural Breakdown */}
                      <div
                        className={`rounded-xl border p-4 space-y-2 ${
                          isDark
                            ? 'border-white/10 bg-white/5'
                            : 'border-slate-200/80 bg-slate-50/90'
                        }`}
                      >
                        <div
                          className={`font-mono text-[11px] font-semibold uppercase tracking-wider ${
                            isDark ? 'text-teal-300' : 'text-teal-700'
                          }`}
                        >
                          Software Functional Role
                        </div>
                        <p
                          className={`text-xs leading-relaxed ${
                            isDark ? 'text-white/75' : 'text-slate-700'
                          }`}
                        >
                          {step.detailedAnalysis}
                        </p>
                      </div>

                      {/* Key Interface Capabilities Checklist */}
                      <div className="space-y-2">
                        <div
                          className={`font-mono text-[11px] uppercase tracking-wider ${
                            isDark ? 'text-white/40' : 'text-slate-500'
                          }`}
                        >
                          Key Interface Capabilities
                        </div>
                        <ul
                          className={`grid gap-2 text-xs ${
                            isDark ? 'text-white/80' : 'text-slate-800'
                          }`}
                        >
                          {step.keyFeatures.map((feat, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span
                                className={`mt-1 h-1.5 w-1.5 rounded-full shrink-0 ${
                                  isDark ? 'bg-teal-400' : 'bg-teal-600'
                                }`}
                              />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Inspect Action */}
                      <div
                        className={`pt-2 flex items-center justify-between border-t ${
                          isDark ? 'border-white/10' : 'border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {step.technicalTags.map((tag) => (
                            <span
                              key={tag}
                              className={`rounded border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ${
                                isDark
                                  ? 'border-white/5 bg-white/5 text-white/50'
                                  : 'border-slate-200 bg-slate-100 text-slate-600'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => {
                            setActiveStep(step.step);
                            setModalStep(step);
                          }}
                          className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs font-semibold transition-all ${
                            isDark
                              ? 'bg-teal-500/10 border-teal-500/30 text-teal-300 hover:bg-teal-500 hover:text-[#0b1113]'
                              : 'bg-teal-50 border-teal-600/30 text-teal-800 hover:bg-teal-500 hover:text-slate-950'
                          }`}
                        >
                          <span>Inspect Full UI</span>
                          <span>↗</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* FULL-SCREEN 4K LIGHTBOX INSPECTION MODAL                            */}
      {/* =================================================================== */}
      <AnimatePresence>
        {modalStep && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalStep(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative max-h-[94vh] w-full max-w-6xl overflow-hidden rounded-2xl border shadow-2xl flex flex-col ${
                isDark
                  ? 'border-white/15 bg-[#0e1618]'
                  : 'border-slate-200 bg-white text-slate-900'
              }`}
            >
              {/* Modal Header */}
              <div
                className={`flex items-center justify-between border-b px-6 py-4 ${
                  isDark
                    ? 'border-white/10 bg-[#0b1113]'
                    : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-md border px-2.5 py-1 font-mono text-xs font-semibold ${
                      isDark
                        ? 'border-teal-500/40 bg-teal-500/10 text-teal-400'
                        : 'border-teal-600/40 bg-teal-50 text-teal-800'
                    }`}
                  >
                    STEP {String(modalStep.step).padStart(2, '0')} {' // '} 08
                  </span>
                  <h4
                    className={`font-display text-lg font-bold truncate max-w-md sm:max-w-xl ${
                      isDark ? 'text-white/90' : 'text-slate-950'
                    }`}
                  >
                    {modalStep.title}
                  </h4>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`hidden sm:inline font-mono text-xs ${
                      isDark ? 'text-white/40' : 'text-slate-500'
                    }`}
                  >
                    Use ← / → keys to browse
                  </span>
                  <button
                    onClick={() => setModalStep(null)}
                    className={`rounded-full border p-2 transition-colors ${
                      isDark
                        ? 'border-white/20 bg-white/5 text-white/80 hover:bg-white/20 hover:text-white'
                        : 'border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-950'
                    }`}
                    aria-label="Close modal"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Body: Large Image View */}
              <div
                className={`relative aspect-[16/9] w-full flex items-center justify-center overflow-auto max-h-[62vh] ${
                  isDark ? 'bg-[#05080a]' : 'bg-slate-100'
                }`}
              >
                <Image
                  src={modalStep.imageSrc}
                  alt={modalStep.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Modal Footer: Detailed Functional Analysis & Navigation */}
              <div
                className={`border-t p-6 sm:p-8 space-y-4 overflow-y-auto max-h-[26vh] ${
                  isDark
                    ? 'border-white/10 bg-[#0b1113]'
                    : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div
                    className={`font-mono text-xs uppercase tracking-wider ${
                      isDark ? 'text-teal-400' : 'text-teal-700 font-semibold'
                    }`}
                  >
                    {modalStep.stageCode} — {modalStep.moduleBadge}
                  </div>
                  <div
                    className={`font-mono text-[11px] ${
                      isDark ? 'text-white/40' : 'text-slate-500'
                    }`}
                  >
                    ORIGINAL SCREENSHOT: {modalStep.imageDimensions}
                  </div>
                </div>

                <p
                  className={`text-xs sm:text-sm leading-relaxed ${
                    isDark ? 'text-white/75' : 'text-slate-700'
                  }`}
                >
                  {modalStep.detailedAnalysis}
                </p>

                {/* Modal Navigation Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    disabled={modalStep.step === 1}
                    onClick={() =>
                      setModalStep(TIMELINE_STEPS[modalStep.step - 2])
                    }
                    className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-mono text-xs disabled:opacity-30 disabled:pointer-events-none ${
                      isDark
                        ? 'border-white/15 text-white/80 hover:bg-white/10'
                        : 'border-slate-300 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>← Previous Screen</span>
                  </button>

                  <div
                    className={`font-mono text-xs ${isDark ? 'text-white/40' : 'text-slate-500'}`}
                  >
                    PREFACE {modalStep.step} OF {TIMELINE_STEPS.length}
                  </div>

                  <button
                    disabled={modalStep.step === TIMELINE_STEPS.length}
                    onClick={() => setModalStep(TIMELINE_STEPS[modalStep.step])}
                    className="inline-flex items-center gap-2 rounded-lg bg-teal-500 px-4 py-2 font-mono text-xs font-semibold text-slate-950 hover:bg-teal-400 disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <span>Next Screen →</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default StatStrikeTimeline;
