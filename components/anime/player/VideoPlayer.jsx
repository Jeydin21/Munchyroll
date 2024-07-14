import { useState, useEffect } from "react";
import { getAnimeEpisodeLinks } from "../../../src/handlers/anime";
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider, Poster } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout, DefaultAudioLayout } from '@vidstack/react/player/layouts/default';

const corsLink = process.env.NEXT_PUBLIC_CORS_REQUEST_LINK

const VideoPlayer = ({ episodeTitle, episodeName, episodeThumbnail }) => {
  const [episodeDataLink, setEpisodeDataLink] = useState(null);

  useEffect(() => {
    const fetchEpisodeData = async () => {
      try {
        const episodeData = await getAnimeEpisodeLinks(episodeName);
        if (episodeData && episodeData.sources && episodeData.sources[3] && episodeData.sources[3].url) {
          const defaultSource = episodeData.sources.find(source => source.quality === "default");
          setEpisodeDataLink(defaultSource.url);
        } else {
          console.error("Episode data is missing or the expected structure is not met.");
          setEpisodeDataLink(null); // Explicitly setting to null if condition fails
        }
      } catch (error) {
        console.error("Failed to fetch episode data:", error);
        setEpisodeDataLink(null); // Consider setting to a fallback URL or error state
      }
    };

    fetchEpisodeData();
  }, [episodeName]); // Ensure episodeName is correctly triggering the effect

  // Conditional rendering or providing a default src
  if (!episodeDataLink) {
    return <div>Loading...</div>; // Or any other fallback UI
  }

  return (
    <MediaPlayer title={episodeTitle} src={episodeDataLink} playsInline aspectRatio="16/9" load="eager" posterLoad="eager" streamType="on-demand" >
      <MediaProvider>
        <Poster src={episodeThumbnail} alt='' />
      </MediaProvider>
      <DefaultAudioLayout icons={defaultLayoutIcons} />
      <DefaultVideoLayout icons={defaultLayoutIcons} />
    </MediaPlayer>
  );
};

export default VideoPlayer;