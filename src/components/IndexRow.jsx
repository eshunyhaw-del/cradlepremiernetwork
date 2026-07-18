import { Link } from "react-router-dom";

/**
 * One line of the living index. Hover/focus makes it the active row (drives
 * the shared preview frame). Video rows read "VIEW"; stills read "STILL".
 * `size` tunes the title scale for hero vs archive contexts.
 */
export default function IndexRow({
  project,
  active = false,
  dim = false,
  onActivate,
  size = "archive",
  to = "/work",
}) {
  const titleSize =
    size === "hero"
      ? "text-[clamp(1.5rem,3.4vw,3.1rem)]"
      : "text-[clamp(1.75rem,5vw,4.25rem)]";

  return (
    <Link
      to={to}
      data-cursor={project.video ? "VIEW" : "STILL"}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      className={`group grid items-center gap-x-4 border-b border-stroke/70 transition-colors duration-300
        grid-cols-[2.75rem_1fr_auto] md:grid-cols-[4.5rem_1fr_10rem_8rem_5rem]
        ${dim ? "opacity-45" : "opacity-100"} ${active ? "bg-ink/[0.02]" : ""}`}
    >
      {/* № */}
      <span className="tabular self-start py-3 font-light text-grey text-[clamp(0.9rem,1.4vw,1.1rem)] md:pt-5">
        {project.n}
      </span>

      {/* title */}
      <span className="relative flex items-center py-2.5 md:py-4">
        <span
          className={`h-1.5 w-1.5 shrink-0 bg-accent transition-all duration-300 ${
            active ? "mr-3 scale-100 opacity-100" : "mr-0 w-0 scale-0 opacity-0"
          }`}
          aria-hidden
        />
        <span
          className={`condense font-medium leading-[0.95] tracking-[-0.02em] transition-transform duration-500 ${titleSize} ${
            active ? "translate-x-1.5" : "translate-x-0"
          }`}
        >
          {project.title}
        </span>
      </span>

      {/* discipline */}
      <span className="hidden self-center border-l border-stroke/70 pl-4 font-mono text-[10px] uppercase tracking-[0.12em] text-grey md:block">
        {project.discipline}
      </span>

      {/* client */}
      <span className="hidden self-center border-l border-stroke/70 pl-4 font-mono text-[10px] uppercase tracking-[0.12em] text-grey md:block">
        {project.client}
      </span>

      {/* year + marker */}
      <span className="flex items-center justify-end gap-3 self-center py-3 pr-1 font-mono text-[10px] uppercase tracking-[0.12em] text-grey">
        <span className="tabular">{project.year}</span>
        <span
          className={`text-accent transition-transform duration-300 ${
            active ? "translate-x-0 opacity-100" : "translate-x-1 opacity-0 group-hover:opacity-60"
          }`}
          aria-hidden
        >
          →
        </span>
      </span>
    </Link>
  );
}
