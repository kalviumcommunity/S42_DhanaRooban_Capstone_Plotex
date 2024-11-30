import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const elements = [
  { id: 'home', title: 'Home' },
  { id: 'about', title: 'About Us' },
  { id: 'find-space', title: 'Find Space' },
  { id: 'rent-space', title: 'Rent Your Space' }
];

function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 80;
      elements.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
            setActiveSection(id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full ${colorMode === 'dark' ? 'bg-gray-900' : 'bg-white'} transition-colors border-b shadow-md z-50`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand Name */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3"
          >
            <div className="w-8 h-8">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`w-full h-full ${colorMode === 'dark' ? 'text-white' : 'text-gray-800'}`}
              >
                <path
                  d="M16 2L2 8L16 14L30 8L16 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 16L16 22L30 16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 24L16 30L30 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className={`text-xl font-bold ${colorMode === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              Plotex
            </span>
          </motion.div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <AnimatePresence initial={false}>
              {elements.map((element, index) => (
                <motion.a
                  key={`nav-link-${index}`}
                  href={`#${element.id}`}
                  className={`text-sm font-medium transition-all ${
                    activeSection === element.id
                      ? 'text-blue-500 underline'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  aria-current={activeSection === element.id ? 'page' : undefined}
                >
                  {element.title}
                </motion.a>
              ))}
            </AnimatePresence>
          </div>

          {/* Mobile Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full focus:outline-none"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`w-6 h-6 ${colorMode === 'dark' ? 'text-white' : 'text-gray-800'}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16m-7 6h7" 
                />
              </svg>
            </button>

            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleColorMode} 
              className={`w-10 h-10 flex items-center justify-center rounded-full ${
                colorMode === 'dark' ? 'text-white' : 'text-gray-800'
              }`}
            >
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`absolute top-16 left-0 right-0 ${colorMode === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg md:hidden`}
          >
            <div className="flex flex-col items-center space-y-6 py-4">
              {elements.map((element) => (
                <a
                  key={element.id}
                  href={`#${element.id}`}
                  className={`text-lg ${activeSection === element.id ? 'text-blue-500' : 'text-gray-600 hover:text-blue-600'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {element.title}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;