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
        <meta
          name="title"
          content="Munchyroll - Watch HD Anime For Free"
        />
        <meta
          name="description"
          content="Watch free anime series and movies online in HD quality, on mobile or on desktop, subbed or dubbed, in a rich and modern display."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zubayr.vercel.app/" />
        <meta
          property="og:title"
          content="Munchyroll - Watch HD Anime For Free"
        />
        <meta
          property="og:description"
          content="Watch free anime series and movies online in HD quality, on mobile or on desktop, subbed or dubbed, in a rich and modern display."
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://zubayr.vercel.app/" />
        <meta
          property="twitter:title"
          content="Munchyroll - Watch HD Anime For Free"
        />
        <meta
          property="twitter:description"
          content="Watch free anime series and movies online in HD quality, on mobile or on desktop, subbed or dubbed, in a rich and modern display."
        />
        <meta
          property="twitter:image"
          content="https://i.postimg.cc/FRHHCckG/image.png"
        />
        <meta name="theme-color" content="#A0956E" />
      </Head>
      <LandingPage />
    </div>
  );
}
