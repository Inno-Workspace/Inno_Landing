const Hero = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* SVG filters for brushed/spray texture */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="brush-texture">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="4"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="8"
              result="displacement"
            />
          </filter>
          <filter id="spray-texture">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.95"
              numOctaves="3"
              result="turbulence"
            />
            <feGaussianBlur in="turbulence" stdDeviation="2" result="blur" />
            <feColorMatrix
              in="blur"
              type="saturate"
              values="0"
              result="desaturated"
            />
          </filter>
          <filter id="noise-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
        </defs>
      </svg>

      {/* Base gradient background - darker turquoise */}
      <div className="absolute inset-0 bg-linear-to-br from-teal-700 via-cyan-800 to-teal-900"></div>

      {/* Large brush stroke 1 - top left */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 15% 25%, rgba(13, 148, 136, 0.8) 0%, transparent 60%)`,
          filter: "blur(60px)",
          mixBlendMode: "multiply",
        }}
      ></div>

      {/* Large brush stroke 2 - bottom right */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 85% 75%, rgba(15, 118, 110, 0.85) 0%, transparent 65%)`,
          filter: "blur(70px)",
          mixBlendMode: "screen",
        }}
      ></div>

      {/* Large brush stroke 3 - center */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 50% 60% at 50% 50%, rgba(14, 116, 144, 0.7) 0%, transparent 70%)`,
          filter: "blur(50px)",
          mixBlendMode: "multiply",
        }}
      ></div>

      {/* Medium brush stroke 4 - top right */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 40% 30% at 80% 20%, rgba(14, 116, 144, 0.75) 0%, transparent 55%)`,
          filter: "blur(45px)",
          mixBlendMode: "overlay",
        }}
      ></div>

      {/* Medium brush stroke 5 - bottom left */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 45% 35% at 20% 80%, rgba(17, 94, 89, 0.7) 0%, transparent 60%)`,
          filter: "blur(55px)",
          mixBlendMode: "screen",
        }}
      ></div>

      {/* Spray paint splatters - multiple layers - darker */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle 8% at 25% 35%, rgba(13, 148, 136, 0.6) 0%, transparent 50%),
            radial-gradient(circle 6% at 65% 15%, rgba(15, 118, 110, 0.7) 0%, transparent 45%),
            radial-gradient(circle 7% at 80% 55%, rgba(14, 116, 144, 0.65) 0%, transparent 50%),
            radial-gradient(circle 5% at 15% 70%, rgba(17, 94, 89, 0.6) 0%, transparent 40%),
            radial-gradient(circle 6% at 50% 85%, rgba(19, 78, 74, 0.7) 0%, transparent 45%),
            radial-gradient(circle 7% at 75% 30%, rgba(13, 148, 136, 0.65) 0%, transparent 50%),
            radial-gradient(circle 5% at 35% 60%, rgba(15, 118, 110, 0.6) 0%, transparent 40%),
            radial-gradient(circle 6% at 90% 75%, rgba(14, 116, 144, 0.7) 0%, transparent 45%)
          `,
          filter: "blur(25px)",
          mixBlendMode: "overlay",
        }}
      ></div>

      {/* Fine spray texture dots - darker */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle 3px at 20% 30%, rgba(13, 148, 136, 0.9) 0%, transparent 0%),
            radial-gradient(circle 4px at 40% 50%, rgba(15, 118, 110, 0.85) 0%, transparent 0%),
            radial-gradient(circle 2px at 60% 20%, rgba(14, 116, 144, 0.9) 0%, transparent 0%),
            radial-gradient(circle 5px at 80% 40%, rgba(17, 94, 89, 0.8) 0%, transparent 0%),
            radial-gradient(circle 3px at 30% 70%, rgba(19, 78, 74, 0.85) 0%, transparent 0%),
            radial-gradient(circle 4px at 70% 80%, rgba(13, 148, 136, 0.8) 0%, transparent 0%),
            radial-gradient(circle 2px at 10% 55%, rgba(15, 118, 110, 0.9) 0%, transparent 0%),
            radial-gradient(circle 3px at 55% 90%, rgba(14, 116, 144, 0.85) 0%, transparent 0%),
            radial-gradient(circle 4px at 85% 15%, rgba(17, 94, 89, 0.8) 0%, transparent 0%),
            radial-gradient(circle 2px at 45% 25%, rgba(19, 78, 74, 0.9) 0%, transparent 0%)
          `,
          backgroundSize: "100% 100%",
          filter: "blur(12px)",
          opacity: 0.7,
        }}
      ></div>

      {/* Noise texture overlay for brushed effect */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
          opacity: 0.3,
        }}
      ></div>

      {/* Additional texture layer with SVG filter */}
      <div
        className="absolute inset-0"
        style={{
          filter: "url(#noise-filter)",
          opacity: 0.1,
          mixBlendMode: "soft-light",
        }}
      ></div>

      {/* Animated gradient overlay for depth - darker */}
      <div className="absolute inset-0 bg-linear-to-t from-teal-900/40 via-transparent to-cyan-700/25"></div>

      {/* Geometric pattern overlay - triangular lines */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="geometric-pattern"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0,0 L50,50 L100,0 L100,100 L50,50 L0,100 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-cyan-900"
              />
              <path
                d="M25,25 L75,25 L50,75 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
                className="text-teal-800"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geometric-pattern)" />
        </svg>
      </div>

      {/* Radial gradient fade effects - darker */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-teal-950/15"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-cyan-800/25 via-transparent to-transparent"></div>

      {/* Additional depth layers with turquoise variations - darker */}
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-teal-700/8 to-transparent"></div>
      <div className="absolute inset-0 bg-linear-to-l from-transparent via-cyan-700/8 to-transparent"></div>

      {/* Content area */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center px-4">
          <h1
            className="text-6xl md:text-8xl font-bold text-white mb-4 drop-shadow-lg"
            style={{ fontFamily: "var(--font-bbh-sans)" }}
          >
            INNO
          </h1>
        </div>
      </div>

      {/* Bottom fade effect - darker */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-teal-950/50 to-transparent"></div>
    </div>
  );
};

export default Hero;
