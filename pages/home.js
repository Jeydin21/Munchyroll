import React, { useEffect } from "react";
import { useQuery } from "react-query";
import MainLayout from "../components/layout/MainLayout";
import Card from "../components/small-components/Card";
import Loading from "../components/small-components/Loading";
import SearchInput from "../components/small-components/SearchInput";
import ReactGA from "react-ga";
import { getPopularAnime } from "../src/handlers";

export async function getServerSideProps() {
  const res = await fetch("https://webdis-x51w.onrender.com/popular");

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

const Home = ({ data }) => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  });

  return (
    <MainLayout>
      {/* {isLoading && <Loading />}
      {isError && <div>Something went wrong</div>} */}

      {data && (
        <>
          <div className=" mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[1fr] 2xl:grid-cols-7">
            {data &&
              data.map((anime) => <Card key={anime.animeId} data={anime} />)}
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default Home;
