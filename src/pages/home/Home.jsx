import HeroSlider from "./heroSlider/HeroSlider"; 
import StudioProcess from "./StudioProcess"; 
import BespokeCommissions from "./BespokeCommissions"; 
import DoodleFrame from "../../components/DoodleFrame"; // Adjust path if needed

const Home = () => {
  return (
    <div className="bg-base-white min-h-screen pb-24">
      {/* 1. The grand interactive entrance */}
      <HeroSlider />

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 mt-20 space-y-20">
        
        {/* 2. Interactive Process Showcase inside the beautiful frame */}
        <DoodleFrame>
          <StudioProcess />
        </DoodleFrame>

        {/* 3. The Core Business inside the beautiful frame */}
        <DoodleFrame>
          <BespokeCommissions />
        </DoodleFrame>
        
      </div>
    </div>
  );
};

export default Home;