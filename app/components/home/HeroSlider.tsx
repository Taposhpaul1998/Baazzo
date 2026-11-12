"use client";

import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const heroSlides = [
  { src: "/Site-banner.png", alt: "Baazzo featured products" },
  { src: "/Banner-Treadmill.png", alt: "Baazzo treadmill collection" },
  { src: "/Banner-Magnetic-Bike.png", alt: "Baazzo magnetic bike collection" },
  { src: "/banner-sport.png", alt: "Baazzo sports collection" },
];

export default function HeroSlider() {
  return (
    <Swiper
      modules={[Autoplay]}
      loop={true}
      autoplay={{
        delay: 4500,
        disableOnInteraction: false,
      }}
      className="hero-swiper h-full w-full"
    >
      {heroSlides.map((slide, index) => (
        <SwiperSlide key={slide.src} className="relative h-full w-full">
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="(max-width: 767px) 100vw, 66vw"
            className="object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
