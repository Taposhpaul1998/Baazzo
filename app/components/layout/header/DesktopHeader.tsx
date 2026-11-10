"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { navItems } from "./navData";
import CartButton from "./CartButton";

export default function DesktopHeader() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

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
          <form
            onSubmit={handleSearch}
            className="flex-1 max-w-2xl flex items-center border-2 border-slate-200 focus-within:border-primary rounded-lg overflow-hidden bg-white shadow-sm transition-colors"
          >
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search fitness gear, treadmills, sports items…"
              className="flex-1 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
            />
            <button
              type="submit"
              aria-label="Search"
              className="bg-primary hover:bg-primary-hover transition-colors px-6 py-2.5 text-white flex items-center justify-center font-medium"
            >
              <FontAwesomeIcon icon={faSearch} className="w-4 h-4 mr-2" />
              <span>Search</span>
            </button>
          </form>

          {/* Right Actions: Profile & Cart */}
          <div className="flex items-center gap-6 shrink-0">
            {/* Profile / Account */}
            <Link
              href="/profile"
              className="flex items-center gap-2 text-slate-700 hover:text-primary transition-colors text-sm font-medium"
            >
              <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-primary-soft hover:text-primary transition-colors">
                <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left text-xs leading-tight">
                <span className="text-slate-400 font-normal">Welcome,</span>
                <span className="text-slate-700 font-semibold text-sm">Account</span>
              </div>
            </Link>

            {/* Shopping Cart Button */}
            <CartButton itemCount={0} totalPrice="৳ 0.00" />
          </div>
        </div>
      </div>

      {/* ── Desktop Navigation Menu Bar ── */}
      <nav className="bg-dark-base border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center">
            {navItems.map((item) => (
              <li key={item.label} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center gap-1.5 px-4 py-3 text-sm font-medium text-slate-200 hover:bg-primary hover:text-white transition-colors whitespace-nowrap"
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
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          className="block px-4 py-2 text-sm text-slate-700 hover:bg-primary-soft hover:text-primary transition-colors"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}
