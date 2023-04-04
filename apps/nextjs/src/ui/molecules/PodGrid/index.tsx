import React from "react";
import { Podcast } from "../../../types/podcast";
import PodcastCard from "../../atoms/PodcastCard";

const PodGrid = ({
  podcasts,
  title,
}: {
  podcasts: Podcast[];
  title: string;
}) => {
  return (
    <>
      <div className="mb-3">
        <span className="p-3 text-lg font-medium uppercase text-white">
          {title} Results
        </span>
      </div>

      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        {podcasts.map((podcast) => {
          return (
            <li key={podcast.id}>
              <PodcastCard podcast={podcast} index={0} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default PodGrid;
