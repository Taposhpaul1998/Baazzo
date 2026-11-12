"use client";

import Link from "next/link";
import {
  FaBicycle,
  FaChair,
  FaDumbbell,
  FaFutbol,
  FaTableTennisPaddleBall,
  FaTags,
} from "react-icons/fa6";
import { TbTreadmill } from "react-icons/tb";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const categories = [
  {
    label: "Treadmill",
    href: "/treadmill",
    icon: TbTreadmill,
    iconBg: "bg-orange-100",
    iconColor: "text-primary",
    borderHover: "hover:border-primary",
  },
  {
    label: "Exercise Bike",
    href: "/exercise-bike",
    icon: FaBicycle,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
    borderHover: "hover:border-blue-400",
  },
  {
    label: "Gym Equipment",
    href: "/gym-equipment",
    icon: FaDumbbell,
    iconBg: "bg-green-100",
    iconColor: "text-green-500",
    borderHover: "hover:border-green-400",
  },
  {
    label: "Sports",
    href: "/sports",
    icon: FaFutbol,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-500",
    borderHover: "hover:border-yellow-400",
  },
  {
    label: "Massage Chair",
    href: "/massage-chair",
    icon: FaChair,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-500",
    borderHover: "hover:border-purple-400",
  },
  {
    label: "Table Tennis",
    href: "/table-tennis",
    icon: FaTableTennisPaddleBall,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    borderHover: "hover:border-red-400",
  },
  {
    label: "Brands",
    href: "/brands",
    icon: FaTags,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-500",
    borderHover: "hover:border-slate-400",
  },
];

export default function CategorySlider() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6 md:py-8">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={16}
        slidesPerView={2}
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        breakpoints={{
          480: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <SwiperSlide key={cat.href}>
              <Link
                href={cat.href}
                className={`
                  group flex flex-col items-center justify-center gap-3
                  bg-white border-2 border-slate-100 rounded-2xl
                  px-4 py-6 md:py-8
                  transition-all duration-300
                  ${cat.borderHover}
                  hover:shadow-lg hover:shadow-black/8
                  hover:-translate-y-1
                `}
              >
                {/* Icon box */}
                <div
                  className={`
                    ${cat.iconBg} ${cat.iconColor}
                    flex items-center justify-center
                    w-14 h-14 md:w-16 md:h-16 rounded-xl
                    transition-transform duration-300
                    group-hover:scale-110
                  `}
                >
                  <Icon className="w-7 h-7 md:w-8 md:h-8" />
                </div>

                {/* Label */}
                <span
                  className="
                    text-sm md:text-base font-body font-semibold
                    text-slate-700 text-center leading-tight
                    transition-colors duration-200
                    group-hover:text-primary
                  "
                >
                  {cat.label}
                </span>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
