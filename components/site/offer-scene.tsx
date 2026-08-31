"use client";

import { Piece, type Vars } from "./floaty";
import { Asterisk } from "./ui";

/**
 * The services illustration: the same product, drawn three times, cascading
 * from wireframe to design to a running screen — "من الفكرة إلى التشغيل" shown
 * rather than stated.
 *
 * Deliberately not a second copy of the hero. The hero scatters independent
 * cards; this one stacks a single artefact in depth, and the motion is a
 * cascade plus a scan sweeping the live panel, not a set of idle bobs.
 *
 * No pointer parallax here — that belongs to the hero. This scene sits beside
 * a list the reader is scanning, and having it chase the cursor pulls focus
 * off the copy. It moves on its own schedule instead.
 */

const CANVAS_W = 470;
const CANVAS_H = 430;

export default function OfferScene({
  scene,
}: {
  scene: {
    stages: readonly string[];
    liveTitle: string;
    rows: readonly string[];
  };
}) {
  return (
    <div
      aria-hidden="true"
      className="relative shrink-0"
      style={{ width: CANVAS_W, height: CANVAS_H }}
    >
      {/* dotted field, furthest back */}
      <div
        className="scene-par absolute inset-0 opacity-50"
        style={
          {
            "--d": 0.16,
            backgroundImage:
              "radial-gradient(rgba(79,199,163,0.28) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage:
              "radial-gradient(ellipse 64% 60% at 50% 45%, #000 18%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 64% 60% at 50% 45%, #000 18%, transparent 78%)",
          } as Vars
        }
      />

      {/* ---------- 1. wireframe ---------- */}
      <Piece x={18} y={14} w={250} depth={0.3} dur={9.4} amp={-9} rot={[-7, -5.5]} z={2}>
        <div className="rounded-[9px] border border-dashed border-white/22 bg-ink-2/70 p-3.5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-[2px] border border-white/25" />
            <span className="h-2 w-20 rounded-full bg-white/14" />
          </div>
          <div className="mt-3 h-14 rounded-[5px] border border-dashed border-white/18" />
          <div className="mt-2.5 flex flex-col gap-1.5">
            <span className="h-1.5 w-full rounded-full bg-white/12" />
            <span className="h-1.5 w-3/4 rounded-full bg-white/12" />
          </div>
          <div className="mt-3 flex gap-2">
            <span className="h-6 w-16 rounded-[4px] border border-dashed border-white/22" />
            <span className="h-6 w-10 rounded-[4px] border border-dashed border-white/14" />
          </div>
        </div>
      </Piece>

      {/* ---------- 2. design ---------- */}
      <Piece x={84} y={112} w={250} depth={0.62} dur={8.1} delay={0.5} amp={-12} rot={[-3, -1.5]} z={3}>
        <div className="rounded-[9px] border border-white/12 bg-ink-2 p-3.5 shadow-[0_26px_50px_-28px_rgba(0,0,0,0.85)]">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-[2px] bg-mint" />
            <span className="h-2 w-20 rounded-full bg-white/30" />
          </div>
          <div className="mt-3 h-14 rounded-[5px] bg-mint/22" />
          <div className="mt-2.5 flex flex-col gap-1.5">
            <span className="h-1.5 w-full rounded-full bg-white/22" />
            <span className="h-1.5 w-3/4 rounded-full bg-white/16" />
          </div>
          <div className="mt-3 flex gap-2">
            <span className="h-6 w-16 rounded-[4px] bg-mint/70" />
            <span className="h-6 w-10 rounded-[4px] border border-white/20" />
          </div>
        </div>
      </Piece>

      {/* ---------- 3. running ---------- */}
      <Piece x={150} y={208} w={252} depth={1} dur={7.2} delay={1} amp={-15} rot={[1.5, 0]} z={5}>
        <div className="scan relative overflow-hidden rounded-[9px] border border-mint/30 bg-ink-2 shadow-[0_30px_60px_-26px_rgba(0,0,0,0.9)]">
          <div className="flex items-center justify-between border-b border-white/10 px-3.5 py-2.5">
            <span className="flex items-center gap-2">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-mint" />
              <span className="text-[11.5px] font-semibold text-white/85">
                {scene.liveTitle}
              </span>
            </span>
            <Asterisk size={11} className="text-mint" />
          </div>

          <div className="flex flex-col gap-2 p-3.5">
            {scene.rows.map((r, i) => (
              <div key={r} className="flex items-center gap-2.5">
                <span
                  className="tick-in flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-mint"
                  style={{ animationDelay: `${0.6 + i * 0.45}s` }}
                >
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#072436" strokeWidth={4}>
                    <path d="M4 12l5 5L20 6" />
                  </svg>
                </span>
                <span className="text-[11px] text-white/70">{r}</span>
              </div>
            ))}
          </div>
        </div>
      </Piece>

      {/* ---------- stage rail ---------- */}
      <Piece x={20} y={382} w={412} depth={1.25} dur={6.6} delay={0.3} amp={-8} z={6}>
        <div className="rounded-full border border-white/12 bg-ink-2/90 px-4 py-2.5 backdrop-blur-sm">
          <div className="relative flex items-center justify-between">
            {/* the rail the marker travels */}
            <span className="absolute inset-x-2 top-1/2 h-px -translate-y-1/2 bg-white/12" />
            <span className="stage-sweep absolute top-1/2 h-px -translate-y-1/2 bg-mint" />
            {scene.stages.map((s, i) => (
              <span
                key={s}
                className="stage-node relative flex flex-col items-center gap-1.5"
                style={{ animationDelay: `${i * 1.5}s` }}
              >
                <span className="h-2 w-2 rounded-full bg-mint" />
                <span className="text-[9.5px] whitespace-nowrap text-white/60">
                  {s}
                </span>
              </span>
            ))}
          </div>
        </div>
      </Piece>

      <Piece x={402} y={92} depth={1.5} dur={7.6} delay={0.8} amp={-16} z={6}>
        <Asterisk size={40} className="spin-slow text-mint" />
      </Piece>
    </div>
  );
}
