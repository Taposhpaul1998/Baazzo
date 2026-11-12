"use client";

import dynamic from "next/dynamic";

// Dynamic import with ssr:false must live in a Client Component
const HeroSlider = dynamic(() => import("./HeroSlider"), { ssr: false });

export default function HeroSliderWrapper() {
  return <HeroSlider />;
}
