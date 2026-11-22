"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { navItems } from "./navData";
import CartButton from "./CartButton";
import ProductSearch from "./ProductSearch";
import AuthTrigger from "./AuthTrigger";

export default function DesktopHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  // item টি active কিনা — exact match "/" ছাড়া বাকি সব startsWith দিয়ে check
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="hidden lg:block font-body">
      {/* ── Main Desktop Bar ── */}
      <div className="bg-white border-b border-slate-200 py-3.5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="shrink-0 group">
            <span className="text-3xl font-heading font-extrabold text-primary tracking-tight group-hover:opacity-90 transition-opacity">
              Baazzo
            </span>
          </Link>

          {/* Full Search Bar */}
          <ProductSearch />

          {/* Right Actions: Profile & Cart */}
          <div className="flex items-center gap-6 shrink-0">
            {/* Profile / Account */}
            <AuthTrigger />

            {/* Shopping Cart Button */}
            <CartButton itemCount={0} totalPrice="৳ 0.00" />
          </div>
        </div>
      </div>

      {/* ── Desktop Navigation Menu Bar ── */}
      <nav className="bg-dark-base border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center">
            {navItems.map((item) => {
              const active = isActive(item.href);
              // dropdown এর কোনো child active হলে parent কেও highlight করব
              const childActive = item.children?.some((c) => pathname.startsWith(c.href));
              const highlighted = active || childActive;

              return (
                <li key={item.label} className="relative group">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                      highlighted
                        ? "bg-primary text-white"
                        : "text-slate-200 hover:bg-primary hover:text-white"
                    }`}
                  >
                    {item.label}
                    {item.children && (
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="w-3 h-3 opacity-70 group-hover:rotate-180 transition-transform duration-200"
                      />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.children && (
                    <ul className="absolute left-0 top-full z-50 min-w-52 bg-white border border-slate-200 shadow-xl rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 py-1.5">
                      {item.children.map((child) => {
                        const childIsActive = pathname === child.href || pathname.startsWith(child.href + "/");
                        return (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              className={`block px-4 py-2 text-sm transition-colors ${
                                childIsActive
                                  ? "bg-primary-soft text-primary font-semibold"
                                  : "text-slate-700 hover:bg-primary-soft hover:text-primary"
                              }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
}
