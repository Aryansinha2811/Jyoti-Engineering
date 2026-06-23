import { useEffect, useState } from "react";
import logo from "../assets/JE.png";

const NAV_LINKS = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Why Choose Us", href: "#why-choose-us" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${isScrolled
                    ? "bg-white/90 backdrop-blur-md shadow-md shadow-slate-900/5"
                    : "bg-transparent"
                }`}
        >
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
                {/* Logo */}
                <a href="#home" className="flex items-center gap-3 shrink-0">
                    <img
                        src={logo}
                        alt="Jyoti Engineering"
                        width={64}
                        height={64}
                        className="h-14 w-14 object-contain lg:h-16 lg:w-16"
                    />
                    <span className="flex flex-col leading-tight">
                        <span className="text-sm font-bold tracking-wide text-slate-800 sm:text-base lg:text-2xl" style={{ fontFamily: "'Canistel', sans-serif" }}>
                            JYOTI  ENGINEERING
                        </span>
                        <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-amber-500 sm:text-[11px]" 
                        style={{ fontFamily: "'Westford Modern Demo', sans-serif" }}
                        >
                            Precision &middot; Fabrication &middot; Reliability
                        </span>
                    </span>
                </a>

                {/* Desktop links */}
                <ul className="hidden items-center gap-8 lg:flex">
                    {NAV_LINKS.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className="text-lg font-medium text-slate-800 transition-colors hover:text-amber-500"
                                style={{ fontFamily: "'Button', sans-serif" }}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <div className="hidden lg:block">
                    <a
                        href="#contact"
                        className="rounded-md bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:bg-amber-400"
                        style={{ fontFamily: "'Button', sans-serif" }}
                    >
                        Request a Quote
                    </a>
                </div>

                {/* Mobile toggle */}
                <button
                    type="button"
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                    onClick={() => setIsMenuOpen((open) => !open)}
                    className="flex h-10 w-10 items-center justify-center rounded-md text-slate-800 lg:hidden"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                        )}
                    </svg>
                </button>
            </nav>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="border-t border-white/10 bg-slate-900/95 backdrop-blur-md lg:hidden">
                    <ul className="flex flex-col gap-1 px-6 py-4">
                        {NAV_LINKS.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block rounded-md px-2 py-3 text-sm font-medium text-slate-100 hover:bg-white/5 hover:text-amber-400"
                                    style={{ fontFamily: "'Button', sans-serif" }}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                        <li className="pt-2">
                            <a
                                href="#contact"
                                onClick={() => setIsMenuOpen(false)}
                                className="block rounded-md bg-amber-500 px-4 py-3 text-center text-sm font-semibold text-slate-900 hover:bg-amber-400"
                                style={{ fontFamily: "'Button', sans-serif" }}
                            >
                                Request a Quote
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
}