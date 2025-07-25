"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { motion } from "motion/react";

export default function CTA() {
  return (
    <motion.div
      initial={{ y: -25, filter: "blur(10px)", opacity: 0 }}
      animate={{ y: 0, filter: "blur(0px)", opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex md:gap-10 gap-3 sm:mx-0 px-4 w-full justify-center mt-10"
    >
      <Link href="/credits">
        <Button
          variant="custom"
          className="font-extrabold lg:text-2xl md:text-xl lg:w-64 lg:h-15 md:h-14 md:w-52 w-40 h-13 text-base"
        >
          SEE DEMO
        </Button>
      </Link>
      <Link href="/dashboard/generate">
        <Button
          variant="customOutline"
          className="font-extrabold lg:text-2xl md:text-xl lg:w-64 lg:h-15 md:h-14 md:w-52 w-40 h-13 text-base"
        >
          GENERATE IMAGE
        </Button>
      </Link>
    </motion.div>
  );
}
