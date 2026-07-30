import Organizer from "./heroSlider/Organizer/Organizer"; 
import HeroSlider from "./heroSlider/HeroSlider"; 
import FeaturedArtworks from "./FeaturedArtworks"; 
import TrendingPrints from "./TrendingPrints"; 
import AllServices from "../bookings/allServices/AllServices";

const Home = () => {
  return (
    <div className="bg-base-white min-h-screen">
      {/* 1. The grand entrance */}
      <HeroSlider />

      {/* 2. Top-tier original pieces (CSS Grid) */}
      <FeaturedArtworks />

      {/* 3. The Artist Statement */}
      <Organizer />

      {/* 4. Swiper Carousel for smaller prints/sketches */}
      <TrendingPrints />

      {/* 5. Studio Services (Replacing the old Booking section) */}
      <AllServices />
      
    </div>
  );
};

export default Home;