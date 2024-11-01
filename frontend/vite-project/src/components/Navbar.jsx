// Navbar.jsx

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { useColorMode } from "@chakra-ui/react";

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  const [activeSection, setActiveSection] = useState('home');
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      
      const homeElement = document.getElementById('home');
      const aboutElement = document.getElementById('about');
      const findSpaceElement = document.getElementById('find-space');
      const rentSpaceElement = document.getElementById('rent-space');

      if (window.scrollY == 0 || window.scrollY < homeElement.offsetTop) {
        setActiveSection("home");
      } else if (window.scrollY < aboutElement.offsetTop) {
        setActiveSection("about");
      } else if (window.scrollY < findSpaceElement.offsetTop) {
        setActiveSection("find-space");
      } else if (window.scrollY < rentSpaceElement.offsetTop) {
        setActiveSection("rent-space");
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection, scrollPosition]);

  return (
    <nav className="fixed border-4 border-red-500  w-full bg-gradient-to-b from-black to-gray-900 backdrop-blur-md z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-3"
          >
            {/* <img
              src={Logo} // replace with the path to your logo image
              alt="Plotex Logo"
              className="h-8 w-8"
            /> */}
            <span className="text-xl font-bold text-white">
              Plotex
            </span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className={`text-sm font-medium transition-colors ${activeSection === 'home' ? 'text-blue-600' : 'text-white hover:text-blue-600'}`}>
              Home
            </a>
            <a href="#about" className={`text-sm font-medium transition-colors ${activeSection === 'about' ? 'text-blue-600' : 'text-white hover:text-blue-600'}`}>
              About Us
            </a>
            <a href="#find-space" className={`text-sm font-medium transition-colors ${activeSection === 'find-space' ? 'text-blue-600' : 'text-white hover:text-blue-600'}`}>
              Find Space
            </a>
            <a href="#rent-space" className={`text-sm font-medium transition-colors ${activeSection === 'rent-space' ? 'text-blue-600' : 'text-white hover:text-blue-600'}`}>
              Rent Your Space
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;