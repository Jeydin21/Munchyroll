import { useState, useEffect } from "react";
import Head from "next/head";
import ReactGA from "react-ga";

import MainLayout from "../../components/ui/MainLayout";
import AnimeCarousel from "../../components/anime/AnimeCarousel";
import AnimeList from "../../components/anime/AnimeList";
import { getAnimeTrending } from "../../src/handlers/anime";

export async function getServerSideProps() {
  const trendingData = await getAnimeTrending(20);

  return {
    props: {
      trendingData,
    },
  };
}

const Home = ({ trendingData }) => {

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
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/android-chrome-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>
      <MainLayout useHead={false} type={"anime"}>
        <div className="pt-3">
          <AnimeCarousel data={trendingData.results} />
          <AnimeList />
        </div>
      </MainLayout>
    </>
  );
};

export default Home;