/** Small printer's registration/crop mark — a plus sign in a hairline. */
export function RegMark({ className = "" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" className={className} aria-hidden>
      <path d="M7 0v14M0 7h14" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/** Four L-shaped crop marks placed at a box's corners (absolute parent). */
export function CornerMarks({ size = 10, inset = -1, className = "text-ink/60" }) {
  const s = size;
  const common = "absolute";
  const stroke = { stroke: "currentColor", strokeWidth: 1, fill: "none" };
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      <svg className={common} style={{ top: inset, left: inset }} width={s} height={s}>
        <path d={`M0 0 H${s} M0 0 V${s}`} {...stroke} />
      </svg>
      <svg className={common} style={{ top: inset, right: inset }} width={s} height={s}>
        <path d={`M${s} 0 H0 M${s} 0 V${s}`} {...stroke} />
      </svg>
      <svg className={common} style={{ bottom: inset, left: inset }} width={s} height={s}>
        <path d={`M0 ${s} H${s} M0 ${s} V0`} {...stroke} />
      </svg>
      <svg className={common} style={{ bottom: inset, right: inset }} width={s} height={s}>
        <path d={`M${s} ${s} H0 M${s} ${s} V0`} {...stroke} />
      </svg>
    </div>
  );
}
