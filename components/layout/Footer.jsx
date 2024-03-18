import React from "react";
import Logo from "../small-components/Logo";
import { FaGithub } from 'react-icons/fa';
import { FaDiscord } from 'react-icons/fa';

function Footer() {

  return (
    <footer className="border-t-[1px] border-gray-600 mt-14 p-5 sm:p-10 flex justify-between">
      <div className="flex items-center space-x-4">
        <div>
          <Logo />
          <p>A minimal anime streaming site</p>
          <p>
            Made by <a className="hover:text-blue-400 underline transition-all" rel="noreferrer" target="_blank" href="https://j21.dev">Jeydin21</a>!
          </p>
        </div>
        <div className="flex flex-col space-y-4 items-center bg-gray-900 bg-opacity-80 rounded-full p-4">
  <a href="https://discord.com/invite/JQsvHC4JUH" target="_blank" rel="noreferrer" className="transition-all hover:scale-125">
    <FaDiscord size={25} color="#5865F2 " />
  </a>
  <a href="https://github.com/Jeydin21/Munchyroll" target="_blank" rel="noreferrer" className="transition-all hover:scale-125">
    <FaGithub size={25} />
  </a>
</div>
      </div>
    </footer>
  );
}

export default Footer;