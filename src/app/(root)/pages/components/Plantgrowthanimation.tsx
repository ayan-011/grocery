import React from "react";

interface Plant {
  x: number;
  height: number;
  stemColor: string;
  flowerColor: string;
  flowerCenter: string;
  delay: string;
  duration: string;
  scale: number;
}

// Staggered, varied plants so the bed doesn't feel mechanical.
// Negative delays start each plant mid-cycle so the loop feels alive
// immediately instead of everything sprouting in lockstep.
const plants: Plant[] = [
  { x: 60, height: 120, stemColor: "#2f5233", flowerColor: "#f4a6c1", flowerCenter: "#f2c94c", delay: "-1.2s", duration: "7s", scale: 0.85 },
  { x: 150, height: 150, stemColor: "#375e3b", flowerColor: "#f2c94c", flowerCenter: "#e8734a", delay: "-3.8s", duration: "7.6s", scale: 1 },
  { x: 240, height: 100, stemColor: "#2f5233", flowerColor: "#e8734a", flowerCenter: "#f4a6c1", delay: "-0.4s", duration: "6.8s", scale: 0.75 },
  { x: 330, height: 160, stemColor: "#3d6b41", flowerColor: "#c98bd9", flowerCenter: "#f4a6c1", delay: "-2.6s", duration: "8s", scale: 1.05 },
  { x: 420, height: 110, stemColor: "#2f5233", flowerColor: "#f4a6c1", flowerCenter: "#f2c94c", delay: "-5.1s", duration: "7.2s", scale: 0.8 },
  { x: 510, height: 145, stemColor: "#375e3b", flowerColor: "#f2c94c", flowerCenter: "#e8734a", delay: "-1.9s", duration: "7.8s", scale: 0.95 },
  { x: 600, height: 95, stemColor: "#2f5233", flowerColor: "#c98bd9", flowerCenter: "#f4a6c1", delay: "-4.4s", duration: "6.6s", scale: 0.7 },
  { x: 690, height: 155, stemColor: "#3d6b41", flowerColor: "#e8734a", flowerCenter: "#f2c94c", delay: "-0.9s", duration: "7.9s", scale: 1 },
  { x: 780, height: 115, stemColor: "#2f5233", flowerColor: "#f4a6c1", flowerCenter: "#e8734a", delay: "-3.2s", duration: "7.1s", scale: 0.85 },
  { x: 870, height: 140, stemColor: "#375e3b", flowerColor: "#f2c94c", flowerCenter: "#c98bd9", delay: "-2s", duration: "7.5s", scale: 0.9 },
];

function PlantGraphic({ plant }: { plant: Plant }) {
  const { x, height, stemColor, flowerColor, flowerCenter, delay, duration, scale } = plant;
  const topY = 200 - height;

  return (
    <g
      className="plant"
      style={{
        transform: `translate(${x}px, 0) scale(${scale})`,
        transformOrigin: `${x}px 200px`,
        animationDelay: delay,
        animationDuration: duration,
      }}
    >
      {/* stem, drawn on with stroke-dashoffset */}
      <path
        className="plant-stem"
        d={`M ${x} 200 C ${x - 10} ${topY + 70}, ${x + 10} ${topY + 40}, ${x} ${topY + 18}`}
        fill="none"
        stroke={stemColor}
        strokeWidth={3}
        strokeLinecap="round"
        pathLength={100}
        style={{ animationDelay: delay, animationDuration: duration }}
      />

      {/* left leaf */}
      <path
        className="plant-leaf plant-leaf-left"
        d={`M ${x} ${topY + 90} C ${x - 26} ${topY + 78}, ${x - 30} ${topY + 60}, ${x - 6} ${topY + 55}`}
        fill={stemColor}
        style={{
          transformOrigin: `${x}px ${topY + 90}px`,
          animationDelay: delay,
          animationDuration: duration,
        }}
      />

      {/* right leaf */}
      <path
        className="plant-leaf plant-leaf-right"
        d={`M ${x} ${topY + 130} C ${x + 28} ${topY + 120}, ${x + 32} ${topY + 102}, ${x + 6} ${topY + 98}`}
        fill={stemColor}
        style={{
          transformOrigin: `${x}px ${topY + 130}px`,
          animationDelay: delay,
          animationDuration: duration,
        }}
      />

      {/* flower */}
      <g
        className="plant-flower"
        style={{
          transformOrigin: `${x}px ${topY + 14}px`,
          animationDelay: delay,
          animationDuration: duration,
        }}
      >
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <ellipse
            key={angle}
            cx={x}
            cy={topY + 14}
            rx={5.5}
            ry={9.5}
            fill={flowerColor}
            transform={`rotate(${angle} ${x} ${topY + 14}) translate(0 -8)`}
          />
        ))}
        <circle cx={x} cy={topY + 14} r={4.5} fill={flowerCenter} />
      </g>
    </g>
  );
}

export default function PlantGrowthAnimation() {
  return (
    <div className="plant-animation-scope  relative w-full overflow-hidden bg-gradient-to-b from-white to-emerald-50">
      <svg
        viewBox="0 0 960 220"
        className="h-48 w-full sm:h-56"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        {/* soil bed */}
        <path
          d="M0 200 C 160 188, 320 210, 480 198 C 640 187, 800 208, 960 196 L 960 220 L 0 220 Z"
          fill="#3a2e22"
        />
        <path
          d="M0 200 C 160 188, 320 210, 480 198 C 640 187, 800 208, 960 196"
          fill="none"
          stroke="#2c2318"
          strokeWidth={2}
        />

        {plants.map((plant, i) => (
          <PlantGraphic key={i} plant={plant} />
        ))}
      </svg>

      <style>{`
        .plant-animation-scope .plant {
          animation-name: plant-cycle;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
        .plant-animation-scope .plant-stem {
          stroke-dasharray: 100;
          animation-name: stem-grow;
          animation-iteration-count: infinite;
          animation-timing-function: ease-out;
        }
        .plant-animation-scope .plant-leaf {
          opacity: 0;
          transform: scale(0.2);
          animation-name: leaf-unfurl;
          animation-iteration-count: infinite;
          animation-timing-function: ease-out;
        }
        .plant-animation-scope .plant-flower {
          opacity: 0;
          transform: scale(0) rotate(-15deg);
          animation-name: flower-bloom;
          animation-iteration-count: infinite;
          animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes plant-cycle {
          0%   { opacity: 0; }
          6%   { opacity: 1; }
          82%  { opacity: 1; }
          94%  { opacity: 0; }
          100% { opacity: 0; }
        }

        @keyframes stem-grow {
          0%   { stroke-dashoffset: 100; }
          32%  { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 0; }
        }

        @keyframes leaf-unfurl {
          0%   { opacity: 0; transform: scale(0.2); }
          18%  { opacity: 0; transform: scale(0.2); }
          34%  { opacity: 1; transform: scale(1); }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes flower-bloom {
          0%   { opacity: 0; transform: scale(0) rotate(-15deg); }
          34%  { opacity: 0; transform: scale(0) rotate(-15deg); }
          52%  { opacity: 1; transform: scale(1.08) rotate(2deg); }
          62%  { transform: scale(1) rotate(0deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .plant-animation-scope .plant,
          .plant-animation-scope .plant-stem,
          .plant-animation-scope .plant-leaf,
          .plant-animation-scope .plant-flower {
            animation-play-state: paused;
          }
        }
      `}</style>
    </div>
  );
}