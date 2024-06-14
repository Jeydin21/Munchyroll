import TextButton from "../../buttons/TextButton";

function EpisodesList({ episodeData, episodeName, id }) {
  return (
    <div className="max-sd:w-2/5 lg:w-2/5">
      <h2 className="dark:text-secondary text-primary font-semibold text-center mt-10">Episode List</h2>
      <div className="justify-center px-10 mt-5 flex flex-wrap gap-3">
        {episodeData
          ?.slice(0)
          .map((episode, i) => {
            return (
              <TextButton
                key={i}
                link={`/anime/watch/${id}/${episode.number}`}
                text={episode.number}
                title={"Episode " + episode.number + ": " + episode.title}
                isCurrent={episode.id === episodeName}
              />
            );
          })}
      </div>
    </div>
  );
}

export default EpisodesList;