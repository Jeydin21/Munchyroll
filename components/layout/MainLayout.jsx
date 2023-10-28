import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

function MainLayout({ children, useHead = true }) {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  
  // Define the time ranges for day and night
  const dawnStartHour = 6; // 6 AM
  const noonStartHour = 12; // 12 PM
  const duskStartHour = 16; // 4 PM
  const nightStartHour = 20; // 8 PM

  const backgroundClass = currentHour >= dawnStartHour && currentHour < noonStartHour ? "dawn" : currentHour >= noonStartHour && currentHour < duskStartHour ? "noon" : currentHour >= duskStartHour && currentHour < nightStartHour ? "dusk" : "night";

  return (
    <div className={`bg-${backgroundClass}`}>
      {useHead && (
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
          <meta property="og:url" content="https://munchyroll.ml/" />
          <meta
            property="og:title"
            content="Munchyroll - Watch HD Anime For Free"
          />
          <meta
            property="og:description"
            content="Watch free anime series and movies online in HD quality, on mobile or on desktop, subbed or dubbed, in a rich and modern display."
          />
          

          <meta property="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:url"
            content="https://munchyroll.ml/"
          />
          <meta
            property="twitter:title"
            content="Munchyroll - Watch HD Anime For Free"
          />
          <meta
            property="twitter:description"
            content="Watch free anime series and movies online in HD quality, on mobile or on desktop, subbed or dubbed, in a rich and modern display."
          />
          <meta name="theme-color" content="#C4AD8A" />
        </Head>
      )}
      <Header />
      <div className=" flex ">
        <div className="  z-10 w-full   px-5 sm:px-10 min-h-[90vh]  mt-[103px] md:mt-28 ">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
