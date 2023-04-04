import React, { useEffect, useRef, useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { Podcast } from "../../../types/podcast";
import Link from "next/link";
import { trpc } from "../../../utils/trpc";

const PodcastCard = ({
  podcast,
  index,
}: {
  podcast: Podcast;
  index: number;
}) => {
  const ref = useRef<null | HTMLDivElement>(null);
  const add = trpc.follows.addFavorite.useMutation();
  const remove = trpc.follows.removeFavorite.useMutation();
  const follows = trpc.follows.getOne.useQuery({ id: podcast.id });
  const [liked, setLiked] = useState(false);

  const handleLikePodcast = () => {
    console.log("Like Podcast");
    if (!follows) {
      add.mutate({ podcast: podcast.id, interests: "horror movies" });
      setLiked(true);
    } else {
      remove.mutate({ id: podcast.id });
      setLiked(false);
    }
  };

  useEffect(() => {
    setLiked(!!follows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div key={index} ref={ref} className="mx-3">
      <div>
        <div className="rounded-lg">
          <div className="relative mb-4 h-48 w-48 overflow-hidden rounded-lg hover:opacity-75">
            <div onClick={handleLikePodcast}>
              {liked ? (
                <SolidHeartIcon className="absolute top-2 right-2 h-5 w-5 text-white" />
              ) : (
                <HeartIcon className="absolute top-2 right-2 h-5 w-5 text-white" />
              )}
            </div>

            <Link href={`/podcasts/${podcast.id}`}>
              <img
                src={podcast.image}
                alt={podcast.title}
                className="h-full w-full object-cover object-center"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastCard;
