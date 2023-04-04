import { useState } from "react";
import clsx from "clsx";
import { TinyWaveFormIcon } from "../../../ui/atoms/Icons";

export default function AboutSection({ podcast }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleShowMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="mt-4 hidden lg:block">
      <h2 className="flex items-center font-mono text-sm font-medium leading-7 text-slate-900">
        <TinyWaveFormIcon
          colors={["fill-violet-300", "fill-pink-300"]}
          className="h-2.5 w-2.5"
        />
        <span className="ml-2.5 text-slate-200">About</span>
      </h2>
      <p
        className={clsx(
          "mt-2 text-base leading-7 text-slate-300 lg:max-w-sm",
          !isExpanded && "line-clamp-3"
        )}
      >
        {podcast?.description}
      </p>

      <button
        className="mt-2 hidden bg-gradient-to-r from-orange-600 to-pink-500 bg-clip-text text-sm font-bold leading-6 text-transparent hover:text-pink-700 active:text-pink-900 lg:inline-block"
        onClick={handleShowMore}
      >
        {isExpanded ? <span> Show less</span> : <span> Show more</span>}
      </button>
    </section>
  );
}
