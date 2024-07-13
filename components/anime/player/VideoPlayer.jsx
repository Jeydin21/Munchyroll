import { useRef, useState, useEffect } from "react";
import { getAnimeEpisodeLinks, getExternalLink } from "../../../src/handlers/anime";
import videojs from "video.js";
import "@videojs/http-streaming";
import "video.js/dist/video-js.css";
import "videojs-hotkeys";

const corsLink = process.env.NEXT_PUBLIC_CORS_REQUEST_LINK

const VideoPlayer = ({ episodeName }) => {
  const videoRef = useRef();
  const [player, setPlayer] = useState(undefined);

  const [episodeDataLink, setEpisodeDataLink] = useState(null);
  const [externalLink, setExternalLink] = useState(null);

  useEffect(() => {
    return () => {
      const video = videoRef.current;
      if (player) {
        player.dispose();
      }
      if (video) {
        videoRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    const fetchEpisodeData = async () => {
      const episodeData = await getAnimeEpisodeLinks(episodeName);
      setEpisodeDataLink(episodeData.sources[3].url);
    };

    fetchEpisodeData();
  }, [episodeName]);

  useEffect(() => {
    if (player) {
      player.src({
        src: corsLink ? `${corsLink}/${episodeDataLink}` : episodeDataLink,
        type: "application/x-mpegURL",
      });
      player.load();
    }
  }, [episodeDataLink, player]);

  useEffect(() => {
    const videoJsOptions = {
      autoplay: false,
      controls: true,
      fluid: true,
      muted: false,
      responsive: true,
      preload: "auto",
      liveui: true,
      playbackRates: [0.5, 1, 1.5, 2, 4, 8],
      enableSmoothSeeking: true,
      playsinline: true,
      nativeControlsForTouch: true,
      notSupportedMessage: "If you see this, either the video is loading, or there is an error!",
      preferFullWindow: true,
    };

    const p = videojs(
      videoRef.current,
      videoJsOptions,
      function onPlayerReaady() {
        this.hotkeys({
          volumeStep: 0.1,
          seekStep: 5,
          alwaysCaptureHotkeys: true,
          enableModifiersForNumbers: false,
          enableMute: true,
          enableNumbers: true,
          enableVolumeScroll: false,
          enableFullscreen: true,
        });
      },
    );

    setPlayer(p);
    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, []);

  return (
    <div className="video-player-hls alignfull rounded-xl overflow-hidden">
      <div data-vjs-player>
        <video
          id="videoPlayerHLS"
          onContextMenu={(e) => e.preventDefault()}
          ref={videoRef}
          className="video-js vjs-big-play-centered"
        ></video>
      </div>
    </div>
  );
};

VideoPlayer.defaultProps = {
  className: "",
  autoplay: false,
  controls: true,
  playbackRates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
  poster: "",
  sources: [],
};

export default VideoPlayer;