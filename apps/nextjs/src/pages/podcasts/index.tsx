import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SearchLayout from "../../layouts/SearchLayout";
import NextHead from "../../ui/atoms/Head";
import PodcastScroll from "../../ui/molecules/Carousel";
import PodGrid from "../../ui/molecules/PodGrid";
import { trpc } from "../../utils/trpc";

const PodcastsPage = () => {
  const router = useRouter();
  const { category, offsetValue, value } = router.query;
  const [searchCategory, setSearchCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [offset, setOffset] = useState(10);

  const searchResults = trpc.podcasts.search.useQuery({
    genreId: searchCategory,
    offset: offset,
    searchTerm,
  });

  console.log(searchResults);
  const podcasts = trpc.podcasts.getMany.useQuery({ genreId: "" });
  const news = trpc.podcasts.getMany.useQuery({ genreId: "99" });
  const culture = trpc.podcasts.getMany.useQuery({ genreId: "122" });
  const business = trpc.podcasts.getMany.useQuery({ genreId: "93" });

  useEffect(() => {
    category && setSearchCategory(category as string);
    value && setSearchTerm(value as string);
    offsetValue && setOffset(offset as number);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, offsetValue, value]);

  return (
    <>
      <NextHead />
      <SearchLayout>
        <div className="h-full">
          <div className="px-8 pt-12">
            <h1 className="text-3xl text-slate-200">Podcasts</h1>
          </div>
          <div className="ml-2 pt-12">
            {/* {results.map((result, index) => {
                console.log(result);
                return <ResultEntry result={result} key={index + 1} />;
              })} */}
            <div>
              {(searchCategory || searchTerm) && searchResults.data ? (
                <PodGrid
                  podcasts={searchResults.data.data}
                  title={(searchTerm as string) || (searchCategory as string)}
                />
              ) : (
                <>
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
                    <PodcastScroll
                      podcasts={business.data.data}
                      title="Business"
                    />
                  ) : null}
                  {news.data && news?.data ? (
                    <PodcastScroll podcasts={news.data.data} title="News" />
                  ) : null}
                </>
              )}
            </div>
          </div>
        </div>
      </SearchLayout>
    </>
  );
};

export default PodcastsPage;
