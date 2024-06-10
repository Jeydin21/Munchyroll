import Link from "next/link";
import React from "react";

function AnimeDetails({ animeData, episodeData }) {
  const [isReadMore, setIsReadMore] = React.useState(false);
  const {
    description,
    title,
    image,
    genres,
    status,
    releaseDate,
    totalEpisodes,
    season,
    cover,
    rating,
  } = animeData;
  return (
    <>
      <div className=" mt-5">
        <div className=" lg:flex items-start  lg:space-x-7">
          <img className=" sm:max-w-[230px] aspect-[5/7] object-cover rounded-lg" src={image} alt="" />
          <div className=" mt-5 lg:mt-0 max-w-4xl">
            <h2 className="dark:text-secondary text-primary line-clamp-1 text-3xl font-semibold">{title.english || title.romaji}</h2>
            <p
              className={`mt-5 ${!isReadMore && " line-clamp-3"} dark:text-secondary text-primary`}
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <span
              onClick={() => setIsReadMore(!isReadMore)}
              className="hover:underline dark:text-blue-300  text-blue-500 cursor-pointer"
            >
              {!isReadMore ? "Read More" : "Read Less"}
            </span>

            <div className=" mt-5">
              <h4 className="dark:text-secondary text-primary font-semibold">Information</h4>
            </div>
            <div className="mt-5 flex gap-2 flex-wrap">
              <TextButtons text={"Status: " + status} />
              <TextButtons text={"Season: " + season.charAt(0).toUpperCase() + season.slice(1).toLowerCase() + " " + releaseDate} />
              <TextButtons text={"Score: " + rating + "%"} />
              <TextButtons text={totalEpisodes + " Episodes"} />
            </div>
            <div className=" mt-5">
              <h4 className="dark:text-secondary text-primary font-semibold">Genres</h4>
            </div>
            <div className=" mt-3 flex gap-2 flex-wrap">
              {genres?.map((genre, i) => (
                <GenreButton key={i} text={genre} />
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="dark:text-secondary text-primary font-semibold mt-10">Episodes</h2>
          <div className=" mt-5 flex  flex-wrap  gap-3">
            {episodeData
              ?.slice(0)
              .map((episode, i) => (
                <TextButtons
                  key={i}
                  link={`/watch/${animeData.id}/${episode.number}`}
                  // text={episode.number + ": " + episode.title}
                  text={episode.number}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export const TextButtons = ({ text, link, isCurrent, onClick }) => {
  if (link) {
    return (
      <Link href={link}>
        <div onClick={onClick} className={`${isCurrent ? "bg-blue-500 text-white" : "bg-primary-light border-gray-300"} rounded-md text-center min-w-[75px] hover:bg-slate-700 transition-all  px-2 py-2`}>
          <p className=" text-secondary">{text}</p>
        </div>
      </Link>
    );
  }

  return (
    <div onClick={onClick} className={`${isCurrent ? "bg-blue-500 text-white" : "bg-primary-light border-gray-300"} rounded-md text-center min-w-[75px] hover:bg-slate-700 transition-all  px-2 py-2`}>
      <p className=" text-secondary">{text}</p>
    </div>
  );
};

export const GenreButton = ({ text }) => {
  return (
    <div className={`bg-primary-light border-gray-300 hover:bg-slate-700 rounded-full text-center min-w-[75px] transition-all py-1 px-3`}>
      <a href={`/genre/${text.toLowerCase()}`}>
        <p className="text-secondary">{text}</p>
      </a>
    </div>
  );
};

export default AnimeDetails;
