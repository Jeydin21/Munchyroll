import "../styles/globals.css";
import "../styles/nprogress.css";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import ReactGA from "react-ga";

import nprogress from "nprogress";

ReactGA.initialize("G-0K4K425H17");

import Router from "next/router";
import GoogleAnalytics from "../components/GoogleAnalytics";
Router.events.on("routeChangeStart", nprogress.start);
Router.events.on("routeChangeError", nprogress.done);
Router.events.on("routeChangeComplete", nprogress.done);
function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleAnalytics />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
