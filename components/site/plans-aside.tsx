"use client";

import { Piece } from "./floaty";
import Mascot from "./mascot";
import { Asterisk } from "./ui";

/**
 * The two constellations that flank the pricing cards.
 *
 * Not a scene above or below the cards — a column down each margin, so the
 * pricing cards sit *inside* the graphic. Two different mechanisms on purpose:
 * the bot juggles the proof chips, and opposite him a receipt prints itself.
 *
 * No pointer parallax; these sit either side of the thing you are reading.
 */

export interface AsideContent {
  payLabel: string;
  daysValue: string;
  daysLabel: string;
  freeTag: string;
  inclTitle: string;
  inclItems: readonly string[];
  noFees: string;
}

const W = 150;
const H_START = 340;
const H_END = 330;

const PAPER_W = 118;
const PAPER_H = 232;

/** Sawtooth for the torn bottom edge — built rather than hand-written, so the
 *  teeth stay even if the paper width ever changes. */
function tornEdge(width: number, teeth: number, depth: number) {
  let d = `M0 0 L${width} 0`;
  for (let i = teeth; i > 0; i--) {
    const tip = (width / teeth) * (i - 0.5);
    const back = (width / teeth) * (i - 1);
    d += ` L${tip.toFixed(1)} ${depth} L${back.toFixed(1)} 0`;
  }
  return `${d} Z`;
}

/** Where both juggled cards rest before the animation displaces them. */
const CARD = { left: 16, top: 30, width: 118 };

function PayMark({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-[15px] w-[23px] items-center justify-center overflow-hidden rounded-[3px]">
      {children}
    </span>
  );
}

export default function PlansAside({
  side,
  aside,
}: {
  side: "start" | "end";
  aside: AsideContent;
}) {
  if (side === "start") {
    return (
      <div
        aria-hidden="true"
        className="relative"
        style={{ width: W, height: H_START }}
      >
        {/* Card one. Card two runs the SAME keyframes half a cycle behind, which
            is what makes the pair trade places forever without ever colliding. */}
        <div className="juggle absolute" style={CARD}>
          <div className="rounded-[8px] bg-ink p-2.5 text-white shadow-[0_16px_34px_-20px_rgba(7,36,54,0.7)]">
            <div className="text-[9px] text-white/50">{aside.payLabel}</div>
            <div className="mt-1.5 flex gap-1.5">
              <PayMark>
                <svg viewBox="0 0 48 32" className="h-full w-full">
                  <rect width="48" height="32" rx="4" fill="#1A1F71" />
                  <path d="M19.5 21H17L18.8 11H21.3z" fill="#fff" />
                  <path d="M32.8 11H30.8c-.6 0-1 .2-1.3.8L26 21h2.7l.5-1.5h3.3l.3 1.5h2.4L33.1 11z" fill="#fff" />
                  <path d="M16.5 11 14 17.9l-.3-1.4-.9-4.7c-.1-.6-.6-.8-1.1-.8H8.1l-.1.2c.9.2 1.8.6 2.5 1L12.8 21h2.7L19.2 11z" fill="#fff" />
                </svg>
              </PayMark>
              <PayMark>
                <svg viewBox="0 0 48 32" className="h-full w-full">
                  <rect width="48" height="32" rx="4" fill="#252525" />
                  <circle cx="19" cy="16" r="8" fill="#EB001B" />
                  <circle cx="29" cy="16" r="8" fill="#F79E1B" />
                  <path d="M24 10.3a8 8 0 0 1 0 11.4 8 8 0 0 1 0-11.4z" fill="#FF5F00" />
                </svg>
              </PayMark>
              <PayMark>
                <svg viewBox="0 0 48 32" className="h-full w-full">
                  <rect width="48" height="32" rx="4" fill="#003B2A" />
                  <text x="24" y="21" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold" fontFamily="Arial">
                    mada
                  </text>
                </svg>
              </PayMark>
            </div>
          </div>
        </div>

        <div
          className="juggle absolute"
          style={{ ...CARD, animationDelay: "-1.6s" }}
        >
          <div className="rounded-[8px] bg-mint px-3 py-2.5 text-ink shadow-[0_16px_34px_-18px_rgba(28,122,95,0.85)]">
            <div className="flex items-baseline gap-1.5">
              <span className="num text-[24px] font-semibold leading-none">
                {aside.daysValue}
              </span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
            </div>
            <div className="mt-1 text-[10px] font-semibold">{aside.daysLabel}</div>
          </div>
        </div>

        {/* the juggler, hands under the arc */}
        <div className="absolute start-0 top-[175px]">
          <Mascot width={148} />
        </div>
      </div>
    );
  }

  // A receipt printing itself, over and over.
  return (
    <div
      aria-hidden="true"
      className="relative"
      style={{ width: W, height: H_END }}
    >
      {/* the printer, sitting above the paper so the strip feeds from under it */}
      <div className="absolute start-2 top-3 z-[4] w-[134px] rounded-[7px] bg-ink px-3 py-2.5 shadow-[0_14px_28px_-16px_rgba(7,36,54,0.7)]">
        <div className="flex items-center gap-2">
          <span className="printer-led h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
          <span className="h-1 flex-1 rounded-full bg-white/15" />
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-black/45" />
      </div>

      <div
        className="absolute overflow-hidden"
        style={{ insetInlineStart: 16, top: 44, width: PAPER_W, height: PAPER_H }}
      >
        <div className="paper-strip" style={{ width: PAPER_W, height: PAPER_H }}>
          {/* The white stops short of the bottom and the sawtooth continues it,
              so the gaps between teeth show the band through — an actual torn
              edge rather than a white shape drawn over white. */}
          <div
            className="relative bg-white px-3.5 pt-3.5 shadow-[0_18px_34px_-24px_rgba(7,36,54,0.6)]"
            style={{ height: PAPER_H - 8 }}
          >
            <div className="text-[9.5px] font-semibold tracking-[0.08em] text-mint-deep">
              {aside.inclTitle}
            </div>

            <div className="mt-3 flex flex-col gap-2.5">
              {aside.inclItems.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1C7A5F" strokeWidth={4} className="shrink-0">
                    <path d="M4 12l5 5L20 6" />
                  </svg>
                  <span className="text-[10.5px] leading-tight text-ink/80">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-3.5 border-t border-dashed border-ink/25 pt-3">
              <div className="text-[22px] font-bold leading-none text-mint-deep">
                {aside.freeTag}
              </div>
              <div className="mt-1.5 text-[9.5px] font-semibold text-ink/55">
                {aside.noFees}
              </div>
            </div>
          </div>

          <svg
            width={PAPER_W}
            height="8"
            viewBox={`0 0 ${PAPER_W} 8`}
            className="block"
          >
            <path d={tornEdge(PAPER_W, 11, 8)} fill="#ffffff" />
          </svg>
        </div>
      </div>

      <Piece x={54} y={288} depth={0} dur={7.6} delay={1.1} amp={-11} z={2}>
        <Asterisk size={26} className="spin-slow text-mint" />
      </Piece>
    </div>
  );
}
