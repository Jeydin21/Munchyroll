import { useState, useEffect } from "react";
import { getTopAnime, getMangaTop } from "../../src/handlers";
import Card from "../small-components/Card";
import MangaCard from "../small-components/MangaCard";

const Top = () => {

  const [topAnimeData, setTopAnimeData] = useState(null);
  const [topMangaData, setTopMangaData] = useState(null);

  useEffect(() => {
    const fetchTopAnimeData = async () => {
      const data = await getTopAnime(16);
      setTopAnimeData(data);
    };
    const fetchTopMangaData = async () => {
      const data = await getMangaTop(16);
      setTopMangaData(data);
    }

    fetchTopMangaData();
    fetchTopAnimeData();
  }, []);

  return (
    <>
      {topAnimeData && (
        <>
          <h1 className="dark:text-secondary text-primary text-2xl font-bold sm:text-xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">Top Anime</h1>
          <div className="border-b-[2px] border-gray-600 pb-10 mt-5 grid grid-cols-3 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[1fr] 2xl:grid-cols-8">
            {topAnimeData.results.map((anime) => (
              <Card key={anime.id} data={anime} />
            ))}

          </div>
        </>
      )}
      <br />
      {topMangaData && (
        <>
          <h1 className="dark:text-secondary text-primary text-2xl font-bold sm:text-xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">Top Manga</h1>
          <div className="border-b-[2px] border-gray-600 pb-10 mt-5 grid grid-cols-3 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[1fr] 2xl:grid-cols-8">
            {topMangaData.results.map((manga) => (
              <MangaCard key={manga.id} data={manga} />
            ))}

          </div>
        </>
      )}
    </>
  );
};

export default Top;