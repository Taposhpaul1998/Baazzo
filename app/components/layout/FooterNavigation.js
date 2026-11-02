import Link from "next/link";

export default function FooterNavigation() {

    const navigationLinks = [
        { name: 'Terms & Conditions', href: '/termsConditions' },
        { name: 'Privacy Policy', href: '/privacyPolicy' },
        { name: 'About Us', href: '/about' },
        { name: 'Contact Us', href: '/contact' }
    ];

    return (
        <div>
            <h3 className="text-lg font-heading font-medium text-gray-100">Quick Links</h3>
            <div className="mt-2 space-y-1">
                {
                    navigationLinks.map((link) => (
                        <Link key={link.name} href={link.href} className="block text-gray-300 text-sm font-normal font-sans hover:text-orange-500 transition-colors duration-300">
                            {link.name}
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}
