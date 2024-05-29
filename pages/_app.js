import "../styles/globals.css";
import "../styles/nprogress.css";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import ReactGA from "react-ga";

import nprogress from "nprogress";

if (process.env.NEXT_PUBLIC_GA_TRACKING_ID) {
  ReactGA.initialize(process.env.NEXT_PUBLIC_GA_TRACKING_ID);
}

import Router from "next/router";
import GoogleAnalytics from "../components/GoogleAnalytics";
Router.events.on("routeChangeStart", nprogress.start);
Router.events.on("routeChangeError", nprogress.done);
Router.events.on("routeChangeComplete", nprogress.done);
function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {process.env.NEXT_PUBLIC_GA_TACKING_ID && (
          <GoogleAnalytics />
        )}
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
