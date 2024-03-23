import React, { useRef, useState, useEffect } from "react";

import videojs from "video.js"; // version 7
import "@videojs/http-streaming";
import "video.js/dist/video-js.css";
import "videojs-hotkeys";
const VideoPlayer = ({ videoSource }) => {
  const videoRef = useRef();
  const [player, setPlayer] = useState(undefined);

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
    const videoJsOptions = {
      autoplay: false,
      controls: true,
      fluid: true,
      muted: false,
      responsive: true,
      preload: "auto",
      liveui: true,
      playbackRates: [0.5, 1, 1.5, 2],
      sources: {
        src: videoSource,
        type: "application/x-mpegURL ",
      },
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
          enableVolumeScroll: true,
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
    <div className="video-player-hls alignfull">
      <div data-vjs-player>
        <video
          id="videoPlayerHLS"
          onContextMenu={(e) => e.preventDefault()}
          ref={videoRef}
          className="video-js  vjs-big-play-centered"
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
  //  videoProgress: () => null,
};

export default VideoPlayer;
