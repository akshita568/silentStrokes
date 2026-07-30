import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./banner.css"; 
// Replace these with high-res photos of your art or studio
import img1 from "./image/img1.png";
import img2 from "./image/img2.png";
import img3 from "./image/img3.png";
import img4 from "./image/img4.png";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isNext, setIsNext] = useState(false);
  const [isPrev, setIsPrev] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 3 ? 0 : prevSlide + 1));
    setIsNext(true);
    setIsPrev(false);
    setTimeout(() => setIsNext(false), 500); 
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? 3 : prevSlide - 1));
    setIsPrev(true);
    setIsNext(false);
    setTimeout(() => setIsPrev(false), 500); 
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 4500); // Slowed down slightly to 4.5s so people can admire the art
    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <div className="relative">
      <div className={`carousel ${isNext ? "next" : ""} ${isPrev ? "prev" : ""}`}>
        <div className="list">
          {[img1, img2, img3, img4].map((img, index) => (
            <div
              className="item"
              key={index}
              style={{ display: currentSlide === index ? "block" : "none" }}
            >
              {/* Darkened slightly so the white text pops */}
              <img
                className="brightness-[0.70] object-cover"
                src={img}
                alt={`Artwork ${index + 1}`}
              />

              <div className="content">
                <div>
                  <div className="mb-4">
                    <p className="text-sm lg:text-base tracking-[0.3em] uppercase text-sand font-medium">
                      silentStrokes Studio
                    </p>
                  </div>
                  <div className="my-2">
                    <h1 className="text-4xl lg:text-7xl font-light text-base-white tracking-wide leading-tight">
                      Capturing <br /> <span className="font-bold">Emotion</span>
                    </h1>
                  </div>
                  <div className="my-6">
                    <p className="text-mint text-sm lg:text-lg tracking-widest uppercase font-semibold">
                      Original Canvases & Commissions
                    </p>
                  </div>
                  <div className="w-full max-w-xl hidden lg:block mt-6">
                    <p className="text-base-white/90 text-lg font-light leading-relaxed">
                      Explore a curated collection of contemporary pieces designed to bring depth, stillness, and intention to your space.
                    </p>
                  </div>
                </div>

                <Link to="/events">
                  <button
                    type="button"
                    className="mt-10 lg:mt-12 text-white bg-olive hover:bg-olive/90 transition-all font-semibold uppercase tracking-widest rounded-full text-xs lg:text-sm px-10 py-4 shadow-sm hover:shadow-md"
                  >
                    Enter Gallery
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Thumbnails */}
        <div className="thumbnail">
          {[img1, img2, img3, img4].map((img, index) => (
            <div
              key={index}
              className={`item cursor-pointer transition-all duration-300 ${
                currentSlide === index ? "border-2 rounded-2xl border-sand scale-105" : "opacity-60 hover:opacity-100"
              }`}
              onClick={() => setCurrentSlide(index)}
            >
              <img src={img} alt={`Thumbnail ${index + 1}`} className="rounded-xl object-cover h-full w-full" />
            </div>
          ))}
        </div>

        {/* Arrows */}
        <div className="arrows">
          <button id="prev" onClick={prevSlide} className="hover:bg-olive hover:text-white transition-colors">
            {"<"}
          </button>
          <button id="next" onClick={nextSlide} className="hover:bg-olive hover:text-white transition-colors">
            {">"}
          </button>
        </div>
        <div className="time bg-mint"></div>
      </div>
    </div>
  );
};

export default HeroSlider;