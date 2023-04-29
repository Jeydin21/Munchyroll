import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

function MainLayout({ children, useHead = true }) {
  return (
    <div className="  bg-background">
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
          <meta property="og:image" content="https://i.postimg.cc/Dz96S6Vw/image.png"></meta>

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
