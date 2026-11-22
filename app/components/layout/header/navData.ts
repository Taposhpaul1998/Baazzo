export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  {
    label: "Treadmill",
    href: "/categories/treadmill",
    children: [
      { label: "Walking Pad", href: "/categories/walking-pad" },
      { label: "Manual Treadmill", href: "/categories/manual-treadmill" },
      { label: "Motorized Treadmill", href: "/categories/motorized-treadmill" },
      { label: "DC Motor Treadmill", href: "/categories/dc-motor-treadmill" },
      { label: "AC Motor Treadmill", href: "/categories/ac-motor-treadmill" },
    ],
  },
  {
    label: "Exercise Bike",
    href: "/categories/exercise-bike",
    children: [
      { label: "Cross Trainer", href: "/categories/cross-trainer" },
      { label: "Exercise Bike", href: "/categories/exercise-bike" },
      { label: "Spinning Bike", href: "/categories/spinning-bike" },
      { label: "Recumbent Bike", href: "/categories/recumbent-bike" },
    ],
  },
  {
    label: "Gym Equipment",
    href: "/categories/gym-equipment",
    children: [
      { label: "Home Gym", href: "/categories/home-gym" },
      { label: "Exercise Bench", href: "/categories/exercise-bench" },
      { label: "Dumbbells", href: "/categories/dumbbells" },
      { label: "Small Fitness", href: "/categories/small-fitness" },
    ],
  },
  {
    label: "Sports",
    href: "/categories/sports",
    children: [
      { label: "Football Jersey", href: "/categories/football-jersey" },
      { label: "Indoor Sports", href: "/categories/indoor-sports" },
      { label: "Outdoor Sports", href: "/categories/outdoor-sports" },
    ],
  },
  { label: "Table Tennis", href: "/categories/table-tennis" },
  { label: "Massage Chair", href: "/categories/massage-chair" },
];
