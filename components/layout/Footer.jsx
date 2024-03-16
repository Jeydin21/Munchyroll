import React from "react";
import Logo from "../small-components/Logo";
import { BiUpArrowAlt } from "react-icons/bi";
function Footer() {
  const goToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="border-t-[1px] border-gray-600 mt-14 p-5 sm:p-10">
      <div
        onClick={goToTop}
        className=" cursor-pointer float-right bg-primary-light p-3 text-2xl rounded-full hover:bg-accent hover:text-black transition-all "
      >
        <BiUpArrowAlt />
      </div>
      <div className=" flex space-x-4 items-center">
        <div>
          <Logo />
          <p>A minimal anime streaming site</p>
          <p>
            Made by <a className="hover:text-blue-400 underline transition-all" rel="noreferrer" target="_blank" href="https://j21.dev">Jeydin21</a>!
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
