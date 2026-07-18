import { RegMark } from "./Marks.jsx";

/**
 * Fixed viewport "plate": four crop marks at the corners so the whole page
 * reads like a print being proofed. Purely decorative, never intercepts input.
 */
export default function Plate() {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 hidden md:block text-ink/45" aria-hidden>
      <RegMark className="absolute left-3 top-3" />
      <RegMark className="absolute right-3 top-3" />
      <RegMark className="absolute left-3 bottom-3" />
      <RegMark className="absolute right-3 bottom-3" />
    </div>
  );
}
