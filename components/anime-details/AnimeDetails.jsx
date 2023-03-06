import Link from "next/link";
import React from "react";

function AnimeDetails({ data }) {
  const [isReadMore, setIsReadMore] = React.useState(false);
  const {
    synopsis,
    animeTitle,
    otherNames,
    animeImg,
    genres,
    status,
    releasedDate,
    type,
    totalEpisodes,
    episodesList,
  } = data;
  return (
    <div className=" mt-5">
      <div className=" lg:flex items-start  lg:space-x-7">
        <img className=" sm:max-w-[230px]" src={animeImg} alt="" />
        <div className=" mt-5 lg:mt-0 max-w-4xl">
          <h2 className=" line-clamp-1 font-semibold">{animeTitle}</h2>
          <h4 className=" line-clamp-1  text-secondary-light">
            {otherNames + " " + releasedDate}
          </h4>
          <p
            className={`mt-5 ${!isReadMore && " line-clamp-3"} text-secondary`}
          >
            {synopsis}
          </p>
          <span
            onClick={() => setIsReadMore(!isReadMore)}
            className=" text-indigo-200  cursor-pointer"
          >
            {!isReadMore ? "read more" : "read less"}
          </span>

          <div className="mt-5 flex gap-2 flex-wrap">
            <TextButtons text={status} />
            <TextButtons text={type} />
            <TextButtons text={totalEpisodes + " Episodes"} />
          </div>
          <div className=" mt-5">
            <h4 className=" font-semibold">Genres</h4>
          </div>
          <div className=" mt-3 flex gap-2 flex-wrap">
            {genres?.map((genre, i) => (
              <TextButtons key={i} text={genre} />
            ))}
          </div>
        </div>
      </div>

      <div>
        <h2 className=" font-semibold mt-10">Episodes</h2>
        <div className=" mt-5 flex  flex-wrap  gap-3">
          {episodesList?.map((episode, i) => (
            <TextButtons
              key={i}
              link={`/stream/${episode.episodeId}`}
              text={episode.episodeNum}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export const TextButtons = ({ text, link }) => {
  if (link) {
    return (
      <Link href={link}>
        <div className=" min-w-[100px] bg-primary-light px-2 py-1">
          <p className=" text-secondary">{text}</p>
        </div>
      </Link>
    );
  }

  return (
    <div className=" min-w-[70px] bg-primary-light px-2 py-1">
      <p className=" text-secondary">{text}</p>
    </div>
  );
};

export default AnimeDetails;
