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
    height: "70%",
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
    <div className="relative mt-10 w-screen h-[30vh] md:h-[60vh] lg:h-[63vh] xl:h-[85vh] overflow-hidden">
      <YouTube
        videoId="A-AjJYcxoYU"
        opts={opts}
        className="absolute w-full h-full"
        style={{ transform: "scale(2.2)", transformOrigin: "center" }}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange}
      />
      <div
        className="absolute inset-0 z-20"
        style={{ background: "transparent", pointerEvents: "all" }}
      ></div>
    </div>
    //   <div className="relative mt-10 w-screen overflow-hidden">
    //   {/* Responsive aspect ratio for different screen sizes */}
    //   <div className="relative w-full h-0 pb-[40vh] md:pb-[56.25%] lg:pb-[50vh] xl:pb-[45vh]">
    //     <YouTube
    //       videoId="A-AjJYcxoYU"
    //       opts={opts}
    //       className="absolute top-0 left-0 w-full h-full"
    //       style={{ transform: "scale(1.5)", transformOrigin: "center" }} // Adjust zoom level if needed
    //       onReady={onPlayerReady}
    //       onStateChange={onPlayerStateChange}
    //     />
    //   </div>
    //   <div
    //     className="absolute inset-0 z-20"
    //     style={{ background: "transparent", pointerEvents: "all" }}
    //   ></div>
    // </div>
  );
};

export default LoopingYouTube;
