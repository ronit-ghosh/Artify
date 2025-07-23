"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function HeroText() {
  return (
    <div>
      <h1 className="uppercase min-[894px]:text-7xl text-5xl mt-20 font-extrabold text-center">
        <motion.div
          initial={{ y: 20, filter: "blur(10px)", opacity: 0 }}
          animate={{ y: 0, filter: "blur(0px)", opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl w-full mx-auto relative"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-tl from-[#222] to-[#121212] dark:from-[#eee] dark:to-[#ddd]">Turn Your Selfie <br /> Into Stunning AI Art</span>
          <Image
            className="absolute min-[894px]:right-42 min-[894px]:bottom-0 min-[894px]:w-27 min-[894px]:block hidden"
            src="/line.svg"
            alt="line"
            width={108}
            height={9}
          />
          <Image
            className="absolute min-[894px]:right-34 min-[894px]:bottom-10 min-[894px]:w-9 min-[894px]:block hidden"
            src="/big-star.svg"
            alt="big-star"
            width={35}
            height={35}
          />
          <Image
            className="absolute min-[894px]:right-3 min-[894px]:bottom-2.5 min-[894px]:w-9 min-[894px]:block hidden"
            src="/small-star.svg"
            alt="small-star"
            width={35}
            height={35}
          />
        </motion.div>
      </h1>
    </div>
  );
}
