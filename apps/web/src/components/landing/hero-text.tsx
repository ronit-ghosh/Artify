import Image from "next/image";

export default function HeroText() {
  return (
    <div>
      <h1 className="uppercase min-[894px]:text-7xl text-5xl mt-20 font-extrabold text-center">
        <div className="max-w-4xl w-full mx-auto relative">
          Turn Your Selfie <br /> Into Stunning AI Art
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
        </div>
      </h1>
    </div>
  );
}
