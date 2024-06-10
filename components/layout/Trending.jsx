import { useState, useEffect } from "react";
import { getAnimeTrending, getMangaTrending } from "../../src/handlers";
import Card from "../small-components/Card";
import MangaCard from "../small-components/MangaCard";

const Trending = () => {

  const [trendingAnimeData, setTrendingAnimeData] = useState(null);
  const [trendingMangaData, setTrendingMangaData] = useState(null);

  useEffect(() => {
    const fetchTrendingAnimeData = async () => {
      const data = await getAnimeTrending(16);
      setTrendingAnimeData(data);
    };
    const fetchTrendingMangaData = async () => {
      const data = await getMangaTrending(16);
      setTrendingMangaData(data);
    }

    fetchTrendingMangaData();
    fetchTrendingAnimeData();
  }, []);

  return (
    <>
      {trendingAnimeData && (
        <>
          <h1 className="dark:text-secondary text-primary text-2xl font-bold sm:text-xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">Trending Anime</h1>
          <div className="border-b-[2px] border-gray-600 pb-10 mt-5 grid grid-cols-3 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[1fr] 2xl:grid-cols-8">
            {trendingAnimeData.results.map((anime) => (
              <Card key={anime.id} data={anime} />
            ))}

          </div>
        </>
      )}
      <br />
      {trendingMangaData && (
        <>
          <h1 className="dark:text-secondary text-primary text-2xl font-bold sm:text-xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">Trending Manga</h1>
          <div className="border-b-[2px] border-gray-600 pb-10 mt-5 grid grid-cols-3 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[1fr] 2xl:grid-cols-8">
            {trendingMangaData.results.map((manga) => (
              <MangaCard key={manga.id} data={manga} />
            ))}

          </div>
        </>
      )}
    </>
  );
};

export default Trending;