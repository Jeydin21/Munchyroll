import { useState, useEffect } from "react";
import { getMangaPopular } from "../../../src/handlers/manga";
import MangaCard from "../../manga/MangaCard";

const Popular = () => {
  const [popularMangaData, setPopularMangaData] = useState(null);

  useEffect(() => {
    const fetchPopularMangaData = async () => {
      const data = await getMangaPopular(24);
      setPopularMangaData(data);
    }

    fetchPopularMangaData();
  }, []);

  return (
    <>
      {popularMangaData && (
        <>
          <h1 className="dark:text-secondary text-primary text-2xl font-bold sm:text-xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">Popular Manga</h1>
          <div className="pb-10 mt-5 grid grid-cols-3 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[1fr] 2xl:grid-cols-7 3xl:grid-cols-8">
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