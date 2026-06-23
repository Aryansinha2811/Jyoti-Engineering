import { useEffect, useRef, useState } from "react";

const ICON_PROPS = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
};

const FEATURES = [
    {
        title: "Quality Assured",
        description: "Every fabrication job passes strict quality checks before delivery.",
        icon: (
            <svg {...ICON_PROPS} className="h-8 w-8">
                <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3z" />
                <path d="M9 12l2 2 4-4" />
            </svg>
        ),
    },
    {
        title: "Experienced Team",
        description: "Skilled engineers and fabricators with deep industrial expertise.",
        icon: (
            <svg {...ICON_PROPS} className="h-8 w-8">
                <circle cx="9" cy="8" r="3.2" />
                <path d="M2.5 20c0-3.3 2.9-5.5 6.5-5.5s6.5 2.2 6.5 5.5" />
                <circle cx="17" cy="9" r="2.6" />
                <path d="M15.5 14.2c2.6.3 4.5 2.1 4.5 5.3" />
            </svg>
        ),
    },
    {
        title: "On Time Delivery",
        description: "Projects scheduled and executed to meet every deadline.",
        icon: (
            <svg {...ICON_PROPS} className="h-8 w-8">
                <circle cx="12" cy="13" r="8" />
                <path d="M12 9v4l3 2" />
                <path d="M9 2h6" />
            </svg>
        ),
    },
    {
        title: "Customer Satisfaction",
        description: "Long-term client relationships built on trust and reliability.",
        icon: (
            <svg {...ICON_PROPS} className="h-8 w-8">
                <path d="M7 12l3 3 7-8" />
                <path d="M21 12a9 9 0 1 1-5.2-8.2" />
            </svg>
        ),
    },
];

function useScrollReveal<T extends HTMLElement>() {
    const ref = useRef<T | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return { ref, isVisible };
}

function FeatureCard({
    feature,
    index,
}: {
    feature: (typeof FEATURES)[number];
    index: number;
}) {
    const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${index * 90}ms` }}
            className={`group rounded-xl border border-slate-200 bg-white/60 p-7 text-center shadow-sm transition-all duration-700 ease-out
        hover:-translate-y-1.5 hover:border-amber-400/50 hover:bg-white hover:shadow-lg hover:shadow-blue-900/5
        active:scale-[0.97]
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-600 transition-all duration-300 group-hover:bg-amber-500 group-hover:text-white group-hover:scale-110">
                {feature.icon}
            </div>
            <h3 className="mb-2 text-base text-slate-800"
            style={{ fontFamily: "'Heavitas', sans-serif" }}
            >{feature.title}</h3>
            <p className="text-md leading-relaxed text-slate-500"
            style={{ fontFamily: "'Paragraph', sans-serif" }}
            >
                {feature.description}
            </p>
        </div>
    );
}

export default function WhyChooseUs() {
    const { ref: headingRef, isVisible: headingVisible } = useScrollReveal<HTMLDivElement>();

    return (
        <section
            id="why-choose-us"
            className="relative z-10 w-full bg-transparent px-6 py-24 lg:px-10"
        >
            <div
                ref={headingRef}
                className={`mx-auto mb-14 max-w-2xl text-center transition-all duration-700 ease-out ${headingVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                    }`}
            >
                <span className="text-md font-semibold uppercase tracking-[0.18em] text-amber-500"
                style={{ fontFamily: "'Button', sans-serif" }}
                >
                    Why Choose Us
                </span>
                <h2 className="mt-3 text-2xl text-slate-900 sm:text-4xl"
                style={{ fontFamily: "'Heavitas', sans-serif" }}
                >
                    Built On Trust, Backed By Results
                </h2>
                <p className="mt-4 text-slate-600"
                style={{ fontFamily: "'Paragraph', sans-serif" }}>
                    Four reasons industrial clients across the region choose 
                    <span className="font-bold text-lg italic text-slate-800"> Jyoti</span>
                    <span className="font-bold text-lg mr-2 italic text-amber-500"> Engineering</span> for their fabrication and maintenance needs.
                </p>
            </div>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {FEATURES.map((feature, index) => (
                    <FeatureCard key={feature.title} feature={feature} index={index} />
                ))}
            </div>
        </section>
    );
}