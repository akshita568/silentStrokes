import { useRef, useState, useContext } from "react";
import toast from "react-hot-toast";
import { FiAlignJustify, FiLogOut, FiUser } from "react-icons/fi";
import { LuCommand } from "react-icons/lu";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../authProvider/AuthProvider"; // Adjust path if needed
import { CartContext } from "../../../context/CartProvider"; // Adjust path if needed

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext) || { cart: [] };
  const navigate = useNavigate();
  const [dropdownOpen, setDropDown] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const imgRef = useRef();
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
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

  // Profile image fallbacks
  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || user?.email || "User")}&background=random`;
  const profileImage = user?.photoURL || user?.image || defaultAvatar;

  // Shared classes for navigation links
  const linkStyles = "text-text-main hover:text-olive transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-olive hover:after:w-full after:transition-all after:duration-300 text-sm font-bold uppercase tracking-widest";

  return (
    <nav className="sticky top-0 z-50 w-full bg-base-white py-4 border-b border-sand shadow-sm transition-all">
      <div className="flex w-full items-center justify-between px-6 md:px-10">
        
        {/* FAR LEFT: silentStrokes Logo */}
        <div className="flex-shrink-0">
          <Link className="flex items-center" to="/">
            <span className="text-xl md:text-2xl tracking-wide font-serif">
              <span className="font-light text-dove">silent</span>
              <span className="font-semibold text-text-main">Strokes</span>
            </span>
          </Link>
        </div>

        {/* CENTER: Desktop Links */}
        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center gap-8">
            <li><NavLink to="/" className={linkStyles}>Home</NavLink></li>
            <li><NavLink to="/portfolio" className={linkStyles}>Gallery</NavLink></li>
            <li><NavLink to="/booking" className={linkStyles}>Commissions</NavLink></li>
            <li><NavLink to="/shop" className={linkStyles}>Shop</NavLink></li>
            <li><NavLink to="/about" className={linkStyles}>About</NavLink></li>
            <li><NavLink to="/contact" className={linkStyles}>Contact</NavLink></li>
          </ul>
        </div>

        {/* FAR RIGHT: Cart, Auth, Profile & Mobile Toggle */}
        <div className="flex-shrink-0 flex justify-end items-center gap-6">
          
          {user ? (
            <div className="flex items-center gap-6">
              
              {/* CART ICON */}
              <Link to="/my-cart" className="relative text-dove hover:text-olive transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-olive text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {cart.length}
                  </span>
                )}
              </Link>

              {/* PROFILE DROPDOWN CONTAINER */}
              <div className="relative flex items-center border-l border-sand pl-6">
                <img
                  ref={imgRef}
                  onClick={handleDropDown}
                  src={profileImage}
                  className="rounded-full w-9 h-9 cursor-pointer border-2 border-sand object-cover hover:border-olive transition-colors"
                  alt="User Profile"
                  onError={(e) => { e.target.src = defaultAvatar; }}
                />
                
                <ul
                  ref={dropdownRef}
                  className={`absolute top-12 py-2 px-1 z-[1000] m-0 min-w-max overflow-hidden rounded-sm border border-sand bg-base-white text-left text-base shadow-lg w-44 right-0 ${
                    dropdownOpen ? "block" : "hidden"
                  }`}
                >
                  {user?.role === "admin" && (
                    <li>
                      <Link to="/dashboard/admin" className="rounded w-full bg-transparent px-4 py-2 text-sm text-text-main hover:bg-sand/30 flex items-center gap-2">
                        <LuCommand size={15} /> Admin Dashboard
                      </Link>
                    </li>
                  )}
                  {user?.role === "user" && (
                    <li>
                      <Link to="/dashboard/user" className="rounded w-full bg-transparent px-4 py-2 text-sm text-text-main hover:bg-sand/30 flex items-center gap-2">
                        <LuCommand size={15} /> User Dashboard
                      </Link>
                    </li>
                  )}
                  {user?.role === "organizer" && (
                    <li>
                      <Link to="/dashboard" className="rounded w-full bg-transparent px-4 py-2 text-sm text-text-main hover:bg-sand/30 flex items-center gap-2">
                        <LuCommand size={15} /> Artist Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link to="/profile" className="rounded w-full bg-transparent px-4 py-2 text-sm text-text-main hover:bg-sand/30 flex items-center gap-2">
                      <FiUser size={15} /> Profile
                    </Link>
                  </li>
                  <li>
                    <button onClick={logOutHandler} className="rounded w-full bg-transparent px-4 py-2 text-sm text-text-main hover:bg-sand/30 flex items-center gap-2">
                      <FiLogOut /> LogOut
                    </button>
                  </li>
                </ul>
              </div>

            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-4">
              <Link to="/login" className="text-xs font-bold uppercase tracking-widest text-dove hover:text-olive transition-colors">
                Log In
              </Link>
              <Link to="/register" className="px-5 py-2 bg-text-main text-base-white text-xs font-bold uppercase tracking-widest hover:bg-olive transition-colors rounded-sm">
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setCollapse(!collapse)}
            className="block px-2 text-text-main hover:text-olive lg:hidden transition-colors"
          >
            <FiAlignJustify size={24} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-base-white border-b border-sand shadow-lg transition-all duration-300 ease-in-out ${
          collapse ? "opacity-100 visible py-6" : "opacity-0 invisible h-0 py-0"
        }`}
      >
        <ul className="flex flex-col gap-5 px-8 font-medium text-sm">
          <li><NavLink to="/" onClick={() => setCollapse(false)} className="text-text-main">Home</NavLink></li>
          <li><NavLink to="/portfolio" onClick={() => setCollapse(false)} className="text-text-main">Gallery</NavLink></li>
          <li><NavLink to="/booking" onClick={() => setCollapse(false)} className="text-text-main">Commissions</NavLink></li>
          <li><NavLink to="/shop" onClick={() => setCollapse(false)} className="text-text-main">Shop</NavLink></li>
          <li><NavLink to="/about" onClick={() => setCollapse(false)} className="text-text-main">About</NavLink></li>
          <li><NavLink to="/contact" onClick={() => setCollapse(false)} className="text-text-main">Contact</NavLink></li>
          {user && <li><NavLink to="/my-cart" onClick={() => setCollapse(false)} className="text-text-main">My Cart</NavLink></li>}
          
          {!user && (
            <li className="flex flex-col gap-4 pt-5 border-t border-sand mt-2">
              <Link to="/login" className="text-text-main font-medium uppercase text-xs tracking-wider">Login</Link>
              <Link to="/register" className="text-olive font-medium uppercase text-xs tracking-wider">Sign Up</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;