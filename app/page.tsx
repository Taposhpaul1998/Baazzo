import CategorySlider from "./components/home/CategorySlider";
import HeroSection from "./components/home/HeroSection";
import LatestProducts from "./components/home/LatestProducts";
import TrendingProducts from "./components/home/TrendingProducts";

export default async function Home() {
  return (
    <>
      <HeroSection />
      <CategorySlider />
      <LatestProducts />
      <TrendingProducts />
    </>
  );
}
