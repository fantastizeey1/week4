import React from "react";

import { Cover } from "@/components/ui/cover";
import { WobbleCardDemo } from "./Wobblecard";
const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-950 to-blue-950 text-gray-50 p-8">
      <div className="mb-12">
        <h1
          className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-200 to-neutral-700 dark:from-neutral-200 dark:via-white 
        dark:to-white animate-pulse"
        >
          <Cover>Fantastizeey</Cover> API Testing Hub 🚀
        </h1>
        <p className="text-center text-xl mt-4 opacity-90">
          Dive into the Future of API Testing with Precision and Insight with a
          little bit of fun
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-10">APIs Being Tested</h2>
        <WobbleCardDemo />
      </section>
    </div>
  );
};

export default HomePage;
