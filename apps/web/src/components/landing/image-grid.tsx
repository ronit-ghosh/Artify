"use client";

import { motion } from "motion/react";
import Image from "next/image";

const IMAGES = [
  "https://res.cloudinary.com/drynqkitl/image/upload/v1753294029/5_zszpcb.jpg",
  "https://res.cloudinary.com/drynqkitl/image/upload/v1753294029/1_yaeyu6.jpg",
  "https://res.cloudinary.com/drynqkitl/image/upload/v1753294030/4_wt2inq.jpg",
  "https://res.cloudinary.com/drynqkitl/image/upload/v1753294029/3_gsprwm.jpg",
  "https://res.cloudinary.com/drynqkitl/image/upload/v1753294029/7_op18zh.jpg",
  "https://res.cloudinary.com/drynqkitl/image/upload/v1753294030/6_zjfnoi.jpg",
  "https://res.cloudinary.com/drynqkitl/image/upload/v1753294029/2_vmgx9f.jpg",
];

export default function ImageGrid() {
  return (
    <motion.div
      initial={{ filter: "blur(15px)", opacity: 0, scale: 0.95 }}
      animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="grid sm:grid-cols-3 grid-cols-2 max-w-4xl w-full h-180 mx-auto py-20 gap-4"
    >
      {IMAGES.map((image, i) => {
        return (
          <Image
            key={i}
            src={image}
            alt={`image-${i}`}
            width={10000}
            height={10000}
            className={`object-cover w-full rounded-3xl h-full border ${i === 0 && "row-span-2"} ${i === 2 && "row-span-2"}`}
          />
        );
      })}
    </motion.div>
  );
}

{
  /* <span className="w-full rounded-3xl h-full border row-span-2">0</span> */
}
