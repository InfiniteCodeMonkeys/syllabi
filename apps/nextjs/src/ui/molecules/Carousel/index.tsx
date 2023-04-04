import { ReactElement, useEffect, useRef, useState } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Podcast } from "../../../types/podcast";
import PodcastCard from "../../atoms/PodcastCard";

const PodcastScroll = ({
  podcasts,
  title,
}: {
  podcasts: Podcast[];
  title: string;
}): ReactElement => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);

  const handleAdvance = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const handleReverse = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const isDisabled = (direction) => {
    if (direction === "prev") {
      return currentIndex <= 0;
    }

    if (direction === "next" && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }

    return false;
  };
  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  if (!podcasts) {
    return;
  }

  return (
    <div className="max-w-full overflow-hidden">
      <div className="flex justify-between">
        <span className="p-3 text-lg font-medium uppercase  text-white">
          {title}{" "}
          <ChevronRightIcon className="inline h-5 w-5 pb-1 text-white" />
        </span>
        <div className="mr-6">
          <button
            type="button"
            disabled={isDisabled("prev")}
            className=" rounded-md bg-gradient-to-r py-3 px-4 font-medium text-white shadow hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900"
            onClick={handleReverse}
          >
            <ChevronLeftIcon className="inline h-8 w-8 pb-1 text-white" />
          </button>
          <button
            type="button"
            disabled={isDisabled("next")}
            className=" rounded-md bg-gradient-to-r py-3 px-4 font-medium text-white shadow hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900"
            onClick={handleAdvance}
          >
            <ChevronRightIcon className="inline h-8 w-8 pb-1 text-white" />
          </button>
        </div>
      </div>

      <div
        ref={carousel}
        className="carousel-container scrollbar-hide relative mx-auto mt-6 mb-8  flex touch-pan-x snap-x snap-mandatory overflow-scroll scroll-smooth"
      >
        {podcasts.map((podcast: Podcast, index: number) => {
          return <PodcastCard podcast={podcast} index={index} key={index} />;
        })}
      </div>
    </div>
  );
};

export default PodcastScroll;
