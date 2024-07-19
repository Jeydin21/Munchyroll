import React, { useState } from 'react';
import Link from 'next/link';
import { FaTableList, FaTableCells } from "react-icons/fa6";
import TextButton from "../../buttons/TextButton";


function EpisodesList({ episodeData, episodeName, id, isDubbed = false, episodePage }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isList, setIsList] = useState(true);

  const toggleMode = () => {
    setIsList(!isList);
  };

  const filteredEpisodes = episodeData?.filter(episode =>
    episode.number.toString().includes(searchTerm) || episode.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`max-lg:mt-10 w-full ${episodePage == false ? "mt-10 px-5 w-4/5 mx-auto" : "lg:w-1/4"}`}>
      <div className="py-2 flex flex-row space-x-2">
        <input
          type="text"
          placeholder="Search episodes..."
          className="w-full p-2 text-primary dark:text-secondary bg-secondary-light dark:bg-primary-hover rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={toggleMode} className="transition-all px-4 dark:bg-primary-hover dark:hover:bg-primary-light active:scale-75 rounded-md">
          {isList ? <span><FaTableList /></span> : <span><FaTableCells /></span>}
        </button>
      </div>
      <div className="transition-all overflow-y-auto h-screen">
  {isList ? (
    <div className="pr-2 flex flex-col gap-2">
      {filteredEpisodes.map((episode, i) => (
        <Link
          key={i}
          href={`/anime/watch/${id}/${episode.number}?dub=${isDubbed}`}
          className={`animate-fadeIn transition-all duration-150 text-primary dark:text-secondary w-full flex items-center gap-2 rounded-2xl ${episode.id === episodeName ? 'bg-blue-500 text-secondary' : 'bg-secondary-light dark:bg-primary-hover hover:bg-secondary-hover dark:hover:bg-primary-light'}`}
          title={episode.title ? `Episode ${episode.number}: ${episode.title}` : `Episode ${episode.number}`}
        >
          <img src={episode.image} alt={`Episode ${episode.number} Thumbnail`} className="rounded-2xl w-32 h-24 object-cover" />
          <div className="flex flex-col">
            <span className="font-semibold text-md">{`Episode ${episode.number}`}</span>
            {episode.title && <span className="text-xs italic">{episode.title}</span>}
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <div className="animate-fadeIn justify-start px-5 mt-5 flex flex-wrap gap-3">
    {filteredEpisodes
      ?.slice(0)
      .map((episode, i) => {
        return (
          <TextButton
            key={i}
            link={`/anime/watch/${id}/${episode.number}?dub=${isDubbed}`}
            text={episode.number}
            title={episode.title ? `Episode ${episode.number}: ${episode.title}` : `Episode ${episode.number}`}
            isCurrent={episode.id === episodeName}
          />
        );
      })}
    </div>
  )}
</div>
    </div>
  );
}

export default EpisodesList;