import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../../components/container/Container";

const FeaturedArtworks = () => {
  // Mock data to replace the broken backend server
  const artworks = [
    {
      _id: "1",
      title: "Midnight Serenity",
      category: "Oil on Canvas",
      price: "$1,200",
      image: "https://images.unsplash.com/photo-1579783902614-a3f140020184?q=80&w=1000&auto=format&fit=crop"
    },
    {
      _id: "2",
      title: "Golden Hour",
      category: "Acrylic & Texture",
      price: "$850",
      image: "https://images.unsplash.com/photo-1580136608260-4eb11f4b24fe?q=80&w=1000&auto=format&fit=crop"
    },
    {
      _id: "3",
      title: "Whispering Pines",
      category: "Mixed Media",
      price: "$1,500",
      image: "https://images.unsplash.com/photo-1578301978693-85fa9c026f19?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-24 bg-base-white">
      <Container>
        {/* Gallery Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-sand pb-6">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-dove mb-2">Curated Selection</h2>
            <h3 className="text-3xl md:text-4xl font-light text-text-main">
              Featured <span className="font-semibold">Artworks</span>
            </h3>
          </div>
          
          <Link
            to="/events"
            className="hidden md:flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-olive hover:text-mint transition-colors"
          >
            View Full Gallery <AiOutlineArrowRight size={18} />
          </Link>
        </div>

        {/* CSS Grid for the Art Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {artworks.map((art) => (
            <div key={art._id} className="group cursor-pointer">
              <div className="aspect-[4/5] overflow-hidden bg-sand/20 mb-4">
                <img 
                  src={art.image} 
                  alt={art.title} 
                  className="w-full h-full object-cover filter grayscale-[30%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-semibold text-text-main">{art.title}</h4>
                  <p className="text-xs text-dove uppercase tracking-widest mt-1">{art.category}</p>
                </div>
                <p className="text-olive font-medium">{art.price}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile View All Button */}
        <div className="mt-12 flex justify-center md:hidden">
          <Link
            to="/events"
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-olive hover:text-mint transition-colors"
          >
            View Full Gallery <AiOutlineArrowRight size={16} />
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedArtworks;