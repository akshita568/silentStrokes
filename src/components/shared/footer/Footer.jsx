import { Link } from "react-router-dom";
import Container from "../../container/Container";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  };

  return (
    <footer className="bg-base-white border-t border-sand mt-20">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 py-12">
          
          {/* Left Column: Logo & About */}
          <div>
            <div className="flex justify-center sm:justify-start">
              <Link className="flex items-center" to="/" onClick={scrollToTop}>
                <span className="text-2xl tracking-wide">
                  <span className="font-light text-dove">silent</span>
                  <span className="font-semibold text-text-main">Strokes</span>
                  <span className="text-mint font-bold">.</span>
                </span>
              </Link>
            </div>
            <p className="mt-6 max-w-md text-center text-sm leading-relaxed text-dove sm:max-w-xs sm:text-left">
              Curating contemporary art and bespoke commissions. Explore the gallery to find pieces that speak to your space, crafted with intention and emotion.
            </p>
            
            {/* Social Icons */}
            <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
              <li>
                <a href="/" rel="noreferrer" target="_blank" className="text-dove transition-colors hover:text-olive">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </li>
              
            </ul>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:pl-16">
            
            {/* Middle Column: Links */}
            <div className="text-center sm:text-left">
              <p className="text-xs font-bold uppercase tracking-widest text-text-main">
                Explore
              </p>
              <ul className="mt-8 space-y-4 text-sm">
                <li onClick={scrollToTop}>
                  <Link to="/events" className="text-dove transition-colors hover:text-olive">
                    Gallery
                  </Link>
                </li>
                <li onClick={scrollToTop}>
                  <Link to="/booking" className="text-dove transition-colors hover:text-olive">
                    Commissions
                  </Link>
                </li>
                <li onClick={scrollToTop}>
                  <Link to="/shop" className="text-dove transition-colors hover:text-olive">
                    Shop
                  </Link>
                </li>
                <li onClick={scrollToTop}>
                  <Link to="/contact" className="text-dove transition-colors hover:text-olive">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Right Column: Contact Details */}
            <div className="text-center sm:text-left">
              <p className="text-xs font-bold uppercase tracking-widest text-text-main">
                Studio
              </p>
              <ul className="mt-8 space-y-4 text-sm">
                <li className="flex items-center justify-center sm:justify-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 text-dove" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:artsydaisies56@gmail.com" className="text-dove transition-colors hover:text-olive">
                    artsydaisies56@gmail.com
                  </a>
                </li>

                
                <li className="flex items-start justify-center sm:justify-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 text-dove mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <address className="not-italic text-dove leading-relaxed">
                    Himachal Pradesh <br /> India
                  </address>
                </li>
              </ul>
            </div>
            
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-8 border-t border-sand py-8">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-sm text-dove">
              <span className="block sm:inline">All rights reserved.</span>
            </p>
            <p className="mt-4 text-sm text-dove sm:order-first sm:mt-0">
              © {new Date().getFullYear()} silentStrokes Art
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;