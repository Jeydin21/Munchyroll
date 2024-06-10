import { useState, useEffect } from "react";
import Head from "next/head";
import MainLayout from "../components/layout/MainLayout";
import Trending from "../components/layout/Trending";
import Popular from "../components/layout/Popular";
import Top from "../components/layout/Top";
import New from "../components/layout/New";
import ReactGA from "react-ga";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaPlay, FaBook, FaStar, FaClock } from 'react-icons/fa';
import Link from "next/link";
import { sanitize } from "isomorphic-dompurify";
import { getAnimeTrending } from "../src/handlers/index";

export async function getServerSideProps() {
  const trendingData = await getAnimeTrending(20);

  return {
    props: {
      trendingData,
    },
  };
}

const Home = ({ newData, trendingData, popularData }) => {

  const [display, setDisplay] = useState('New');

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
        <link rel="manifest" href="manifest.json" />
        <meta name="theme-color" content="#C4AD8A" />
        <link rel="shortcut icon" href="favicon.ico" />
        <link rel="icon" type="image/png" href="android-chrome-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
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
                    <h2 className="absolute text-left top-1/4 md:top-1/2 ml-2 sm:ml-10 pb-2 transform -translate-y-1/2 overflow-auto text-white text-xl font-bold select-none sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">{anime.title.english || anime.title.romaji}</h2>
                    <div className="absolute ml-2 sm:ml-10 transform top-[calc(25%+1rem)] md:top-[calc(50%+1rem)] text-left">
                      <div className="flex space-x-4 mt-2 text-white select-none">
                        <p>{anime.type}</p>
                        {anime.totalEpisodes !== 1 && <p><span className="flex items-center"><FaBook /><span className="ml-1">{anime.totalEpisodes}</span></span></p>}
                        <p><span className="flex items-center"><FaStar /><span className="ml-1">{anime.rating}</span></span></p>
                        {anime.duration !== null && <p><span className="flex items-center"><FaClock /><span className="ml-1">{anime.duration} mins</span></span></p>}
                      </div>
                      <div className="text-white mt-2 max-w-[90%] md:max-w-[40%] max-h-24 overflow-auto select-none scrollbar-hidden-background" dangerouslySetInnerHTML={{ __html: sanitize(anime.description) }}></div>
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

        <div className="button-menu">
          <div className="flex justify-center">
            <button className={`w-auto m-1 p-2 md:px-5 md:py-3 transition duration-300 dark:text-secondary text-primary max-md:text-sm font-bold hover:bg-blue-500 hover:scale-105 active:scale-95 rounded-lg ${display === 'New' ? 'bg-blue-500' : ''}`} onClick={() => setDisplay('New')}>
              Newest
            </button>
            <button className={`w-auto m-1 p-2 md:px-5 md:py-3  transition duration-300 dark:text-secondary text-primary max-md:text-sm font-bold hover:bg-blue-500 hover:scale-105 active:scale-95 rounded-lg ${display === 'Trending' ? 'bg-blue-500' : ''}`} onClick={() => setDisplay('Trending')}>
              Trending
            </button>
            <button className={`w-auto m-1 p-2 md:px-5 md:py-3  transition duration-300 dark:text-secondary text-primary max-md:text-sm font-bold hover:bg-blue-500 hover:scale-105 active:scale-95 rounded-lg ${display === 'Popular' ? 'bg-blue-500' : ''}`} onClick={() => setDisplay('Popular')}>
              Popular
            </button>
            <button className={`w-auto m-1 p-2 md:px-5 md:py-3 transition duration-300 dark:text-secondary truncate text-primary max-md:text-sm font-bold hover:bg-blue-500 hover:scale-105 active:scale-95 rounded-lg ${display === 'Top' ? 'bg-blue-500' : ''}`} onClick={() => setDisplay('Top')}>
              Top Rated
            </button>
          </div>
        </div>
        <br></br>
        {display === 'New' && <New />}
        {display === 'Trending' && <Trending />}
        {display === 'Popular' && <Popular />}
        {display === 'Top' && <Top />}
        <br></br>
        <br></br>
        <br></br>
      </MainLayout>
    </>
  );
};

export default Home;
