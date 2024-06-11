function EpisodesList({ episodeData, episodeName, id }) {
  return (
    <div className="rounded-lg bg-[#141414] w-96 overflow-y-scroll mx-auto">
      {episodeData.map((episode, i) => (
        <div key={i} className={`transition-all ${episode.id == episodeName ? 'bg-[#8080cf]' : 'bg-[#202020] hover:bg-[#292929]'} group m-2 pr-2 rounded-lg`}>
          <a href={`/watch/${id}/${episode.number}`}>
            <a className="flex items-center gap-3">
              <img src={episode.image} alt={`Episode ${episode.number}`} className="w-36 aspect-[3/2] object-cover rounded-lg" />
              <div>
                <p className="font-bold">{`Episode ${episode.number}`}</p>
                <p className="text-sm italic">{episode.title}</p>
              </div>
            </a>
          </a>
        </div>
      ))}
    </div>
  );
}

export default EpisodesList;