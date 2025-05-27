import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* 🔹 Topbar Section (Fixed in Original Position) */}
      <div className="bg-indigo-700 text-gray-200 py-2 px-5 justify-between items-center fixed top-0 left-0 right-0 w-full z-50 md:flex hidden transition-all duration-300">
        <div className="flex gap-4">
          <small className="flex items-center gap-2 text-sm">
            +91 12345 67890
          </small>
          <small className="flex items-center gap-2 text-sm">
            info@example.com
          </small>
        </div>
        <div className="flex gap-3">
          <a href="#" className="w-10 h-10 flex items-center justify-center bg-white text-blue-700 rounded-full transition hover:bg-yellow-300 hover:text-gray-700"></a>
          <a href="#" className="w-10 h-10 flex items-center justify-center bg-white text-blue-700 rounded-full transition hover:bg-yellow-300 hover:text-gray-700"></a>
          <a href="#" className="w-10 h-10 flex items-center justify-center bg-white text-blue-700 rounded-full transition hover:bg-yellow-300 hover:text-gray-700"></a>
        </div>
      </div>

      {/* 🔹 Topbar for Mobile View (Visible & Fixed) */}
      <div className="md:hidden bg-indigo-700 text-gray-200 py-2 px-5 fixed top-0 left-0 right-0 w-full z-50 flex justify-between items-center">
        <small className="flex items-center gap-2 text-xs">
          +91 12345 67890
        </small>
        <div className="flex gap-2">
          <a href="#" className="w-7 h-7 flex items-center justify-center bg-white text-blue-700 rounded-full transition hover:bg-yellow-300 hover:text-gray-700"></a>
          <a href="#" className="w-7 h-7 flex items-center justify-center bg-white text-blue-700 rounded-full transition hover:bg-yellow-300 hover:text-gray-700"></a>
          <a href="#" className="w-7 h-7 flex items-center justify-center bg-white text-blue-700 rounded-full transition hover:bg-yellow-300 hover:text-gray-700"></a>
        </div>
      </div>

      {/* 🔹 Navbar (No Gap Between Topbar & Navbar) */}
      <nav className="bg-gray-100 shadow-md py-2 fixed left-0 right-0 w-full z-50 transition-all duration-300 top-[40px] md:top-[50px]">
        <div className="flex justify-between items-center px-4 md:px-8 w-full flex-wrap">
          {/* 🔸 Logo */}
          <div className="text-xl md:text-2xl font-bold flex items-center">
            <Link to="/" className="whitespace-nowrap">
              <span className="text-pink-500">DSD</span>
              <span className="text-blue-500">SCHOOL</span>
            </Link>
          </div>

          {/* 🔸 Hamburger Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700 text-xl focus:outline-none">
              {menuOpen ? "X" : "≡"}
            </button>
          </div>

          {/* 🔸 Navigation Links */}
          <ul className={`md:flex md:space-x-6 font-semibold text-lg absolute md:static bg-gray-100 md:bg-transparent w-full md:w-auto left-0 md:flex-row flex-col items-center top-full transition-all duration-300 ease-in-out ${menuOpen ? "flex" : "hidden"}`}>
            <li><NavLink to="/" className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-gray-700 hover:text-blue-600"}>Home</NavLink></li>
            <li><NavLink to="/about" className="text-gray-700 hover:text-blue-600">About</NavLink></li>
            <li><NavLink to="/academics" className="text-gray-700 hover:text-blue-600">Academics</NavLink></li>
            <li><NavLink to="/events" className="text-gray-700 hover:text-blue-600">Events</NavLink></li>
            <li><NavLink to="/admission" className="text-gray-700 hover:text-blue-600">Admission</NavLink></li>
            <li><NavLink to="/contact" className="text-gray-700 hover:text-blue-600">Contact</NavLink></li>
            <li className="md:hidden w-full text-center mt-3 mb-5">
              <button className="bg-blue-700 text-white px-5 py-2 rounded-full text-lg font-semibold transition hover:bg-blue-900">
                <Link to="/login">Log in</Link>
              </button>
            </li>
          </ul>

          {/* 🔸 Login Button (Only in Desktop View) */}
          <button className="hidden md:block bg-blue-700 text-white px-5 py-2 rounded-full text-lg font-semibold transition hover:bg-blue-900" onClick={() => navigate("/login")}>
            Log in
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;
