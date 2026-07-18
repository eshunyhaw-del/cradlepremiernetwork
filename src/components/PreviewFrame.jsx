import { useEffect, useRef, useState } from "react";
import { CornerMarks } from "./Marks.jsx";

/**
 * The matted editorial preview window. Shows the active project's still,
 * and when that project is "in motion" swaps to its muted looping clip via a
 * hard clip-path wipe. Exactly one video is ever mounted here, so playback is
 * naturally capped to one at a time.
 */
export default function PreviewFrame({ project, className = "" }) {
  const figRef = useRef(null);
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    setPlaying(false);
    const v = videoRef.current;
    if (v && project?.video && !reduce) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  }, [project?.id, project?.video, reduce]);

  // pause decode while the frame is off-screen (smoother scrolling); resume in view
  useEffect(() => {
    const fig = figRef.current;
    if (!fig || reduce) return;
    const io = new IntersectionObserver(
      ([e]) => {
        const v = videoRef.current;
        if (!v || !project?.video) return;
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.01 }
    );
    io.observe(fig);
    return () => io.disconnect();
  }, [project?.id, project?.video, reduce]);

  if (!project) return null;

  return (
    <figure ref={figRef} className={`relative ${className}`} data-cursor={project.video ? "PLAY" : "STILL"}>
      {/* mat + frame */}
      <div className="relative bg-beige-alt p-2.5 md:p-3 matte-shadow">
        <div className="relative aspect-[3/4] overflow-hidden bg-sand-dark ring-1 ring-ink/80">
          {/* poster still */}
          <img
            src={project.image}
            alt={project.title}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              playing ? "opacity-0" : "opacity-100"
            }`}
          />
          {/* motion */}
          {project.video && !reduce && (
            <video
              key={project.id}
              ref={videoRef}
              src={project.video}
              muted
              loop
              playsInline
              preload="metadata"
              poster={project.image}
              onPlaying={() => setPlaying(true)}
              className={`wipe-in absolute inset-0 h-full w-full object-cover ${
                playing ? "opacity-100" : "opacity-0"
              }`}
            />
          )}

          {/* live badge */}
          {project.video && (
            <span className="absolute left-2 top-2 z-10 flex items-center gap-1.5 bg-ink/80 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-beige">
              <span className="h-1.5 w-1.5 rounded-full bg-accent blink" /> Live
            </span>
          )}
        </div>
        <CornerMarks size={9} inset={3} className="text-ink/50" />
      </div>

      {/* caption strip */}
      <figcaption className="mt-3 flex items-center justify-between border-t border-stroke pt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-grey">
        <span>
          {project.video ? "Now previewing" : "Still"} — {project.n}
        </span>
        <span className="truncate pl-3 text-ink">{project.title}</span>
      </figcaption>
    </figure>
  );
}
