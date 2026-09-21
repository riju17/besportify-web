'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

type PhotoCategory = 'all' | 'match' | 'player' | 'coach' | 'hardware';

interface ProductPhoto {
  id: string;
  title: string;
  category: PhotoCategory;
  categoryLabel: string;
  src: string;
  aspect: string;
  tag: string;
  badgeTone: 'teal' | 'red' | 'cyan' | 'amber';
  summary: string;
  highlights: string[];
}

const PRODUCT_PHOTOS: ProductPhoto[] = [
  {
    id: 'match-insights',
    title: 'Match Insights & 360° Wagon Wheel',
    category: 'match',
    categoryLabel: 'Match Telemetry',
    src: '/statstrike-photos/match-insights.png',
    aspect: 'aspect-square',
    tag: 'TACTICAL MATRIX // 01',
    badgeTone: 'red',
    summary:
      'Real-time tactical intelligence dashboard featuring 360° shot placement wagon wheels, pitch impact heatmaps, multi-over run progression, and head-to-head player comparison.',
    highlights: [
      '360° wagon wheel radial shot placement',
      'Pitch impact zone and bowling heatmap',
      'Phase-by-phase scoring rate progression',
      'Dual-player tactical differential analysis',
    ],
  },
  {
    id: 'player-profile',
    title: 'Player Performance & Bio-Telemetry HUD',
    category: 'player',
    categoryLabel: 'Player HUD',
    src: '/statstrike-photos/player-profile.png',
    aspect: 'aspect-square',
    tag: 'ATHLETE TELEMETRY // 02',
    badgeTone: 'teal',
    summary:
      'Dynamic athlete scorecard providing granular biomechanical metrics, annual strike rate trends, form analyzer index, and contextual match history.',
    highlights: [
      '8.9 Elite Performance Index scoring',
      'Historical strike rate trajectory curves',
      'Wicket economy rate vector distribution',
      'Real-time form analyzer bar and match recap',
    ],
  },
  {
    id: 'coach-analysis',
    title: 'Coach Analysis & Match Preparation Sheet',
    category: 'coach',
    categoryLabel: 'Coach Sheets',
    src: '/statstrike-photos/coach-analysis-sheet.png',
    aspect: 'aspect-square',
    tag: 'STRATEGY DRILL // 03',
    badgeTone: 'amber',
    summary:
      'Comprehensive pre-match game plans, bowling spell rotations, fielding cordon geometry adjustments, and opposition batsman weakness dossiers.',
    highlights: [
      'Phase-specific bowling attack plans',
      'Fielding cordon placement angles',
      'Matchup historical dismissal patterns',
      'Printable and tablet-synchronized tactical sheets',
    ],
  },
  {
    id: 'dashboard',
    title: 'Mission Control & Video Telemetry Operations',
    category: 'match',
    categoryLabel: 'Mission Control',
    src: '/statstrike-photos/dashboard.png',
    aspect: 'aspect-square',
    tag: 'COMMAND CENTER // 04',
    badgeTone: 'red',
    summary:
      'Dual-analyst command station monitoring live high-speed optical feeds, global pitch telemetry, and encrypted sideline coach communications.',
    highlights: [
      'Synchronized multi-angle optical feeds',
      'Sub-millisecond data ingest pipeline',
      'Bench-to-analyst secure communication links',
      'Live Hawkeye 3D ball path reconstruction',
    ],
  },
  {
    id: 'mockups',
    title: 'On-Pitch Sensory Deployment & Motion Blur Capture',
    category: 'hardware',
    categoryLabel: 'Field Hardware',
    src: '/statstrike-photos/mockups.png',
    aspect: 'aspect-square',
    tag: 'HARDWARE FIELD // 05',
    badgeTone: 'cyan',
    summary:
      'Comprehensive on-pitch deployment showing 1000 FPS athlete action tracking, angular vector geometry, high-contrast optical sensors, and wearable biometric pods.',
    highlights: [
      'High-speed optical tracking sensors',
      'Angular vector release point analysis',
      'Biometric motion blur correction algorithms',
      'Ruggedized weather-resistant field housing',
    ],
  },
  {
    id: 'mockup2',
    title: 'Integrated Field Analytics & Athlete Kit',
    category: 'hardware',
    categoryLabel: 'Field Hardware',
    src: '/statstrike-photos/mockup2.png',
    aspect: 'aspect-square',
    tag: 'DEPLOYMENT // 06',
    badgeTone: 'teal',
    summary:
      'Full product ecosystem in live match environments, demonstrating immediate data feedback loops between players, coaching staff, and stadium analytics screens.',
    highlights: [
      'Wireless telemetry sync to dugout tablets',
      'Instant post-over video replay overlays',
      'Live stadium broadcast API integration',
      'Ultra-low power consumption for day-long fixtures',
    ],
  },
];

const CATEGORIES: { id: PhotoCategory; label: string }[] = [
  { id: 'all', label: 'All Product Views' },
  { id: 'match', label: 'Match Telemetry & HUD' },
  { id: 'player', label: 'Player Biometrics' },
  { id: 'coach', label: 'Tactical Preparation' },
  { id: 'hardware', label: 'Sensory Hardware' },
];

export function StatStrikePhotos() {
  const [selectedCategory, setSelectedCategory] =
    useState<PhotoCategory>('all');
  const [activePhoto, setActivePhoto] = useState<ProductPhoto | null>(null);

  const filteredPhotos =
    selectedCategory === 'all'
      ? PRODUCT_PHOTOS
      : PRODUCT_PHOTOS.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="statstrike-product-gallery"
      className="relative z-20 bg-[#0b1113] py-24 sm:py-32 text-white/90 border-t border-white/10"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-teal-500/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-10 h-80 w-80 rounded-full bg-red-500/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 font-mono text-xs font-semibold tracking-wider text-teal-400">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span>PRODUCT PHOTO SHOWCASE</span>
          </div>

          <h2 className="font-display text-3xl font-bold tracking-tight text-white/90 sm:text-5xl">
            StatStrike In Action:{' '}
            <span className="bg-gradient-to-r from-white/90 via-teal-200 to-teal-400 bg-clip-text text-transparent">
              The Visual Suite
            </span>
          </h2>

          <p className="text-base sm:text-lg leading-relaxed text-white/60">
            Inspect the complete visual ecosystem: high-speed optical capture,
            real-time wagon wheel telemetry, coach analysis matrices, and
            mission control dashboards.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-full px-4 py-2 font-mono text-xs tracking-wider transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? 'bg-teal-500 text-[#0b1113] font-semibold shadow-[0_0_20px_rgba(20,184,166,0.3)]'
                    : 'border border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setActivePhoto(photo)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#0f1719]/90 transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#060a0c]">
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  {/* Subtle hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1719] via-transparent to-transparent opacity-80" />

                  {/* Corner Telemetry Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="rounded-md border border-white/10 bg-[#0b1113]/80 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wider text-teal-400 backdrop-blur-md">
                      {photo.tag}
                    </span>
                  </div>

                  {/* Quick Expand Icon */}
                  <div className="absolute top-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="rounded-full border border-white/20 bg-[#0b1113]/80 p-2 text-white backdrop-blur-md">
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
                          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between font-mono text-[11px] text-white/40">
                    <span className="uppercase tracking-wider">
                      {photo.categoryLabel}
                    </span>
                    <span className="text-teal-400/80">INSPECT 4K ↗</span>
                  </div>

                  <h3 className="font-display text-lg font-bold tracking-tight text-white/90 group-hover:text-teal-300 transition-colors">
                    {photo.title}
                  </h3>

                  <p className="line-clamp-2 text-xs sm:text-sm leading-relaxed text-white/60">
                    {photo.summary}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox / Full-Screen Inspection Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-8 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-[#0e1618] shadow-2xl flex flex-col lg:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-20 rounded-full border border-white/20 bg-black/60 p-2 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
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

              {/* Modal Image View */}
              <div className="relative aspect-video lg:aspect-auto lg:w-3/5 bg-black flex items-center justify-center min-h-[300px]">
                <Image
                  src={activePhoto.src}
                  alt={activePhoto.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Modal Detail Sidebar */}
              <div className="flex flex-col justify-between p-6 sm:p-8 lg:w-2/5 border-t lg:border-t-0 lg:border-l border-white/10 space-y-6 overflow-y-auto max-h-[50vh] lg:max-h-none">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-md border border-teal-500/30 bg-teal-500/10 px-3 py-1 font-mono text-xs font-semibold tracking-wider text-teal-400">
                    <span>{activePhoto.tag}</span>
                  </div>

                  <h3 className="font-display text-2xl font-bold tracking-tight text-white/90">
                    {activePhoto.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-white/60">
                    {activePhoto.summary}
                  </p>

                  {/* Highlights checklist */}
                  <div className="space-y-2 pt-2">
                    <div className="font-mono text-xs uppercase tracking-wider text-white/40">
                      Technical Capabilities
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-white/70">
                      {activePhoto.highlights.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-400 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="font-mono text-[11px] text-white/40 uppercase">
                    FORMAT: 4K HIGH RESOLUTION
                  </div>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-teal-500 px-4 py-2 font-mono text-xs font-semibold text-[#0b1113] hover:bg-teal-400 transition-colors"
                  >
                    <span>Request Live Demo</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default StatStrikePhotos;
