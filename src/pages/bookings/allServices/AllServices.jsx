import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../../../components/container/Container";

const AllServices = () => {
  const services = [
    {
      id: 1,
      title: "Original Collection",
      description: "Explore the main gallery featuring my latest original canvases. Each piece is crafted with intention, exploring texture, emotion, and stillness.",
      link: "/events", // We will rename this route to /gallery later
      linkText: "View Originals",
      image: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?q=80&w=2020&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Bespoke Commissions",
      description: "Work directly with me to create a custom piece tailored perfectly to your space, color palette, and personal vision.",
      link: "/booking", // We will rename this route to /commissions later
      linkText: "Request a Commission",
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2000&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Limited Edition Prints",
      description: "Museum-quality, archival fine art prints of my most popular works. A perfect and accessible way to start or grow your art collection.",
      link: "/shop",
      linkText: "Shop Prints",
      image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2008&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Studio & Exhibitions",
      description: "Interested in featuring my work in a gallery, collaborating on a project, or scheduling a private studio visit? Let's connect.",
      link: "/contact",
      linkText: "Get in Touch",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-24 bg-base-white">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h3 className="text-xs font-bold uppercase tracking-widest text-dove mb-3">
            Studio Offerings
          </h3>
          <h2 className="text-3xl md:text-4xl font-light text-text-main">
            Curated <span className="font-semibold">Services</span>
          </h2>
          <p className="mt-4 text-dove font-light leading-relaxed">
            From acquiring original canvases to collaborating on custom pieces, discover the different ways to collect and experience my work.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="group flex flex-col bg-base-white border border-sand hover:border-olive transition-colors duration-300"
            >
              {/* Image Container with Grayscale Hover Reveal */}
              <div className="aspect-[4/3] overflow-hidden relative border-b border-sand">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transform transition-all duration-700 group-hover:scale-105"
                />
              </div>
              
              {/* Content Block */}
              <div className="p-8 md:p-10 flex flex-col flex-grow">
                <h3 className="text-2xl font-semibold text-text-main mb-3">
                  {service.title}
                </h3>
                <p className="text-dove font-light leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>
                
                <Link 
                  to={service.link}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-olive group-hover:text-mint transition-colors mt-auto w-max"
                >
                  {service.linkText} <AiOutlineArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default AllServices;