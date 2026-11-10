import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faClock, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TopBar() {
  return (
    <div className="bg-dark-base text-slate-300 text-xs border-b border-dark-border py-2 font-body">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
        {/* Left: Hotline & WhatsApp */}
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
          {/* Hotline */}
          <a
            href="tel:01777336134"
            className="flex items-center gap-1.5 hover:text-primary-light transition-colors group"
          >
            <FontAwesomeIcon
              icon={faPhone}
              className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition-transform"
            />
            <span>Hotline: <strong className="font-semibold text-slate-200">01635-701781</strong></span>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/01635701781"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors group"
          >
            <FontAwesomeIcon
              icon={faWhatsapp}
              className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform"
            />
            <span>WhatsApp: <strong className="font-semibold text-slate-200">01635-701781</strong></span>
          </a>
        </div>

        {/* Right: Working Hours */}
        <div className="flex items-center gap-1.5 text-slate-300">
          <FontAwesomeIcon icon={faClock} className="w-3.5 h-3.5 text-primary" />
          <span>Support Hours: <strong className="font-semibold text-slate-200">10:00 AM – 9:00 PM</strong></span>
        </div>
      </div>
    </div>
  );
}
