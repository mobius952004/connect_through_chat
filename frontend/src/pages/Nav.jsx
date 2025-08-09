import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "flowbite"


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate=useNavigate()

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white border-b border-gray-700/50 backdrop-blur-sm relative overflow-hidden">
      {/* Subtle background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/5 via-transparent to-emerald-900/5 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                YourSite
              </h1>
              <p className="text-xs text-gray-400 -mt-1">Premium Platform</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-300 hover:text-green-400 transition-colors duration-200 font-medium">
              Home
            </a>
            <a href="#features" className="text-gray-300 hover:text-green-400 transition-colors duration-200 font-medium">
              Features
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-green-400 transition-colors duration-200 font-medium">
              Pricing
            </a>
            <a href="#about" className="text-gray-300 hover:text-green-400 transition-colors duration-200 font-medium">
              About
            </a>
            <a href="#contact" className="text-gray-300 hover:text-green-400 transition-colors duration-200 font-medium">
              Contact
            </a>
          </div>

          {/* Right side: Auth buttons and mobile menu button */}
          <div className="flex items-center space-x-3">
            {/* Auth Buttons - Always visible */}
            <button onClick={()=>navigate("/connect/login")} className="px-3 py-2 text-gray-300 hover:text-green-400 transition-colors duration-200 font-medium text-sm sm:text-base">
              Login
            </button>
            <button onClick={()=>navigate("/connect/signup")} className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/20 transform hover:scale-[1.02] text-sm sm:text-base">
              Sign Up
            </button>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-green-400 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800/50"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Only navigation links */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800/95 backdrop-blur-sm border-t border-gray-700/50">
          <div className="px-4 pt-4 pb-6 space-y-3">
            <a href="#home" className="block text-gray-300 hover:text-green-400 transition-colors duration-200 font-medium py-2">
              Home
            </a>
            <a href="#features" className="block text-gray-300 hover:text-green-400 transition-colors duration-200 font-medium py-2">
              Features
            </a>
            <a href="#pricing" className="block text-gray-300 hover:text-green-400 transition-colors duration-200 font-medium py-2">
              Pricing
            </a>
            <a href="#about" className="block text-gray-300 hover:text-green-400 transition-colors duration-200 font-medium py-2">
              About
            </a>
            <a href="#contact" className="block text-gray-300 hover:text-green-400 transition-colors duration-200 font-medium py-2">
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}