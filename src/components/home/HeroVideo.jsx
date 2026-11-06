import { useEffect, useRef, useState } from "react";

const videoSrc = import.meta.env.VITE_HERO_VIDEO_URL;

export default function HeroVideo() {
  const video = useRef(null);
  const [allowed, setAllowed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAllowed(!preference.matches && !navigator.connection?.saveData);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  if (!videoSrc || !allowed || failed) return null;
  return (
    <>
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <video ref={video} src={videoSrc} autoPlay muted loop playsInline preload="metadata"
          onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)}
          className="h-full w-full object-cover opacity-25 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#050505]" />
      </div>
      <button type="button" onClick={() => {
        if (playing) video.current?.pause();
        else video.current?.play().catch(() => setPlaying(false));
      }} className="absolute bottom-4 right-5 z-20 rounded-full border border-white/20 bg-black/70 px-4 py-2 text-xs text-zinc-300 focus-visible:outline-2 focus-visible:outline-red-400">
        {playing ? "Pause background video" : "Play background video"}
      </button>
    </>
  );
}
