import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions | Baazzo",
  description:
    "Read the Terms & Conditions for using Baazzo — your rights, responsibilities, and our policies explained clearly.",
};

const LAST_UPDATED = "November 11, 2026";
const EFFECTIVE_DATE = "November 11, 2026";
const COMPANY_NAME = "Baazzo";
const COMPANY_EMAIL = "support@baazzo.com";
const COMPANY_PHONE = "01635701781";
const COMPANY_ADDRESS =
  "236/2 Commissioner Goli, East Nakhalpara, Tejgaon, Dhaka 1215, Bangladesh";

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: `By accessing or using the Baazzo website and services, you confirm that you are at least 18 years of age, or are accessing the site under the supervision of a parent or legal guardian. You agree to be bound by these Terms & Conditions ("Terms"), our Privacy Policy, and any other policies referenced herein.

If you do not agree with any part of these Terms, you must discontinue use of our website and services immediately. Your continued use of the site following the posting of any changes to these Terms will mean you accept those changes.`,
  },
  {
    id: "definitions",
    title: "2. Definitions",
    items: [
      `"Company", "We", "Us", or "Our" refers to ${COMPANY_NAME}, a business registered and operating in Bangladesh.`,
      `"Website" refers to baazzo.com and all associated subdomains and pages.`,
      `"User", "You", or "Your" refers to any individual or entity accessing or using our website or services.`,
      `"Products" refers to all physical goods listed, sold, and delivered through our platform.`,
      `"Order" refers to a purchase request submitted by a User through the Website.`,
      `"Content" refers to all text, images, graphics, videos, and other material published on the Website.`,
    ],
  },
  {
    id: "account",
    title: "3. User Accounts",
    content: `To place an order or access certain features, you may be required to create an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.

You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate. We reserve the right to suspend or terminate accounts that contain false, inaccurate, or incomplete information, or that violate these Terms.

You must notify us immediately at ${COMPANY_EMAIL} if you suspect any unauthorised use of your account.`,
  },
  {
    id: "products",
    title: "4. Products & Availability",
    content: `All products displayed on the Website are subject to availability. We reserve the right to discontinue any product at any time without prior notice. Product images are for illustrative purposes only; actual products may vary slightly in colour, size, or appearance due to photography and display settings.

We make every effort to ensure product descriptions are accurate. However, we do not warrant that descriptions, pricing, or other content is error-free. If a product you ordered is out of stock or unavailable, we will notify you promptly and offer a suitable alternative, store credit, or a full refund.`,
  },
  {
    id: "pricing",
    title: "5. Pricing & Payment",
    content: `All prices are listed in Bangladeshi Taka (BDT) and are inclusive of applicable taxes unless stated otherwise. We reserve the right to change prices at any time without prior notice. The price applicable to your order is the price displayed at the time you place the order.

We accept payment through the methods listed at checkout. By providing payment information, you represent and warrant that the information is accurate and that you are authorised to use the payment method. We use secure, industry-standard encryption to protect your payment data. We do not store full card details on our servers.

In the event of a pricing error, we reserve the right to cancel any orders placed at the incorrect price, with a full refund issued where payment has already been taken.`,
  },
  {
    id: "orders",
    title: "6. Orders & Cancellations",
    content: `Placing an order constitutes an offer to purchase. We reserve the right to accept or decline any order for any reason, including but not limited to stock unavailability, suspected fraud, or errors in product or pricing information. An order is confirmed only when you receive an order confirmation email from us.

You may cancel an order before it has been dispatched by contacting us at ${COMPANY_EMAIL} or ${COMPANY_PHONE}. Once an order has been dispatched, it cannot be cancelled and must be processed as a return in accordance with our Return & Refund Policy.`,
  },
  {
    id: "delivery",
    title: "7. Delivery & Shipping",
    content: `We deliver across Bangladesh. Estimated delivery times are provided at checkout and are indicative only — we do not guarantee delivery within any specific timeframe. Delivery times may be affected by factors outside our control, including courier delays, public holidays, and adverse weather conditions.

Risk of loss and title for products pass to you upon delivery. If a delivery is missed and the parcel is returned to us, we may charge an additional redelivery fee. We are not liable for any losses arising from delayed or failed delivery caused by inaccurate address information provided by you.`,
  },
  {
    id: "returns",
    title: "8. Returns & Refunds",
    content: `We want you to be fully satisfied with every purchase. If you are not satisfied, you may request a return within 7 days of receiving your order, provided the product is unused, in its original packaging, and in the same condition as received.

Certain items are non-returnable, including perishable goods, personalised items, digital products, and products marked as final sale. Refunds are processed within 7–10 business days of receiving the returned item and verification. We reserve the right to refuse a return if the product does not meet our return conditions.

For defective or damaged items, please contact us within 48 hours of delivery with photographic evidence. We will arrange a replacement or full refund at no additional cost to you.`,
  },
  {
    id: "intellectual-property",
    title: "9. Intellectual Property",
    content: `All content on the Website — including but not limited to logos, trademarks, text, graphics, images, software, and design — is the exclusive property of ${COMPANY_NAME} or its licensors and is protected by applicable intellectual property laws.

You are granted a limited, non-exclusive, non-transferable licence to access and use the Website for personal, non-commercial purposes only. You may not reproduce, distribute, modify, create derivative works of, publicly display, or commercially exploit any content without our express written consent.`,
  },
  {
    id: "prohibited",
    title: "10. Prohibited Conduct",
    items: [
      "Use the Website for any unlawful, fraudulent, or harmful purpose.",
      "Attempt to gain unauthorised access to any part of the Website or its systems.",
      "Transmit any harmful, offensive, or malicious code or content.",
      "Collect or harvest any personal data of other users without consent.",
      "Use automated tools, bots, or scrapers to access or extract data from the Website.",
      "Engage in any conduct that disrupts, damages, or impairs the Website's functionality.",
      "Infringe upon the intellectual property rights of the Company or any third party.",
      "Impersonate any person or entity, or misrepresent your affiliation with any person or entity.",
    ],
  },
  {
    id: "liability",
    title: "11. Limitation of Liability",
    content: `To the maximum extent permitted by applicable law, ${COMPANY_NAME} shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill, arising out of or in connection with your use of the Website or our products and services.

Our total liability to you for any claim arising under these Terms shall not exceed the amount you paid for the specific order giving rise to the claim. Nothing in these Terms limits our liability for death or personal injury caused by our negligence, fraud, or any other liability that cannot be excluded by law.`,
  },
  {
    id: "privacy",
    title: "12. Privacy Policy",
    content: `Your use of the Website is also governed by our Privacy Policy, which is incorporated into these Terms by reference. By using the Website, you consent to the collection, use, and sharing of your information as described in our Privacy Policy. We are committed to protecting your personal data in accordance with applicable data protection laws.`,
  },
  {
    id: "third-party",
    title: "13. Third-Party Links & Services",
    content: `The Website may contain links to third-party websites or services that are not owned or controlled by ${COMPANY_NAME}. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites. We encourage you to review the terms and privacy policies of any third-party sites you visit.`,
  },
  {
    id: "modifications",
    title: "14. Changes to These Terms",
    content: `We reserve the right to update or modify these Terms at any time. When we make changes, we will update the "Last Updated" date at the top of this page. We may also notify you of material changes by email or by posting a prominent notice on the Website. Your continued use of the Website after such changes constitutes your acceptance of the revised Terms.

We encourage you to review these Terms periodically to stay informed of your rights and obligations.`,
  },
  {
    id: "governing-law",
    title: "15. Governing Law & Jurisdiction",
    content: `These Terms shall be governed by and construed in accordance with the laws of the People's Republic of Bangladesh. Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Dhaka, Bangladesh.

If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.`,
  },
  {
    id: "contact",
    title: "16. Contact Us",
    content: `If you have any questions, concerns, or complaints about these Terms, please contact us:`,
    contactBlock: true,
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-body">

      {/* ── Hero Banner ──────────────────────────────────────────── */}
      <section className="relative bg-slate-900 border-b border-slate-800 py-14 md:py-20 overflow-hidden">
        <div
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[480px] h-[260px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #f06a38 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#f06a38] text-xs font-semibold tracking-widest uppercase">
            Legal
          </span>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-slate-50 tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-slate-400 text-sm md:text-base leading-relaxed">
            Please read these terms carefully before using our website or
            placing an order.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
            <span>
              <span className="text-slate-400 font-medium">Effective:</span>{" "}
              {EFFECTIVE_DATE}
            </span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span>
              <span className="text-slate-400 font-medium">Last Updated:</span>{" "}
              {LAST_UPDATED}
            </span>
          </div>
        </div>
      </section>

      {/* ── Main Layout: TOC + Content ───────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-14">

          {/* ── Sticky Table of Contents (desktop) ──────────────── */}
          <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0">
            <div className="sticky top-24 rounded-2xl bg-slate-900 border border-slate-800 p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
                Contents
              </p>
              <nav aria-label="Table of contents">
                <ol className="space-y-1.5">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="block text-xs text-slate-400 hover:text-[#f06a38] transition-colors leading-snug py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500 rounded"
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </aside>

          {/* ── Main Content ─────────────────────────────────────── */}
          <main className="flex-1 min-w-0">

            {/* Intro notice */}
            <div className="mb-8 rounded-2xl bg-orange-500/5 border border-orange-500/20 px-6 py-5">
              <p className="text-sm text-slate-300 leading-relaxed">
                These Terms &amp; Conditions ("Terms") govern your access to and
                use of the {COMPANY_NAME} website and services. By using our
                website or placing an order, you agree to be legally bound by
                these Terms. If you disagree with any part, please do not use
                our services.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-10">
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  aria-labelledby={`heading-${section.id}`}
                  className="scroll-mt-28"
                >
                  <h2
                    id={`heading-${section.id}`}
                    className="font-heading text-lg md:text-xl font-semibold text-slate-100 mb-4 pb-3 border-b border-slate-800"
                  >
                    {section.title}
                  </h2>

                  {/* Paragraph content */}
                  {section.content && (
                    <div className="space-y-4">
                      {section.content.split("\n\n").map((para, i) => (
                        <p
                          key={i}
                          className="text-sm text-slate-400 leading-relaxed"
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Bullet list items */}
                  {section.items && (
                    <ul className="space-y-2.5 mt-1">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span
                            className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#f06a38]"
                            aria-hidden="true"
                          />
                          <span className="text-sm text-slate-400 leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Contact block */}
                  {section.contactBlock && (
                    <div className="mt-4 rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-2.5">
                      <ContactRow label="Company" value={COMPANY_NAME} />
                      <ContactRow label="Email" value={COMPANY_EMAIL} href={`mailto:${COMPANY_EMAIL}`} />
                      <ContactRow label="Phone" value={COMPANY_PHONE} href={`tel:${COMPANY_PHONE}`} />
                      <ContactRow label="Address" value={COMPANY_ADDRESS} />
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* ── Footer Nav ─────────────────────────────────────── */}
            <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                By using Baazzo, you acknowledge that you have read, understood,
                and agree to be bound by these Terms &amp; Conditions.
              </p>
              <div className="flex items-center gap-3 flex-shrink-0">
                <Link
                  href="/contact"
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-xs font-medium hover:border-orange-500/40 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                >
                  Contact Us
                </Link>
                <Link
                  href="/"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                  style={{
                    background: "linear-gradient(135deg, #f06a38, #fb923c)",
                  }}
                >
                  Back to Shop
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

/* ── Helper: single contact row ─────────────────────────────── */
function ContactRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-2 text-sm">
      <span className="flex-shrink-0 w-16 text-slate-500 font-medium">
        {label}:
      </span>
      {href ? (
        <a
          href={href}
          className="text-slate-300 hover:text-[#f06a38] transition-colors break-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500 rounded"
        >
          {value}
        </a>
      ) : (
        <span className="text-slate-300">{value}</span>
      )}
    </div>
  );
}
