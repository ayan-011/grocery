 
import React from "react";

type Site = {
  no: string;
  name: string;
  coords: string;
  seed: string;
};

const SITES: Site[] = [
  { no: "01", name: "Salt Flat", coords: "40.7°N 113.9°W", seed: "saltflat-1" },
  { no: "02", name: "Cedar Ridge", coords: "36.1°N 112.1°W", seed: "cedarridge-2" },
  { no: "03", name: "Basalt Coast", coords: "64.1°N 21.9°W", seed: "basalt-3" },
  { no: "04", name: "Dune Field", coords: "31.2°N 5.0°E", seed: "dune-4" },
  { no: "05", name: "Glacier Tongue", coords: "78.9°N 16.0°E", seed: "glacier-5" },
  { no: "06", name: "Terraced Valley", coords: "27.6°N 86.6°E", seed: "valley-6" },
  { no: "07", name: "Lava Field", coords: "19.4°N 155.3°W", seed: "lava-7" },
  { no: "08", name: "Chalk Cliffs", coords: "50.7°N 1.3°W", seed: "chalk-8" },
  { no: "09", name: "Mangrove Delta", coords: "22.3°N 89.0°E", seed: "mangrove-9" },
  { no: "10", name: "Pine Highland", coords: "46.5°N 11.3°E", seed: "pine-10" },
  { no: "11", name: "Red Canyon", coords: "36.9°N 111.4°W", seed: "canyon-11" },
  { no: "12", name: "Tundra Plain", coords: "68.3°N 133.5°E", seed: "tundra-12" },
];

export default function Grid() {
  return (
    <div
      style={{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ["--paper" as any]: "#021008",
        ["--ink" as any]: "#26261f",
        ["--rust" as any]: "#9c5b3c",
        ["--pine" as any]: "#3b5d52",
        ["--dot" as any]: "#a89f8c",
        
        
      }}
      className="min-h-screen w-full flex flex-col relative z-10"
    >
       {/* <div
    className="pointer-events-none absolute inset-0 z-50 opacity-5 "
    style={{
      backgroundImage: "url('/textures/tecture2.jpg')",
        //  backgroundSize: "cover",
    // backgroundPosition: "center",
    }}
  /> */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .tig-root {
          background-color: var(--paper);
          color: var(--ink);
          font-family: 'Newsreader', serif;
        }
        .tig-mono {
          font-family: 'IBM Plex Mono', monospace;
        }
        .tig-cell {
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid rgba(38,38,31,0.18);
          border-right: 1.5px dotted var(--dot);
          padding: 2.25rem 1.5rem;
          min-height: 168px;
          cursor: pointer;
        }
        .tig-cell:nth-child(3n) {
          border-right: none;
        }
        .tig-img {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transform: scale(1.12);
          filter: grayscale(100%) contrast(1.05) brightness(0.85);
          transition: opacity 700ms cubic-bezier(0.22,1,0.36,1),
                      transform 900ms cubic-bezier(0.22,1,0.36,1),
                      filter 900ms cubic-bezier(0.22,1,0.36,1);
        }
        .tig-cell:hover .tig-img,
        .tig-cell:focus-visible .tig-img {
          opacity: 1;
          transform: scale(1);
          filter: grayscale(0%) contrast(1) brightness(0.72);
        }
        .tig-cell::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(20,20,16,0.55), rgba(20,20,16,0) 55%);
          opacity: 0;
          transition: opacity 600ms ease;
          pointer-events: none;
        }
        .tig-cell:hover::after,
        .tig-cell:focus-visible::after {
          opacity: 1;
        }
        .tig-label {
          position: relative;
          z-index: 1;
          transition: color 500ms ease, transform 500ms cubic-bezier(0.22,1,0.36,1);
        }
        .tig-cell:hover .tig-label,
        .tig-cell:focus-visible .tig-label {
          color: #f2efe6;
          transform: translateY(-4px);
        }
        .tig-no {
          transition: color 500ms ease;
        }
        .tig-cell:hover .tig-no,
        .tig-cell:focus-visible .tig-no {
          color: #d8b79a;
        }
      `}</style>

      <div className="tig-root flex-1 flex flex-col !text-white ">
        <header className="px-6 pt-14 pb-10 md:px-12  " >
          <p className="tig-mono text-xs tracking-wide" style={{ color: "var(--pine)" }}>
             
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl " style={{ fontWeight: 500 }}>
            Twelve terrains, surveyed
          </h1>
          <p className="mt-3 max-w-md text-base md:text-[17px] leading-relaxed !text-white" style={{ color: "rgba(38,38,31,0.75)" }}>
            Each entry holds a coordinate and a photograph. Rest a cursor
            on a name to bring the ground into view.
          </p>
        </header>

       
{/* border-[#999380] */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
          {SITES.map((site) => (
            <div
              key={site.no}
              className="tig-cell  !border-b-[1px] !border-t-[1px] border-dashed !border-[#d2f5513c]"
              tabIndex={0}
              role="button"
              aria-label={`Reveal photograph of ${site.name}`}
            >
              <div
                className="tig-img"
                style={{
                  backgroundImage: `url(https://picsum.photos/seed/${site.seed}/900/1100)`,
                }}
              />
              <div className="tig-label flex flex-col gap-1">
                <span className="tig-mono tig-no text-xs text-[#d2f551]" >
                  {site.no}
                </span>
                <span className="text-2xl" style={{ fontWeight: 500 }}>
                  {site.name}
                </span>
                <span className="tig-mono text-xs" style={{ opacity: 0.65 }}>
                  {site.coords}
                </span>
              </div>
            </div>
          ))}
        </div>

        <footer className="px-6 py-6 md:px-12 tig-mono text-[11px]" style={{ color: "rgba(38,38,31,0.55)" }}>
          
        </footer>
         
      </div>
    </div>
  );
}