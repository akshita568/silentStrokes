import HeroSlider from "./heroSlider/HeroSlider"; 
import StudioProcess from "./StudioProcess"; 
import BespokeCommissions from "./BespokeCommissions"; 
import DoodleFrame from "../../components/DoodleFrame";

const Home = () => {
  return (
    <div className="bg-base-white min-h-screen pb-16 md:pb-24">
      <HeroSlider />

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 mt-10 space-y-10 md:mt-20 md:space-y-20">
        
        <DoodleFrame>
          <StudioProcess />
        </DoodleFrame>

        <DoodleFrame>
          <BespokeCommissions />
        </DoodleFrame>
        
      </div>
    </div>
  );
};

export default Home;