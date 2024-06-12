import Logo from "../ui/Logo";
import Link from "next/link";
import { FaGithub, FaDiscord , FaTwitter} from 'react-icons/fa';

function Footer() {
  return (
    <>
    <footer className="mt-14 py-2 px-5 md:px-12 lg:px-16 xl:px-20 2xl:px-24 flex flex-col sm:flex-row justify-between">
      <div>
        <Logo hover={false} />
        <p className="dark:text-primary-light text-primary text-xs pt-2">
          This website does not retain any files on its server. Rather, it solely provides links to<br />media content hosted by third-party services.
        </p>
      </div>
      <div>
        <div className="flex sm:flex-col dark:text-primary-light text-primary max-sm:pt-5 max-sm:space-x-5 sm:space-y-2 pb-2">
          <Link className="hover:text-blue-400 transition-all" href="/anime">Anime</Link>
          <Link className="hover:text-blue-400 transition-all" href="/manga">Manga</Link>
          <Link className="hover:text-blue-400 transition-all" href="/movies">Movies</Link>
          <Link className="hover:text-blue-400 transition-all" href="/shows">Shows</Link>
        </div>
      </div>
    </footer>
    <footer className="pb-10 px-5 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
      <div className="pt-2 flex justify-between border-t-[2px] border-primary w-full">
        <p className="dark:text-primary-light text-primary text-sm">
        Website made by <a className="hover:text-blue-400 dark:text-secondary text-primary underline transition-all" rel="noreferrer" target="_blank" href="https://j21.dev">Jeydin21</a>
        </p>
        <div className="flex flex-row items-center space-x-3">
          <a href="https://discord.com/invite/JQsvHC4JUH" target="_blank" rel="noreferrer" className="transition-all hover:scale-125">
            <FaDiscord size={25} color="grey " />
          </a>
          <a href="https://github.com/Jeydin21/Munchyroll" target="_blank" rel="noreferrer" className="transition-all hover:scale-125">
            <FaGithub size={25} color="grey" />
            </a>
            <a href="https://x.com/Jeydin21" target="_blank" rel="noreferrer" className="transition-all hover:scale-125">
            <FaTwitter size={25} color="grey" />
          </a>
        </div>
      </div>
    </footer>
    </>
  );
}

export default Footer;