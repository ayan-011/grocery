"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const Video = () => {
  const containerRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const clipPathProgress = useTransform(
    scrollYProgress,
    [0, 0.5],
    [20, 80]
  );

  // const clipPath = useTransform(
  //   clipPathProgress,
  //   (value) => `circle(${value}% at 50% 50%)`
  // );

  return (
    <div
      ref={containerRef}
      className="relative h-[200vh] bg-[#e6e2d6]  "
    >
      <div
        ref={stickyRef}
        className="top-0 sticky m-0 p-0 w-screen h-screen overflow-hidden"
      >
      <div className="relative z-auto inset-0 p-0 w-full h-full">
        <motion.div
          className=" w-full h-full"
         style={{
              clipPath: useTransform(
                clipPathProgress,
                (value: number) => `circle(${value}% at 50% 50%)`
              ),
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
    </div>
  );
};