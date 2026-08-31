"use client";

/**
 * The INNO bot.
 *
 * Built from the brand's own geometry: the head is the same rounded-rect and
 * mint visor language as the UI cards, and the antenna is the brand asterisk.
 *
 * Posed mid-juggle — both arms up, alternating — so the two cards above him
 * read as thrown rather than parked. The arm timing matches the cards' loop
 * exactly (3.2s), which is what sells it; a mismatch reads as two unrelated
 * animations happening near each other.
 *
 * Symmetric on purpose, so it needs no mirroring on an RTL page.
 */

const ASTERISK =
  "M98 43 L98 57 L66.9 57 L83.23 73.33 L73.33 83.23 L57 66.9 L57 98 " +
  "L43 98 L43 66.9 L26.67 83.23 L16.77 73.33 L33.1 57 L2 57 " +
  "L2 43 L33.1 43 L16.77 26.67 L26.67 16.77 L43 33.1 L43 2 " +
  "L57 2 L57 33.1 L73.33 16.77 L83.23 26.67 L66.9 43 Z";

export default function Mascot({ width = 148 }: { width?: number }) {
  return (
    <svg
      width={width}
      height={(width * 170) / 160}
      viewBox="0 0 160 170"
      fill="none"
      aria-hidden="true"
      className="overflow-visible"
    >
      <ellipse
        className="bot-shadow"
        cx="80"
        cy="158"
        rx="30"
        ry="5"
        fill="#072436"
      />

      <g className="bot">
        {/* antenna — placement on the outer group, spin on the inner one, since
            a CSS transform replaces an SVG transform attribute outright */}
        <rect x="78" y="14" width="4" height="14" rx="2" fill="#4FC7A3" />
        <g transform="translate(71 0) scale(0.18)">
          <g className="bot-antenna">
            <path d={ASTERISK} fill="#4FC7A3" />
          </g>
        </g>

        {/* arms, thrown up and alternating */}
        <g className="bot-arm-b">
          <line
            x1="53"
            y1="98"
            x2="25"
            y2="58"
            stroke="#072436"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <circle cx="25" cy="58" r="8" fill="#4FC7A3" />
        </g>
        <g className="bot-arm-a">
          <line
            x1="107"
            y1="98"
            x2="135"
            y2="58"
            stroke="#072436"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <circle cx="135" cy="58" r="8" fill="#4FC7A3" />
        </g>

        {/* ears */}
        <rect x="39" y="44" width="6" height="14" rx="3" fill="#4FC7A3" />
        <rect x="115" y="44" width="6" height="14" rx="3" fill="#4FC7A3" />

        {/* head */}
        <rect
          x="45"
          y="26"
          width="70"
          height="52"
          rx="20"
          fill="#072436"
          stroke="#4FC7A3"
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />
        <rect x="54" y="38" width="52" height="26" rx="13" fill="#4FC7A3" />
        <circle className="bot-eye" cx="68" cy="51" r="5" fill="#072436" />
        <circle className="bot-eye" cx="92" cy="51" r="5" fill="#072436" />

        <rect x="73" y="74" width="14" height="10" fill="#072436" />

        {/* body */}
        <rect x="53" y="82" width="54" height="48" rx="16" fill="#072436" />
        <rect
          x="65"
          y="92"
          width="30"
          height="18"
          rx="7"
          fill="#4FC7A3"
          fillOpacity="0.28"
        />
        <rect className="bot-bar" x="69" y="98" width="4" height="6" rx="2" fill="#4FC7A3" />
        <rect className="bot-bar" x="75" y="98" width="4" height="6" rx="2" fill="#4FC7A3" style={{ animationDelay: "0.4s" }} />
        <rect className="bot-bar" x="81" y="98" width="4" height="6" rx="2" fill="#4FC7A3" style={{ animationDelay: "0.8s" }} />

        {/* legs */}
        <rect x="65" y="126" width="11" height="18" rx="5.5" fill="#072436" />
        <rect x="84" y="126" width="11" height="18" rx="5.5" fill="#072436" />
        <ellipse cx="70.5" cy="146" rx="9" ry="5" fill="#4FC7A3" />
        <ellipse cx="89.5" cy="146" rx="9" ry="5" fill="#4FC7A3" />
      </g>
    </svg>
  );
}
