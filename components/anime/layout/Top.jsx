import { useState, useEffect } from "react";
import { getTopAnime } from "../../../src/handlers";
import AnimeCard from "../../anime/AnimeCard";

const Top = () => {
  const [topAnimeData, setTopAnimeData] = useState(null);

  useEffect(() => {
    const fetchTopAnimeData = async () => {
      const data = await getTopAnime(24);
      setTopAnimeData(data);
    };

    fetchTopAnimeData();
  }, []);

  return (
    <>
      {topAnimeData && (
        <>
          <h1 className="dark:text-secondary text-primary text-2xl font-bold sm:text-xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">Top Anime</h1>
          <div className="pb-10 mt-5 grid grid-cols-3 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[1fr] 2xl:grid-cols-6 3xl:grid-cols-8">
            {topAnimeData.results.map((anime) => (
              <AnimeCard key={anime.id} data={anime} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Top;