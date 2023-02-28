import React, { useRef, useState, useEffect } from "react";

import videojs from "video.js"; // version 7
import "@videojs/http-streaming";
import "video.js/dist/video-js.css";
const VideoPlayer = ({ videoSource }) => {
  const videoRef = useRef();

  console.log("videoSource", videoSource);
  const [player, setPlayer] = useState(undefined);

  useEffect(() => {
    return () => {
      const video = videoRef.current;
      if (player) {
        console.log("dispose video");
        player.dispose();
      }
      if (video) {
        videoRef.current.pause();
        console.log("cleanup video");
      }
    };
  }, []);

  useEffect(() => {
    const videoJsOptions = {
      autoplay: true,
      controls: true,
      fluid: true,
      muted: false,
      responsive: true,
      poster: "https://i.imgur.com/xO0ViM0.png",
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
        console.log("onPlayerReady");
      }
    );

    setPlayer(p);
    return () => {
      if (player) {
        console.log("dispose");
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
