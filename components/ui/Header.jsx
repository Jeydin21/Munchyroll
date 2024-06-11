import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import Logo from "../ui/Logo";
import SearchInput from "../ui/SearchInput";
import { CgSearch } from "react-icons/cg";
import { VscChromeClose } from "react-icons/vsc";

function Header({ theme, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div
        className={`p-5 px-5 sm:px-10 backdrop-blur-sm z-50 flex justify-between left-0 items-center top-0 right-0`}
      >
        <Logo />

        <div className="flex items-center">
          <button onClick={toggleTheme} className="dark:text-secondary text-primary">
            {theme === 'dark' ? <FaMoon /> : <FaSun />}
          </button>

          <div className="hidden lg:block ml-4">
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
        className={`bg-primary/90 backdrop-blur-md transition-all pt-24 p-5 z-20 fixed h-[160px] rounded-b-xl ${isMenuOpen ? "top-0" : "-top-full"} w-screen`}
      >
        <SearchInput />
      </div>
    </>
  );
}

export default Header;