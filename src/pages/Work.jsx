import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IndexRow from "../components/IndexRow.jsx";
import PreviewFrame from "../components/PreviewFrame.jsx";
import { catalog, INDUSTRIES, byIndustry, inMotionCount } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

const filters = [{ key: "all", label: "All" }, ...INDUSTRIES.map((name) => ({ key: name, label: name }))];

const prefersReduce = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Work() {
  const [searchParams, setSearchParams] = useSearchParams();
  const industryParam = searchParams.get("industry");
  const [active, setActive] = useState(industryParam || "all");
  const [hoverId, setHoverId] = useState(null);
  const [scrollId, setScrollId] = useState(null);
  const rowRefs = useRef({});
  const root = useRef(null);

  // keep the active filter in sync with the URL (deep-links from Home)
  useEffect(() => {
    setActive(industryParam || "all");
  }, [industryParam]);

  const select = (key) => {
    setActive(key);
    setSearchParams(key === "all" ? {} : { industry: key }, { replace: true });
  };

  const list = useMemo(() => {
    const filtered = active === "all" ? catalog : byIndustry(active);
    return filtered.map((p, i) => ({ ...p, n: String(i + 1).padStart(2, "0") }));
  }, [active]);

  const activeId = hoverId ?? scrollId ?? list[0]?.id;
  const activeProject = list.find((p) => p.id === activeId) ?? list[0];

  // reveal + center-crossing, re-run on filter change
  useEffect(() => {
    rowRefs.current = {};
    setScrollId(null);
    const ctx = gsap.context(() => {
      if (!prefersReduce()) {
        ScrollTrigger.batch(".work-row", {
          start: "top 92%",
          onEnter: (els) =>
            gsap.from(els, { opacity: 0, y: 22, duration: 0.6, stagger: 0.04, ease: "power3.out", overwrite: true }),
        });
      }
      requestAnimationFrame(() => {
        Object.entries(rowRefs.current).forEach(([id, el]) => {
          if (!el) return;
          ScrollTrigger.create({
            trigger: el,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (self) => self.isActive && setScrollId(id),
          });
        });
        ScrollTrigger.refresh();
      });
    }, root);
    return () => ctx.revert();
  }, [active]);

  const activeLabel = active === "all" ? "All industries" : active;

  return (
    <section ref={root} className="mx-auto max-w-[1520px] px-6 pt-10 md:px-12">
      {/* head */}
      <div className="mb-8 border-b border-ink pb-6">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-grey">
          §01 — By industry · {activeLabel} · {list.length} {list.length === 1 ? "project" : "projects"}
        </p>
        <h1 className="condense font-medium leading-[0.88] tracking-[-0.02em] text-[clamp(3rem,11vw,9rem)]">
          Work
        </h1>
      </div>

      {/* industry filter chips */}
      <div className="mb-8 flex flex-wrap items-center gap-2">
        {filters.map((f) => {
          const on = active === f.key;
          const n = f.key === "all" ? catalog.length : byIndustry(f.key).length;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => select(f.key)}
              className={`flex items-center gap-2 border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${
                on ? "border-ink bg-ink text-beige" : "border-stroke text-grey hover:border-ink hover:text-ink"
              }`}
            >
              {f.label}
              <span className={on ? "text-beige/60" : "text-grey/60"}>{String(n).padStart(2, "0")}</span>
            </button>
          );
        })}
      </div>

      {/* index + sticky frame */}
      <div className="grid gap-10 lg:grid-cols-[1fr_minmax(280px,30%)] lg:gap-12">
        <div key={active} onMouseLeave={() => setHoverId(null)}>
          {/* column header */}
          <div className="grid grid-cols-[2.75rem_1fr_auto] gap-x-4 border-b border-ink pb-2 md:grid-cols-[4.5rem_1fr_10rem_8rem_5rem]">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-grey">№</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-grey">Project</span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.12em] text-grey md:block">Discipline</span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.12em] text-grey md:block">Client</span>
            <span className="hidden justify-self-end font-mono text-[10px] uppercase tracking-[0.12em] text-grey md:block">Year</span>
          </div>
          {list.map((p) => (
            <div key={p.id} className="work-row" ref={(el) => (rowRefs.current[p.id] = el)}>
              <IndexRow
                project={p}
                active={p.id === activeId}
                dim={hoverId !== null && p.id !== hoverId}
                onActivate={() => setHoverId(p.id)}
              />
            </div>
          ))}
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-20">
            <PreviewFrame project={activeProject} />
            <p className="mt-4 max-w-xs font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-grey">
              Hover a line — or scroll — to preview it here. {String(inMotionCount).padStart(2, "0")} of {catalog.length}
              &nbsp;entries are live in motion; the rest show stills.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
