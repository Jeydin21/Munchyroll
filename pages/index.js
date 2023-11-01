import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import LandingPage from "../components/LandingPage";

import styles from "../styles/Home.module.css";

import ReactGA from "react-ga";

export default function Home() {
	useEffect(() => {
		ReactGA.pageview(window.location.pathname + window.location.search);
	});
	return (
		<div>
			<Head>
				<title>Munchyroll</title>
				<meta name="title" content="Munchyroll - Watch HD Anime For Free" />
				<meta
					name="description"
					content="Watch free anime series and movies online in HD quality, on mobile or on desktop, subbed or dubbed, in a rich and modern display."
				/>

				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://anime.j21.dev" />
				<meta
					property="og:title"
					content="Munchyroll - Watch HD Anime For Free"
				/>
				<meta
					property="og:description"
					content="Watch free anime series and movies online in HD quality, on mobile or on desktop, subbed or dubbed, in a rich and modern display."
				/>
				

				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content="https://anime.j21.dev" />
				<meta
					property="twitter:title"
					content="Munchyroll - Watch HD Anime For Free"
				/>
				<meta
					property="twitter:description"
					content="Watch free anime series and movies online in HD quality, on mobile or on desktop, subbed or dubbed, in a rich and modern display."
				/>
				<meta name="theme-color" content="#C4AD8A" />
				<link rel="manifest" href={process.env.PUBLIC_URL + '/manifest.json'} />
			</Head>
			<LandingPage />
		</div>
	);
}
