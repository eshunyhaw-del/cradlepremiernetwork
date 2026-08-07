import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IndexRow from "../components/IndexRow.jsx";
import PreviewFrame from "../components/PreviewFrame.jsx";
import Knockout from "../components/Knockout.jsx";
import useMagnetic from "../lib/useMagnetic.js";
import {
  heroRows,
  byCategory,
  CATEGORIES,
  INDUSTRIES,
  liveCount,
  manifestoClip,
} from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

const prefersReduce = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ── Column header (shared) ─────────────────────────────── */
function ColHead() {
  return (
    <div className="hero-cols">
      <div className="grid grid-cols-[2.75rem_1fr_auto] gap-x-4 pb-2 md:grid-cols-[4.5rem_1fr_10rem_8rem_5rem]">
        <span className="col-head-label font-mono text-[10px] uppercase tracking-[0.12em] text-grey">№</span>
        <span className="col-head-label font-mono text-[10px] uppercase tracking-[0.12em] text-grey">Industry</span>
        <span className="col-head-label hidden font-mono text-[10px] uppercase tracking-[0.12em] text-grey md:block">Build</span>
        <span className="col-head-label hidden font-mono text-[10px] uppercase tracking-[0.12em] text-grey md:block">Featured</span>
        <span className="col-head-label hidden justify-self-end font-mono text-[10px] uppercase tracking-[0.12em] text-grey md:block">Count</span>
      </div>
      <div className="col-head h-px w-full origin-left bg-ink" />
    </div>
  );
}

/* ── Hero — The Index ───────────────────────────────────── */
function Hero() {
  const rows = useMemo(() => heroRows, []);
  const root = useRef(null);
  const rowsWrap = useRef(null);
  const rowEls = useRef([]);
  const playhead = useRef(null);
  const [hoverIdx, setHoverIdx] = useState(null);
  const [autoIdx, setAutoIdx] = useState(0);
  const activeIdx = hoverIdx ?? autoIdx;
  const active = rows[activeIdx];

  // idle auto-advance — paused while hovering, and while the hero is off-screen
  // or the tab is hidden (so it never churns video decode in the background)
  useEffect(() => {
    if (hoverIdx !== null || prefersReduce()) return;
    let inView = true;
    const el = root.current;
    const io = el
      ? new IntersectionObserver(([e]) => (inView = e.isIntersecting), { threshold: 0.05 })
      : null;
    if (el) io.observe(el);
    const id = setInterval(() => {
      if (!inView || document.hidden) return;
      setAutoIdx((i) => (i + 1) % rows.length);
    }, 3000);
    return () => {
      clearInterval(id);
      io?.disconnect();
    };
  }, [hoverIdx, rows.length]);

  // red playhead follows the active row
  useEffect(() => {
    const el = rowEls.current[activeIdx];
    const bar = playhead.current;
    if (!el || !bar) return;
    gsap.to(bar, {
      y: el.offsetTop,
      height: el.offsetHeight,
      duration: 0.4,
      ease: "power3.out",
    });
  }, [activeIdx]);

  // load choreography — explicit set+to (never captures a mid-anim value) and
  // resilient to StrictMode double-invoke / slow fonts, so nothing can be left
  // stuck invisible. Reduced-motion keeps the CSS-default (fully visible) state.
  useEffect(() => {
    if (prefersReduce()) return;
    let cancelled = false;
    const ctx = gsap.context(() => {
      gsap.set(".hero-line", { yPercent: 115 });
      gsap.set([".hero-eyebrow", ".hero-sub", ".hero-cta", ".hero-frame"], { opacity: 0, y: 12 });
      gsap.set(".col-head", { scaleX: 0, transformOrigin: "left" });
      gsap.set(".col-head-label", { opacity: 0 });
      gsap.set(rowEls.current, { opacity: 0, y: 26 });
      gsap.set(playhead.current, { opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, paused: true });
      tl.to(".hero-eyebrow", { opacity: 1, y: 0, duration: 0.5 })
        .to(".hero-line", { yPercent: 0, duration: 1, stagger: 0.09 }, "-=0.2")
        .to(".hero-sub", { opacity: 1, y: 0, duration: 0.6 }, "-=0.5")
        .to(".hero-cta", { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, "-=0.4")
        .to(".col-head", { scaleX: 1, duration: 0.7 }, "-=0.5")
        .to(".col-head-label", { opacity: 1, duration: 0.4, stagger: 0.04 }, "-=0.5")
        .to(rowEls.current, { opacity: 1, y: 0, duration: 0.7, stagger: 0.07 }, "-=0.35")
        .to(".hero-frame", { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .to(playhead.current, { opacity: 1, duration: 0.4 }, "-=0.3");

      let started = false;
      const kick = () => {
        if (started || cancelled) return;
        started = true;
        tl.play();
      };
      document.fonts?.ready?.then(kick);
      const t = setTimeout(kick, 600); // never leave the hero blank if fonts stall
      return () => clearTimeout(t);
    }, root);
    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      className="mx-auto flex max-w-[1520px] flex-col justify-center px-6 py-10 md:min-h-[calc(100svh-3.5rem)] md:px-12"
    >
      {/* running head */}
      <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_minmax(300px,34%)] lg:items-end lg:gap-12">
        <div>
          <p className="hero-eyebrow mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-grey">
            Cradle® — Edition 2026 · Indexed &amp; in motion
          </p>
          <h1 className="font-light leading-[0.98] tracking-[-0.01em] text-[clamp(1.75rem,3.4vw,3rem)]">
            <span className="line-clip"><span className="hero-line block">Built for every</span></span>
            <span className="line-clip"><span className="hero-line block">industry, in motion.</span></span>
          </h1>
        </div>
        <div>
          <p className="hero-sub max-w-sm text-[15px] leading-snug text-ink-soft">
            Real builds, recorded live. Hover on desktop or tap on mobile to watch one move — then open it and use the real thing. {liveCount} sites shipped across {INDUSTRIES.length} sectors.
          </p>
          <div className="hero-cta mt-4 flex flex-wrap gap-3">
            <a href="#index" className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink underline decoration-accent decoration-2 underline-offset-4">
              Explore industries ↓
            </a>
          </div>
        </div>
      </div>

      <div id="index" className="grid gap-8 lg:grid-cols-[1fr_minmax(300px,34%)] lg:gap-12 lg:items-start">
        {/* left — the index */}
        <div>
          <ColHead />
          {/* mobile frame */}
          <div className="my-6 lg:hidden">
            <PreviewFrame project={active} className="mx-auto max-w-[440px]" />
          </div>
          <div ref={rowsWrap} className="relative" onMouseLeave={() => setHoverIdx(null)}>
            <div
              ref={playhead}
              className="hero-playhead pointer-events-none absolute left-[-6px] top-0 z-10 w-[3px] bg-accent"
              style={{ height: 0 }}
              aria-hidden
            />
            {rows.map((p, i) => (
              <div key={p.id} ref={(el) => (rowEls.current[i] = el)}>
                <IndexRow
                  project={p}
                  size="hero"
                  to={`/work?industry=${encodeURIComponent(p.title)}`}
                  active={i === activeIdx}
                  dim={hoverIdx !== null && i !== hoverIdx}
                  onActivate={() => setHoverIdx(i)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* right — pinned frame */}
        <aside className="hero-frame hidden lg:block">
          <div className="sticky top-20">
            <PreviewFrame project={active} />
          </div>
        </aside>
      </div>
    </section>
  );
}

/* ── Industries ─────────────────────────────────────────── */
function Industries() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReduce()) return;
      gsap.from(".ind-rule", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });
      ScrollTrigger.batch(".ind-row", {
        start: "top 94%",
        onEnter: (els) =>
          gsap.from(els, { opacity: 0, y: 18, duration: 0.6, stagger: 0.03, ease: "power3.out", overwrite: true }),
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const half = Math.ceil(INDUSTRIES.length / 2);
  const columns = [INDUSTRIES.slice(0, half), INDUSTRIES.slice(half)];

  return (
    <section ref={root} className="mx-auto max-w-[1520px] px-6 py-10 md:px-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-t border-ink pt-4">
        <div>
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-grey">§01 — Industries We've Designed For</p>
          <h2 className="condense font-medium leading-[0.9] tracking-[-0.02em] text-[clamp(2.25rem,6vw,5rem)]">
            The index, in brief
          </h2>
        </div>
        <Link to="/contact" className="group font-mono text-[11px] uppercase tracking-[0.14em] text-ink">
          Start a project
          <span className="ml-2 inline-block text-accent transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>

      <div className="ind-rule h-px w-full origin-left bg-ink/70" />
      <div className="grid md:grid-cols-2 md:gap-x-16">
        {columns.map((col, ci) => (
          <ul key={ci}>
            {col.map((name, i) => {
              const n = String(ci * half + i + 1).padStart(2, "0");
              return (
                <li key={name} className="ind-row border-b border-stroke/70">
                  <Link
                    to={`/work?industry=${encodeURIComponent(name)}`}
                    data-cursor="VIEW"
                    className="group flex items-center gap-5 py-5 md:py-6"
                  >
                    <span className="tabular font-mono text-[11px] uppercase tracking-[0.12em] text-grey">
                      {n}
                    </span>
                    <span className="condense font-medium tracking-[-0.01em] text-[clamp(1.75rem,3.4vw,3rem)] transition-transform duration-300 group-hover:translate-x-1.5">
                      {name}
                    </span>
                    <span
                      className="ml-auto text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      aria-hidden
                    >
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </section>
  );
}

/* ── Manifesto band — video-knockout "move" ─────────────── */
function Manifesto() {
  return (
    <section className="my-8 bg-sand py-24 md:py-36">
      <div className="mx-auto max-w-[1520px] px-6 md:px-12">
        <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.14em] text-grey">Manifesto</p>
        <h2
          className="font-medium leading-[0.9] tracking-[-0.02em]"
          style={{ fontSize: "clamp(2.75rem, 9vw, 9rem)" }}
        >
          <span className="block">We build things</span>
          <span className="flex items-end">
            that&nbsp;
            <Knockout
              word="move"
              video={manifestoClip.video}
              poster={manifestoClip.poster}
              bandColor="#d4d1bb"
              className="h-[0.8em] w-[2.65em]"
            />
            <span aria-hidden>.</span>
          </span>
        </h2>
        <p className="mt-10 max-w-md text-[15px] leading-relaxed text-ink-soft">
          Websites, case studies, and applications, designed, built, and launched with motion treated as a fundamental design material, not an afterthought.
        </p>
      </div>
    </section>
  );
}

/* ── The Legend — what we do ────────────────────────────── */
function Legend() {
  const items = Object.keys(CATEGORIES).map((key, i) => ({
    n: String(i + 1).padStart(2, "0"),
    key,
    label: CATEGORIES[key],
    def:
      key === "site"
        ? "Brand, studio and marketing sites — from a single landing page to a full multi-market platform."
        : key === "storefront"
        ? "Commerce builds where the catalogue, the checkout and the story all have to carry their weight."
        : "The Squarespace starting points we build fast on when a launch date is closer than a blank page.",
    count: byCategory(key).length,
  }));

  return (
    <section className="mx-auto max-w-[1520px] px-6 py-10 md:px-12">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-t border-ink pt-4">
        <div>
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-grey">§02 — The legend</p>
          <h2 className="condense font-medium leading-[0.9] tracking-[-0.02em] text-[clamp(2.25rem,6vw,5rem)]">
            Three disciplines
          </h2>
        </div>
        <Link to="/work" className="group font-mono text-[11px] uppercase tracking-[0.14em] text-ink">
          See our work
          <span className="ml-2 inline-block text-accent transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
      <div className="divide-y divide-stroke border-y border-stroke">
        {items.map(({ key, ...it }) => (
          <LegendRow key={key} {...it} />
        ))}
      </div>
    </section>
  );
}

function LegendRow({ n, label, def, count }) {
  const numRef = useMagnetic({ radius: 70, strength: 0.25 });
  return (
    <div className="group grid grid-cols-1 items-center gap-4 py-8 md:grid-cols-[7rem_1fr_1fr_auto] md:py-12">
      <span
        ref={numRef}
        data-magnetic
        className="tabular select-none text-[clamp(3rem,7vw,6rem)] font-light leading-none text-transparent transition-colors duration-500 group-hover:text-ink"
        style={{ WebkitTextStroke: "1px #bbbcb1" }}
      >
        {n}
      </span>
      <h3 className="condense text-[clamp(1.75rem,4vw,3.25rem)] font-medium tracking-[-0.02em]">
        {label}
      </h3>
      <p className="max-w-sm text-[14px] leading-snug text-ink-soft">{def}</p>
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-grey">
        {count} projects
      </span>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Industries />
      <Manifesto />
      <Legend />
    </>
  );
}
