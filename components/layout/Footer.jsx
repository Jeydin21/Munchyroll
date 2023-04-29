import React from "react";
import Logo from "../small-components/Logo";
import { BiUpArrowAlt } from "react-icons/bi";
function Footer() {
  const goToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className=" mt-14 p-5 sm:p-10">
      <div
        onClick={goToTop}
        className=" cursor-pointer float-right bg-primary-light p-3 text-2xl"
      >
        <BiUpArrowAlt />
      </div>
      <div className=" flex space-x-4 items-center">
        <div>
          <Logo />
          <p>A minimal anime streaming site</p>
          <p className=" font-extralight ">
            made by
            <a
              className="  underline ml-1 "
              target="_blank"
              href="https://jeydin.is-a.dev"
              rel="noreferrer"
            >
              Jeydin21
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
