import { useState, useEffect } from "react";
import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

function MainLayout({ children, useHead = true }) {
  const [hour, setHour] = useState();

  useEffect(() => {
    const time = new Date();
    setHour(time.getHours());
  })
  
  var backgroundClass;

  // Define the time ranges for day and night
  const dawn = "06"; // 6 AM
  const noon = "12"; // 12 PM
  const dusk = "16"; // 4 PM
  const night = "20"; // 8 PM

  if (hour >= dawn && hour < noon) {
    backgroundClass = "from-[#C4AD8A] to-[#19547B]";
  } else if (hour >= noon && hour < dusk) {
    backgroundClass = "from-[#bdc3c7] to-[#003973]";
  } else if (hour >= dusk && hour < night) {
    backgroundClass = "from-[#C45656] to-[#2C3E50]";
  } else {
    backgroundClass = "from-[#141E30] to-[#243B55]";
  }

  return (
    <div className={`bg-gradient-to-t ${backgroundClass}`}>
      {useHead && (
        <Head>
          <title>Munchyroll</title>
          <meta name="title" content="Munchyroll - Watch HD Anime For Free" />
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
          <meta property="twitter:url" content="https://munchyroll.ml/" />
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
