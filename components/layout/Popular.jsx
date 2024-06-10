import { useState, useEffect } from "react";
import { getAnimePopular, getMangaPopular } from "../../src/handlers";
import Card from "../small-components/Card";
import MangaCard from "../small-components/MangaCard";

const Popular = () => {

  const [popularAnimeData, setPopularAnimeData] = useState(null);
  const [popularMangaData, setPopularMangaData] = useState(null);

  useEffect(() => {
    const fetchPopularAnimeData = async () => {
      const data = await getAnimePopular(16);
      setPopularAnimeData(data);
    };
    const fetchPopularMangaData = async () => {
      const data = await getMangaPopular(16);
      setPopularMangaData(data);
    }

    fetchPopularMangaData();
    fetchPopularAnimeData();
  }, []);

  return (
    <>
      {popularAnimeData && (
        <>
          <h1 className="dark:text-secondary text-primary text-2xl font-bold sm:text-xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">Popular Anime</h1>
          <div className="border-b-[2px] border-gray-600 pb-10 mt-5 grid grid-cols-3 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[1fr] 2xl:grid-cols-8">
            {popularAnimeData.results.map((anime) => (
              <Card key={anime.id} data={anime} />
            ))}

          </div>
        </>
      )}
      <br />
      {popularMangaData && (
        <>
          <h1 className="dark:text-secondary text-primary text-2xl font-bold sm:text-xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">Popular Manga</h1>
          <div className="border-b-[2px] border-gray-600 pb-10 mt-5 grid grid-cols-3 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[1fr] 2xl:grid-cols-8">
            {popularMangaData.results.map((manga) => (
              <MangaCard key={manga.id} data={manga} />
            ))}

          </div>
        </>
      )}
    </>
  );
};

export default Popular;