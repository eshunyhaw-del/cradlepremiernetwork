import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor: an ink ring that lerps toward the pointer, with a mono
 * context label ("VIEW" over rows, "PLAY" over the frame). Fine-pointer
 * desktop only; never engaged for reduced-motion. Reads data-cursor="LABEL"
 * off the hovered element to swap its label. Runs a single rAF loop for the
 * lifetime of the component (visibility is toggled via the DOM, not state).
 */
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const wrap = useRef(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    document.documentElement.classList.add("has-cursor");
    const target = { x: innerWidth / 2, y: innerHeight / 2 };
    const pos = { ...target };
    let raf;

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      if (ring.current)
        ring.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      if (dot.current)
        dot.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    let curLabel = "";
    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (wrap.current) wrap.current.style.opacity = "1";
      const hit = e.target.closest?.("[data-cursor]");
      const next = hit ? hit.getAttribute("data-cursor") : "";
      if (next !== curLabel) {
        curLabel = next;
        setLabel(next);
      }
    };
    const onLeave = () => {
      if (wrap.current) wrap.current.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div
      ref={wrap}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] opacity-0 transition-opacity duration-200"
    >
      <div ref={dot} className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-accent" />
      <div
        ref={ring}
        className="fixed left-0 top-0 flex items-center justify-center rounded-full border border-ink transition-[width,height] duration-200"
        style={{ width: label ? 64 : 26, height: label ? 64 : 26 }}
      >
        {label && (
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
