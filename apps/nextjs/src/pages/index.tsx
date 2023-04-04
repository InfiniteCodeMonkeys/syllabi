import { useEffect } from "react";
import type { NextPage } from "next";
import MarketingLayout from "../layouts/MarketingLayout";
import CenterCTA from "../ui/atoms/Callout";
import MarketingHero from "../ui/molecules/MarketingHero";
import { trpc } from "../utils/trpc";
import PodcastScroll from "../ui/molecules/Carousel";
import NextHead from "../ui/atoms/Head";

const Home: NextPage = () => {
  const podcasts = trpc.podcasts.getMany.useQuery({ genreId: "" });
  const news = trpc.podcasts.getMany.useQuery({ genreId: "99" });
  const culture = trpc.podcasts.getMany.useQuery({ genreId: "122" });
  const business = trpc.podcasts.getMany.useQuery({ genreId: "93" });

  const addToSubscribed = trpc.queue.add.useMutation();

  useEffect(() => {
    addToSubscribed.mutate({ id: "fc6d33e22b7f4db38df3bb64a9a8c227" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NextHead />
      <MarketingLayout>
        <>
          <MarketingHero />
          <CenterCTA />
          {podcasts.data ? (
            <PodcastScroll
              podcasts={podcasts.data.data}
              title="Trending Podcasts"
            />
          ) : null}
          {culture.data ? (
            <PodcastScroll
              podcasts={culture.data.data}
              title="Society & Culture"
            />
          ) : null}
          {business.data ? (
            <PodcastScroll podcasts={business.data.data} title="Business" />
          ) : null}
          {news.data && news?.data ? (
            <PodcastScroll podcasts={news.data.data} title="News" />
          ) : null}
        </>
      </MarketingLayout>
    </>
  );
};

export default Home;
