import Head from "next/head";
import React from "react";
import AnimeDetails from "../../components/anime-details/AnimeDetails";
import MainLayout from "../../components/layout/MainLayout";
import Recommendations from "../../components/anime-details/Recommendations";
import { getAnimeDetails, getAnimeEpisodeData } from "../../src/handlers/index";

export const getServerSideProps = async (context) => {
  const { animeId } = context.query;

  const animeData = await getAnimeDetails(animeId);

  const episodeData = await getAnimeEpisodeData(animeId);

  return {
    props: {
      animeData,
      episodeData
    },
  };
};

function AnimeDetailsPage({ animeData, episodeData }) {
  return (
    <>
      <Head>
        <title>{animeData?.title.english + " - Munchyroll "}</title>
        <meta name="description" content={animeData?.description} />
        <meta name="keywords" content={animeData?.genres} />
        <meta
          property="og:title"
          content={animeData?.title.english + " - Munchyroll "}
        />
        <meta property="og:description" content={animeData?.description} />
        <meta property="og:image" content={animeData?.image} />
        <meta name="theme-color" content={animeData?.color} />
        <link rel="manifest" href="manifest.json" />
        <link rel="shortcut icon" href="favicon.ico" />
        <link rel="icon" type="image/png" href="android-chrome-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>
      <MainLayout useHead={false} banner={animeData?.cover}>
        {animeData && <AnimeDetails animeData={animeData} episodeData={episodeData} />}
        <div style={{ marginBottom: "10rem" }}></div>

        {animeData && <Recommendations animeData={animeData.recommendations} />}
      </MainLayout>
    </>
  );
}

export default AnimeDetailsPage;
