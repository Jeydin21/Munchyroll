import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import AnimeDetails from "../components/anime-details/AnimeDetails";
import MainLayout from "../components/layout/MainLayout";
import Loading from "../components/small-components/Loading";
import { getAnimeDetails } from "../src/handlers";

export const getServerSideProps = async (context) => {
  const { animeId } = context.query;

  const res = await fetch(
    `https://gogoanime.consumet.stream/${animeId}`
  );

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

function AnimeDetailsPage({ data }) {
  const router = useRouter();
  // const { animeId } = router.query;

  // get the anime id from the url with javascript
  // const animeId = window.location.pathname.split("/")[1];

  // const { data, isLoading, isError, error } = useQuery("animeDetails", () =>
  //   getAnimeDetails(animeId)
  // );

  console.log(data);
  return (
    <>
      <Head>
        <title>{data?.animeTitle + " - Zubayr Theater "}</title>
        <meta name="description" content={data?.synopsis} />
        <meta name="keywords" content={data?.genres} />

        <meta property="og:title" content={data?.animeTitle + " - Zubayr Theater "} />
        <meta property="og:description" content={data?.synopsis} />
        <meta property="og:image" content={data?.animeImg} />
        <meta name="theme-color" content="#A0956E" /> {/* Maybe change this to scan image and return main color */}
      </Head>
      <MainLayout useHead={false}>
        {/* {isLoading && <Loading />}
      {isError && <div>Something went wrong</div>} */}

        {data && <AnimeDetails data={data} />}
      </MainLayout>
    </>
  );
}

export default AnimeDetailsPage;
