import { useEffect, useRef, useState } from "react";

import structuralFabrication from "../assets/services/structural-fabrication.jpg";
import precisionMachining from "../assets/services/precision-machining.jpg";
import pipeSpoolFabrication from "../assets/services/pipe-spool-fabrication.jpg";
import pressureVesselFabrication from "../assets/services/pressure-vessel-fabrication.jpg";
import tankFabrication from "../assets/services/tank-fabrication.jpg";
import staircasePlatformHandrail from "../assets/services/staircase-platform-handrail.jpg";
import pipingWorks from "../assets/services/piping-works.jpg";
import ductingWorks from "../assets/services/ducting-works.jpg";
import electricalPanelFabrication from "../assets/services/electrical-panel-fabrication.jpg";
import conveyorSystemFabrication from "../assets/services/conveyor-system-fabrication.jpg";
import industrialMaintenance from "../assets/services/industrial-maintenance.jpg";
import allTypesFabricationWork from "../assets/services/all-types-fabrication-work.jpg";

type Service = {
    title: string;
    description: string;
    image: string;
};

const SERVICES: Service[] = [
    {
        title: "Structural Fabrication",
        description: "Heavy-duty structural steel framing built to engineering spec.",
        image: structuralFabrication,
    },
    {
        title: "Precision Machining",
        description: "CNC-grade machining delivering tight tolerances every time.",
        image: precisionMachining,
    },
    {
        title: "Pipe Spool Fabrication",
        description: "Custom pipe spools welded and tested for industrial pipelines.",
        image: pipeSpoolFabrication,
    },
    {
        title: "Pressure Vessel Fabrication",
        description: "Code-compliant pressure vessels built for safety and durability.",
        image: pressureVesselFabrication,
    },
    {
        title: "Tank Fabrication",
        description: "Large-scale storage tanks engineered for industrial use.",
        image: tankFabrication,
    },
    {
        title: "Staircase, Platform & Handrail",
        description: "Industrial staircases, access platforms, and safety handrails.",
        image: staircasePlatformHandrail,
    },
    {
        title: "Piping Works & Installation",
        description: "End-to-end piping installation across industrial facilities.",
        image: pipingWorks,
    },
    {
        title: "Ducting Works & Installation",
        description: "Custom HVAC and industrial ducting fabrication & install.",
        image: ductingWorks,
    },
    {
        title: "Electrical Panel Fabrication",
        description: "Custom control and distribution panels built to standard.",
        image: electricalPanelFabrication,
    },
    {
        title: "Conveyor System Fabrication",
        description: "Material-handling conveyor systems for production lines.",
        image: conveyorSystemFabrication,
    },
    {
        title: "Industrial Maintenance",
        description: "Routine and emergency maintenance to keep plants running.",
        image: industrialMaintenance,
    },
    {
        title: "All Types of Fabrication Work",
        description: "Versatile in-house fabrication for any custom industrial need.",
        image: allTypesFabricationWork,
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

function ServiceCard({ service, index }: { service: Service; index: number }) {
    const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${(index % 3) * 80}ms` }}
            className={`group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-700 ease-out
        hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-900/10 hover:border-amber-400/50
        active:-translate-y-0.5 active:shadow-md active:scale-[0.98]
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
            {/* Image */}
            <div className="relative h-52 w-full overflow-hidden">
                <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
            </div>

            {/* Title */}
            <div className="px-5 pt-4">
                <h3 className="text-base text-slate-800"
                style={{ fontFamily: "'Heavitas', sans-serif" }}
                >{service.title}</h3>
                <span className="mt-2 block h-0.5 w-8 origin-left scale-x-100 bg-amber-500 transition-all duration-300 group-hover:w-12" />
            </div>

            {/* Description, frosted glass strip */}
            <div className="relative mx-5 mb-5 mt-3 overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-slate-100/70 backdrop-blur-sm" />
                <p className="relative px-3 py-3 text-sm leading-relaxed text-slate-600"
                style={{ fontFamily: "'Paragraph', sans-serif" }}
                >
                    {service.description}
                </p>
            </div>
        </div>
    );
}

export default function Services() {
    const { ref: headingRef, isVisible: headingVisible } = useScrollReveal<HTMLDivElement>();

    return (
        <section
            id="services"
            className="relative z-10 w-full bg-transparent px-6 py-24 lg:px-10"
        >
            <div
                ref={headingRef}
                className={`mx-auto mb-14 max-w-3xl text-center transition-all duration-700 ease-out ${headingVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                    }`}
            >
                <span className="text-md font-bold uppercase tracking-[0.18em] text-amber-500"
                style={{ fontFamily: "'Button', sans-serif" }}>
                    Our Work / Services
                </span>
                <h2 className="mt-3 text-2xl text-slate-900 sm:text-4xl"
                style={{ fontFamily: "'Heavitas', sans-serif" }}
                >
                    Specialized Industrial Fabrication, End to End
                </h2>
                <p className="mt-4 text-md text-slate-600"
                style={{ fontFamily: "'Paragraph', sans-serif" }}>
                    From structural steel to electrical panels, Jyoti Engineering
                    delivers precision-built solutions across every stage of
                    industrial fabrication and installation.
                </p>
            </div>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {SERVICES.map((service, index) => (
                    <ServiceCard key={service.title} service={service} index={index} />
                ))}
            </div>
        </section>
    );
}