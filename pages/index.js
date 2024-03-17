import Head from "next/head";
import Script from 'next/script'
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
					content="Ad-free anime streaming website aimed at minimality and responsive design. Share this with friends!"
				/>

				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://anime.j21.dev" />
				<meta
					property="og:title"
					content="Munchyroll"
				/>
				<meta
					property="og:description"
					content="Ad-free anime streaming website aimed at minimality and responsive design. Share this with friends!"
				/>
				

				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content="https://anime.j21.dev" />
				<meta
					property="twitter:title"
					content="Munchyroll"
				/>
				<meta
					property="twitter:description"
					content="Ad-free anime streaming website aimed at minimality and responsive design. Share this with friends!"
				/>
				<meta name="theme-color" content="#C4AD8A" />
				<link rel="manifest" href={process.env.PUBLIC_URL + '/manifest.json'} />
			</Head>
				<Script src="https://us.umami.is/script.js" data-website-id="8b7147de-6d59-4789-91cc-b34bdcd63d56"></Script>
			<LandingPage />
		</div>
	);
}
