import { useState, useEffect } from "react";
import { getMangaPopular } from "../../../src/handlers";
import MangaCard from "../../small-components/MangaCard";

const Popular = () => {
  const [popularMangaData, setPopularMangaData] = useState(null);

  useEffect(() => {
    const fetchPopularMangaData = async () => {
      const data = await getMangaPopular(16);
      setPopularMangaData(data);
    }

    fetchPopularMangaData();
  }, []);

  return (
    <>
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