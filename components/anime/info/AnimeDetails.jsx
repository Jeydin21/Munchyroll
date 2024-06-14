import { useState } from "react";
import TextButton from "../../buttons/TextButton";
import GenreButton from "../../buttons/GenreButton";

function AnimeDetails({ animeData, episodeData, episodePage = false }) {
  const [isReadMore, setIsReadMore] = useState(false);
  const {
    description,
    title,
    image,
    genres,
    status,
    releaseDate,
    totalEpisodes,
    season,
    rating,
  } = animeData;
  return (
    <>
      <div className={`mt-5 ${episodePage === true ? "border-t-[2px] border-primary" : ""}`}>
        <div className={`${episodePage === true ? "mt-5" : ""} lg:flex items-start lg:space-x-7`}>
          <img className=" sm:max-w-[230px] aspect-[5/7] object-cover rounded-lg" src={image} alt="" />
          <div className=" mt-5 lg:mt-0 max-w-4xl">
            <h2 className={`${episodePage === true ? "hidden" : ""} dark:text-secondary text-primary line-clamp-1 text-3xl font-semibold`}>{title.english || title.romaji}</h2>
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
              <TextButton text={"Status: " + status} />
              <TextButton text={"Season: " + season.charAt(0).toUpperCase() + season.slice(1).toLowerCase() + " " + releaseDate} />
              <TextButton text={"Score: " + rating + "%"} />
              <TextButton text={totalEpisodes + " Episodes"} />
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

        <div className={`${episodePage === true ? "hidden" : ""}`}>
          <h2 className="dark:text-secondary text-primary font-semibold mt-10">Episodes</h2>
          <div className=" mt-5 flex  flex-wrap  gap-3">
            {episodeData
              ?.slice(0)
              .map((episode, i) => (
                <TextButton
                  key={i}
                  link={`/anime/watch/${animeData.id}/${episode.number}`}
                  // text={episode.number + ": " + episode.title}
                  text={episode.number}
                  title={episode.title}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AnimeDetails;