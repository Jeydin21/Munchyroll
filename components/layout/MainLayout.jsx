import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

function MainLayout({ children, useHead = true }) {
  return (
    <div className="  bg-background">
      {useHead && (
        <Head>
          <title>Zubayr Theater</title>
          <meta
            name="title"
            content="Zubayr Theater - Come Watch Some Shows!"
          />
          <meta
            name="description"
            content="Zubayr Theater is a point of interest located in Sumeru City, Avidya Forest, Dharma Forest, Sumeru. It is located within the Grand Bazaar. Nilou is associated with the theater troupe."
          />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://zubayr.vercel.app/" />
          <meta
            property="og:title"
            content="Zubayr Theater - Come Watch Some Shows!"
          />
          <meta
            property="og:description"
            content="Zubayr Theater is a point of interest located in Sumeru City, Avidya Forest, Dharma Forest, Sumeru. It is located within the Grand Bazaar. Nilou is associated with the theater troupe."
          />
          <meta property="og:image" content="https://i.postimg.cc/FRHHCckG/image.png" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:url"
            content="https://zubayr.vercel.app/"
          />
          <meta
            property="twitter:title"
            content="Zubayr Theater - Come Watch Some Shows!"
          />
          <meta
            property="twitter:description"
            content="Zubayr Theater is a point of interest located in Sumeru City, Avidya Forest, Dharma Forest, Sumeru. It is located within the Grand Bazaar. Nilou is associated with the theater troupe."
          />
          <meta
            property="twitter:image"
            content="https://i.postimg.cc/FRHHCckG/image.png"
          />
          <meta name="theme-color" content="#A0956E" />
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
