import { useState, useEffect } from "react";
import { FaSun, FaMoon, FaBook } from "react-icons/fa";
import { LuJapaneseYen, LuClapperboard } from "react-icons/lu";
import { PiTelevision } from "react-icons/pi";
import { VscChromeClose } from "react-icons/vsc";
import { CgSearch } from "react-icons/cg";
import Logo from "../ui/Logo";
import SearchInput from "../ui/SearchInput";
import Link from "next/link";

function Header({ theme, toggleTheme, bg = false, manga, type }) {
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
        className={`z-50 transition-all py-2 px-5 md:px-12 lg:px-16 xl:px-20 2xl:px-24 flex justify-between left-0 items-center top-0 right-0 ${bg === true ? "" : "dark:bg-[#121212] bg-secondary"} ${isScrolled ? `${manga === true ? "" : "sticky"} top-0 bg-opacity-50 backdrop-filter backdrop-blur-lg dark:bg-primary/30 bg-secondary/30` : ''}`}
      >
        <div className="z-50 flex flex-row space-x-5">
          <Logo />
          <div className="hidden lg:flex my-auto text-base dark:text-secondary text-primary space-x-1">
            <Link href={`/anime`}>
              <button title="Anime" className="transition-all dark:text-secondary text-primary hover:bg-secondary-hover dark:hover:bg-primary-light py-2 px-5 my-auto rounded-lg flex flex-row space-x-2">
                <LuJapaneseYen className="mt-1" />
                <span>Anime</span>
              </button>
            </Link>
            <Link href={`/manga`}>
              <button title="Anime" className="transition-all dark:text-secondary text-primary hover:bg-secondary-hover dark:hover:bg-primary-light py-2 px-5 my-auto rounded-lg flex flex-row space-x-2">
                <FaBook className="mt-1" />
                <span>Manga</span>
              </button>
            </Link>
            {/* <button title="Movies" className="transition-all dark:text-secondary text-primary hover:bg-secondary-hover dark:hover:bg-primary-light py-2 px-5 my-auto rounded-lg flex flex-row space-x-2">
              <LuClapperboard className="mt-1" />
              <Link href={`/movies`}>Movies</Link>
            </button>
            <button title="Shows" className="transition-all dark:text-secondary text-primary hover:bg-secondary-hover dark:hover:bg-primary-light py-2 px-5 my-auto rounded-lg flex flex-row space-x-2">
              <PiTelevision className="mt-1" />
              <Link href={`/shows`}>Shows</Link>
            </button> */}
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
        className={`transition-all fixed ${isMenuOpen ? "z-30 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80" : ""} w-screen h-screen`}
      />

      <div
        onClick={() => setIsMenuOpen(false)}
        className={`transition-all pt-2 p-5 z-30 fixed ${isMenuOpen ? "top-0 left-0 right-0 bottom-0" : "-top-full"} w-screen flex items-center justify-center transform transition-transform ${isMenuOpen ? "scale-100" : "scale-0"}`}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <SearchInput type={type} />
        </div>
      </div>
    </>
  );
}

export default Header;