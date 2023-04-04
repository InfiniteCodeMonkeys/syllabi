import React, { useEffect, useState } from "react";
import Image from "next/image";
import AppHeader from "./Header/AppHeader";
import { SideBar } from "./Sidebar/Sidebar";
import Link from "next/link";
import {
  TinyWaveFormIcon,
  SpotifyIcon,
  ApplePodcastIcon,
  OvercastIcon,
  RSSIcon,
} from "../../ui/atoms/Icons";
import AboutSection from "./Sidebar/About";
import { Podcast } from "../../types/podcast";
import { trpc } from "../../utils/trpc";

const AppLayout = ({
  podcast,
  children,
}: {
  podcast: Podcast;
  children: JSX.Element;
}) => {
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

  const handleInterests = () => {
    console.log("Interested");
  };

  const handleAddToRollUp = () => {
    console.log("RollingUp");
  };

  useEffect(() => {
    setLiked(!!follows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700">
      <div className="hidden w-16 md:flex lg:min-h-full lg:border-r-2 lg:border-slate-500">
        <SideBar podcast={podcast} />
      </div>
      <div className="w-full">
        <div className="h-18">
          <AppHeader />
        </div>
        <div className="flex flex-col lg:flex-row">
          <div>
            <div className="relative mx-auto px-4 pb-4 pt-10 sm:px-6 md:max-w-2xl md:px-4 lg:min-h-full lg:flex-auto lg:border-r-2 lg:border-slate-500 lg:px-8 xl:px-12">
              <div className="mx-auto h-52 w-52 lg:mx-0">
                <Image
                  src={podcast?.image}
                  alt={podcast.title}
                  height={200}
                  width={200}
                  sizes="(min-width: 1024px) 20rem, (min-width: 640px) 16rem, 12rem"
                  priority
                />
              </div>
              <div className="mt-10 text-center lg:mt-12 lg:text-left">
                <p className="text-xl font-bold text-slate-200">
                  {podcast.title}
                </p>
                <div>
                  {liked ? (
                    <button
                      className="mt-2 mr-4 hidden bg-gradient-to-r from-orange-600 to-pink-500 bg-clip-text text-sm font-bold leading-6 text-transparent hover:text-pink-700 active:text-pink-900 lg:inline-block"
                      onClick={handleLikePodcast}
                    >
                      Following
                    </button>
                  ) : (
                    <button
                      className="mt-2 mr-4 hidden bg-gradient-to-r from-orange-600 to-pink-500 bg-clip-text text-sm font-bold leading-6 text-transparent hover:text-pink-700 active:text-pink-900 lg:inline-block"
                      onClick={handleLikePodcast}
                    >
                      Follow Podcast
                    </button>
                  )}

                  <button
                    className="mt-2 mr-4 hidden bg-gradient-to-r from-orange-600 to-pink-500 bg-clip-text text-sm font-bold leading-6 text-transparent hover:text-pink-700 active:text-pink-900 lg:inline-block"
                    onClick={handleInterests}
                  >
                    Set Interests
                  </button>
                  <button
                    className="mt-2 mr-4 hidden bg-gradient-to-r from-orange-600 to-pink-500 bg-clip-text text-sm font-bold leading-6 text-transparent hover:text-pink-700 active:text-pink-900 lg:inline-block"
                    onClick={handleAddToRollUp}
                  >
                    Add to Rollup
                  </button>
                </div>
              </div>
              <AboutSection podcast={podcast} />
              <section className="mt-10 lg:mt-12">
                <h2 className="sr-only flex items-center font-mono text-sm font-medium leading-7 text-slate-900 lg:not-sr-only">
                  <TinyWaveFormIcon
                    colors={["fill-indigo-300", "fill-blue-300"]}
                    className="h-2.5 w-2.5"
                  />
                  <span className="ml-2.5 text-slate-200">Listen</span>
                </h2>
                <div className="h-px bg-gradient-to-r from-slate-200/0 via-slate-200 to-slate-200/0 lg:hidden" />
                <ul
                  role="list"
                  className="mt-4 flex justify-center gap-10 text-base font-medium leading-7 text-slate-700 sm:gap-8 lg:flex-col lg:gap-4"
                >
                  {[
                    ["Spotify", SpotifyIcon],
                    ["Apple Podcast", ApplePodcastIcon],
                    ["Overcast", OvercastIcon],
                    ["RSS Feed", RSSIcon],
                  ].map(([label, Icon]) => (
                    <li key={label as string} className="flex">
                      <Link href="/" className="group flex items-center">
                        <div className="flex">
                          <Icon className="h-8 w-8 fill-slate-400 group-hover:fill-slate-600" />
                          <span className="mt-1 hidden text-slate-200 sm:ml-3 sm:block">
                            {label as string}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
          <main className=" lg:min-h-full ">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
