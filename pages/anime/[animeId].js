import Head from "next/head";
import React from "react";
import AnimeDetails from "../../components/anime-details/AnimeDetails";
import MainLayout from "../../components/layout/MainLayout";

export const getServerSideProps = async (context) => {
  const { animeId } = context.query;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CONSUMET_API}/meta/anilist/info/${animeId}`,
  );

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

function AnimeDetailsPage({ data }) {
  return (
    <>
      <Head>
        <title>{data?.title.english + " - Munchyroll "}</title>
        <meta name="description" content={data?.description} />
        <meta name="keywords" content={data?.genres} />
        <meta
          property="og:title"
          content={data?.title.english + " - Munchyroll "}
        />
        <meta property="og:description" content={data?.description} />
        <meta property="og:image" content={data?.image} />
        <meta name="theme-color" content={data?.color} />
        <link rel="manifest" href="public/manifest.json" />
      </Head>
      <MainLayout useHead={false}>

        {data && <AnimeDetails data={data} />}
      </MainLayout>
    </>
  );
}

export default AnimeDetailsPage;
