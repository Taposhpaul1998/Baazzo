import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldHalved,
  faTruck,
  faHeadset,
  faStar,
  faCheckCircle,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

export const metadata: Metadata = {
  title: "About Us | Baazzo",
  description:
    "Learn about Baazzo — who we are, our mission, and our commitment to delivering quality products across Bangladesh.",
};

const stats = [
  { value: "10,000+", label: "Happy Customers" },
  { value: "5,000+", label: "Products Listed" },
  { value: "64", label: "Districts Covered" },
  { value: "2024", label: "Year Founded" },
];

const values = [
  {
    icon: faShieldHalved,
    title: "Trusted Quality",
    description:
      "Every product on Baazzo is carefully reviewed before listing. We only sell what we stand behind — no compromises on quality.",
  },
  {
    icon: faTruck,
    title: "Fast Delivery",
    description:
      "We partner with reliable couriers to deliver your orders across Bangladesh quickly and safely, right to your doorstep.",
  },
  {
    icon: faHeadset,
    title: "Dedicated Support",
    description:
      "Our customer support team is available Saturday through Thursday to help you with orders, returns, and any questions.",
  },
  {
    icon: faStar,
    title: "Customer First",
    description:
      "Every decision we make starts with the question: does this make our customers' experience better? That never changes.",
  },
];

const promises = [
  "100% genuine products — no counterfeits",
  "Secure checkout with encrypted payment",
  "Easy 7-day return policy",
  "Transparent pricing — no hidden fees",
  "Responsive support within 24 hours",
  "Delivery tracking on every order",
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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-body">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative bg-slate-900 border-b border-slate-800 py-16 md:py-24 overflow-hidden">
        {/* Decorative glow */}
        <div
          className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 w-[560px] h-[280px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #f06a38 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        {/* Subtle grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#f06a38 1px, transparent 1px), linear-gradient(90deg, #f06a38 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <span className="inline-block mb-4 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#f06a38] text-xs font-semibold tracking-widest uppercase">
            Our Story
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-slate-50 tracking-tight leading-tight">
            Shopping Made Simple,
            <br className="hidden sm:block" />
            <span style={{ color: "#f06a38" }}> Trusted Across Bangladesh</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-slate-400 text-sm md:text-base leading-relaxed">
            Baazzo was built with one purpose — to give everyday Bangladeshis
            access to quality products at fair prices, delivered reliably and
            backed by real customer support.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
              style={{
                background: "linear-gradient(135deg, #f06a38, #fb923c)",
                boxShadow: "0 4px 14px rgba(240,106,56,0.35)",
              }}
            >
              Shop Now
              <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-300 bg-slate-800 border border-slate-700 hover:border-orange-500/40 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats Row ─────────────────────────────────────────────── */}
      <section className="border-b border-slate-800 bg-slate-900/50" aria-label="Key statistics">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-800 rounded-2xl overflow-hidden border border-slate-800">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-slate-900 px-6 py-7 text-center"
              >
                <p
                  className="font-heading text-2xl md:text-3xl font-bold"
                  style={{ color: "#f06a38" }}
                >
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-slate-400 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who We Are ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* Text */}
          <div>
            <span className="inline-block mb-3 text-xs font-semibold uppercase tracking-widest text-[#f06a38]">
              Who We Are
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-slate-100 leading-snug">
              A Bangladeshi Brand Built for Bangladeshi Shoppers
            </h2>
            <div className="mt-5 space-y-4 text-sm text-slate-400 leading-relaxed">
              <p>
                Baazzo is a Dhaka-based online store founded with the belief
                that great products should be accessible to everyone — not just
                those in major cities or with international credit cards. We
                started small, with a focus on everyday essentials, and have
                grown into a platform that serves customers in all 64 districts
                of Bangladesh.
              </p>
              <p>
                We work directly with suppliers and manufacturers to bring you
                genuine products at competitive prices. No middlemen, no
                markups that don&apos;t make sense. Just honest pricing and
                products we&apos;d recommend to our own families.
              </p>
              <p>
                Our team is based in Tejgaon, Dhaka — a real office with real
                people who care about your experience. When you contact us,
                you&apos;re talking to someone who genuinely wants to help.
              </p>
            </div>
          </div>

          {/* Visual card */}
          <div className="relative">
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8 space-y-5">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center font-heading font-bold text-xl text-white"
                style={{ background: "linear-gradient(135deg, #f06a38, #fb923c)" }}
                aria-hidden="true"
              >
                B
              </div>
              <blockquote className="text-slate-300 text-base md:text-lg font-medium leading-relaxed italic">
                &ldquo;Our mission is simple: make it easy for every Bangladeshi
                to find and buy quality products online — with confidence and
                without compromise.&rdquo;
              </blockquote>
              <div className="pt-2 border-t border-slate-800">
                <p className="text-sm font-semibold text-slate-200">
                  Baazzo Team
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tejgaon, Dhaka — Est. 2024
                </p>
              </div>
            </div>
            {/* Decorative corner glow */}
            <div
              className="pointer-events-none absolute -bottom-6 -right-6 w-40 h-40 rounded-full opacity-15 blur-2xl"
              style={{ background: "#f06a38" }}
              aria-hidden="true"
            />
          </div>
        </div>
      </section>

      {/* ── Our Values ────────────────────────────────────────────── */}
      <section className="bg-slate-900/40 border-y border-slate-800 py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block mb-3 text-xs font-semibold uppercase tracking-widest text-[#f06a38]">
              What We Stand For
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-slate-100">
              Our Core Values
            </h2>
            <p className="mt-3 max-w-xl mx-auto text-sm text-slate-400">
              These aren&apos;t just words on a page — they guide every product
              we list and every interaction we have with our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl bg-slate-900 border border-slate-800 p-6 hover:border-orange-500/30 transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4 group-hover:bg-orange-500/15 transition-colors">
                  <FontAwesomeIcon
                    icon={v.icon}
                    className="w-5 h-5 text-[#f06a38]"
                  />
                </div>
                <h3 className="font-heading text-base font-semibold text-slate-100 mb-2">
                  {v.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Promise ───────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* Promise list */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-7 md:p-8">
            <span className="inline-block mb-3 text-xs font-semibold uppercase tracking-widest text-[#f06a38]">
              Our Commitment
            </span>
            <h2 className="font-heading text-xl md:text-2xl font-bold text-slate-100 mb-6">
              What You Can Always Expect from Baazzo
            </h2>
            <ul className="space-y-3.5">
              {promises.map((promise) => (
                <li key={promise} className="flex items-start gap-3">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="w-4 h-4 text-[#f06a38] flex-shrink-0 mt-0.5"
                  />
                  <span className="text-sm text-slate-300 leading-relaxed">
                    {promise}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / reach out */}
          <div className="space-y-6">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#f06a38]">
              Get in Touch
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-slate-100 leading-snug">
              We&apos;d Love to Hear From You
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Have a question, a suggestion, or just want to know more about
              what we do? Our team is here to help. Reach out through any of the
              channels below and we&apos;ll get back to you promptly.
            </p>

            <div className="space-y-3">
              <a
                href="mailto:support@baazzo.com"
                className="flex items-center gap-3 text-sm text-slate-300 hover:text-[#f06a38] transition-colors group"
              >
                <span className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:border-orange-500/40 transition-colors text-xs font-bold text-[#f06a38]">
                  @
                </span>
                support@baazzo.com
              </a>
              <a
                href="tel:01635701781"
                className="flex items-center gap-3 text-sm text-slate-300 hover:text-[#f06a38] transition-colors group"
              >
                <span className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:border-orange-500/40 transition-colors text-xs font-bold text-[#f06a38]">
                  ☎
                </span>
                01635701781
              </a>
            </div>

            {/* Social */}
            <div>
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
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────── */}
      <section className="border-t border-slate-800 bg-slate-900/50 py-14 md:py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-slate-50 tracking-tight">
            Ready to Start Shopping?
          </h2>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">
            Join thousands of customers across Bangladesh who trust Baazzo for
            their everyday needs.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
              style={{
                background: "linear-gradient(135deg, #f06a38, #fb923c)",
                boxShadow: "0 4px 14px rgba(240,106,56,0.35)",
              }}
            >
              Browse Products
              <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-medium text-slate-300 bg-slate-800 border border-slate-700 hover:border-orange-500/40 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
