function EpisodesList({ episodeData, episodeName, id, isDubbed = false }) {
  return (
    <div className="max-lg:mt-10 w-full lg:w-2/5 overflow-y-auto h-screen">
      {/* <h2 className="text-primary dark:text-secondary font-semibold text-lg text-center mb-5">Episode List</h2> */}
      <div className="px-4 flex flex-col gap-2"> {/* Reduced gap */}
        {episodeData?.map((episode, i) => (
          <a
            key={i}
            href={`/anime/watch/${id}/${episode.number}?dub=${isDubbed}`}
            className={`transition-all duration-150 text-primary dark:text-secondary w-full flex items-center gap-2 rounded-md ${episode.id === episodeName ? 'bg-blue-500 text-secondary' : 'bg-secondary-light dark:bg-primary-light hover:bg-secondary-hover dark:hover:bg-primary-hover'}`} // Reduced padding and gap
            title={episode.title ? `Episode ${episode.number}: ${episode.title}` : `Episode ${episode.number}`}
          >
            <img src={episode.image} alt={`Episode ${episode.number} Thumbnail`} className="rounded-md w-32 h-24 object-cover" /> {/* Adjusted width and height for bigger image */}
            <div className="flex flex-col">
              <span className="font-semibold text-md">{`Episode ${episode.number}`}</span> {/* Smaller text */}
              {episode.title && <span className="text-xs italic overflow-clip">{episode.title}</span>} {/* Smaller text */}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default EpisodesList;