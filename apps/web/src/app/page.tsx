import HeroText from "@/components/landing/hero-text";
import ImageGrid from "@/components/landing/image-grid";
import Navbar from "@/components/landing/navbar";
import { Button } from "@/components/ui/button";

export default async function page() {
  return (
    <div className="w-full min-h-screen max-w-7xl mx-auto px-px bg-gradient-to-t from-transparent via-transparent dark:to-white to-[#111]">
      <div className="w-full h-full dark:bg-gradient-to-bl dark:from-[#121212] dark:to-[#111] bg-white mx-auto">
        <Navbar />
        <HeroText />
        <div className="flex md:gap-10 gap-3 sm:mx-0 px-4 w-full justify-center mt-10">
          <Button
            variant="custom"
            className="font-extrabold lg:text-2xl md:text-xl lg:w-64 lg:h-15 md:h-14 md:w-52 w-40 h-13 text-base"
          >
            SEE PRICING
          </Button>
          <Button
            variant="customOutline"
            className="font-extrabold lg:text-2xl md:text-xl lg:w-64 lg:h-15 md:h-14 md:w-52 w-40 h-13 text-base"
          >
            GENERATE IMAGE
          </Button>
        </div>
        <div className="lg:px-0 px-4">
          <ImageGrid />
        </div>
      </div>
    </div>
  );
}
