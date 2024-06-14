import Head from "next/head";
import React from "react";
import AnimeDetails from "../../../components/anime/info/AnimeDetails";
import MainLayout from "../../../components/ui/MainLayout";
import Recommendations from "../../../components/anime/info/Recommendations";
import TextButton from "../../../components/buttons/TextButton";
import { getAnimeDetails, getAnimeEpisodeData } from "../../../src/handlers/anime";

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
        <title>{(animeData?.title.english || animeData?.title.romaji) + " - Munchyroll "}</title>
        <meta name="description" content={animeData?.description} />
        <meta name="keywords" content={animeData?.genres} />
        <meta
          property="og:title"
          content={"Watch " + (animeData?.title.english || animeData?.title.romaji) + " - Munchyroll "}
        />
        <meta property="og:description" content={animeData?.description} />
        <meta property="og:image" content={animeData?.image} />
        <meta name="theme-color" content={animeData?.color} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/android-chrome-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>
      {animeData?.image == animeData?.cover ? (
        <>
          <MainLayout useHead={false} type={"anime"}>
          {animeData && <AnimeDetails animeData={animeData} episodeData={episodeData} />}
          <div style={{ marginBottom: "10rem" }}></div>
          {animeData && <Recommendations animeData={animeData.recommendations} />}
          </MainLayout>
        </>
      ) : (
        <MainLayout useHead={false} banner={animeData?.cover} type={"anime"}>
          {animeData && <AnimeDetails animeData={animeData} episodeData={episodeData} />}
          <div style={{ marginBottom: "10rem" }}></div>
          {animeData && <Recommendations animeData={animeData.recommendations} />}
        </MainLayout>
      )}
    </>
  );
}

export default AnimeDetailsPage;
