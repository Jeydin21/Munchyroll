import Link from "next/link";
import { FaCalendar, FaBook, FaStar, FaPlay } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function AnimeCard({ data }) {
  const type = {
    TV: "TV",
    MOVIE: "Movie",
    OVA: "OVA",
    ONA: "ONA",
    SPECIAL: "Special",
  }

  return (
    <>
      <Link href={"/anime/info/" + data.id}>
        <div className="group sm:p-3 ">
          <div className="overflow-hidden relative rounded-lg aspect-[5/7]">
            <div className="absolute inset-0">
              <div className="transition-all transform duration-300 group-hover:scale-105 group-hover:brightness-50">
                <LazyLoadImage
                  effect="blur"
                  className="w-full h-full aspect-[5/7] object-cover rounded-lg"
                  src={data.image}
                  alt=""
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FaPlay className="text-4xl" />
              </div>
            </div>
          </div>

          <div className="dark:text-secondary text-primary">
            <p title={data.title.english || data.title.romaji} className="hover:bg-neutral-800 mt-2 font-bold line-clamp-1 overflow-hidden text-md rounded p-1">{data.title.english || data.title.romaji}</p>

            {/* <p>Episode {data.episodeNumber}</p> */}
            <div className="text-xs sm:text-sm flex space-x-2 mt-2 select-none">
              <div className="dark:text-secondary text-primary flex items-center">
                <p>
                  <span title={`Released: ${data.releaseDate}`} className="dark:text-secondary text-primary flex items-center">
                    <FaCalendar />
                    <span className="ml-1">{data.releaseDate}</span>
                  </span>
                </p>
              </div>
              {data.totalEpisodes && data.totalEpisodes != 1 && (
                <p>
                  <span title={`Episodes: ${data.totalEpisodes}`} className="dark:text-secondary text-primary flex items-center">
                    <FaBook />
                    <span className="ml-1">{data.totalEpisodes}</span>
                  </span>
                </p>
              )}
              {data.rating && (
                <p>
                  <span title={`Rating: ${data.rating}`} className="dark:text-secondary text-primary flex items-center">
                    <FaStar />
                    <span className="ml-1">{data.rating}</span>
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default AnimeCard;