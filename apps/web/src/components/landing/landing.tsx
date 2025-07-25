import CTA from "@/components/landing/cta";
import HeroText from "@/components/landing/hero-text";
import ImageGrid from "@/components/landing/image-grid";
import Navbar from "@/components/landing/navbar";
import { cn } from "@/lib/utils";

export default function Landing() {
  return (
    <>
      <div
        className={cn(
          "w-full max-w-7xl mx-auto px-px",
          "bg-gradient-to-t from-transparent via-transparent dark:to-white to-[#111]"
        )}
      >
        <div className="mx-auto h-full dark:bg-gradient-to-bl dark:from-[#121212] dark:to-[#111] bg-white pb-20">
          <Navbar />
          <HeroText />
          <CTA />
          <ImageGrid />
        </div>
      </div>
    </>
  );
}
