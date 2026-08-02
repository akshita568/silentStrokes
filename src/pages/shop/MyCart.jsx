import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/container/Container';
import { CartContext } from '../../context/CartProvider';

export default function Cart() {
  const cartContext = useContext(CartContext) || {};
  const cart = cartContext.cart || [];
  const removeFromCart = cartContext.removeFromCart || (() => {});

  return (
    <div className="min-h-screen bg-base-white text-text-main font-sans pb-32 pt-24">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="border-b border-sand pb-6 mb-12 flex justify-between items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-olive mb-2 block">Collector Space</span>
              <h1 className="text-3xl md:text-4xl font-serif text-text-main">Inquiry Vault</h1>
            </div>
            <span className="text-sm text-dove">{cart.length} {cart.length === 1 ? 'item' : 'items'} saved</span>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-24 bg-sand/10 rounded-sm border border-sand">
              <p className="text-dove font-serif italic mb-6">Your vault is currently empty.</p>
              <Link 
                to="/shop" 
                className="inline-block px-6 py-3 bg-text-main text-base-white text-[10px] font-bold uppercase tracking-widest hover:bg-olive transition-colors"
              >
                Explore Services
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item._id || item.id} className="bg-sand/10 p-6 rounded-sm border border-sand flex items-center justify-between gap-6 shadow-sm">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-base-white overflow-hidden border border-sand shrink-0">
                      <img src={item.image || item.src} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-text-main">{item.title}</h3>
                      <p className="text-xs text-olive uppercase tracking-widest mt-1">{item.category || item.price || "Custom Commission"}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item._id || item.id)}
                    className="text-xs text-dove hover:text-text-main uppercase tracking-widest underline underline-offset-4 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <div className="pt-8 border-t border-sand flex flex-col sm:flex-row justify-between items-center gap-6">
                <p className="text-sm text-dove font-serif italic">
                  Ready to move forward with your saved brief?
                </p>
                <Link 
                  to="/booking" 
                  className="px-8 py-4 bg-text-main text-base-white text-xs font-bold uppercase tracking-widest hover:bg-olive transition-colors shadow-sm"
                >
                  Submit Official Brief →
                </Link>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}