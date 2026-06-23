import { useEffect, useState } from "react";
import logo from "../assets/JE.png";

const PILLARS = [
  "Precision Engineering",
  "Quality Fabrication",
  "Innovation & Reliability",
];

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      id="home"
      className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6 pt-32 pb-20 text-center lg:px-10"
    >
      <div
        className={`flex flex-col items-center transition-all duration-1000 ease-out ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
        }`}
      >
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
        <p className="mt-6 max-w-2xl text-slate-600 sm:text-lg"
        style={{ fontFamily: "'Paragraph', sans-serif" }}
        >
          <span className="font-bold text-2xl italic text-slate-800">Jyoti</span>
          <span className="font-bold text-2xl mr-2 italic text-amber-500"> Engineering</span> builds structural fabrication, precision machining,
          and pressure vessel solutions trusted by industrial clients across
          the region &mdash; engineered to spec, delivered on time.
        </p>

        {/* CTA */}
        <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#contact"
            className="rounded-md bg-amber-500 px-8 py-3.5 text-sm font-semibold text-slate-900 shadow-lg shadow-amber-500/20 transition-colors hover:bg-amber-400"
            style={{ fontFamily: "'Button', sans-serif" }}
          >
            Request a Quote
          </a>
          <a
            href="#services"
            className="rounded-md border border-slate-300 px-8 py-3.5 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50"
            style={{ fontFamily: "'Button', sans-serif" }}
          >
            View Our Services
          </a>
        </div>

        {/* Brand pillars */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {PILLARS.map((pillar, i) => (
            <div key={pillar} className="flex items-center gap-8">
              <span className="text-sm font-medium uppercase tracking-wider text-slate-500"
              style={{ fontFamily: "'Button', sans-serif" }}>
                {pillar}
              </span>
              {i < PILLARS.length - 1 && (
                <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />
              )}
            </div>
          ))}
        </div>
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