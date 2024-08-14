import { useState, useEffect } from "react";
import { getAnimeEpisodeLinks } from "../../../src/handlers/anime";
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider, Poster, Track } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout, DefaultAudioLayout } from '@vidstack/react/player/layouts/default';
import { set } from "nprogress";

const corsLink = process.env.NEXT_PUBLIC_CORS_REQUEST_LINK

const VideoPlayer = ({ episodeTitle, episodeName, episodeNumber }) => {
  const [episodeDataLink, setEpisodeDataLink] = useState(null);
  const [episodeSubtitleLink, setEpisodeSubtitleLink] = useState(null);
  const [vttContent, setVttContent] = useState(null);
  const [isZoro, setIsZoro] = useState(true);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}.000`;
  };

  const generateVTT = (intros, outros) => {
    let vtt = "WEBVTT\n\n";

    intros.forEach((intro, key) => {
      vtt += `${formatTime(intro.start)} --> ${formatTime(intro.end)}\n`;
      vtt += `Intro\n\n`;
    });

    outros.forEach((outro, key) => {
      vtt += `${formatTime(outro.start)} --> ${formatTime(outro.end)}\n`;
      vtt += `Outro\n\n`;
    });

    return vtt;
  };

  useEffect(() => {
    const fetchEpisodeDataAndSubtitles = async () => {
      try {
        let episodeData;
        if (episodeName.includes("$")) {
          episodeData = await getAnimeEpisodeLinks(episodeName);
          setIsZoro(true);
          if (episodeData.intro && episodeData.outro) {
            const intros = [episodeData.intro]
            const outros = [episodeData.outro]
            setVttContent(generateVTT(intros, outros));
          }
        } else {
          episodeData = await getAnimeEpisodeLinks(episodeName, "gogoanime");
          setIsZoro(false);
        }
        if (episodeData) {
          if (episodeData.sources && episodeData.sources.length > 0) {
            let defaultSource;
            if (isZoro) {
              defaultSource = episodeData.sources[0];
            } else {
              defaultSource = episodeData.sources.find(source => source.quality === "default");
            }
            setEpisodeDataLink(corsLink ? `${corsLink}/${defaultSource.url}` : defaultSource.url);
          } else {
            console.error("Episode data is missing or the expected structure is not met.");
            setEpisodeDataLink(null);
          }

          if (episodeData.subtitles && episodeData.subtitles.length > 0) {
            const englishSubtitle = episodeData.subtitles
            if (englishSubtitle) {
              setEpisodeSubtitleLink(englishSubtitle);
            } else {
              console.error("English subtitles are missing.");
              setEpisodeSubtitleLink(null);
            }
          } else {
            console.error("Episode subtitles are missing or the expected structure is not met.");
            setEpisodeSubtitleLink(null);
          }
        } else {
          console.error("Failed to fetch episode data or subtitles.");
          setEpisodeDataLink(null);
          setEpisodeSubtitleLink(null);
        }
      } catch (error) {
        console.error("Failed to fetch episode data or subtitles:", error);
        setEpisodeDataLink(null);
        setEpisodeSubtitleLink(null);
      }
    };

    fetchEpisodeDataAndSubtitles();
  }, [episodeName]);

  // Conditional rendering or providing a default src
  if (!episodeDataLink) {
    return <div className="flex justify-center items-center h-full">Loading...</div>; // Tailwind CSS for centering
  }

  let episodeThing = "";

  if (episodeTitle) {
    episodeThing = `Episode ${episodeNumber}: ${episodeTitle}`;
  } else {
    episodeThing = `Episode ${episodeNumber}`;
  }

  return (
    <MediaPlayer title={episodeThing} src={episodeDataLink} playsInline aspectRatio="16/9" load="eager" posterLoad="eager" streamType="on-demand">
      <MediaProvider>
        {episodeSubtitleLink && episodeSubtitleLink.filter(track => track.lang !== "Thumbnails").map((track) => (
          <Track src={`${corsLink}/${track.url}`} kind="subtitles" label={track.lang} key={track.content} default={track.lang === "English"} />
        ))}
        {vttContent && (
          <Track
            content={vttContent}
            default={true}
            language="en-US"
            kind="chapters"
            data-type="vtt"
          />
        )}
      </MediaProvider>
      <DefaultAudioLayout icons={defaultLayoutIcons} />
      {episodeSubtitleLink && (
      <DefaultVideoLayout thumbnails={`${corsLink}/${episodeSubtitleLink.find(track => track.lang === "Thumbnails").url}`} icons={defaultLayoutIcons} />
    )}
    </MediaPlayer>
  );
};

export default VideoPlayer;