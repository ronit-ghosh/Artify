import CTA from "@/components/landing/cta";
import HeroText from "@/components/landing/hero-text";
import ImageGrid from "@/components/landing/image-grid";
import Navbar from "@/components/landing/navbar";

export default function Landing() {
  return (
    <>
      <div className="w-full min-h-screen max-w-7xl mx-auto px-px bg-gradient-to-t from-transparent via-transparent dark:to-white to-[#111] relative z-50">
        <div className="w-full h-full dark:bg-gradient-to-bl dark:from-[#121212] dark:to-[#111] bg-white mx-auto z-20">
          <Navbar />
          <HeroText />
          <CTA />
          <div className="lg:px-0 px-4 z-20">
            <ImageGrid />
          </div>
        </div>
      </div>
    </>
  );
}
