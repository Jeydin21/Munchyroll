import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import LandingPage from "../components/LandingPage";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";

import ReactGA from "react-ga";

export default function Home() {
	useEffect(() => {
		ReactGA.pageview(window.location.pathname + window.location.search);
	});
	return (
		<div>
			<div className="App">
				<TawkMessengerReact propertyId="622047bb1ffac05b1d7cb217" widgetId="1ft71gdb9" />
			</div>
			<Head>
				<title>Munchyroll</title>
				<meta name="title" content="Munchyroll" />
				<meta
					name="description"
					content="Munchyroll provides a wide range of ad-free anime content, all accessible to you for free. Watch anime seamlessly!"
				/>

				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://anime.j21.dev" />
				<meta
					property="og:title"
					content="Munchyroll"
				/>
				<meta
					property="og:description"
					content="Munchyroll provides a wide range of ad-free anime content, all accessible to you for free. Watch anime seamlessly!"
				/>
				

				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content="https://anime.j21.dev" />
				<meta
					property="twitter:title"
					content="Munchyroll"
				/>
				<meta
					property="twitter:description"
					content="Munchyroll provides a wide range of ad-free anime content, all accessible to you for free. Watch anime seamlessly!"
				/>
				<meta name="theme-color" content="#C4AD8A" />
				<link rel="manifest" href={process.env.PUBLIC_URL + '/manifest.json'} />
			</Head>
			<LandingPage />
		</div>
	);
}
