import Head from "next/head";
import Script from 'next/script'
import { useEffect } from "react";
import LandingPage from "../components/LandingPage";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import ReactGA from "react-ga";

export default function Home() {
	useEffect(() => {
		if (process.env.NEXT_PUBLIC_GA_TRACKING_ID) {
			ReactGA.pageview(window.location.pathname + window.location.search);
		}
	});
	return (
		<>
			<div>
				<div className="App">
					{process.env.NEXT_PUBLIC_TAWKTO_PROPERTY_ID && process.env.NEXT_PUBLIC_TAWKTO_WIDGET_ID && (
						<TawkMessengerReact propertyId={process.env.NEXT_PUBLIC_TAWKTO_PROPERTY_ID} widgetId={process.env.NEXT_PUBLIC_TAWKTO_WIDGET_ID} />
					)}
				</div>
				<Head>
					<title>Munchyroll</title>
					<meta name="title" content="Munchyroll" />
					<meta
						name="description"
						content="An ad-free anime streaming website aimed at minimality and responsive design. Share this with friends!"
					/>

					<meta property="og:type" content="website" />
					<meta property="og:url" content={process.env.NEXT_PUBLIC_URL} />
					<meta
						property="og:title"
						content="Munchyroll"
					/>
					<meta
						property="og:description"
						content="An ad-free anime streaming website aimed at minimality and responsive design. Share this with friends!"
					/>


					<meta property="twitter:card" content="summary_large_image" />
					<meta property="twitter:url" content={process.env.NEXT_PUBLIC_URL} />
					<meta
						property="twitter:title"
						content="Munchyroll"
					/>
					<meta
						property="twitter:description"
						content="An ad-free anime streaming website aimed at minimality and responsive design. Share this with friends!"
					/>
					<meta name="theme-color" content="#C4AD8A" />
					<link rel="manifest" href={process.env.NEXT_PUBLIC_URL + '/manifest.json'} />
				</Head>
				{process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
					<Script src="https://us.umami.is/script.js" data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}></Script>
				)}
				<LandingPage />
			</div>
		</>
	);
}
