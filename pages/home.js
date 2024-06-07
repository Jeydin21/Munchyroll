import { useState, useEffect } from "react";
import Head from "next/head";
import MainLayout from "../components/layout/MainLayout";
import Card from "../components/small-components/Card";
import ReactGA from "react-ga";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaPlay, FaBook, FaStar, FaClock } from 'react-icons/fa';
import Link from "next/link";
import { sanitize } from "isomorphic-dompurify";
import { getAnimeTrending, getAnimePopular, getAnimeNew } from "../src/handlers/index";

export async function getServerSideProps() {
  const newData = await getAnimeNew();
  const trendingData = await getAnimeTrending(20);
  const popularData = await getAnimePopular(20);

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
    if (process.env.NEXT_PUBLIC_GA_TRACKING_ID) {
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  }, []);

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

        <>
          <div className="rounded-xl overflow-hidden">
            <Carousel
              showThumbs={false}
              autoPlay
              interval={5000}
              infiniteLoop
              showStatus={false}
              emulateTouch
              showIndicators={false}
            >
              {trendingData.results
                .filter(anime => anime.cover !== anime.image) // Only include items where anime.cover exists
                .slice(0, 15)
                .map((anime, index) => (
                  <div key={index} className="h-96 relative">
                    <img
                      src={anime.cover}
                      alt={anime.title.english || anime.title.romaji}
                      className="w-full h-full object-cover select-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-80 select-none"></div>
                    <h2 className="absolute text-left ml-2 sm:ml-10 pb-2 top-1/2 transform -translate-y-1/2 overflow-auto text-white text-xl font-bold select-none sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">{anime.title.english || anime.title.romaji}</h2>
                    <div className="absolute ml-2 sm:ml-10 transform top-[calc(50%+1rem)] text-left">
                      <div className="flex space-x-4 mt-2 text-white select-none">
                        <p>{anime.type}</p>
                        {anime.totalEpisodes !== 1 && <p><span className="flex items-center"><FaBook /><span className="ml-1">{anime.totalEpisodes}</span></span></p>}
                        <p><span className="flex items-center"><FaStar /><span className="ml-1">{anime.rating}</span></span></p>
                        {anime.duration !== null && <p><span className="flex items-center"><FaClock /><span className="ml-1">{anime.duration} mins</span></span></p>}
                      </div>
                      <div className="text-white mt-2 max-w-[40%] max-h-24 overflow-auto select-none scrollbar-hidden-background" dangerouslySetInnerHTML={{ __html: sanitize(anime.description) }}></div>
                    </div>
                    <Link href={"/anime/" + anime.id}>
                      <button className="absolute bottom-10 right-10 backdrop:filter transition-all bg-slate-400 bg-opacity-30 backdrop-blur-md text-white px-6 py-4 md:px-4 md:py-2 rounded-full md:rounded select-none text-2xl font-bold hover:scale-110 hover:text-blue-300"><span className="flex items-center"><FaPlay /><span className="hidden sm:inline ml-1">Watch</span></span></button>
                    </Link>
                  </div>
                ))}
            </Carousel>
          </div>
        </>
        <br></br>

        {newData && (
          <>
            <h1 className="dark:text-secondary text-primary text-2xl font-bold sm:text-xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">Recent Anime</h1>
            <div className="border-b-[2px] border-gray-600 pb-10 mt-5 grid grid-cols-3 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[1fr] 2xl:grid-cols-7">
              {newData && newData.results && newData.results.map((anime) => (
                <Card key={anime.id} data={anime} />
              ))}

            </div>
          </>
        )}
        <br></br>
        <br></br>
        <br></br>
        {trendingData && (
          <>
            <h1 className="dark:text-secondary text-primary text-2xl font-bold sm:text-xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">Trending Anime</h1>
            <div className="border-b-[2px] border-gray-600 pb-10 mt-5 grid grid-cols-3 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[1fr] 2xl:grid-cols-7">
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
            <h1 className="dark:text-secondary text-primary text-2xl font-bold sm:text-xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">Popular Anime</h1>
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
