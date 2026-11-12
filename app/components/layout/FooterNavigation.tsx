import Link from "next/link";

interface NavigationLink {
  name: string;
  href: string;
}

const navigationLinks: NavigationLink[] = [
  { name: "Terms & Conditions", href: "/terms" },
  { name: "Privacy Policy", href: "/privacyPolicy" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

export default function FooterNavigation() {
  return (
    <div>
      <h3 className="text-lg font-heading font-semibold text-slate-100 tracking-tight">Quick Links</h3>
      <div className="mt-3 space-y-2">
        {navigationLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="block text-slate-400 text-sm font-normal font-body hover:text-orange-400 transition-colors duration-200"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
