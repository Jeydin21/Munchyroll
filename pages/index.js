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
          content="Munchyroll - Come Watch Some Shows!"
        />
        <meta
          name="description"
          content="Munchyroll is a point of interest located in Sumeru City, Avidya Forest, Dharma Forest, Sumeru. It is located within the Grand Bazaar. Nilou is associated with the theater troupe."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zubayr.vercel.app/" />
        <meta
          property="og:title"
          content="Munchyroll - Come Watch Some Shows!"
        />
        <meta
          property="og:description"
          content="Munchyroll is a point of interest located in Sumeru City, Avidya Forest, Dharma Forest, Sumeru. It is located within the Grand Bazaar. Nilou is associated with the theater troupe."
        />
        <meta property="og:image" content="https://i.postimg.cc/FRHHCckG/image.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://zubayr.vercel.app/" />
        <meta
          property="twitter:title"
          content="Munchyroll - Come Watch Some Shows!"
        />
        <meta
          property="twitter:description"
          content="Munchyroll is a point of interest located in Sumeru City, Avidya Forest, Dharma Forest, Sumeru. It is located within the Grand Bazaar. Nilou is associated with the theater troupe."
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
