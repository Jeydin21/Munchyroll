import { useRef, useState, useEffect } from "react";
import videojs from "video.js";
require('@silvermine/videojs-quality-selector')(videojs);
require('@silvermine/videojs-quality-selector/dist/css/quality-selector.css');
import "@videojs/http-streaming";
import "video.js/dist/video-js.css";
import "videojs-hotkeys";

const corsLink = process.env.NEXT_PUBLIC_CORS_REQUEST_LINK

const VideoPlayer = ({ videoSources }) => {
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
    if (player && videoSources) {
      // Find the highest quality that is not 'default' or 'backup'
      const highestQuality = Math.max(...videoSources
        .filter(source => source.quality !== 'default' && source.quality !== 'backup')
        .map(source => parseInt(source.quality, 10)));
  
      const sources = videoSources.map((source) => {
        const quality = source.quality === 'default' ? 0 : parseInt(source.quality, 10);
        return {
          src: source.url,
          type: source.isM3U8 ? "application/x-mpegURL" : "video/mp4",
          label: source.quality,
          selected: quality === highestQuality,
        };
      });
  
      player.src(sources);
      player.load();
      if (!player.controlBar.getChild('QualitySelector')) {
        player.controlBar.addChild('QualitySelector');
      }
    }
  }, [videoSources, player]);

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
      controlBar: {
        children: [
          'playToggle',
          'progressControl',
          'volumePanel',
          'qualitySelector',
          'fullscreenToggle',
        ],
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