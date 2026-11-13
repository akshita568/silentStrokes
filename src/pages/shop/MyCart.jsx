import { useContext } from "react";
import { Link } from "react-router-dom";

import Container from "../../components/container/Container";
import { CartContext } from "../../context/CartProvider";
import { Daisy, Squiggle } from "../../components/decorative/BotanicalMotifs";

export default function Cart() {
  const cartContext = useContext(CartContext) || {};
  const cart = cartContext.cart || [];
  const removeFromCart = cartContext.removeFromCart || (() => {});

  return (
    <div className="min-h-screen bg-theme-cream text-theme-dark font-sans pb-12 pt-6 md:pt-8 relative overflow-hidden">
      <div className="absolute top-8 right-8 pointer-events-none opacity-40 hidden sm:block">
        <Daisy className="w-16 h-16" petalColor="#F9F6F0" centerColor="#F0A868" strokeColor="#2D2D2D" />
      </div>

      <Container>
        <div className="max-w-2xl mx-auto relative z-10">
          <div className="border-b-2 border-theme-dark pb-4 mb-8 flex justify-between items-end">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-theme-dark mb-1 block">
                COLLECTOR VAULT
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-theme-dark uppercase tracking-tight">
                INQUIRY VAULT
              </h1>
              <div className="mt-1">
                <Squiggle className="w-16 h-2" color="#2D2D2D" />
              </div>
            </div>
            <span className="text-xs font-black text-theme-dark bg-theme-orange px-3 py-1 rounded-full border-2 border-theme-dark shadow-[2px_2px_0px_#2D2D2D]">
              {cart.length} {cart.length === 1 ? "ITEM" : "ITEMS"} SAVED
            </span>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-12 bg-[#FAF7F2] rounded-3xl border-[3px] border-theme-dark shadow-solid p-6 space-y-3">
              <div className="text-3xl text-theme-dark">✿</div>
              <p className="text-theme-dark font-black uppercase text-base">Your inquiry vault is currently empty.</p>
              <p className="text-xs text-theme-dark/80 max-w-sm mx-auto font-medium">Browse available commissions and artwork tiers to save your favorites.</p>
              <div className="pt-2">
                <Link 
                  to="/shop" 
                  className="inline-block px-6 py-2.5 bg-theme-dark text-theme-cream text-xs font-black uppercase tracking-wider rounded-full shadow-solid hover:bg-theme-orange hover:text-theme-dark transition-all border-2 border-theme-dark"
                >
                  Explore Studio Tiers
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item._id || item.id} className="bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl border-[3px] border-theme-dark flex items-center justify-between gap-4 shadow-solid">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-theme-cream rounded-none overflow-hidden border-2 border-theme-dark shrink-0 shadow-inner flex items-center justify-center p-0.5">
                      <img src={item.image || item.src} alt={item.title} className="w-full h-full object-contain rounded-none filter contrast-[1.02]" />
                    </div>
                    <div>
                      <h3 className="font-black text-base text-theme-dark uppercase tracking-tight">{item.title}</h3>
                      <p className="text-[11px] text-theme-dark/80 font-bold uppercase tracking-wider mt-0.5">{item.category || item.price || "Custom Commission"}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item._id || item.id)}
                    className="text-xs text-theme-dark hover:text-theme-orange font-black uppercase tracking-wider cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <div className="pt-6 border-t-2 border-theme-dark/20 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-xs text-theme-dark font-medium">
                  Ready to book with your saved artwork selections?
                </p>
                <Link 
                  to="/booking" 
                  className="px-6 py-2.5 bg-theme-dark text-theme-cream text-xs font-black uppercase tracking-wider rounded-full shadow-solid hover:bg-theme-orange hover:text-theme-dark transition-all border-2 border-theme-dark"
                >
                  Book Commission Slot →
                </Link>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

