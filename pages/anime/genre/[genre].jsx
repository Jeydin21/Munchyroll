import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";
import MainLayout from "../../../components/ui/MainLayout";
import AnimeCard from "../../../components/anime/AnimeCard";
import { getAnimeGenre } from '../../../src/handlers/index';

export const getServerSideProps = async (context) => {
  const { genre } = context.query;
  const genreId = genre.charAt(0).toUpperCase() + genre.slice(1);

  const data = await getAnimeGenre(genreId, 24);

  return {
    props: {
      data,
      genreId
    },
  };
};

function GenrePage({ data, genreId }) {
  const router = useRouter();
  const { genre } = router.query;

  return (
    <>
      <Head>
        <title>{"Genre List > " + genreId + " - Munchyroll"}</title>
        <meta
          name="description"
          content={`View all ${genre} anime on Munchyroll!`}
        />
        <meta
          property="og:title"
          content={"Genre List > " + genreId + " - Munchyroll"}
        />
        <meta
          property="og:description"
          content={`View all ${genre} anime on Munchyroll!`}
        />
        <meta name="theme-color" content="#C4AD8A" />
        {/* Maybe change this to scan image and return main color */}
        <link rel="manifest" href="manifest.json" />
        <link rel="shortcut icon" href="favicon.ico" />
        <link rel="icon" type="image/png" href="android-chrome-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>
      <MainLayout useHead={false} type={"anime"}>

        {data && (
          <>
            <div className=" ">
              <h1 className=" text-2xl font-bold">Genre List &gt; {genreId}</h1>
            </div>
              {data.results && data.results.map ? (
                <div className="pb-10 mt-5 grid grid-cols-3 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[1fr] 2xl:grid-cols-7 3xl:grid-cols-8">
                  {data.results.map((anime) => (
                    <AnimeCard key={anime.id} data={anime} />
                  ))}
                </div>
              ) : (
                <div className=" mt-10 text-2xl ">No Results Found</div>
              )}
          </>
        )}
      </MainLayout>
    </>
  );
}

export default GenrePage;
