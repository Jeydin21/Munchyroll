import Logo from "../ui/Logo";
import Link from "next/link";
import { FaGithub, FaDiscord, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <>
      <footer className="mt-14 py-2 px-5 flex flex-col sm:flex-row justify-between">
        <div className="z-50">
          <Logo hover={false} />
          <p className="dark:text-primary-light text-primary text-xs pt-2">
            This website does not retain any files on its server. Rather, it solely provides links to<br />media content hosted by third-party services.
          </p>
        </div>
        <div>
          <div className="flex sm:flex-col dark:text-primary-light text-primary max-sm:pt-5 max-sm:space-x-5 sm:space-y-2 pb-2">
            <Link title="Anime Homepage" className="z-50 hover:text-blue-400 transition-all" href="/anime">Anime</Link>
            <Link title="Manga Homepage" className="z-50 hover:text-blue-400 transition-all" href="/manga">Manga</Link>
            {/* <Link title="Movies Homepage" className="z-50 hover:text-blue-400 transition-all" href="/movies">Movies</Link>
            <Link title="Shows Homepage" className="z-50 hover:text-blue-400 transition-all" href="/shows">Shows</Link> */}
          </div>
        </div>
      </footer>
      <footer className="pb-10 px-5">
        <div className="pt-2 flex justify-between border-t-[2px] border-primary w-full">
          <p className="z-50 dark:text-primary-light text-primary text-sm">
            Made with ❤️ by <Link title="Jeydin21" className="hover:text-blue-400 dark:text-secondary text-primary underline transition-all" rel="noreferrer" target="_blank" href="https://j21.dev">Jeydin21</Link>
          </p>
          <div className="z-50 flex flex-row items-center space-x-3">
            <Link title="Community Discord Server" href="https://discord.com/invite/JQsvHC4JUH" target="_blank" rel="noreferrer" className="transition-all hover:scale-125">
              <FaDiscord size={25} color="grey " />
            </Link>
            <Link title="Munchyroll Source Code" href="https://github.com/Jeydin21/Munchyroll" target="_blank" rel="noreferrer" className="transition-all hover:scale-125">
              <FaGithub size={25} color="grey" />
            </Link>
            <Link title="Jeydin21's Twitter" href="https://x.com/Jeydin21" target="_blank" rel="noreferrer" className="transition-all hover:scale-125">
              <FaTwitter size={25} color="grey" />
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;