import "../styles/globals.css";
import "../styles/nprogress.css";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import MainLayout from "../components/layout/MainLayout";
import Loading from "../components/small-components/Loading";
import ReactGA from "react-ga";

import nprogress from "nprogress";

ReactGA.initialize("G-PQCH40ZGNT");

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
