import React, { useEffect } from "react";
import Head from "next/head";
import MainLayout from "../components/layout/MainLayout";
import ReleaseCard from "../components/small-components/ReleaseCard";
import Card from "../components/small-components/Card";
import ReactGA from "react-ga";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaPlay, FaBook, FaStar, FaClock } from 'react-icons/fa';
import Link from "next/link";

export async function getServerSideProps() {
  const newResults = await fetch(
    `${process.env.NEXT_PUBLIC_CONSUMET_API}/meta/anilist/recent-episodes`,
  );
  const trendingResults = await fetch(
    `${process.env.NEXT_PUBLIC_CONSUMET_API}/meta/anilist/trending?&perPage=20`,
  );
  const popularResults = await fetch(
    `${process.env.NEXT_PUBLIC_CONSUMET_API}/meta/anilist/popular?&perPage=20`,
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
                    <h2 className="absolute ml-10 top-1/2 transform -translate-y-1/2 text-white text-3xl font-bold select-none">{anime.title.english || anime.title.romaji}</h2>
                    <div className="absolute ml-10 transform top-[calc(50%+1rem)] text-left">
                      <div className="flex space-x-4 mt-2 text-white select-none">
                        <p>{anime.type}</p>
                        {anime.totalEpisodes !== 1 && <p><span className="flex items-center"><FaBook /><span className="ml-1">{anime.totalEpisodes}</span></span></p>}
                        <p><span className="flex items-center"><FaStar /><span className="ml-1">{anime.rating}</span></span></p>
                        {anime.duration !== null && <p><span className="flex items-center"><FaClock /><span className="ml-1">{anime.duration} mins</span></span></p>}
                      </div>
                      <div className="text-white mt-2 max-w-[40%] max-h-24 overflow-auto select-none" dangerouslySetInnerHTML={{ __html: anime.description }} />
                    </div>
                    <Link href={"/anime/" + anime.id}>
                      <button className="absolute bottom-5 right-5 backdrop:filter transition-all bg-slate-400 bg-opacity-30 backdrop-blur-md text-white px-4 py-2 rounded select-none text-2xl font-bold hover:scale-110 hover:text-blue-400"><span className="flex items-center"><FaPlay /><span className="ml-1"></span>Watch</span></button>
                    </Link>
                  </div>
                ))}
            </Carousel>
          </div>
        </>
        <br></br>

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
