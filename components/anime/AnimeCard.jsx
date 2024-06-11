import Link from "next/link";
import { FaBook, FaStar, FaPlay } from 'react-icons/fa';
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
            <h4 className="mt-2 font-bold line-clamp-2">{data.title.english || data.title.romaji}</h4>

            {/* <p>Episode {data.episodeNumber}</p> */}
            <div className="flex space-x-2 mt-2 select-none">
              <p className="dark:text-secondary text-primary">{type[data.type]}
                {data.releaseDate && (
                  <span>•{data.releaseDate}</span>
                )}
              </p>
              {data.totalEpisodes && data.totalEpisodes != 1 && (
                <p className="max-xl:hidden">
                  <span className="dark:text-secondary text-primary flex items-center">
                    <FaBook />
                    <span className="ml-1">{data.totalEpisodes}</span>
                  </span>
                </p>
              )}
              {data.rating && (
                <p>
                  <span className="dark:text-secondary text-primary flex items-center">
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