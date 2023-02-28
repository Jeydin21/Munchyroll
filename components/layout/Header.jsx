import React from "react";
import Logo from "../small-components/Logo";
import SearchInput from "../small-components/SearchInput";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { BiSearchAlt } from "react-icons/bi";
import { CgSearch } from "react-icons/cg";
import { motion } from "framer-motion";
import { VscChromeClose } from "react-icons/vsc";
function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const randomNum = Math.floor(Math.random() * 6) + 1;
  return (
    <>
      <div className=" p-5 px-5 sm:px-10 border-b border-primary-light bg-background/90 backdrop-blur-sm z-50  fixed flex justify-between left-0 items-center top-0 right-0  ">
        <Logo />

        <div className=" hidden lg:block">
          <SearchInput />
        </div>

        <div className=" flex justify-center items-center lg:hidden text-xl">
          {isMenuOpen ? (
            <VscChromeClose onClick={() => setIsMenuOpen(false)} />
          ) : (
            <CgSearch
              
              onClick={() => setIsMenuOpen(true)}
            />
          )}
        </div>
      </div>

      <div
        className={` bg-primary/90 backdrop-blur-md transition-all pt-24 p-5     z-20 fixed h-[160px] rounded-b-xl  ${
          isMenuOpen ? "top-0" : "-top-full"
        }  w-screen `}
      >
        <SearchInput />
      </div>
    </>
  );
}

export default Header;
