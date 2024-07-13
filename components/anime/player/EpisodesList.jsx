import React, { useState } from 'react';

function EpisodesList({ episodeData, episodeName, id, isDubbed = false }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEpisodes = episodeData?.filter(episode =>
    episode.number.toString().includes(searchTerm) || episode.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-lg:mt-10 w-full lg:w-1/3 overflow-y-auto h-screen">
      {/* Search Bar */}
      <div className="px-4 py-2">
        <input
          type="text"
          placeholder="Search episodes..."
          className="w-full p-2 text-primary dark:text-secondary bg-secondary-light dark:bg-primary-light rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="px-4 flex flex-col gap-2">
        {filteredEpisodes.map((episode, i) => (
          <a
            key={i}
            href={`/anime/watch/${id}/${episode.number}?dub=${isDubbed}`}
            className={`transition-all duration-150 text-primary dark:text-secondary w-full flex items-center gap-2 rounded-md ${episode.id === episodeName ? 'bg-blue-500 text-secondary' : 'bg-secondary-light dark:bg-primary-light hover:bg-secondary-hover dark:hover:bg-primary-hover'}`}
            title={episode.title ? `Episode ${episode.number}: ${episode.title}` : `Episode ${episode.number}`}
          >
            <img src={episode.image} alt={`Episode ${episode.number} Thumbnail`} className="rounded-md w-32 h-24 object-cover" />
            <div className="flex flex-col">
              <span className="font-semibold text-md">{`Episode ${episode.number}`}</span>
              {episode.title && <span className="text-xs italic overflow-clip">{episode.title}</span>}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default EpisodesList;