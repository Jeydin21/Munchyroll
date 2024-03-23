import Head from "next/head";
import React from "react";
import AnimeDetails from "../../components/anime-details/AnimeDetails";
import MainLayout from "../../components/layout/MainLayout";

export const getServerSideProps = async (context) => {
  const { animeId } = context.query;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/anime-details/${animeId}`,
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
        <title>{data?.animeTitle + " - Munchyroll "}</title>
        <meta name="description" content={data?.synopsis} />
        <meta name="keywords" content={data?.genres} />
        <meta
          property="og:title"
          content={data?.animeTitle + " - Munchyroll "}
        />
        <meta property="og:description" content={data?.synopsis} />
        <meta property="og:image" content={data?.animeImg} />
        <meta name="theme-color" content="#C4AD8A" />{" "}
        {/* Maybe change this to scan image and return main color */}
        <link rel="manifest" href="public/manifest.json" />
      </Head>
      <MainLayout useHead={false}>

        {data && <AnimeDetails data={data} />}
      </MainLayout>
    </>
  );
}

export default AnimeDetailsPage;
