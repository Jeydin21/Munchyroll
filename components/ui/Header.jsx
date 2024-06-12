import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import Logo from "../ui/Logo";
import SearchInput from "../ui/SearchInput";
import { CgSearch } from "react-icons/cg";
import { VscChromeClose } from "react-icons/vsc";

function Header({ theme, toggleTheme, search = true, landing = false }) {
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
        className={`transition-all py-2 px-5 md:px-12 lg:px-16 xl:px-20 2xl:px-24 z-50 flex justify-between left-0 items-center top-0 right-0 ${landing === true ? "" : "dark:bg-[#121212] bg-secondary"} ${isScrolled ? 'sticky top-0 bg-opacity-50 backdrop-filter backdrop-blur-lg dark:bg-primary/30 bg-secondary/30' : ''}`}
      >
        <Logo />

        <div className="flex items-center">
          <button onClick={toggleTheme} className="dark:text-secondary text-primary bg-secondary-light dark:bg-[#222222] p-3 rounded-lg">
            {theme === 'dark' ? <FaMoon /> : <FaSun />}
          </button>

          <div className={`hidden ${search === true ? "lg:block ml-4" : ""}`}>
            <SearchInput />
          </div>
        </div>

        <div className="flex justify-center items-center lg:hidden text-xl">
          {isMenuOpen ? (
            <VscChromeClose onClick={() => setIsMenuOpen(false)} />
          ) : (
            <CgSearch onClick={() => setIsMenuOpen(true)} />
          )}
        </div>
      </div>

      <div
        className={`transition-all pt-24 p-5 z-20 fixed h-[160px] rounded-b-xl ${isMenuOpen ? "top-0" : "-top-full"} w-screen`}
      >
        <SearchInput />
      </div>
    </>
  );
}

export default Header;