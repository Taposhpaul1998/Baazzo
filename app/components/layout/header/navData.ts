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
  {
    label: "Treadmill",
    href: "/treadmill",
    children: [
      { label: "Walking Pad", href: "/treadmill/walking-pad" },
      { label: "Manual Treadmill", href: "/treadmill/manual" },
      { label: "Motorized Treadmill", href: "/treadmill/motorized" },
      { label: "DC Motor Treadmill", href: "/treadmill/dc-motor" },
      { label: "AC Motor Treadmill", href: "/treadmill/ac-motor" },
    ],
  },
  {
    label: "Exercise Bike",
    href: "/exercise-bike",
    children: [
      { label: "Cross Trainer", href: "/exercise-bike/cross-trainer" },
      { label: "Exercise Bike", href: "/exercise-bike/standard" },
      { label: "Spinning Bike", href: "/exercise-bike/spinning" },
      { label: "Recumbent Bike", href: "/exercise-bike/recumbent" },
    ],
  },
  {
    label: "Gym Equipment",
    href: "/gym-equipment",
    children: [
      { label: "Home Gym", href: "/gym-equipment/home-gym" },
      { label: "Exercise Bench", href: "/gym-equipment/bench" },
      { label: "Dumbbells", href: "/gym-equipment/dumbbells" },
      { label: "Small Fitness", href: "/gym-equipment/small-fitness" },
    ],
  },
  {
    label: "Sports",
    href: "/sports",
    children: [
      { label: "Football Jersey", href: "/sports/jersey" },
      { label: "Indoor Sports", href: "/sports/indoor" },
      { label: "Outdoor Sports", href: "/sports/outdoor" },
    ],
  },
  { label: "Massage Chair", href: "/massage-chair" },
  { label: "Table Tennis", href: "/table-tennis" },
  {
    label: "Brands",
    href: "/brands",
    children: [
      { label: "Jogway", href: "/brands/jogway" },
      { label: "Oma", href: "/brands/oma" },
      { label: "Daily Youth", href: "/brands/daily-youth" },
    ],
  },
];
