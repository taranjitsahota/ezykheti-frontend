import React from "react";
import YouTube from "react-youtube";

const LoopingYouTube = () => {
  const onPlayerReady = (event) => {
    event.target.mute();
    event.target.setPlaybackQuality("hd720");
    event.target.playVideo();
  };

  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      const player = event.target;
      const checkLoop = setInterval(() => {
        if (player.getCurrentTime() >= 31) {
          player.seekTo(19);
        }
      }, 500);
      player.loopChecker = checkLoop;
    } else if (
      event.data === window.YT.PlayerState.ENDED ||
      event.data === window.YT.PlayerState.PAUSED
    ) {
      event.target.playVideo();
    }
  };

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 0,
      start: 20,
      modestbranding: 0,
      rel: 0,
      showinfo: 0,
      mute: 1,
      disablekb: 1,
      fs: 0,
      playsinline: 1,
      enablejsapi: 1,
    },
  };

  return (
    <div className="relative w-screen h-[40vh] md:h-[40vh] lg:h-[50vh] xl:h-[65vh] overflow-hidden m-0 p-0">
      <div className="absolute inset-0 overflow-hidden">
        <YouTube
          videoId="A-AjJYcxoYU"
          opts={opts}
          className="absolute w-full h-full"
          style={{ 
            transform: "scale(2.2)", 
            transformOrigin: "center",
            position: "absolute",
            top: 0,
            left: 0
          }}
          onReady={onPlayerReady}
          onStateChange={onPlayerStateChange}
        />
      </div>
      <div
        className="absolute inset-0 z-20"
        style={{ background: "transparent", pointerEvents: "all" }}
      ></div>
    </div>
  );
};

export default LoopingYouTube;