import logo from "../assets/JE.png";

const PILLARS = [
  "Precision Engineering",
  "Quality Fabrication",
  "Innovation & Reliability",
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6 pt-32 pb-20 text-center lg:px-10"
    >
      {/* Eyebrow */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-50 px-4 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-600">
          Badarpur, New Delhi
        </span>
      </div>

      {/* Headline */}
      <h1
        className="max-w-4xl text-4xl leading-[1.08] text-slate-900 sm:text-5xl lg:text-7xl"
        style={{ fontFamily: "'Canistel', sans-serif" }}
      >
        Engineering Strength.
        <br />
        <span className="text-blue-700">Delivering Precision.</span>
      </h1>

      {/* Supporting copy */}
      <p className="mt-6 max-w-2xl text-base text-slate-600 sm:text-lg">
        Jyoti Engineering builds structural fabrication, precision machining,
        and pressure vessel solutions trusted by industrial clients across
        the region &mdash; engineered to spec, delivered on time.
      </p>

      {/* CTA */}
      <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
        <a
          href="#contact"
          className="rounded-md bg-amber-500 px-8 py-3.5 text-sm font-semibold text-slate-900 shadow-lg shadow-amber-500/20 transition-colors hover:bg-amber-400"
        >
          Request a Quote
        </a>
        <a
          href="#services"
          className="rounded-md border border-slate-300 px-8 py-3.5 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50"
        >
          View Our Services
        </a>
      </div>

      {/* Brand pillars */}
      <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {PILLARS.map((pillar, i) => (
          <div key={pillar} className="flex items-center gap-8">
            <span className="text-sm font-medium uppercase tracking-wider text-slate-500">
              {pillar}
            </span>
            {i < PILLARS.length - 1 && (
              <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />
            )}
          </div>
        ))}
      </div>

      {/* Watermark logo, subtle industrial backdrop element */}
      <img
        src={logo}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/2 hidden w-[420px] -translate-y-1/2 opacity-[0.05] lg:block"
      />
    </section>
  );
}