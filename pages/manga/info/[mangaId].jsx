import Head from "next/head";
import React from "react";
import MangaDetails from "../../../components/manga/info/MangaDetails";
import MainLayout from "../../../components/ui/MainLayout";
import Recommendations from "../../../components/manga/info/Recommendations";
import { getMangaDetails } from "../../../src/handlers/manga";

export const getServerSideProps = async (context) => {
  const { mangaId } = context.query;

  const mangaData = await getMangaDetails(mangaId);

  return {
    props: {
      mangaData,
    },
  };
};

function MangaDetailsPage({ mangaData }) {
  return (
    <>
      <Head>
        <title>{"Read " + mangaData?.title.english || mangaData?.title.romaji + " - Munchyroll"}</title>
        <meta name="description" content={mangaData?.description} />
        <meta name="keywords" content={mangaData?.genres} />
        <meta
          property="og:title"
          content={"Read " + mangaData?.title.english || mangaData?.title.romaji + " - Munchyroll "}
        />
        <meta property="og:description" content={mangaData?.description} />
        <meta property="og:image" content={mangaData?.image} />
        <meta name="theme-color" content={mangaData?.color} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/android-chrome-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>
      <MainLayout useHead={false} banner={mangaData?.cover} type={"manga"}>
        {mangaData && <MangaDetails mangaData={mangaData} />}
        <div style={{ marginBottom: "10rem" }}></div>

        {mangaData && <Recommendations mangaData={mangaData.recommendations} />}
      </MainLayout>
    </>
  );
}

export default MangaDetailsPage;
