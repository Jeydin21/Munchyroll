import React, { useEffect } from "react";
import Head from "next/head";
import MainLayout from "../components/layout/MainLayout";
import ReleaseCard from "../components/small-components/ReleaseCard";
import Card from "../components/small-components/Card";
import ReactGA from "react-ga";

export async function getServerSideProps() {
  const newResults = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/meta/anilist/recent-episodes`,
  );
  const trendingResults = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/meta/anilist/trending?&perPage=20`,
  );
  const popularResults = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/meta/anilist/popular?&perPage=20`,
  );

  const newData = await newResults.json(); // Parse response as JSON
  const trendingData = await trendingResults.json(); // Parse response as JSON
  const popularData = await popularResults.json(); // Parse response as JSON

  return {
    props: {
      newData,
      trendingData,
      popularData,
    },
  };
}

const Home = ({ newData, trendingData, popularData }) => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  });

  return (
    <>
      <Head>
        <title>Home - Munchyroll</title>
        <meta
          name="description"
          content="An ad-free anime streaming website aimed at minimality and responsive design. Share this with friends!"
        />
        <meta property="og:title" content="Home - Munchyroll " />
        <meta
          property="og:description"
          content="An ad-free anime streaming website aimed at minimality and responsive design. Share this with friends!"
        />
        <link rel="manifest" href="public/manifest.json" />
        <meta name="theme-color" content="#C4AD8A" />{" "}
        {/* Maybe change this to scan image and return main color */}
      </Head>
      <MainLayout useHead={false}>

        {newData && (
          <>
            <h1 className=" text-2xl font-bold">Recent Anime</h1>
            <div className="border-b-[2px] border-gray-600 pb-10 mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[1fr] 2xl:grid-cols-7">
              {newData && newData.results && newData.results.map((anime) => (
                <ReleaseCard key={anime.id} data={anime} />
              ))}

            </div>
          </>
        )}
        <br></br>
        <br></br>
        <br></br>
        {trendingData && (
          <>
            <h1 className=" text-2xl font-bold">Trending Anime</h1>
            <div className="border-b-[2px] border-gray-600 pb-10 mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[1fr] 2xl:grid-cols-7">
            {trendingData && trendingData.results && trendingData.results.map((anime) => (
                <Card key={anime.id} data={anime} />
              ))}
            </div>
          </>
        )}
        <br></br>
        <br></br>
        <br></br>
        {popularData && (
          <>
            <h1 className=" text-2xl font-bold">Popular Anime</h1>
            <div className="border-gray-600 pb-10 mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[1fr] 2xl:grid-cols-7">
            {popularData && popularData.results && popularData.results.map((anime) => (
                <Card key={anime.id} data={anime} />
              ))}
            </div>
          </>
        )}
      </MainLayout>
    </>
  );
};

export default Home;
