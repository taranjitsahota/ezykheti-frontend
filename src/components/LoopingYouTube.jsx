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
    height: "80%",
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

        <div className="relative mt-10 w-screen h-[30vh] md:h-[75vh] overflow-hidden">
          <YouTube
            videoId="A-AjJYcxoYU"
            opts={opts}
            className="absolute w-full h-full"
            style={{ transform: "scale(2.1)", transformOrigin: "center" }}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange}
          />
          <div className="absolute inset-0 z-20" style={{ background: "transparent", pointerEvents: "all" }}></div>
          {/* <div className="relative z-10 flex items-center h-full text-black text-left p-4"> */}
          {/* <div className="p-6 rounded-xl max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Ezykheti Agri Services
            </h1>
          </div> */}
        {/* </div> */}
        </div>
      );
      
};

export default LoopingYouTube;
