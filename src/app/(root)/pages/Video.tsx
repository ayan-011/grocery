"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const Video = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const clipPathProgress = useTransform(
    scrollYProgress,
    [0, 0.5],
    [20, 80]
  );

  const clipPath = useTransform(
    clipPathProgress,
    (value) => `circle(${value}% at 50% 50%)`
  );

  return (
    <div
      ref={containerRef}
      className="relative h-screen bg-[#e6e2d6] z-90"
    >
      <div className="sticky top-0 w-screen h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            clipPath,
            willChange: "clip-path",
            transform: "translateZ(0)",
          }}
        >
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/videos/about.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
              willChange: "transform",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};