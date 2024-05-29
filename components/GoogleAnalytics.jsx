import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";

// @ts-ignore
const addPageView = (url) => {
  if (!process.env.NEXT_PUBLIC_GA_TRACKING_ID) return;
  // @ts-ignore
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

const GoogleAnalytics = () => {
  if (!process.env.NEXT_PUBLIC_GA_TRACKING_ID) return;
  const router = useRouter();

  useEffect(() => {
    // @ts-ignore
    const handleRouteChange = (url) => {
      addPageView(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
        page_path: window.location.pathname,
      });
    `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
