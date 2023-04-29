import React, { useEffect } from "react";
import { useQuery } from "react-query";
import Head from "next/head";
import MainLayout from "../components/layout/MainLayout";
import ReleaseCard from "../components/small-components/ReleaseCard";
import Card from "../components/small-components/Card";
import Loading from "../components/small-components/Loading";
import SearchInput from "../components/small-components/SearchInput";
import ReactGA from "react-ga";

export async function getServerSideProps() {
	const popularResults = await fetch("https://api.munchyroll.ml/popular");
	const moviesResults = await fetch("https://api.munchyroll.ml/anime-movies");
	const recentResults = await fetch("https://api.munchyroll.ml/recent-release");

	const popular = await popularResults.json();
	const movies = await moviesResults.json();
	const recent = await recentResults.json();

	return {
		props: {
			popular,
			movies,
			recent,
		},
	};
}

const Home = ({ popular, movies, recent }) => {
	useEffect(() => {
		ReactGA.pageview(window.location.pathname + window.location.search);
	});

	return (
		<>
			<Head>
				<title>Home - Munchyroll</title>
				<meta
					name="description"
					content="Watch free anime series and movies online in HD quality, on mobile or on desktop, subbed or dubbed, in a rich and modern display."
				/>
				<meta property="og:title" content="Home - Munchyroll " />
				<meta
					property="og:description"
					content="Watch free anime series and movies online in HD quality, on mobile or on desktop, subbed or dubbed, in a rich and modern display."
				/>
				<meta name="theme-color" content="#C4AD8A" />{" "}
				{/* Maybe change this to scan image and return main color */}
			</Head>
			<MainLayout useHead={false}>
				{/* {isLoading && <Loading />}
      {isError && <div>Something went wrong</div>} */}

				{recent && (
					<>
						<h1 className=" text-2xl font-bold">Recent Anime</h1>
						<div className=" mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[1fr] 2xl:grid-cols-7">
							{recent &&
								recent.map((anime) => (
									<ReleaseCard key={anime.animeId} data={anime} />
								))}
						</div>
					</>
        )}
				<br></br>
				<br></br>
				<br></br>
				{popular && (
					<>
						<h1 className=" text-2xl font-bold">Popular Anime</h1>
						<div className=" mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[1fr] 2xl:grid-cols-7">
							{popular &&
								popular.map((anime) => (
									<Card key={anime.animeId} data={anime} />
								))}
						</div>
					</>
        )}
        <br></br>
				<br></br>
				<br></br>
				{movies && (
					<>
						<h1 className=" text-2xl font-bold">Anime Movies</h1>
						<div className=" mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-[1fr] 2xl:grid-cols-7">
							{movies &&
								movies.map((anime) => (
									<Card key={anime.animeId} data={anime} />
								))}
						</div>
					</>
				)}
			</MainLayout>
		</>
	);
};

export default Home;
