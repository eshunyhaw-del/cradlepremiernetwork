import { useEffect, useState } from "react";
import { Outlet, NavLink, Link, useLocation } from "react-router-dom";
import Plate from "./components/Plate.jsx";
import Cursor from "./components/Cursor.jsx";
import useMagnetic from "./lib/useMagnetic.js";
import { inMotionCount } from "./data/projects";

const nav = [
  { to: "/", label: "Index", end: true },
  { to: "/work", label: "Work", end: false },
  { to: "/contact", label: "Contact", end: false },
];

function MagNavLink({ to, label, end }) {
  const ref = useMagnetic({ radius: 60, strength: 0.35 });
  return (
    <NavLink to={to} end={end} data-magnetic className="relative">
      {({ isActive }) => (
        <span
          ref={ref}
          className="group relative inline-flex items-center gap-1 px-0.5 py-1"
        >
          {isActive && <span className="h-1 w-1 bg-accent" aria-hidden />}
          <span
            className={`font-mono text-[11px] uppercase tracking-[0.14em] ${isActive ? "text-ink" : "text-grey"}`}
          >
            {label}
          </span>
          {/* red underline-wipe */}
          <span className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
        </span>
      )}
    </NavLink>
  );
}

function Ticker({ faded }) {
  const [t, setT] = useState("--:--:--");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const p = (n) => String(n).padStart(2, "0");
      setT(
        `${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())}`,
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span
      className={`hidden font-mono text-[11px] uppercase tracking-[0.12em] text-grey transition-opacity duration-300 lg:inline ${
        faded ? "opacity-0" : "opacity-100"
      }`}
    >
      GMT {t} <span className="text-stroke">·</span> Accra{" "}
      <span className="text-stroke">·</span>{" "}
      <span className="text-ink">
        {String(inMotionCount).padStart(2, "0")} in motion
      </span>
    </span>
  );
}

function Masthead() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-beige/95">
      <div className="mx-auto flex h-14 max-w-[1520px] items-center justify-between px-6 md:px-12">
        <Link
          to="/"
          className="font-bold tracking-tight text-ink"
          data-cursor="HOME"
        >
          Cradle<span className="align-super text-[0.6em] text-grey">®</span>
        </Link>
        <div className="flex items-center gap-6 md:gap-9">
          <Ticker faded={scrolled} />
          <nav className="flex items-center gap-5 md:gap-7">
            {nav.map((n) => (
              <MagNavLink key={n.to} {...n} />
            ))}
          </nav>
        </div>
      </div>
      <div className="h-px w-full bg-stroke" />
    </header>
  );
}

function Colophon() {
  const ctaRef = useMagnetic({ radius: 90, strength: 0.4 });
  return (
    <footer className="relative mt-28 border-t border-stroke">
      {/* contact as the final index entry */}
      <div className="mx-auto max-w-[1520px] px-6 md:px-12">
        <Link
          to="/contact"
          data-cursor="OPEN"
          className="group grid grid-cols-[2.75rem_1fr_auto] items-center gap-x-4 border-b border-stroke/70 py-10 md:grid-cols-[4.5rem_1fr_auto] md:py-16"
        >
          <span className="tabular self-start font-light text-grey">00</span>
          <span className="condense font-medium leading-[0.95] tracking-[-0.02em] text-[clamp(2rem,7vw,6rem)] transition-transform duration-500 group-hover:translate-x-2">
            Let's build something
          </span>
          <span
            ref={ctaRef}
            data-magnetic
            className="hidden items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink md:flex"
          >
            Start a project <span className="text-accent text-lg">→</span>
          </span>
        </Link>
      </div>

      {/* colophon strip */}
      <div className="mx-auto max-w-[1520px] px-6 py-10 md:px-12">
        <div className="grid gap-8 font-mono text-[10px] uppercase tracking-[0.12em] text-grey md:grid-cols-3">
          <div>
            <p className="mb-2 text-ink">Cradle®</p>
            <p>Design & Development</p>
            <p>Edition 2026</p>
          </div>
          <div>
            <p className="mb-2 text-ink">Index</p>
            <ul className="space-y-1">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="hover:text-ink">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 text-ink">Elsewhere</p>
            <ul className="space-y-1">
              <li>
                <a
                  href="https://www.instagram.com/cradlepremiernetwork/"
                  className="hover:text-ink"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@cradlepremiernetwork"
                  className="hover:text-ink"
                >
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/cradlepremiernetwork

"
                  className="hover:text-ink"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@Cradlepremiernet"
                  className="hover:text-ink"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-between border-t border-stroke/70 pt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-grey">
          <span>© {new Date().getFullYear()} Cradle — All rights reserved</span>
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <div className="relative flex min-h-screen flex-col">
      <Plate />
      <Cursor />
      <Masthead />
      <main className="flex-1">
        <Outlet />
      </main>
      <Colophon />
    </div>
  );
}
