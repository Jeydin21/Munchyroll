import { useState, useEffect } from "react";
import { getAnimeTrending } from "../../../src/handlers";
import AnimeCard from "../../anime/AnimeCard";

const Trending = () => {
  const [trendingAnimeData, setTrendingAnimeData] = useState(null);

  useEffect(() => {
    const fetchTrendingAnimeData = async () => {
      const data = await getAnimeTrending(16);
      setTrendingAnimeData(data);
    };

    fetchTrendingAnimeData();
  }, []);

  return (
    <>
      {trendingAnimeData && (
        <>
          <h1 className="dark:text-secondary text-primary text-2xl font-bold sm:text-xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">Trending Anime</h1>
          <div className="border-b-[2px] border-gray-600 pb-10 mt-5 grid grid-cols-3 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[1fr] 2xl:grid-cols-8">
            {trendingAnimeData.results.map((anime) => (
              <AnimeCard key={anime.id} data={anime} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Trending;