import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import Logo from "../ui/Logo";
import SearchInput from "../ui/SearchInput";
import { CgSearch } from "react-icons/cg";
import { VscChromeClose } from "react-icons/vsc";
import Link from "next/link";

function Header({ theme, toggleTheme, search = true, bg = false, manga, type }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setIsScrolled(isScrolled);
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`transition-all py-2 px-5 md:px-12 lg:px-16 xl:px-20 2xl:px-24 z-50 flex justify-between left-0 items-center top-0 right-0 ${bg === true ? "" : "dark:bg-[#121212] bg-secondary"} ${isScrolled ? `${manga === true ? "" : "sticky"} top-0 bg-opacity-50 backdrop-filter backdrop-blur-lg dark:bg-primary/30 bg-secondary/30` : ''}`}
      >
        <div className="flex flex-row space-x-5">
          <Logo />
          <div className="hidden md:flex my-auto text-base space-x-5 dark:text-secondary text-primary ">
            <Link href={`/${type}`} className="transition-all dark:text-secondary text-primary bg-secondary-light dark:bg-[#222222] hover:bg-secondary-hover dark:hover:bg-primary-hover py-2 px-5 my-auto rounded-lg">Home</Link>
            <Link href="/anime" className="transition-all dark:text-secondary text-primary bg-secondary-light dark:bg-[#222222] hover:bg-secondary-hover dark:hover:bg-primary-hover py-2 px-5 my-auto rounded-lg">Anime</Link>
            <Link href="/manga" className="transition-all dark:text-secondary text-primary bg-secondary-light dark:bg-[#222222] hover:bg-secondary-hover dark:hover:bg-primary-hover py-2 px-5 my-auto rounded-lg">Manga</Link>
            <Link href="/manga" className="transition-all dark:text-secondary text-primary bg-secondary-light dark:bg-[#222222] hover:bg-secondary-hover dark:hover:bg-primary-hover py-2 px-5 my-auto rounded-lg">Movies</Link>
            <Link href="/manga" className="transition-all dark:text-secondary text-primary bg-secondary-light dark:bg-[#222222] hover:bg-secondary-hover dark:hover:bg-primary-hover py-2 px-5 my-auto rounded-lg">Shows</Link>
          </div>
        </div>
        <div className={`flex justify-end items-center`}>
          <div className={`text-xl text-primary dark:bg-[#222222] rounded-lg hover:cursor-pointer`}>
            <button title="Change Theme" onClick={toggleTheme} className=" transition-all dark:text-secondary text-primary bg-secondary-light hover:bg-secondary-hover dark:hover:bg-primary-hover dark:bg-[#222222] p-3 rounded-lg">
              {theme === 'dark' ? <FaMoon /> : <FaSun />}
            </button>
          </div>

          <div onClick={() => setIsMenuOpen(true)} className={`text-xl ${bg === true ? "hidden" : ""} transition-all dark:text-secondary text-primary bg-secondary-light dark:bg-[#222222] hover:bg-secondary-hover dark:hover:bg-primary-hover p-3 rounded-lg hover:cursor-pointer ml-2`}>
            <CgSearch />
          </div>
        </div>
      </div>

      <div
        onClick={() => setIsMenuOpen(false)}
        className={`transition-all fixed ${isMenuOpen ? "z-40 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80" : ""} w-screen h-screen`}
      />

      <div
        onClick={() => setIsMenuOpen(false)}
        className={`transition-all pt-2 p-5 z-50 fixed ${isMenuOpen ? "top-0 left-0 right-0 bottom-0" : "-top-full"} w-screen flex items-center justify-center transform transition-transform ${isMenuOpen ? "scale-100" : "scale-0"}`}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <SearchInput type={type} />
        </div>
      </div>
    </>
  );
}

export default Header;