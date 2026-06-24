import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";

type FormState = {
    name: string;
    email: string;
    phone: string;
    message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const INITIAL_FORM: FormState = {
    name: "",
    email: "",
    phone: "",
    message: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[\d\s-]{10,15}$/;

// EmailJS config — pulled from .env (Vite exposes vars prefixed with VITE_)
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

function validate(form: FormState): FormErrors {
    const errors: FormErrors = {};

    if (!form.name.trim()) {
        errors.name = "Please enter your name.";
    } else if (form.name.trim().length < 2) {
        errors.name = "Name must be at least 2 characters.";
    }

    if (!form.email.trim()) {
        errors.email = "Please enter your email.";
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
        errors.email = "Please enter a valid email address.";
    }

    if (!form.phone.trim()) {
        errors.phone = "Please enter a phone number.";
    } else if (!PHONE_REGEX.test(form.phone.trim())) {
        errors.phone = "Please enter a valid phone number.";
    }

    if (!form.message.trim()) {
        errors.message = "Please describe your requirement.";
    } else if (form.message.trim().length < 10) {
        errors.message = "Please provide a few more details (10+ characters).";
    }

    return errors;
}

function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return <p className="mt-1.5 text-xs font-medium text-red-400">{message}</p>;
}

export default function Footer() {
    const [form, setForm] = useState<FormState>(INITIAL_FORM);
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleChange = (field: keyof FormState, value: string) => {
        const next = { ...form, [field]: value };
        setForm(next);
        if (touched[field]) {
            setErrors(validate(next));
        }
    };

    const handleBlur = (field: keyof FormState) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
        setErrors(validate(form));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const nextErrors = validate(form);
        setErrors(nextErrors);
        setTouched({ name: true, email: true, phone: true, message: true });

        if (Object.keys(nextErrors).length > 0) return;

        setStatus("loading");

        try {
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    from_name: form.name,
                    from_email: form.email,
                    phone: form.phone,
                    message: form.message,
                },
                { publicKey: EMAILJS_PUBLIC_KEY }
            );

            setStatus("success");
            setForm(INITIAL_FORM);
            setTouched({});
            window.alert("Email sent successfully! We'll be in touch shortly.");
            setTimeout(() => setStatus("idle"), 5000);
        } catch (err) {
            console.error("EmailJS error:", err);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 5000);
        }
    };

    return (
        <footer id="contact" className="relative z-10 w-full border-t border-slate-200 bg-transparent text-slate-600">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
                <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
                    {/* Contact form */}
                    <div>
                        <span className="text-md font-semibold uppercase tracking-[0.18em] text-amber-500"
                        style={{ fontFamily: "'Button', sans-serif" }}
                        >
                            Get In Touch
                        </span>
                        <h2 className="mt-3 text-3xl text-slate-900 sm:text-4xl"
                        style={{ fontFamily: "'Heavitas', sans-serif" }}
                        >
                            Request a Quote
                        </h2>
                        <p className="mt-3 max-w-md text-slate-600"
                        style={{ fontFamily: "'Paragraph', sans-serif" }}
                        >
                            Tell us about your project and our team will get back to you
                            with a tailored fabrication solution.
                        </p>

                        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
                            <div>
                                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700"
                                style={{ fontFamily: "'Button', sans-serif" }}
                                >
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                    onBlur={() => handleBlur("name")}
                                    placeholder="Your name"
                                    className={`w-full rounded-md border bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:border-amber-500 ${errors.name && touched.name ? "border-red-400" : "border-slate-200"
                                        }`}
                                />
                                <FieldError message={touched.name ? errors.name : undefined} />
                            </div>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700"
                                    style={{ fontFamily: "'Button', sans-serif" }}
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => handleChange("email", e.target.value)}
                                        onBlur={() => handleBlur("email")}
                                        placeholder="you@company.com"
                                        className={`w-full rounded-md border bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:border-amber-500 ${errors.email && touched.email ? "border-red-400" : "border-slate-200"
                                            }`}
                                    />
                                    <FieldError message={touched.email ? errors.email : undefined} />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-slate-700"
                                    style={{ fontFamily: "'Button', sans-serif" }}
                                    >
                                        Phone
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        value={form.phone}
                                        onChange={(e) => handleChange("phone", e.target.value)}
                                        onBlur={() => handleBlur("phone")}
                                        placeholder="+91 97174 56752"
                                        className={`w-full rounded-md border bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:border-amber-500 ${errors.phone && touched.phone ? "border-red-400" : "border-slate-200"
                                            }`}
                                    />
                                    <FieldError message={touched.phone ? errors.phone : undefined} />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-700"
                                style={{ fontFamily: "'Button', sans-serif" }}
                                >
                                    Project Requirement
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    value={form.message}
                                    onChange={(e) => handleChange("message", e.target.value)}
                                    onBlur={() => handleBlur("message")}
                                    placeholder="Tell us about the fabrication work you need..."
                                    className={`w-full resize-none rounded-md border bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:border-amber-500 ${errors.message && touched.message ? "border-red-400" : "border-slate-200"
                                        }`}
                                />
                                <FieldError message={touched.message ? errors.message : undefined} />
                            </div>

                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="w-full rounded-md bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10"
                                style={{ fontFamily: "'Button', sans-serif" }}
                            >
                                {status === "loading" ? "Sending..." : "Submit Inquiry"}
                            </button>

                            {status === "success" && (
                                <p className="text-sm font-medium text-emerald-600">
                                    Thanks! Your inquiry has been received — we'll be in touch shortly.
                                </p>
                            )}

                            {status === "error" && (
                                <p className="text-sm font-medium text-red-500">
                                    Something went wrong sending your inquiry. Please try again or call us directly.
                                </p>
                            )}
                        </form>
                    </div>

                    {/* Corporate info */}
                    <div className="lg:pl-8">
                        <span className="text-xl font-semibold uppercase text-slate-800"
                        style={{ fontFamily: "'Canistel', sans-serif" }}
                        >Jyoti </span>
                        <span className="text-xl font-semibold uppercase  text-amber-500"
                        style={{ fontFamily: "'Canistel', sans-serif" }}
                        >
                            Engineering
                        </span>
                        <h3 className="mt-3 text-2xl text-slate-900"
                        style={{ fontFamily: "'Heavitas', sans-serif" }}
                        >
                            Visit Or Reach Us Directly
                        </h3>

                        <ul className="mt-8 space-y-6">
                            <li className="flex gap-4">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                </span>
                                <div>
                                    <p className="font-semibold text-slate-800" 
                                    style={{ fontFamily: "'Button', sans-serif" }}
                                    >Registered Office</p>
                                    <p className="mt-1 text-sm leading-relaxed text-slate-500"
                                    style={{ fontFamily: "'Paragraph', sans-serif" }}
                                    >
                                        A-124/1, First Floor, Block-A, Ekta Vihar, Gyan Mandir Road,
                                        Jaitpur Extn. Part-1, Badarpur, New Delhi &ndash; 110044
                                    </p>
                                </div>
                            </li>

                            <li className="flex gap-4">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.33 1.91.6 2.83a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.92.27 1.87.47 2.83.6A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                </span>
                                <div>
                                    <p className="font-semibold text-slate-800"
                                    style={{ fontFamily: "'Button', sans-serif" }}
                                    >Phone</p>
                                    <a href="tel:+919717456752" className="mt-1 block text-sm text-slate-500 transition-colors hover:text-amber-500"
                                    style={{ fontFamily: "'Paragraph', sans-serif" }}
                                    >
                                        +91 97174 56752
                                    </a>
                                </div>
                            </li>

                            <li className="flex gap-4">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                        <rect x="2" y="4" width="20" height="16" rx="2" />
                                        <path d="M22 6 12 13 2 6" />
                                    </svg>
                                </span>
                                <div>
                                    <p className="font-semibold text-slate-800" style={{ fontFamily: "'Button', sans-serif" }}>
                                        Email
                                    </p>
                                    <a href="mailto:engineeringjyoti@yahoo.in" className="mt-1 block text-sm text-slate-500 transition-colors hover:text-amber-600" style={{ fontFamily: "'Paragraph', sans-serif" }}>
                                        engineeringjyoti@yahoo.in
                                    </a>
                                </div>
                            </li>

                            <li className="flex gap-4">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                        <path d="M9 2h6l1 4H8l1-4z" />
                                        <path d="M5 6h14l-1 14H6L5 6z" />
                                        <path d="M9 11h6M9 15h6" />
                                    </svg>
                                </span>
                                <div>
                                    <p className="font-semibold text-slate-800" style={{ fontFamily: "'Button', sans-serif" }}>
                                        GSTIN
                                    </p>
                                    <p className="mt-1 text-sm tracking-wide text-slate-500" style={{ fontFamily: "'Paragraph', sans-serif" }}>
                                        07BGZPD5731R1ZH
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-center sm:flex-row sm:text-left">
                    <p className="text-sm text-slate-500" style={{ fontFamily: "'Paragraph', sans-serif" }}>
                        &copy; {new Date().getFullYear()} Jyoti Engineering. All rights reserved.
                    </p>
                    <p className="text-sm text-slate-500" style={{ fontFamily: "'Paragraph', sans-serif" }}>
                        Precision Engineering &middot; Quality Fabrication &middot; Innovation &amp; Reliability
                    </p>
                </div>
            </div>
        </footer>
    );
}