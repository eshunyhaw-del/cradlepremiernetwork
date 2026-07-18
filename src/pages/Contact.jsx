import { useState } from "react";
import useMagnetic from "../lib/useMagnetic.js";

const budgets = ["₵3–5K", "₵5–15K", "₵15–40K", "₵40K +"];
const services = ["Website", "Web App", "Mobile App", "Branding", "Case Study"];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [waUrl, setWaUrl] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "Website",
    budget: budgets[1],
    message: "",
  });
  const ctaRef = useMagnetic({ radius: 90, strength: 0.4 });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  // On send, hand off to WhatsApp with the brief pre-filled — the visitor taps
  // send in WhatsApp to reach Cradle directly.
  const WHATSAPP = "233559614253";
  const buildWaUrl = (f) => {
    const lines = [
      "Hi Cradle — I'd like to start a project.",
      "",
      `Name: ${f.name}`,
      `Email: ${f.email}`,
      `Discipline: ${f.service}`,
      `Budget: ${f.budget}`,
      "",
      f.message,
    ];
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const url = buildWaUrl(form);
    setWaUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const fieldRow =
    "grid grid-cols-[2.5rem_1fr] items-baseline gap-3 border-b border-stroke py-4 focus-within:border-ink transition-colors";
  const num =
    "tabular font-mono text-[11px] uppercase tracking-[0.12em] text-grey";
  const input =
    "w-full bg-transparent text-lg outline-none placeholder:text-grey/50";

  return (
    <section className="mx-auto max-w-[1520px] px-6 pt-10 md:px-12">
      {/* head as index entry */}
      <div className="mb-12 border-b border-ink pb-6">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-grey">
          §00 — Order form · Start a project
        </p>
        <h1 className="condense font-medium leading-[0.88] tracking-[-0.02em] text-[clamp(3rem,11vw,9rem)]">
          Contact
        </h1>
      </div>

      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        {/* left — details */}
        <div className="space-y-10">
          <p className="max-w-sm text-[15px] leading-relaxed text-ink-soft">
            Tell us what you're building. We reply within a day — or reach us
            directly on WhatsApp.
          </p>
          {[
            {
              k: "Email",
              v: "cradlepremiernetwork@gmail.com",
              href: "mailto:cradlepremiernetwork@gmail.com",
            },
            { k: "Location", v: "Accra · Remote worldwide" },
          ].map((d) => (
            <div key={d.k} className="border-t border-stroke pt-3">
              <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-grey">
                {d.k}
              </p>
              {d.href ? (
                <a
                  href={d.href}
                  className="text-xl hover:text-accent"
                  data-cursor="MAIL"
                >
                  {d.v}
                </a>
              ) : (
                <p className="text-xl">{d.v}</p>
              )}
            </div>
          ))}
          <div className="flex gap-5 font-mono text-[11px] uppercase tracking-[0.14em] text-grey">
            <a
              href="https://www.instagram.com/cradlepremiernetwork/"
              className="hover:text-ink"
            >
              Instagram
            </a>
            <a
              href="https://www.youtube.com/@Cradlepremiernet"
              className="hover:text-ink"
            >
              YouTube
            </a>
            <a
              href="https://www.tiktok.com/@cradlepremiernetwork"
              className="hover:text-ink"
            >
              TikTok
            </a>
            <a
              href="https://www.linkedin.com/company/cradlepremiernetwork

"
              className="hover:text-ink"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* right — the form */}
        <div>
          {sent ? (
            <div className="border-t border-ink py-20 text-center">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center bg-ink text-2xl text-beige">
                ✓
              </div>
              <h2 className="condense text-4xl font-medium tracking-[-0.02em]">
                Opening WhatsApp…
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-ink-soft">
                Thanks {form.name || "there"} finish sending your message to
                us on WhatsApp. If it didn't open,{" "}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink underline decoration-accent decoration-2 underline-offset-4"
                >
                  tap here
                </a>
                .
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-grey hover:text-accent"
              >
                Start over →
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <div className={fieldRow}>
                <span className={num}>01</span>
                <label className="block">
                  <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-grey">
                    Your name
                  </span>
                  <input
                    required
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Jane Doe"
                    className={input}
                  />
                </label>
              </div>
              <div className={fieldRow}>
                <span className={num}>02</span>
                <label className="block">
                  <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-grey">
                    Email
                  </span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="jane@company.com"
                    className={input}
                  />
                </label>
              </div>

              <div className="grid grid-cols-[2.5rem_1fr] items-baseline gap-3 border-b border-stroke py-5">
                <span className={num}>03</span>
                <div>
                  <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.14em] text-grey">
                    Discipline
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {services.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, service: s }))}
                        className={`border px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${
                          form.service === s
                            ? "border-ink bg-ink text-beige"
                            : "border-stroke text-grey hover:border-ink hover:text-ink"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-[2.5rem_1fr] items-baseline gap-3 border-b border-stroke py-5">
                <span className={num}>04</span>
                <div>
                  <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.14em] text-grey">
                    Budget
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {budgets.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, budget: b }))}
                        className={`border px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${
                          form.budget === b
                            ? "border-ink bg-ink text-beige"
                            : "border-stroke text-grey hover:border-ink hover:text-ink"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-[2.5rem_1fr] items-baseline gap-3 border-b border-stroke py-4 focus-within:border-ink">
                <span className={num}>05</span>
                <label className="block">
                  <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-grey">
                    Brief
                  </span>
                  <textarea
                    required
                    rows={3}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="A few lines about your project, goals and timeline…"
                    className={`${input} resize-none`}
                  />
                </label>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-grey">
                  Edition 2026 · Cradle®
                </span>
                <button
                  ref={ctaRef}
                  data-magnetic
                  type="submit"
                  className="flex items-center gap-3 bg-ink px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.14em] text-beige transition-colors hover:bg-ink-soft"
                >
                  Send <span className="text-accent text-base">→</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
