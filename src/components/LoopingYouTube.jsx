import React from "react";
import YouTube from "react-youtube";

const LoopingYouTube = () => {
  const startTime = 3918; // 1:05:18 in seconds
  const endTime = 3940; // 1:05:40 in seconds

  const onPlayerReady = (event) => {
    event.target.mute();
    event.target.setPlaybackQuality("hd1080");
    event.target.seekTo(startTime); // start at 1:05:18
    event.target.playVideo();
  };

  const onPlayerStateChange = (event) => {
    const player = event.target;

    if (event.data === window.YT.PlayerState.PLAYING) {
      // clear previous interval if exists
      if (player.loopChecker) clearInterval(player.loopChecker);

      const checkLoop = setInterval(() => {
        if (player.getCurrentTime() >= endTime) {
          player.seekTo(startTime);
        }
      }, 500);

      player.loopChecker = checkLoop;
    } else if (
      event.data === window.YT.PlayerState.ENDED ||
      event.data === window.YT.PlayerState.PAUSED
    ) {
      player.playVideo();
    }
  };

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 0,
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
    <div className="relative w-screen h-[40vh] md:h-[40vh] lg:h-[50vh] xl:h-[88vh] overflow-hidden m-0 p-0">
      <div className="absolute inset-0 overflow-hidden">
        <YouTube
          videoId="YLIZIMYnZlw"
          opts={opts}
          className="absolute w-full h-full"
          style={{
            transform: "scale(1.4)",
            // transformOrigin: "center",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
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
