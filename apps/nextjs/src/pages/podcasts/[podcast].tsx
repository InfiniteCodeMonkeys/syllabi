import React from "react";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import NextHead from "../../ui/atoms/Head";
import EpisodeEntry from "../../ui/molecules/Episodes/EpisodeEntry";
// import PlayPauseIcon from "../../ui/atoms/PlayPauseIcon";

import AppLayout from "../../layouts/AppLayout";

const PodcastPage = () => {
  const router = useRouter();
  const { podcast } = router.query;
  const { data } = trpc.podcasts.getOne.useQuery({
    id: podcast as string,
  });

  if (!data) {
    return;
  }

  const episodes = data.data.episodes;

  return (
    <>
      <NextHead />
      <div className="flex">
        <AppLayout podcast={data.data}>
          <div className="h-full w-full bg-gradient-to-r from-gray-700 to-gray-600">
            <div className="px-8 pt-12">
              <h1 className="text-3xl text-slate-200">Episodes</h1>
            </div>
            <div className="px-8 pt-12">
              {episodes.map((episode, index) => {
                return <EpisodeEntry episode={episode} key={index + 1} />;
              })}
            </div>
          </div>
        </AppLayout>
      </div>
    </>
  );
};

export default PodcastPage;
