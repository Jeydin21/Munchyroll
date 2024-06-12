import { useState, useEffect } from "react";
import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";
import { useCookies } from 'react-cookie';

function MainLayout({ children, useHead = true, banner, search = true, landing = false }) {
  // const [hour, setHour] = useState();

  // useEffect(() => {
  //   const time = new Date();
  //   setHour(time.getHours());
  // });

  // var backgroundClass;

  // // Define the time ranges for day and night
  // const dawn = "06"; // 6 AM
  // const noon = "12"; // 12 PM
  // const dusk = "16"; // 4 PM
  // const night = "20"; // 8 PM

  // if (hour >= dawn && hour < noon) {
  //   backgroundClass = "from-[#CF9E57] to-[#19547B]";
  // } else if (hour >= noon && hour < dusk) {
  //   backgroundClass = "from-[#507b98] to-[#003973]";
  // } else if (hour >= dusk && hour < night) {
  //   backgroundClass = "from-[#7b3737] to-[#2C3E50]";
  // } else {
  //   backgroundClass = "from-[#141E30] to-[#243B55]";
  // }
  const [cookies, setCookie] = useCookies(['theme']);
  const [theme, setTheme] = useState(cookies.theme || 'dark');

  useEffect(() => {
    setCookie('theme', theme, { sameSite: 'lax' });
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`transition-colors duration-200 ${theme === 'dark' ? 'dark' : ''} dark:bg-[#121212] ${landing === true ? "bg-fixed bg-red-500 bg-[radial-gradient(#ffffff90_1px,#f2f2f2_1px)] bg-[size:20px_20px] dark:bg-[radial-gradient(#ffffff15_1px,#121212_1px)]" : ""}`}>
      {useHead && (
        <Head>
          <title>Munchyroll</title>
          <meta name="title" content="Munchyroll" />
          <meta
            name="description"
            content="An ad-free anime streaming website aimed at minimality and responsive design. Share this with friends!"
          />

          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Munchyroll"
          />
          <meta
            property="og:description"
            content="An ad-free anime streaming website aimed at minimality and responsive design. Share this with friends!"
          />

          <meta property="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:title"
            content="Munchyroll"
          />
          <meta
            property="twitter:description"
            content="An ad-free anime streaming website aimed at minimality and responsive design. Share this with friends!"
          />
          <meta name="theme-color" content="#C4AD8A" />
        </Head>
      )}

      <Header theme={theme} toggleTheme={toggleTheme} search={search} />
      {banner && (
        <div className="relative max-lg:hidden">
          <img src={banner} className="w-full h-96" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent dark:to-[#121212] to-white opacity-100"></div>
        </div>
      )}
      <div className="flex">
        <div className="z-10 w-full px-5 md:px-12 lg:px-16 xl:px-20 2xl:px-24 min-h-[90vh]">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;