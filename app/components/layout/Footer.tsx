import FooterNavigation from "./FooterNavigation";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 dark:bg-slate-950 text-slate-300 border-t border-slate-800 transition-colors font-body">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center md:text-left text-sm font-normal">
          <h3 className="text-lg font-heading font-semibold text-slate-100 tracking-tight">Contact Us</h3>
          <div className="mt-3 space-y-1.5 text-slate-400">
            <p>
              <span className="text-slate-300 font-medium">Phone:</span> 01635701781
            </p>
            <p>
              <span className="text-slate-300 font-medium">Email:</span>{" "}
              <a
                href="mailto:support@baazzo.com"
                className="hover:text-orange-400 transition-colors"
              >
                support@baazzo.com
              </a>
            </p>
          </div>
          <p className="mt-3 text-slate-400 leading-relaxed">
            236/2 commissioner goli, East Nakhalpara, Tejgaon, Dhaka 1215, Bangladesh
          </p>
        </div>

        <div className="flex md:justify-center">
          <FooterNavigation />
        </div>

        <div className="w-full overflow-hidden rounded-xl border border-slate-800 shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d29210.85986664403!2d90.37629065522049!3d23.770281223229393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s236%2F2%20commissioner%20goli%2C%20East%20Nakhalpara%2C%20Tejgoan%2C%20Dhaka%201215%2C%20Dhaka%2C%20Dhaka%20Division%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1793621698447!5m2!1sen!2sbd"
            width="100%"
            height="220"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Baazzo Office Location"
          />
        </div>
      </div>

      <div className="bg-slate-950 dark:bg-black border-t border-slate-800/80 text-center py-4">
        <p className="text-slate-400 text-xs sm:text-sm font-body font-medium">
          © 2026 Baazzo. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
