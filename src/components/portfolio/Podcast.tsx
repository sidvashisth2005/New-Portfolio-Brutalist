import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SliceHeading } from "./SliceHeading";
import { Headphones, Volume2, VolumeX, Rewind, Play, Pause, FastForward } from "lucide-react";

const EASE = [0.85, 0, 0.15, 1] as const;

export function Podcast() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedData = () => {
      setDuration(audio.duration || 0);
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const onEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", onLoadedData);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedData);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch((err) => {
        console.log("Audio play failed, likely missing asset:", err);
      });
      setIsPlaying(true);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const value = parseFloat(e.target.value);
    const newTime = (value / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const skipForward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(currentTime + 10, duration);
  };

  const skipBackward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(currentTime - 10, 0);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const pad = (num: number) => (num < 10 ? `0${num}` : `${num}`);
    return `${pad(minutes)}:${pad(seconds)}`;
  };

  return (
    <section id="podcast" className="relative px-5 py-32 border-t-2 border-white bg-black">
      <SliceHeading index="(04)" label="PODCAST">
        AUDIO <span className="text-outline">JOURNEY</span>
      </SliceHeading>

      <div className="max-w-2xl mx-auto border-2 border-white p-6 md:p-8 bg-black relative z-10 overflow-hidden">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-6 md:gap-8">
          {/* Header Section: Title, Subtitle, Visualizer */}
          <div className="flex items-center justify-between gap-4 border-b border-white/20 pb-6">
            <div className="flex items-center gap-4">
              <div className="relative flex items-center justify-center h-12 w-12 border border-white bg-black">
                <Headphones size={24} className="text-white" />
                {isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="absolute h-full w-full border border-[#ffff00] animate-ping opacity-75" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-display font-black text-lg md:text-xl uppercase tracking-tight">
                  Siddhant Vashisth Audio
                </h3>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                  Introduction & Journey
                </p>
              </div>
            </div>

            {/* Sound Wave Visualizer */}
            <div className="flex items-end gap-1 h-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <motion.span
                  key={i}
                  animate={
                    isPlaying
                      ? { height: [4, 16, 4], transition: { repeat: Infinity, duration: 0.6 + i * 0.1 } }
                      : { height: 4 }
                  }
                  className="w-1 bg-[#ffff00]"
                />
              ))}
            </div>
          </div>

          <audio ref={audioRef} src="/audio/podcast.mp3" preload="metadata" />

          {/* Controls: Progress and Playback Buttons */}
          <div className="flex flex-col gap-4">
            {/* Progress Slider */}
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
              <span className="tabular-nums">{formatTime(currentTime)}</span>
              <input
                type="range"
                className="w-full h-1 bg-white/20 accent-[#ffff00] cursor-pointer"
                min="0"
                max="100"
                value={duration ? (currentTime / duration) * 100 : 0}
                onChange={handleSliderChange}
              />
              <span className="tabular-nums">{formatTime(duration)}</span>
            </div>

            {/* Main Control Buttons */}
            <div className="flex items-center justify-between mt-2">
              <button
                onClick={toggleMute}
                className="p-2 border border-white hover:bg-[#ffff00] hover:text-black transition-colors"
                aria-label="Mute/Unmute"
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

              <div className="flex items-center gap-4">
                <button
                  onClick={skipBackward}
                  className="p-2 border border-white hover:bg-[#ffff00] hover:text-black transition-colors"
                  aria-label="Rewind 10s"
                >
                  <Rewind size={18} />
                </button>

                <button
                  onClick={togglePlay}
                  className="p-4 border-2 border-white bg-[#ffff00] text-black hover:bg-black hover:text-[#ffff00] transition-colors duration-300"
                  aria-label="Play/Pause"
                >
                  {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}
                </button>

                <button
                  onClick={skipForward}
                  className="p-2 border border-white hover:bg-[#ffff00] hover:text-black transition-colors"
                  aria-label="Forward 10s"
                >
                  <FastForward size={18} />
                </button>
              </div>

              <div className="w-10 h-10" /> {/* Spacer to balance layout */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
