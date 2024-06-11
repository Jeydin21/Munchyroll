import Head from "next/head";
import React from "react";
import MangaDetails from "../../components/manga-details/MangaDetails";
import MainLayout from "../../components/ui/MainLayout";
import Recommendations from "../../components/manga-details/Recommendations";
import { getMangaDetails, getMangaPages } from "../../src/handlers/index";

export const getServerSideProps = async (context) => {
  const { mangaId } = context.query;

  const mangaData = await getMangaDetails(mangaId);
  const pagesData = await getMangaPages(mangaId);

  return {
    props: {
      mangaData,
      pagesData
    },
  };
};

function MangaDetailsPage({ mangaData, pagesData }) {
  return (
    <>
      <Head>
        <title>{mangaData?.title.english || mangaData?.title.romaji + " - Munchyroll "}</title>
        <meta name="description" content={mangaData?.description} />
        <meta name="keywords" content={mangaData?.genres} />
        <meta
          property="og:title"
          content={mangaData?.title.english || mangaData?.title.romaji + " - Munchyroll "}
        />
        <meta property="og:description" content={mangaData?.description} />
        <meta property="og:image" content={mangaData?.image} />
        <meta name="theme-color" content={mangaData?.color} />
        <link rel="manifest" href="manifest.json" />
        <link rel="shortcut icon" href="favicon.ico" />
        <link rel="icon" type="image/png" href="android-chrome-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>
      <MainLayout useHead={false} banner={mangaData?.cover}>
        {mangaData && <MangaDetails mangaData={mangaData} pagesData={pagesData} />}
        <div style={{ marginBottom: "10rem" }}></div>

        {mangaData && <Recommendations mangaData={mangaData.recommendations} />}
      </MainLayout>
    </>
  );
}

export default MangaDetailsPage;
