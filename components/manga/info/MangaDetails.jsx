import { useState } from "react";
import TextButton from "../../buttons/TextButton";
import GenreButton from "../../buttons/GenreButton";

function MangaDetails({ mangaData }) {
  const [isReadMore, setIsReadMore] = useState(false);
  const {
    description,
    title,
    image,
    genres,
    status,
    releaseDate,
    type,
    rating
  } = mangaData;

  const types = {
    MANGA: "Manga",
    ONE_SHOT: "One Shot",
    NOVEL: "Novel",
    DOUJIN: "Doujin",
    MANHWA: "Manhwa",
  }

  return (
    <>
      <div className="mt-5">
        <div className="sm:flex items-start sm:space-x-7">
          <img className="max-sm:mx-auto max-w-[230px] aspect-[5/7] object-cover rounded-lg" src={image} alt="" />
          <div className=" mt-5 lg:mt-0 max-w-4xl">
            <h2 className="max-sm:text-center dark:text-secondary text-primary line-clamp-1 text-3xl font-semibold">{title.english || title.romaji}</h2>
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
              <TextButton text={"Type: " + types[type]} />
              <TextButton text={"Status: " + status} />
              <TextButton text={"Relased: " + releaseDate} />
              <TextButton text={"Score: " + rating + "%"} />
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
          <h2 className="dark:text-secondary text-primary font-semibold mt-10">Chapters</h2>
          <div className=" mt-5 flex  flex-wrap  gap-3">
            {mangaData.chapters
              ?.slice(0)
              .map((chapter, i) => (
                <TextButton
                  key={i}
                  link={`/manga/read/${mangaData.id}/${chapter.id}/${chapter.chapterNumber}`}
                  // text={episode.number + ": " + episode.title}
                  text={chapter.chapterNumber}
                  title={chapter.title}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MangaDetails;