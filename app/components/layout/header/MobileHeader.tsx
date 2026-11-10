"use client";

import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
  faBars,
  faChevronDown,
  faPhone,
  faSearch,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CartButton from "./CartButton";
import { navItems } from "./navData";

export default function MobileHeader() {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setSearchOpen(false);
    }
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <div className="lg:hidden font-body bg-white border-b border-slate-200 relative">
      {/* ── Main Mobile Header Bar ── */}
      <div className="px-4 py-3 flex items-center justify-between gap-2">
        {/* Logo */}
        <Link href="/" className="shrink-0" onClick={closeDrawer}>
          <span className="text-2xl font-heading font-extrabold text-primary tracking-tight">
            Baazzo
          </span>
        </Link>

        {/* Right Action Icons: Search Icon + Profile + Cart + Hamburger */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* 1. Search Icon Toggle */}
          <button
            type="button"
            aria-label="Toggle search bar"
            onClick={() => {
              setSearchOpen((prev) => !prev);
              if (drawerOpen) setDrawerOpen(false);
            }}
            className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
              searchOpen
                ? "text-primary bg-primary-soft"
                : "text-slate-700 hover:text-primary active:bg-slate-100"
            }`}
          >
            <FontAwesomeIcon icon={searchOpen ? faTimes : faSearch} className="w-4 h-4" />
          </button>

          {/* 2. Profile Icon */}
          <Link
            href="/profile"
            aria-label="Account Profile"
            onClick={closeDrawer}
            className="w-9 h-9 flex items-center justify-center text-slate-700 hover:text-primary active:bg-slate-100 rounded-lg transition-colors"
          >
            <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
          </Link>

          {/* 3. Shopping Cart with Top-Right Badge */}
          <CartButton itemCount={0} isMobile={true} />

          {/* 4. Hamburger Menu Toggle Button */}
          <button
            type="button"
            aria-label="Open navigation menu"
            onClick={() => {
              setDrawerOpen(true);
              setSearchOpen(false);
            }}
            className="w-9 h-9 flex items-center justify-center text-slate-700 hover:text-primary active:bg-slate-100 rounded-lg transition-colors ml-0.5"
          >
            <FontAwesomeIcon icon={faBars} className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ── Collapsible Mobile Search Bar with Smooth Animation ── */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out bg-slate-50 ${
          searchOpen
            ? "max-h-24 opacity-100 border-t border-slate-200 px-4 py-2.5"
            : "max-h-0 opacity-0 border-t-0 px-4 py-0"
        }`}
      >
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search fitness equipment, sports…"
              className="w-full px-3.5 py-2 text-sm text-slate-800 placeholder:text-slate-400 bg-white border border-slate-300 rounded-lg outline-none focus:border-primary shadow-xs"
            />
          </div>
          <button
            type="submit"
            className="bg-primary hover:bg-primary-hover active:bg-primary text-white px-4 py-2 text-sm font-medium rounded-lg transition-colors shrink-0 shadow-xs"
          >
            Search
          </button>
        </form>
      </div>

      {/* ── Mobile Navigation Drawer Backdrop & Slide Panel ── */}
      {/* 1. Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 ${
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeDrawer}
        aria-hidden={!drawerOpen}
      />

      {/* 2. Slide-Over Drawer Panel */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-[84%] max-w-sm bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Mobile Navigation Menu"
      >
        {/* Drawer Header (Logo & X Close Button) */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <Link
            href="/"
            className="text-2xl font-heading font-extrabold text-primary tracking-tight"
            onClick={closeDrawer}
          >
            Baazzo
          </Link>
          <button
            type="button"
            aria-label="Close menu drawer"
            onClick={closeDrawer}
            className="w-9 h-9 flex items-center justify-center text-slate-500 hover:text-primary active:bg-slate-200/60 rounded-lg transition-colors"
          >
            <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Menu List */}
        <nav className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {navItems.map((item) => (
            <div key={item.label} className="text-sm">
              {item.children ? (
                <div>
                  <div className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition-colors">
                    <Link
                      href={item.href}
                      className="font-medium text-slate-800 hover:text-primary transition-colors flex-1"
                      onClick={closeDrawer}
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      aria-label={`Toggle ${item.label} sub-menu`}
                      onClick={() => toggleDropdown(item.label)}
                      className="p-2 text-slate-400 hover:text-primary transition-colors"
                    >
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Sub-items accordion */}
                  {openDropdown === item.label && (
                    <div className="bg-slate-50 border-t border-slate-100 py-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-8 py-2.5 text-sm text-slate-600 hover:text-primary hover:bg-primary-soft transition-colors"
                          onClick={closeDrawer}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="block px-5 py-3.5 font-medium text-slate-800 hover:text-primary hover:bg-slate-50 transition-colors"
                  onClick={closeDrawer}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Drawer Footer: Hotline & WhatsApp Support Links */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2.5 text-xs text-slate-600">
          <a
            href="tel:01635701781"
            onClick={closeDrawer}
            className="flex items-center gap-2 hover:text-primary transition-colors group"
          >
            <FontAwesomeIcon icon={faPhone} className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition-transform" />
            <span>Hotline: <strong className="text-slate-800">01635-701781</strong></span>
          </a>
          <a
            href="https://wa.me/8801635701781"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeDrawer}
            className="flex items-center gap-2 hover:text-emerald-600 transition-colors group"
          >
            <FontAwesomeIcon icon={faWhatsapp} className="w-3.5 h-3.5 text-emerald-500 group-hover:scale-110 transition-transform" />
            <span>WhatsApp: <strong className="text-slate-800">01635-701781</strong></span>
          </a>
        </div>
      </aside>
    </div>
  );
}
