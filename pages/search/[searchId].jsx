import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";
import MainLayout from "../../components/layout/MainLayout";
import SearchCard from "../../components/small-components/SearchCard";

export const getServerSideProps = async (context) => {
  const { searchId } = context.query;

  const res = await fetch(
    `https://munchyroll-api.j21.dev/search?keyw=${searchId}`,
  );

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

function SearchPage({ data }) {
  const router = useRouter();
  const { searchId } = router.query;

  // get the search id from the url with javascript

  console.log(data);
  // if (!searchId) {
  //   return (
  //     <MainLayout>
  //       <Loading />
  //     </MainLayout>
  //   );
  // }

  // const { data, isLoading, isError, error } = useQuery("searchedAnime", () =>
  //   getAnimeSearch(searchId)
  // );
  return (
    <>
      <Head>
        <title>{"Search Results For: " + searchId + " - Munchyroll"}</title>
        <meta
          name="description"
          content="Munchyroll provides a wide range of ad-free anime content, all accessible to you for free. Watch anime seamlessly!"
        />
        <meta
          property="og:title"
          content={"Search Results: " + searchId + " - Munchyroll"}
        />
        <meta
          property="og:description"
          content="Munchyroll provides a wide range of ad-free anime content, all accessible to you for free. Watch anime seamlessly!"
        />
        <meta name="theme-color" content="#C4AD8A" />{" "}
        {/* Maybe change this to scan image and return main color */}
        <link rel="manifest" href="public/manifest.json" />
      </Head>
      <MainLayout useHead={false}>
        {/* {isLoading && <Loading />}
      {isError && <div>Something went wrong</div>} */}

        {data && (
          <>
            <div className=" ">
              <h1 className=" text-2xl font-bold">Searched Results</h1>

              {data.length === 0 && (
                <div className=" mt-10 text-2xl ">No Results Found</div>
              )}
            </div>
            <div className=" mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[1fr] 2xl:grid-cols-7">
              {data &&
                data?.map((anime) => (
                  <SearchCard key={anime.animeId} data={anime} />
                ))}
            </div>
          </>
        )}
      </MainLayout>
    </>
  );
}

export default SearchPage;
