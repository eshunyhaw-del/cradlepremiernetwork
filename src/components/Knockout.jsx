import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * A word whose letterforms are a window onto a muted looping showreel — the
 * reel is visible ONLY through the glyphs. Built with an SVG mask: a filled
 * band-coloured plate with the word punched out as holes, laid over the video.
 * Reduced-motion falls back to the poster still.
 */
export default function Knockout({
  word = "move",
  video,
  poster,
  bandColor = "#d4d1bb",
  className = "",
}) {
  const wrap = useRef(null);
  const vid = useRef(null);
  const [id] = useState(() => "ko-" + Math.abs(hash(word + video)).toString(36));
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const el = wrap.current;
    const v = vid.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      if (v && !reduce) {
        gsap.set(v, { scale: 1.06, opacity: 0.4 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 75%",
          once: true,
          onEnter: () => {
            v.play().catch(() => {});
            gsap.to(v, { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" });
          },
        });
      }
    }, el);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <span ref={wrap} className={`relative inline-block align-baseline ${className}`} data-cursor="REEL">
      {/* the reel */}
      {video && !reduce ? (
        <video
          ref={vid}
          src={video}
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
      )}

      {/* band-coloured plate with the word punched out */}
      <svg
        viewBox="0 0 1000 300"
        className="relative block h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        aria-label={word}
      >
        <defs>
          <mask id={id}>
            <rect width="1000" height="300" fill="white" />
            <text
              x="500"
              y="205"
              textAnchor="middle"
              fontFamily='"ABC Favorit", sans-serif'
              fontWeight="500"
              fontSize="260"
              letterSpacing="-8"
              fill="black"
            >
              {word}
            </text>
          </mask>
        </defs>
        <rect width="1000" height="300" fill={bandColor} mask={`url(#${id})`} />
      </svg>
    </span>
  );
}

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}
