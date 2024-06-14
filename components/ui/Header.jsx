import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import Logo from "../ui/Logo";
import SearchInput from "../ui/SearchInput";
import { CgSearch } from "react-icons/cg";
import { VscChromeClose } from "react-icons/vsc";

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
        <Logo />

        <div className={`flex justify-end items-center`}>
          <div className={`text-xl ${bg === true ? "hidden" : ""} text-primary dark:bg-[#222222] rounded-lg hover:cursor-pointer`}>
            <button title="Change Theme" onClick={toggleTheme} className=" transition-all dark:text-secondary text-primary bg-secondary-light hover:bg-secondary-hover dark:hover:bg-primary-hover dark:bg-[#222222] p-3 rounded-lg">
              {theme === 'dark' ? <FaMoon /> : <FaSun />}
            </button>
          </div>

          <div className={`text-xl ${bg === true ? "hidden" : ""} transition-all dark:text-secondary text-primary bg-secondary-light dark:bg-[#222222] hover:bg-secondary-hover dark:hover:bg-primary-hover p-3 rounded-lg hover:cursor-pointer ml-2`}>
            {isMenuOpen ? (
              <VscChromeClose onClick={() => setIsMenuOpen(false)} />
            ) : (
              <CgSearch onClick={() => setIsMenuOpen(true)} />
            )}
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