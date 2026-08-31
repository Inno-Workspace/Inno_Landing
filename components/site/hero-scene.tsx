"use client";

import { useRef } from "react";
import { Piece, usePointerParallax, type Vars } from "./floaty";
import { Asterisk } from "./ui";

/**
 * The hero illustration: a dashboard anchor with product fragments floating
 * around it. Everything is drawn in markup rather than shipped as an image, so
 * it stays crisp, recolours with the brand, and animates for free.
 *
 * Two nested transforms per element — the outer one carries pointer parallax,
 * the inner one carries the idle float — because a single element cannot run
 * both on `transform` at once.
 */

const CANVAS_W = 510;
const CANVAS_H = 410;

const BARS = [38, 62, 46, 78, 55, 92, 70];

export default function HeroScene({
  scene,
}: {
  scene: {
    url: string;
    panel: string;
    kpis: readonly { v: string; l: string }[];
    chart: string;
    toast: string;
    chatAsk: string;
    chatReply: string;
    calendarLabel: string;
    calendarDay: string;
    langChip: string;
  };
}) {
  const ref = useRef<HTMLDivElement>(null);

  usePointerParallax(ref);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative shrink-0"
      style={{ width: CANVAS_W, height: CANVAS_H }}
    >
      {/* dotted field, sitting furthest back */}
      <div
        className="scene-par absolute inset-0 opacity-[0.5]"
        style={
          {
            "--d": 0.18,
            backgroundImage:
              "radial-gradient(rgba(79,199,163,0.30) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage:
              "radial-gradient(ellipse 62% 58% at 50% 50%, #000 20%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 62% 58% at 50% 50%, #000 20%, transparent 78%)",
          } as Vars
        }
      />

      {/* ---------- dashboard, the anchor ---------- */}
      <Piece x={92} y={118} w={336} depth={0.35} dur={9} amp={-10} z={2}>
        <div className="overflow-hidden rounded-[10px] border border-mint/25 bg-ink-2 shadow-[0_34px_70px_-30px_rgba(0,0,0,0.85)]">
          <div className="flex h-[34px] items-center gap-2.5 border-b border-white/10 px-3.5">
            <span className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-mint/85" />
              <span className="h-2 w-2 rounded-full bg-mint/45" />
              <span className="h-2 w-2 rounded-full bg-mint/25" />
            </span>
            <span className="lat flex-1 rounded-full bg-white/6 px-3 py-1 text-center text-[10px] tracking-[0.08em] text-white/45">
              {scene.url}
            </span>
          </div>

          <div className="p-3.5">
            <div className="flex items-center gap-2">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-mint" />
              <span className="text-[12px] font-semibold text-white/85">
                {scene.panel}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {scene.kpis.map((k, i) => (
                <div
                  key={k.l}
                  className="rounded-[6px] border border-white/10 bg-white/4 px-2.5 py-2"
                >
                  <div
                    className={`num text-[17px] font-semibold leading-none ${
                      i === 0 ? "text-mint" : "text-white/85"
                    }`}
                  >
                    {k.v}
                  </div>
                  <div className="mt-1 text-[9.5px] text-white/45">{k.l}</div>
                </div>
              ))}
            </div>

            <div className="mt-3.5 text-[9.5px] text-white/40">{scene.chart}</div>
            <div className="mt-2 flex h-[46px] items-end gap-1.5">
              {BARS.map((h, i) => (
                <div
                  key={i}
                  className="bar-grow flex-1 rounded-[2px]"
                  style={{
                    height: `${h}%`,
                    animationDelay: `${0.35 + i * 0.07}s`,
                    background:
                      i === BARS.length - 2
                        ? "#4FC7A3"
                        : "rgba(79,199,163,0.32)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </Piece>

      {/* ---------- delivered toast ---------- */}
      <Piece
        x={264}
        y={44}
        w={182}
        depth={0.95}
        dur={6.2}
        delay={0.4}
        amp={-14}
        rot={[-1.5, 1]}
        z={4}
      >
        <div className="flex items-center gap-3 rounded-[9px] bg-white px-3.5 py-3 shadow-[0_22px_44px_-22px_rgba(0,0,0,0.7)]">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mint">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#072436" strokeWidth={3.2}>
              <path d="M4 12l5 5L20 6" />
            </svg>
          </span>
          <span className="text-[13px] font-semibold text-ink">
            {scene.toast}
          </span>
        </div>
      </Piece>

      {/* ---------- booking tile ---------- */}
      <Piece
        x={16}
        y={54}
        w={130}
        depth={1.15}
        dur={6.8}
        delay={0.9}
        amp={-16}
        rot={[2, -1.5]}
        z={4}
      >
        <div className="rounded-[9px] border border-mint/25 bg-ink-2 p-3 shadow-[0_22px_44px_-24px_rgba(0,0,0,0.8)]">
          <div className="lat text-[9px] tracking-[0.14em] text-mint">
            {scene.calendarLabel}
          </div>
          <div className="mt-2.5 grid grid-cols-7 gap-1" dir="ltr">
            {Array.from({ length: 21 }).map((_, i) => {
              const active = i === 11;
              return (
                <span
                  key={i}
                  className={`flex h-[11px] items-center justify-center rounded-[2px] ${
                    active ? "bg-mint" : "bg-white/12"
                  }`}
                />
              );
            })}
          </div>
          <div className="mt-2.5 flex items-baseline gap-1.5">
            <span className="num text-[19px] font-semibold leading-none text-mint">
              {scene.calendarDay}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-mint/50" />
          </div>
        </div>
      </Piece>

      {/* ---------- chat ---------- */}
      <Piece
        x={6}
        y={296}
        w={224}
        depth={0.8}
        dur={7.4}
        delay={0.2}
        amp={-13}
        rot={[1.5, -1]}
        z={5}
      >
        <div className="flex flex-col gap-2">
          <div className="w-fit max-w-[86%] rounded-[10px] rounded-ee-[3px] border border-white/12 bg-ink-2 px-3 py-2 text-[11.5px] leading-snug text-white/70 shadow-[0_16px_32px_-20px_rgba(0,0,0,0.9)]">
            {scene.chatAsk}
          </div>
          <div className="ms-auto w-fit max-w-[86%] rounded-[10px] rounded-es-[3px] bg-mint px-3 py-2 text-[11.5px] font-semibold leading-snug text-ink shadow-[0_16px_32px_-18px_rgba(79,199,163,0.9)]">
            {scene.chatReply}
          </div>
        </div>
      </Piece>

      {/* ---------- language toggle ---------- */}
      <Piece
        x={352}
        y={320}
        w={136}
        depth={1}
        dur={8.1}
        delay={1.3}
        amp={-11}
        rot={[-2, 1]}
        z={4}
      >
        <div className="flex items-center gap-2 rounded-full border border-white/14 bg-ink-2 p-1.5 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.9)]">
          <span className="rounded-full bg-mint px-3 py-1.5 text-[11px] font-semibold text-ink">
            {scene.langChip.split("/")[0].trim()}
          </span>
          <span className="lat px-2 text-[11px] text-white/45">
            {scene.langChip.split("/")[1]?.trim()}
          </span>
        </div>
      </Piece>

      {/* ---------- asterisk, front-most ---------- */}
      <Piece x={448} y={140} depth={1.4} dur={7.9} delay={0.6} amp={-18} z={6}>
        <Asterisk size={46} className="spin-slow text-mint" />
      </Piece>

      <Piece x={54} y={214} depth={1.25} dur={6.4} delay={1.6} amp={-10} z={1}>
        <Asterisk size={22} className="text-mint/45" />
      </Piece>
    </div>
  );
}
