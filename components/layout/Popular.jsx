import { useState, useEffect } from "react";
import { getAnimePopular } from "../../src/handlers";
import Card from "../small-components/Card";

const Popular = () => {

  const [popularData, setPopularData] = useState(null);

  useEffect(() => {
    const fetchPopularData = async () => {
      const data = await getAnimePopular(24);
      setPopularData(data);
    };

    fetchPopularData();
  }, []);

  return (
    <>
      {popularData && (
        <>
          <h1 className="dark:text-secondary text-primary text-2xl font-bold sm:text-xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">Popular Anime</h1>
          <div className="border-b-[2px] border-gray-600 pb-10 mt-5 grid grid-cols-3 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[1fr] 2xl:grid-cols-8">
            {popularData.results.map((anime) => (
              <Card key={anime.id} data={anime} />
            ))}

          </div>
        </>
      )}
    </>
  );
};

export default Popular;