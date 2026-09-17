"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { div } from "framer-motion/client";
import { useRef } from "react";
import Videofooter from "./components/Videofooter";

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
    [0, 80]
  );

  // const clipPath = useTransform(
  //   clipPathProgress,
  //   (value) => `circle(${value}% at 50% 50%)`
  // );

  return (
    <div className="">

      <div
        ref={containerRef}
        className="relative h-[200vh] bg-[#d1f551]  "
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
                src="/videos/farm.mp4"
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

              <div className="content absolute bottom-0  h-fit gap-15 sm:gap-20 md:gap-30    w-full   flex flex-col justify-between  text-white">
                <div className="max-w-6xl sm:ml-[10%] flex flex-col gap-6 mt-20  p-4 sm:p-1  items-  sm:items-start">
                  <div className="text flex w-full max-w-[600px] flex-col gap-6 ">


                    
                      <h1  
                        className="w-full font-semibold select-none !font-sans text-4xl sm:text-6xl ">
                        Smart Farming for <br />
                        Future <span className="font-medium font-serif">generation</span>
                      </h1>
 

                    <span className="w-full text-[12px] text-white/90 sm:text-sm">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      <br className="flex sm:hidden" />
                      Rem cupiditate adipisci
                      <br className="hidden sm:flex" /> possimus repellat!
                    </span>
                  </div>
                  <div className="w- ">


                    <button className="bg-[#d1f551] hover:bg-[#c9f725] py-4 px-20  rounded-full  text-lg  text-black">Shop Now</button>
                  </div>
                </div>

                <div className="footer border-t-[1px] border-white/30 b-0 py-8 md:py-10 bg-">

                </div>

              </div>


            </motion.div>
          </div>
        </div>


      </div>
      <Videofooter />
    </div>
  );
};