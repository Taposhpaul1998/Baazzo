import TopBar from "./TopBar";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

export default function Header() {
  return (
    <header className="w-full shadow-xs sticky top-0 z-40 bg-white">
      {/* 1. Top Bar (Hotline, WhatsApp, Support Hours) */}
      <TopBar />

      {/* 2. Desktop Header (Logo, Search, Account, Cart + Nav Menu) */}
      <DesktopHeader />

      {/* 3. Mobile Header (Logo, Search Icon, Account, Cart + Hamburger Menu) */}
      <MobileHeader />
    </header>
  );
}
