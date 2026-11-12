import {
  faFacebook,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import {
  faClock,
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Baazzo",
  description:
    "Get in touch with Baazzo. Call, email, or visit us in Dhaka, Bangladesh.",
};

const contactInfo = [
  {
    icon: faPhone,
    label: "Phone",
    value: "01635701781",
    href: "tel:01635701781",
  },
  {
    icon: faWhatsapp,
    label: "WhatsApp",
    value: "01635701781",
    href: "https://wa.me/8801635701781",
  },
  {
    icon: faEnvelope,
    label: "Email",
    value: "support@baazzo.com",
    href: "mailto:support@baazzo.com",
  },
  {
    icon: faLocationDot,
    label: "Address",
    value: "236/2 Commissioner Goli, East Nakhalpara, Tejgaon, Dhaka 1215",
    href: "https://maps.google.com/?q=236/2+Commissioner+Goli+East+Nakhalpara+Tejgaon+Dhaka",
  },
  {
    icon: faClock,
    label: "Support Hours",
    value: "Saturday – Thursday: 10:00 AM – 9:00 PM",
    href: null,
  },
];

const socialLinks = [
  {
    icon: faFacebook,
    label: "Facebook",
    href: "https://facebook.com/baazzo1",
    color: "hover:text-blue-400",
  },
  {
    icon: faWhatsapp,
    label: "WhatsApp",
    href: "https://wa.me/8801635701781",
    color: "hover:text-green-400",
  },
  {
    icon: faInstagram,
    label: "Instagram",
    href: "https://instagram.com/baazzo",
    color: "hover:text-pink-400",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-body">
      {/* ── Hero Banner ───────────────────────────────────────── */}
      <section className="relative bg-slate-900 border-b border-slate-800 py-14 md:py-20 overflow-hidden">
        {/* Decorative glow */}
        <div
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[480px] h-[260px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #f06a38 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#f06a38] text-xs font-semibold tracking-widest uppercase">
            Support
          </span>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-slate-50 tracking-tight">
            Contact Us
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-slate-400 text-sm md:text-base leading-relaxed">
            Have a question or need help with your order? We&apos;re here for
            you — reach out any time.
          </p>
        </div>
      </section>

      {/* ── Main Content ──────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">

          {/* ── Left: Info Cards ───────────────────────── */}
          <div className="space-y-6">
            <h2 className="font-heading text-xl font-semibold text-slate-100">
              Get in Touch
            </h2>

            <div className="space-y-3">
              {contactInfo.map((item) => {
                const inner = (
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex-shrink-0 w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={item.icon}
                        className="text-[#f06a38] w-4 h-4"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-slate-200 text-sm leading-snug">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );

                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="block rounded-2xl bg-slate-900 border border-slate-800 p-4 transition-colors hover:border-orange-500/40 hover:bg-slate-800/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                    aria-label={`${item.label}: ${item.value}`}
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    key={item.label}
                    className="rounded-2xl bg-slate-900 border border-slate-800 p-4"
                  >
                    {inner}
                  </div>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5">
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-3">
                Follow Us
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={`w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 transition-colors ${s.color} hover:border-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500`}
                  >
                    <FontAwesomeIcon icon={s.icon} className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Contact Form ────────────────────── */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-slate-100 mb-6">
              Send a Message
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ── Map ───────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 pb-12 md:pb-16">
        <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d29210.85986664403!2d90.37629065522049!3d23.770281223229393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s236%2F2%20commissioner%20goli%2C%20East%20Nakhalpara%2C%20Tejgoan%2C%20Dhaka%201215%2C%20Dhaka%2C%20Dhaka%20Division%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1793621698447!5m2!1sen!2sbd"
            width="100%"
            height="360"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Baazzo Office Location"
          />
        </div>
      </section>
    </div>
  );
}
