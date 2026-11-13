import { useRef, useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiAlignJustify, FiLogOut, FiUser } from "react-icons/fi";
import { LuCommand } from "react-icons/lu";

import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { CartContext } from "../../../context/CartProvider";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext) || { cart: [] };
  const navigate = useNavigate();

  const [dropdownOpen, setDropDown] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const imgRef = useRef();
  const dropdownRef = useRef();

  window.addEventListener("click", (e) => {
    if (e.target !== dropdownRef.current && e.target !== imgRef.current) {
      setDropDown(false);
    }
  });

  const handleDropDown = () => {
    setDropDown(!dropdownOpen);
  };

  const logOutHandler = () => {
    logout();
    navigate("/login");
    toast.success("Successfully Logged Out");
  };

  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || user?.email || "User")}&background=7B8E61&color=F9F6F0`;
  const profileImage = user?.photoURL || user?.image || defaultAvatar;

  const getLinkClass = ({ isActive }) =>
    `text-xs font-black uppercase tracking-widest transition-all duration-150 py-1 border-b-2 ${
      isActive
        ? "text-theme-dark border-theme-dark"
        : "text-theme-dark/75 hover:text-theme-dark border-transparent hover:border-theme-dark/40"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FDF5E6] border-b-2 border-theme-dark/40 shadow-sm transition-colors">
      <nav className="flex w-full items-center justify-between px-4 sm:px-8 py-3">
        <div className="flex-shrink-0">
          <Link className="flex items-center gap-2 group" to="/">
            <span className="text-xl md:text-2xl tracking-tight font-black uppercase text-theme-dark flex items-center">
              <span className="font-serif italic font-normal lowercase">silent</span>STROKES
              <span className="text-sm ml-1 text-theme-orange inline-block group-hover:rotate-45 transition-transform">✿</span>
            </span>
          </Link>
        </div>

        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center gap-6 xl:gap-8">
            <li><NavLink to="/" className={getLinkClass}>Home</NavLink></li>
            <li><NavLink to="/portfolio" className={getLinkClass}>Gallery</NavLink></li>
            <li><NavLink to="/booking" className={getLinkClass}>Commissions</NavLink></li>
            <li><NavLink to="/shop" className={getLinkClass}>Shop</NavLink></li>
            <li><NavLink to="/about" className={getLinkClass}>About</NavLink></li>
            <li><NavLink to="/contact" className={getLinkClass}>Contact</NavLink></li>
          </ul>
        </div>

        <div className="flex-shrink-0 flex justify-end items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link 
                to="/my-cart" 
                className="relative p-1.5 text-theme-dark hover:bg-theme-orange/20 transition-colors rounded-full border-2 border-theme-dark shadow-sm"
                title="View Saved Vault"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                {cart.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-theme-orange text-theme-dark text-[10px] font-black px-1.5 py-0.2 rounded-full border border-theme-dark">
                    {cart.length}
                  </span>
                )}
              </Link>

              <div className="relative flex items-center border-l-2 border-theme-dark/40 pl-4">
                <img
                  ref={imgRef}
                  onClick={handleDropDown}
                  src={profileImage}
                  className="rounded-full w-8 h-8 cursor-pointer border-2 border-theme-dark object-cover shadow-sm hover:scale-105 transition-transform"
                  alt="User Profile"
                  onError={(e) => { e.target.src = defaultAvatar; }}
                />
                
                <ul
                  ref={dropdownRef}
                  className={`absolute top-11 py-2 px-1.5 z-[1000] m-0 min-w-[190px] overflow-hidden rounded-2xl border-2 border-theme-dark bg-theme-cream text-left text-xs shadow-soft right-0 space-y-1 ${
                    dropdownOpen ? "block" : "hidden"
                  }`}
                >
                  <div className="px-3 py-1 border-b-2 border-theme-dark/20 mb-1">
                    <span className="font-bold text-theme-dark block truncate">
                      {user?.displayName || "Studio Guest"}
                    </span>
                    <span className="text-[10px] text-theme-dark/70 truncate block">
                      {user?.email}
                    </span>
                  </div>

                  {user?.role === "admin" && (
                    <li>
                      <Link to="/studio-door" className="rounded-lg w-full px-2.5 py-1.5 font-black uppercase tracking-wider text-theme-dark hover:bg-theme-olive hover:text-theme-dark flex items-center gap-2">
                        <LuCommand size={14} /> Studio Door
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link to="/profile" className="rounded-lg w-full px-2.5 py-1.5 font-black uppercase tracking-wider text-theme-dark hover:bg-theme-olive hover:text-theme-dark flex items-center gap-2">
                      <FiUser size={14} /> Profile
                    </Link>
                  </li>
                  <li>
                    <button onClick={logOutHandler} className="rounded-lg w-full px-2.5 py-1.5 font-black uppercase tracking-wider text-theme-dark hover:bg-theme-orange hover:text-theme-dark flex items-center gap-2 cursor-pointer">
                      <FiLogOut size={14} /> Log Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2.5">
              <Link 
                to="/login" 
                className="px-4 py-1.5 rounded-full border-2 border-theme-dark text-theme-dark hover:bg-theme-dark hover:text-theme-cream text-xs font-black uppercase tracking-wider transition-all duration-150"
              >
                Log In
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-1.5 rounded-full bg-theme-dark text-theme-cream hover:bg-theme-olive hover:text-theme-dark text-xs font-black uppercase tracking-wider shadow-soft transition-all duration-150 border-2 border-theme-dark"
              >
                Sign Up
              </Link>
            </div>
          )}

          <button
            onClick={() => setCollapse(!collapse)}
            className="p-1.5 text-theme-dark lg:hidden rounded-full border-2 border-theme-dark shadow-sm"
            aria-label="Toggle Menu"
          >
            <FiAlignJustify size={20} />
          </button>
        </div>
      </nav>

      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-theme-cream border-b-[3px] border-theme-dark shadow-soft transition-all duration-200 ${
          collapse ? "opacity-100 visible py-4" : "opacity-0 invisible h-0 py-0"
        }`}
      >
        <ul className="flex flex-col gap-2 px-6 font-medium text-xs">
          <li><NavLink to="/" onClick={() => setCollapse(false)} className={getLinkClass}>Home</NavLink></li>
          <li><NavLink to="/portfolio" onClick={() => setCollapse(false)} className={getLinkClass}>Gallery</NavLink></li>
          <li><NavLink to="/booking" onClick={() => setCollapse(false)} className={getLinkClass}>Commissions</NavLink></li>
          <li><NavLink to="/shop" onClick={() => setCollapse(false)} className={getLinkClass}>Shop</NavLink></li>
          <li><NavLink to="/about" onClick={() => setCollapse(false)} className={getLinkClass}>About</NavLink></li>
          <li><NavLink to="/contact" onClick={() => setCollapse(false)} className={getLinkClass}>Contact</NavLink></li>
          {user && <li><NavLink to="/my-cart" onClick={() => setCollapse(false)} className={getLinkClass}>My Cart ({cart.length})</NavLink></li>}
          {!user && (
            <li className="flex gap-3 pt-3 border-t-2 border-theme-dark/20 mt-2">
              <Link to="/login" onClick={() => setCollapse(false)} className="flex-1 text-center py-2 rounded-full border-2 border-theme-dark text-theme-dark font-black uppercase tracking-wider text-xs">
                Log In
              </Link>
              <Link to="/register" onClick={() => setCollapse(false)} className="flex-1 text-center py-2 rounded-full bg-theme-dark text-theme-cream font-black uppercase tracking-wider text-xs shadow-solid border-2 border-theme-dark">
                Sign Up
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;

