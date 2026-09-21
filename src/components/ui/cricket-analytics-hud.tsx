'use client';

import { useState } from 'react';
import { cx } from '@/lib/utils';

type AnalyticsMode = 'pitch' | 'wagon' | 'phase';

export function CricketAnalyticsHUD({ className }: { className?: string }) {
  const [activeMode, setActiveMode] = useState<AnalyticsMode>('pitch');
  const [selectedZone, setSelectedZone] = useState<string>('good');

  return (
    <div
      className={cx(
        'relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[1.25rem] border border-slate-700/80 bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-ink-950/95 p-4 sm:p-6 font-mono text-xs select-none backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]',
        className,
      )}
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -left-12 -top-12 h-48 w-48 rounded-full bg-blue-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-green-400/15 blur-3xl" />

      {/* Top Console Bar: Mode Switcher & Live Status */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white-100/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-green-400/30">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-telemetry-pulse" />
          </span>
          <span className="font-display font-bold tracking-tight text-white-100 sm:text-sm">
            STATSTRIKE
          </span>
          <span className="hidden text-[10px] text-green-400/80 sm:inline">
            {'// TELEMETRY ENGINE'}
          </span>
        </div>

        {/* Interactive Mode Pills */}
        <div className="flex items-center gap-1 rounded-lg border border-slate-700/70 bg-slate-800/60 p-1">
          <button
            className={cx(
              'rounded-md px-2.5 py-1 text-[11px] font-semibold transition-all duration-200 cursor-pointer',
              activeMode === 'pitch'
                ? 'bg-blue-500 text-white shadow-[0_0_12px_rgba(237,28,36,0.35)]'
                : 'text-grey-300 hover:text-white-100',
            )}
            onClick={() => setActiveMode('pitch')}
            type="button"
          >
            PITCH MAP
          </button>
          <button
            className={cx(
              'rounded-md px-2.5 py-1 text-[11px] font-semibold transition-all duration-200 cursor-pointer',
              activeMode === 'wagon'
                ? 'bg-green-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(47,157,88,0.35)]'
                : 'text-grey-300 hover:text-white-100',
            )}
            onClick={() => setActiveMode('wagon')}
            type="button"
          >
            WAGON WHEEL
          </button>
          <button
            className={cx(
              'rounded-md px-2.5 py-1 text-[11px] font-semibold transition-all duration-200 cursor-pointer',
              activeMode === 'phase'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(199,139,46,0.35)]'
                : 'text-grey-300 hover:text-white-100',
            )}
            onClick={() => setActiveMode('phase')}
            type="button"
          >
            PHASE WORM
          </button>
        </div>
      </div>

      {/* Main Interactive Display Area */}
      <div className="relative my-4 flex flex-1 items-center justify-center">
        {/* MODE 1: PITCH MAP & TRAJECTORY */}
        {activeMode === 'pitch' && (
          <div className="flex w-full flex-col items-center justify-center space-y-4">
            {/* 3D Perspective Pitch Representation */}
            <div className="relative h-44 w-full max-w-md rounded-xl border border-slate-700/80 bg-slate-950/60 p-3 shadow-inner overflow-hidden">
              {/* Length Zones on the 22-yard strip */}
              <div className="absolute inset-x-8 top-3 bottom-3 flex flex-col rounded-lg border border-slate-700/50 bg-slate-900/80 overflow-hidden">
                {/* Short Length (8-10m+) */}
                <button
                  className={cx(
                    'relative flex-1 border-b border-dashed border-slate-700/50 transition-colors flex items-center justify-between px-3 text-[10px]',
                    selectedZone === 'short'
                      ? 'bg-red-500/25 text-red-400'
                      : 'hover:bg-red-500/10 text-grey-300',
                  )}
                  onClick={() => setSelectedZone('short')}
                  type="button"
                >
                  <span className="font-semibold">SHORT (8-10M)</span>
                  <span>SR 118.4 • WKT 14%</span>
                </button>

                {/* Good Length (6-8m) - Prime Target */}
                <button
                  className={cx(
                    'relative flex-[1.2] border-b border-dashed border-slate-700/50 transition-colors flex items-center justify-between px-3 text-[10px]',
                    selectedZone === 'good'
                      ? 'bg-amber-500/25 text-amber-400 font-bold'
                      : 'hover:bg-amber-500/10 text-grey-300',
                  )}
                  onClick={() => setSelectedZone('good')}
                  type="button"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-telemetry-pulse" />
                    <span>GOOD LENGTH (6-8M)</span>
                  </div>
                  <span>DOT 52% • WKT 46%</span>
                </button>

                {/* Full Length (2-6m) */}
                <button
                  className={cx(
                    'relative flex-1 border-b border-dashed border-slate-700/50 transition-colors flex items-center justify-between px-3 text-[10px]',
                    selectedZone === 'full'
                      ? 'bg-blue-500/25 text-blue-400'
                      : 'hover:bg-blue-500/10 text-grey-300',
                  )}
                  onClick={() => setSelectedZone('full')}
                  type="button"
                >
                  <span className="font-semibold">FULL (2-6M)</span>
                  <span>SR 142.0 • WKT 28%</span>
                </button>

                {/* Yorker / Blockhole (0-2m) */}
                <button
                  className={cx(
                    'relative flex-1 transition-colors flex items-center justify-between px-3 text-[10px]',
                    selectedZone === 'yorker'
                      ? 'bg-green-500/25 text-green-400 font-bold'
                      : 'hover:bg-green-500/10 text-grey-300',
                  )}
                  onClick={() => setSelectedZone('yorker')}
                  type="button"
                >
                  <span className="font-semibold">YORKER (0-2M)</span>
                  <span>ECON 5.2 • WKT 34%</span>
                </button>
              </div>

              {/* Dynamic Ball Trajectory Arc Overlay */}
              <div className="pointer-events-none absolute left-6 bottom-4 h-28 w-44 -rotate-12 border-b-2 border-blue-500 shadow-[0_0_16px_#ed1c24]" />

              {/* Impact Waypoint with Sensor Coordinates */}
              <div className="pointer-events-none absolute left-36 top-20 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-blue-500/30 animate-ping" />
                <div className="absolute h-2.5 w-2.5 rounded-full bg-blue-500 shadow-[0_0_12px_#ed1c24]" />
                <span className="absolute left-4 top-0 whitespace-nowrap font-mono text-[9px] text-blue-400 bg-slate-900/90 px-1.5 py-0.5 rounded border border-blue-500/30">
                  IMPACT: 6.84M // OFF-STUMP
                </span>
              </div>
            </div>
          </div>
        )}

        {/* MODE 2: 360° WAGON WHEEL & GROUND RADAR */}
        {activeMode === 'wagon' && (
          <div className="flex w-full flex-col items-center justify-center space-y-3">
            <div className="relative h-44 w-44 rounded-full border border-green-400/40 bg-slate-950/70 p-3 shadow-[0_0_30px_rgba(47,157,88,0.15)] flex items-center justify-center">
              {/* Outer Boundary Ring */}
              <div className="absolute inset-1 rounded-full border border-slate-700/60" />
              {/* 30-Yard Circle */}
              <div className="absolute inset-8 rounded-full border border-dashed border-green-400/30" />
              {/* Center 22-Yard Pitch Strip */}
              <div className="absolute h-8 w-3 rounded-sm border border-amber-400/60 bg-amber-400/20 shadow-[0_0_8px_rgba(199,139,46,0.4)]" />

              {/* Wagon Wheel Scoring Vectors */}
              {/* Cover Drive (Off-Side) */}
              <div className="pointer-events-none absolute top-4 right-8 h-16 w-0.5 rotate-45 bg-blue-400 shadow-[0_0_8px_#38bdf8]" />
              <span className="absolute top-2 right-4 text-[9px] text-blue-400">
                COVER [4]
              </span>

              {/* Straight Drive */}
              <div className="pointer-events-none absolute top-2 h-14 w-0.5 bg-green-400 shadow-[0_0_8px_#4ade80]" />
              <span className="absolute -top-1 text-[9px] text-green-400">
                LONG-ON [6]
              </span>

              {/* Square Cut */}
              <div className="pointer-events-none absolute right-3 h-0.5 w-14 bg-blue-400 shadow-[0_0_8px_#38bdf8]" />
              <span className="absolute right-1 text-[9px] text-blue-400">
                POINT [4]
              </span>

              {/* Pull / Mid-Wicket (Leg-Side) */}
              <div className="pointer-events-none absolute top-6 left-8 h-16 w-0.5 -rotate-45 bg-red-400 shadow-[0_0_8px_#f87171]" />
              <span className="absolute top-2 left-2 text-[9px] text-red-400">
                MID-WKT [6]
              </span>

              {/* Fielder position dots */}
              <span
                className="absolute right-6 bottom-10 h-1.5 w-1.5 rounded-full bg-slate-400"
                title="Deep Cover"
              />
              <span
                className="absolute left-6 bottom-10 h-1.5 w-1.5 rounded-full bg-slate-400"
                title="Deep Mid-Wicket"
              />
              <span
                className="absolute right-12 top-6 h-1.5 w-1.5 rounded-full bg-slate-400"
                title="Slip Cordon"
              />
            </div>

            <div className="flex items-center gap-4 text-[10px]">
              <span className="text-blue-400 font-semibold">OFF-SIDE: 58%</span>
              <span className="text-grey-300">•</span>
              <span className="text-red-400 font-semibold">LEG-SIDE: 42%</span>
              <span className="text-grey-300">•</span>
              <span className="text-green-400 font-semibold">
                BOUNDARY FREQ: 4.8 BALLS
              </span>
            </div>
          </div>
        )}

        {/* MODE 3: MATCH PHASE & WORM TELEMETRY */}
        {activeMode === 'phase' && (
          <div className="flex w-full flex-col space-y-3">
            {/* Run-Rate Differential Graph */}
            <div className="relative h-36 w-full rounded-xl border border-slate-700/80 bg-slate-950/70 p-3">
              <div className="flex items-center justify-between text-[10px] text-grey-300 border-b border-white-100/10 pb-1.5">
                <span>INNINGS RUN RATE DYNAMICS (OVERS 1–20)</span>
                <span className="text-green-400">CURRENT RRR: 8.4 RPO</span>
              </div>

              {/* Mini Manhattan & Worm Visualization */}
              <div className="relative mt-2 flex h-20 items-end justify-between gap-1 px-1">
                {/* Powerplay Overs 1-6 */}
                {[7.2, 8.5, 6.0, 9.4, 8.0, 11.2].map((rr, i) => (
                  <div
                    key={i}
                    className="group relative flex-1 flex flex-col items-center"
                  >
                    <div
                      className="w-full rounded-t bg-blue-500/70 transition-all group-hover:bg-blue-400"
                      style={{ height: `${(rr / 14) * 100}%` }}
                    />
                    <span className="mt-1 text-[8px] text-grey-300">
                      {i + 1}
                    </span>
                  </div>
                ))}
                {/* Wicket marker */}
                <div className="absolute left-[28%] top-2 flex flex-col items-center">
                  <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_#ed1c24]" />
                  <span className="text-[8px] font-bold text-red-400">
                    W (38/1)
                  </span>
                </div>

                {/* Middle Overs 7-15 */}
                {[6.8, 7.5, 8.2, 9.0, 6.4, 7.8, 8.5, 9.2, 10.0].map((rr, i) => (
                  <div
                    key={i}
                    className="group relative flex-1 flex flex-col items-center"
                  >
                    <div
                      className="w-full rounded-t bg-slate-600/70 transition-all group-hover:bg-slate-400"
                      style={{ height: `${(rr / 14) * 100}%` }}
                    />
                    <span className="mt-1 text-[8px] text-grey-300">
                      {i + 7}
                    </span>
                  </div>
                ))}

                {/* Death Overs 16-20 */}
                {[11.4, 13.0, 10.5, 14.2, 12.8].map((rr, i) => (
                  <div
                    key={i}
                    className="group relative flex-1 flex flex-col items-center"
                  >
                    <div
                      className="w-full rounded-t bg-green-400/80 transition-all group-hover:bg-green-300"
                      style={{ height: `${(rr / 14) * 100}%` }}
                    />
                    <span className="mt-1 text-[8px] text-grey-300">
                      {i + 16}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-[9px] text-grey-300 pt-2 border-t border-white-100/5">
                <span className="text-blue-400">POWERPLAY (1-6)</span>
                <span className="text-slate-400">MIDDLE (7-15)</span>
                <span className="text-green-400 font-bold">
                  DEATH ACCELERATION (16-20)
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Telemetry Metrics Strip */}
      <div className="relative z-10 grid grid-cols-2 gap-2 border-t border-slate-700/60 pt-3 text-[11px] sm:grid-cols-4">
        <div className="rounded-lg border border-slate-700/50 bg-slate-800/60 p-2">
          <span className="block text-[9px] uppercase tracking-wider text-grey-300">
            Release Speed
          </span>
          <span className="font-semibold text-white-100">143.2 km/h</span>
        </div>
        <div className="rounded-lg border border-slate-700/50 bg-slate-800/60 p-2">
          <span className="block text-[9px] uppercase tracking-wider text-grey-300">
            Seam Angle
          </span>
          <span className="font-semibold text-green-400">+2.4° Outswing</span>
        </div>
        <div className="rounded-lg border border-slate-700/50 bg-slate-800/60 p-2">
          <span className="block text-[9px] uppercase tracking-wider text-grey-300">
            Pitch Impact
          </span>
          <span className="font-semibold text-amber-400">6.84m (Good)</span>
        </div>
        <div className="rounded-lg border border-slate-700/50 bg-slate-800/60 p-2">
          <span className="block text-[9px] uppercase tracking-wider text-grey-300">
            Sensor Status
          </span>
          <span className="font-semibold text-blue-500">
            Optional media missing
          </span>
        </div>
      </div>

      {/* Sub-bar providing required test and accessibility cues */}
      <div className="pt-2 text-center text-[10px] text-grey-300/80">
        Interactive telemetry active while approved media is not yet supplied.
      </div>
    </div>
  );
}
