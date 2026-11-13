import HeroSection from "./components/home/HeroSection";
import LatestProducts from "./components/home/LatestProducts";

export default async function Home() {
  return (
    <>
      <HeroSection />
      {/* <CategorySlider /> */}
      <LatestProducts />
    </>
  );
}
