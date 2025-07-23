"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";

const NAV_LINKS = [
  {
    name: "packs",
    href: "/dashboard/packs",
  },
  {
    name: "train",
    href: "/dashboard/train",
  },
  {
    name: "generate",
    href: "/dashboard/generate",
  },
  {
    name: "pricing",
    href: "/credits",
  },
  {
    name: "dashboard",
    href: "/dashboard",
  },
];

export default function Navbar() {
  const [hovered, setHovered] = useState<number | null>();
  const { theme, setTheme } = useTheme();
  return (
    <header className="w-full h-18 flex justify-between border-y dark:border-[#ddd] border-[#111]">
      <div className="hidden items-center gap-2 w-[16%] justify-center md:flex lg:border-r dark:border-[#ddd] border-[#111]">
        <Image src="/logo.png" alt="logo" width={40} height={40} className="" />
        <span className="text-2xl font-extrabold lg:block hidden">ARTIFY</span>
      </div>
      <Image
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        src="/mesh.png"
        alt="mesh"
        width={1000}
        height={1000}
        className="object-cover lg:w-[30%] w-0 opacity-25 lg:block hidden"
      />
      <nav className="lg:w-[62%] md:w-[84%] w-full">
        <ul className="flex h-full w-full items-center divide-x-1 dark:divide-[#ddd] divide-[#111] border-l dark:border-[#ddd] border-[#111]">
          {NAV_LINKS.map((link, i) => {
            return (
              <Link
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                key={i}
                href={link.href}
                className="relative w-full h-full flex justify-center items-center"
              >
                <li className="uppercase sm:text-lg md:text-base text-xs md:font-semibold font-bold z-20">
                  {link.name}
                </li>
                {hovered === i && (
                  <motion.span
                    layoutId="nav-bg"
                    className="absolute z-10 w-full h-full dark:bg-[#202020] bg-[#ddd]"
                  />
                )}
              </Link>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
