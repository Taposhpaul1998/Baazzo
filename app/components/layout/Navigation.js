"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {

    const navigationLinks = [
        { name: 'Home', href: '/' },
        { name: 'Treadmill', href: '/treadmill' },
        { name: 'Exercise bikes & Cross Trainer', href: '/exerciseBikesTrainer' },
        { name: 'Fitness', href: '/fitness' },
        { name: 'Sports', href: '/sports' }
    ];

    const pathname = usePathname();

    return (
        <nav>
            {
                navigationLinks.map((link) => {
                    const isActive = pathname === link.href;

                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`px-4 py-2 transition-colors duration-300 font-sans font-medium text-sm ${isActive
                                ? "text-orange-500"
                                : "text-gray-600 hover:text-orange-500"
                                }`}
                        >
                            {link.name}
                        </Link>
                    );
                })
            }
        </nav>
    )
}
