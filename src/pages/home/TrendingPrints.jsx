import { useContext } from 'react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Container from '../../components/container/Container';
import { CartContext } from "../../context/CartProvider"; // ⚠️ Adjust this path if needed

const TrendingPrints = () => {
  // Bring in the addToCart function from our global state
  const { addToCart } = useContext(CartContext);

  // Mock data for smaller items in the carousel
  const prints = [
    { _id: "10", title: "Abstract Form I", price: "$150", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1000&auto=format&fit=crop" },
    { _id: "11", title: "Charcoal Study", price: "$85", image: "https://images.unsplash.com/photo-1594897030264-ab7d87efc473?q=80&w=1000&auto=format&fit=crop" },
    { _id: "12", title: "Watercolor Wash", price: "$110", image: "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?q=80&w=1000&auto=format&fit=crop" },
    { _id: "13", title: "Geometric Balance", price: "$95", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop" },
    { _id: "14", title: "Minimalist Line", price: "$70", image: "https://images.unsplash.com/photo-1534081333815-68f95fe85fce?q=80&w=1000&auto=format&fit=crop" },
  ];

  return (
    <div className="bg-sand/10 py-24 border-y border-sand">
      <Container>
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          <div className="w-full md:w-1/3 text-center md:text-left">
            <h3 className="text-xs font-bold uppercase tracking-widest text-olive mb-3">
              Limited Editions
            </h3>
            <h1 className="text-3xl md:text-4xl font-light text-text-main leading-tight mb-6">
              Trending <span className="font-semibold">Prints</span>
            </h1>
            <p className="text-dove text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Archival quality fine art prints, signed and numbered. A beautiful and accessible way to bring art into your everyday space.
            </p>
          </div>
          
          <div className="w-full md:w-2/3">
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
              }}
              modules={[Pagination]}
              className="mySwiper pb-12"
            >
              {prints.map((print) => (
                <SwiperSlide key={print._id}>
                  <div className="group bg-base-white p-3 border border-sand shadow-sm hover:shadow-md transition-shadow flex flex-col">
                    <div className="aspect-square overflow-hidden mb-4 cursor-pointer">
                      <img 
                        src={print.image} 
                        alt={print.title} 
                        className="w-full h-full object-cover filter grayscale-[10%] group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    
                    <div className="text-center pb-2 flex flex-col items-center">
                      <h4 className="text-sm font-semibold text-text-main">{print.title}</h4>
                      <p className="text-xs text-olive mt-1 mb-4">{print.price}</p>
                      
                      {/* ADD TO CART BUTTON */}
                      <button 
                        onClick={() => addToCart(print)}
                        className="px-5 py-2 text-[10px] font-bold uppercase tracking-widest border border-sand text-text-main hover:bg-olive hover:text-white hover:border-olive transition-all rounded-sm w-full"
                      >
                        Add to List
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          
        </div>
      </Container>
    </div>
  );
};

export default TrendingPrints;