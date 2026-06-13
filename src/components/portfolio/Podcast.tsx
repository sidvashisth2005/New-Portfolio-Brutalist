import { useRef, useState, useEffect } from "react";
import anime from "animejs";
import { GUILLOTINE, useReducedMotion } from "@/lib/anime-utils";
import { podcastEpisodes } from "@/lib/content";
import { Headphones, Volume2, VolumeX, RotateCcw } from "lucide-react";

export function Podcast() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const isReduced = useReducedMotion();

  const currentEpisode = podcastEpisodes[currentEpisodeIndex];

  // Sync Audio Source on Episode Change
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = currentEpisode.url;
    audio.load();

    if (isPlaying) {
      audio.play().catch((err) => console.log("Audio play failed:", err));
    }
  }, [currentEpisodeIndex]);

  // Audio Event Listeners & Equalizer Trigger
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const onEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  // Set Equalizer Animation Loop using anime.js
  useEffect(() => {
    let activeAnimation: anime.AnimeInstance | null = null;

    if (isReduced) {
      anime({
        targets: ".eq-bar",
        height: "16px",
        duration: 100,
      });
      return;
    }

    function animateEqualizer() {
      if (!isPlaying) {
        anime({
          targets: ".eq-bar",
          height: "4px",
          duration: 300,
          easing: "easeOutSine",
        });
        return;
      }

      activeAnimation = anime({
        targets: ".eq-bar",
        height: () => `${anime.random(4, 32)}px`,
        duration: 300,
        delay: anime.stagger(40),
        easing: "easeInOutSine",
        complete: animateEqualizer,
      });
    }

    animateEqualizer();

    return () => {
      if (activeAnimation) activeAnimation.pause();
    };
  }, [isPlaying, isReduced]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch((err) => console.log("Audio play failed:", err));
      setIsPlaying(true);
    }
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickRatio = clickX / rect.width;
    const newTime = clickRatio * duration;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const val = parseFloat(e.target.value);
    setVolume(val);
    audio.volume = val;
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const targetMute = !isMuted;
    audio.muted = targetMute;
    setIsMuted(targetMute);
  };

  const skipForward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(currentTime + 15, duration);
  };

  const skipBackward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(currentTime - 15, 0);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const pad = (num: number) => (num < 10 ? `0${num}` : `${num}`);
    return `${pad(minutes)}:${pad(seconds)}`;
  };

  const loadYT = (videoId: string, thumbId: string, frameId: string) => {
    const thumb = document.getElementById(thumbId);
    const frame = document.getElementById(frameId) as HTMLIFrameElement;
    if (thumb && frame) {
      thumb.style.display = "none";
      frame.src = "https://www.youtube.com/embed/" + videoId + "?autoplay=1";
      frame.style.display = "block";
    }
  };

  return (
    <section id="podcast" className="relative px-5 py-32 bg-black overflow-hidden">
      {/* Step 1 — Section divider line sweep */}
      <div
        className="section-border-line absolute top-0 left-0 right-0 h-[1px] bg-[#E8FF00] origin-left"
        style={{ transform: isReduced ? "none" : "scaleX(0)" }}
      />

      <div className="grid grid-cols-12 gap-8 md:gap-16">
        <audio ref={audioRef} preload="metadata" />

        {/* Section Header */}
        <div className="col-span-12 flex flex-col gap-1 text-left mb-4">
          <div className="overflow-hidden">
            <div className="section-label font-mono text-[10px] uppercase tracking-[0.2em] text-[#E8FF00]">
              <span>(04) </span>
              <span>TRANSMISSIONS / PODCAST</span>
            </div>
          </div>
          <div className="overflow-hidden mt-4">
            <h2 className="section-title font-display font-black text-5xl md:text-6xl tracking-[-0.06em] text-white uppercase leading-none">
              PITCHED.
            </h2>
          </div>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 mt-2">
            BD &middot; STRATEGY &middot; BUILDER LIFE
          </p>
        </div>

        {/* LEFT COLUMN (40%): YouTube Channel Embeds */}
        <div
          className="podcast-left col-span-12 md:col-span-5 flex flex-col gap-8"
          style={{ opacity: isReduced ? 1 : 0 }}
        >
          {/* Section Header */}
          <div className="flex flex-col gap-1 text-left border-b border-white/20 pb-4">
            <span className="font-mono text-[13px] uppercase tracking-[0.12em] text-[#E8FF00] font-black">
              THE PEOPLE DECODER
            </span>
            <span className="font-mono text-xs text-[#666666] uppercase">
              Communication &middot; Hackathon Strategy
            </span>
            <a
              href="https://youtube.com/@ThePeopleDecoder"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/40 hover:text-[#E8FF00] transition-colors mt-1"
            >
              youtube.com/@ThePeopleDecoder &rarr;
            </a>
          </div>

          {/* Videos Grid */}
          <div className="flex flex-col gap-8">
            {/* Video Card 1 */}
            <div className="flex flex-col gap-3">
              <div className="relative border border-[#333] aspect-video w-full overflow-hidden bg-black group/yt">
                <iframe
                  id="frame-1"
                  className="w-full h-full"
                  style={{ display: "none" }}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div
                  id="thumb-1"
                  onClick={() => loadYT("w7ejDZ8SWv8", "thumb-1", "frame-1")}
                  className="absolute inset-0 cursor-pointer"
                >
                  <img
                    src="https://img.youtube.com/vi/w7ejDZ8SWv8/hqdefault.jpg"
                    alt="Video Thumbnail"
                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover/yt:scale-103"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    {/* Brutalist play indicator */}
                    <div className="h-12 w-12 bg-[#E8FF00] flex items-center justify-center text-black font-mono text-xs font-bold uppercase select-none">
                      PLAY
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-display font-medium text-[13px] text-white uppercase tracking-wide">
                  How to Pitch a Hackathon Project
                </h4>
                <span className="font-mono text-[11px] text-[#555555] uppercase mt-1 block">
                  OCT 12, 2023
                </span>
              </div>
            </div>

            {/* Video Card 2 */}
            <div className="flex flex-col gap-3">
              <div className="relative border border-[#333] aspect-video w-full overflow-hidden bg-black group/yt">
                <iframe
                  id="frame-2"
                  className="w-full h-full"
                  style={{ display: "none" }}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div
                  id="thumb-2"
                  onClick={() => loadYT("ysz5S6PUM-U", "thumb-2", "frame-2")}
                  className="absolute inset-0 cursor-pointer"
                >
                  <img
                    src="https://img.youtube.com/vi/ysz5S6PUM-U/hqdefault.jpg"
                    alt="Video Thumbnail"
                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover/yt:scale-103"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    {/* Brutalist play indicator */}
                    <div className="h-12 w-12 bg-[#E8FF00] flex items-center justify-center text-black font-mono text-xs font-bold uppercase select-none">
                      PLAY
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-display font-medium text-[13px] text-white uppercase tracking-wide">
                  Mastering the Tech Presentation
                </h4>
                <span className="font-mono text-[11px] text-[#555555] uppercase mt-1 block">
                  JAN 18, 2024
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (60%): Podcast Hub */}
        <div
          className="podcast-right col-span-12 md:col-span-7 flex flex-col gap-8"
          style={{ opacity: isReduced ? 1 : 0 }}
        >
          {/* Player Box */}
          <div className="relative border-2 border-white p-6 bg-black overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-6">
              {/* Telemetry info */}
              <div className="flex items-center justify-between gap-4 border-b border-white/20 pb-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center h-10 w-10 border border-white bg-black">
                    <Headphones size={20} className="text-white" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#E8FF00]">
                      NOW PLAYING // {currentEpisode.ep}
                    </span>
                    <h3 className="font-display font-black text-base md:text-lg uppercase tracking-tight text-white mt-0.5">
                      {currentEpisode.title}
                    </h3>
                  </div>
                </div>

                {/* Equalizer Graphic */}
                <div className="flex items-end gap-1 h-8">
                  {[...Array(7)].map((_, i) => (
                    <span
                      key={i}
                      className="eq-bar w-1 bg-[#E8FF00] transition-all duration-75"
                      style={{ height: "4px" }}
                    />
                  ))}
                </div>
              </div>

              {/* Progress Slider Track */}
              <div className="flex flex-col gap-2">
                <div
                  onClick={handleProgressBarClick}
                  className="h-1.5 w-full bg-white/20 hover:bg-white/30 transition-colors cursor-pointer relative"
                >
                  <div
                    className="h-full bg-[#E8FF00]"
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  />
                </div>
                <div className="flex justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Player Controllers */}
              <div className="flex items-center justify-between mt-2 flex-wrap gap-4">
                {/* Audio Controls */}
                <div className="flex items-center gap-4">
                  {/* Brutalist play button: flat E8FF00 square containing play/pause triangle/rects */}
                  <button
                    onClick={togglePlay}
                    className="w-12 h-12 bg-[#E8FF00] text-black flex items-center justify-center cursor-pointer hover:bg-white transition-colors duration-300 rounded-none border-none outline-none select-none"
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <svg
                        viewBox="0 0 24 24"
                        className="w-5 h-5 fill-current text-black"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect x="4" y="4" width="4" height="16" />
                        <rect x="16" y="4" width="4" height="16" />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        className="w-5 h-5 fill-current text-black"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>

                  <button
                    onClick={skipBackward}
                    className="p-3 border border-white hover:bg-[#E8FF00] hover:text-black transition-colors"
                    title="-15s"
                  >
                    <RotateCcw size={12} className="scale-x-[-1]" />
                  </button>
                  <button
                    onClick={skipForward}
                    className="p-3 border border-white hover:bg-[#E8FF00] hover:text-black transition-colors"
                    title="+15s"
                  >
                    <RotateCcw size={12} />
                  </button>
                </div>

                {/* Volume Controller */}
                <div className="flex items-center gap-3">
                  <button onClick={toggleMute} className="text-white/70 hover:text-white transition-colors">
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 md:w-28 h-1 bg-white/20 accent-[#E8FF00] cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Episode List */}
          <div className="border-t-2 border-white">
            {podcastEpisodes.map((ep, index) => {
              const isActive = index === currentEpisodeIndex;
              return (
                <div
                  key={ep.ep}
                  onClick={() => {
                    setCurrentEpisodeIndex(index);
                    setIsPlaying(true);
                  }}
                  className="group relative flex items-center justify-between border-b border-white/20 py-5 px-3 cursor-pointer overflow-hidden transition-colors duration-300 hover:text-black"
                >
                  {/* Left Index */}
                  <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-[#E8FF00] group-hover:text-black transition-colors duration-300 w-16">
                    {ep.ep}
                  </span>

                  {/* Center Title */}
                  <span
                    className={`relative z-10 flex-1 font-display text-[15px] uppercase tracking-wide font-black ${
                      isActive ? "text-[#E8FF00]" : "text-white"
                    } group-hover:text-black transition-colors duration-300`}
                  >
                    {ep.title}
                  </span>

                  {/* Status Badge: COMING SOON */}
                  <span className="relative z-10 font-mono text-[8px] uppercase tracking-[0.2em] bg-[#E8FF00] text-black px-2 py-0.5 font-bold mr-6 select-none group-hover:bg-black group-hover:text-[#E8FF00] transition-colors duration-300">
                    COMING SOON
                  </span>

                  {/* Right Duration */}
                  <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 group-hover:text-black/60 transition-colors duration-300">
                    {ep.duration}
                  </span>

                  {/* Hover sliding bg */}
                  <span className="absolute inset-0 bg-[#E8FF00] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] z-0" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
