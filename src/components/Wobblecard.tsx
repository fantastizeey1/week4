import { WobbleCard } from "@/components/ui/wobble-card";
import { Link } from "react-router-dom";

export function WobbleCardDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      <Link
        to="/api/advice-slip"
        className="col-span-1 lg:col-span-2 h-full min-h-[500px] lg:min-h-[300px]"
      >
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
          className=""
        >
          <div className="max-w-xs">
            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Advice Slip API
            </h2>
            <p className="mt-4 text-left text-base/6 text-neutral-200">
              Provides random advice slips for motivational apps or daily tips.
            </p>
          </div>
          {/* <img
          src="/noise.webp"
          alt="linear demo image"
          className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
        /> */}
        </WobbleCard>
      </Link>

      <Link
        to="/api/nasa-api"
        className="col-span-1 lg:col-span-1 h-full  lg:min-h-[300px]"
      >
        <WobbleCard containerClassName="col-span-1 ">
          <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            NASA API
          </h2>
          <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
            An extensive API providing data on space missions and celestial
            objects. Ideal for space projects.
          </p>
        </WobbleCard>
      </Link>

      <Link to="/api/joke-api" className="col-span-1 min-h-[300px]">
        <WobbleCard containerClassName="col-span-1 ">
          <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            JokeAPI
          </h2>
          <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
            Delivers jokes on various topics—ideal for entertainment apps.
          </p>
        </WobbleCard>
      </Link>

      <Link to="/api/countries-api" className="col-span-2 min-h-[300px]">
        <WobbleCard containerClassName="col-span-1 lg:col-span-2   ">
          <div className="max-w-sm">
            <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              REST Countries API
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
              Offers country information, perfect for geographic and demographic
              apps.
            </p>
          </div>
          {/* <img
          src="/noise.webp"
          alt="linear demo image"
          className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
        /> */}
        </WobbleCard>
      </Link>
    </div>
  );
}
