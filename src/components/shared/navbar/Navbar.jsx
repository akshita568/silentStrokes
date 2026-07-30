import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiAlignJustify, FiLogOut, FiUser } from "react-icons/fi";
import { LuCommand } from "react-icons/lu";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
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
    navigate("/");
    toast.success("Successfully Logout");
  };

  // Shared classes for navigation links
  const linkStyles = "text-text-main hover:text-olive transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-olive hover:after:w-full after:transition-all after:duration-300";

  return (
    <nav className="sticky top-0 z-50 w-full bg-base-white py-4 border-b border-sand shadow-sm transition-all">
      <div className="flex w-full items-center justify-between px-6 md:px-10">
        
        {/* FAR LEFT: silentStrokes Logo */}
        <div className="flex-shrink-0">
          <Link className="flex items-center" to="/">
            <span className="text-xl md:text-2xl tracking-wide">
              <span className="font-light text-dove">silent</span>
              <span className="font-semibold text-text-main">Strokes</span>
            </span>
          </Link>
        </div>

        {/* CENTER: Desktop Links */}
        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center gap-8 font-medium text-sm">
            <li><NavLink to="/" className={linkStyles}>Home</NavLink></li>
            <li><NavLink to="/events" className={linkStyles}>Gallery</NavLink></li>
            <li><NavLink to="/booking" className={linkStyles}>Commissions</NavLink></li>
            <li><NavLink to="/shop" className={linkStyles}>Shop</NavLink></li>
            <li><NavLink to="/about" className={linkStyles}>About</NavLink></li>
            <li><NavLink to="/portfolio" className={linkStyles}>Portfolio</NavLink></li>
            {/* Added Contact Link Here */}
            <li><NavLink to="/contact" className={linkStyles}>Contact</NavLink></li>
          </ul>
        </div>

        {/* FAR RIGHT: Auth, Profile & Mobile Toggle */}
        <div className="flex-shrink-0 flex justify-end items-center gap-4">
          
          {user ? (
            <div className="relative flex items-center">
              <img
                ref={imgRef}
                onClick={handleDropDown}
                src={user?.image}
                className="rounded-full w-9 h-9 cursor-pointer border-2 border-sand object-cover hover:border-mint transition-colors"
                alt="User Profile"
              />
              <ul
                ref={dropdownRef}
                className={`absolute top-14 py-2 px-1 z-[1000] m-0 min-w-max overflow-hidden rounded-lg border border-sand bg-base-white text-left text-base shadow-lg w-44 ${
                  dropdownOpen ? "block right-0" : "hidden"
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
                  <Link to="/dashboard/profile" className="rounded w-full bg-transparent px-4 py-2 text-sm text-text-main hover:bg-sand/30 flex items-center gap-2">
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
          ) : (
            <div className="hidden sm:flex items-center gap-4">
              <Link to="/login" className="text-xs font-semibold uppercase tracking-wider text-dove hover:text-text-main transition-colors">
                Login
              </Link>
              <Link to="/register" className="rounded-full bg-olive px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm hover:bg-olive/90 transition-all hover:shadow-md">
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
          <li><NavLink to="/events" onClick={() => setCollapse(false)} className="text-text-main">Gallery</NavLink></li>
          <li><NavLink to="/booking" onClick={() => setCollapse(false)} className="text-text-main">Commissions</NavLink></li>
          <li><NavLink to="/shop" onClick={() => setCollapse(false)} className="text-text-main">Shop</NavLink></li>
          <li><NavLink to="/about" onClick={() => setCollapse(false)} className="text-text-main">About</NavLink></li>
          <li><NavLink to="/portfolio" onClick={() => setCollapse(false)} className="text-text-main">Portfolio</NavLink></li>
          <li><NavLink to="/contact" onClick={() => setCollapse(false)} className="text-text-main">Contact</NavLink></li>
          
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