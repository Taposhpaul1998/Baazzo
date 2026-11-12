import Image from "next/image";
import HeroSliderWrapper from "./HeroSliderWrapper";

const promoImages = [
  {
    src: "/Banner-Treadmill.png",
    alt: "Shop treadmills at Baazzo",
  },
  {
    src: "/Banner-Magnetic-Bike.png",
    alt: "Shop magnetic bikes at Baazzo",
  },
];

export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6 md:py-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[2fr_1fr]">
        {/* Main Slider */}
        <div
          className="relative overflow-hidden rounded-xl bg-dark-base"
          style={{ height: "clamp(16rem, 42vw, 34rem)" }}
        >
          <HeroSliderWrapper />
        </div>

        {/* Promo Images — 2-col on mobile, stacked on desktop */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-1 md:grid-rows-2">
          {promoImages.map((image) => (
            <div
              key={image.src}
              className="relative overflow-hidden rounded-xl bg-dark-base min-h-36 md:min-h-0"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 767px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
