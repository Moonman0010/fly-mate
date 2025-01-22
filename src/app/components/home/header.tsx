"use client";
import { useState } from "react";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
    return (
      <header className="flex items-center justify-between px-6 md:px-10 lg:px-12 py-4 bg-transparent shadow-md">
      {/* Logo Section */}
      <div className="flex items-center gap-4">
        <img src="/icon.ico" alt="Fly Mate Logo" width={40} height={40} />
        <h1 className="text-xl md:text-3xl font-bold">Fly Mate</h1>
      </div>

      {/* Navigation Links for Larger Screens */}
      <nav className="hidden md:flex gap-6">
        <a
          href="#tagline"
          className="text-base md:text-lg font-medium transition ease-in-out duration-300 hover:bg-gray-500 px-3 py-2 rounded-md active:bg-blue-100 active:text-blue-600"
        >
          Home
        </a>
        <a
          href="#features"
          className="text-base md:text-lg font-medium transition ease-in-out duration-300 hover:bg-gray-500 px-3 py-2 rounded-md active:bg-blue-100 active:text-blue-600"
        >
          Features
        </a>
        <a
          href="#contact"
          className="text-base md:text-lg font-medium transition ease-in-out duration-300 hover:bg-gray-500 px-3 py-2 rounded-md active:bg-blue-100 active:text-blue-600"
        >
          Contact
        </a>
      </nav>

      {/* Hamburger Menu Button for Mobile */}
      <button
        className="text-lg font-bold md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-transparent shadow-lg">
          <nav className="flex flex-col gap-4 px-6 py-4">
            <a
              href="#tagline"
              className="text-base font-medium hover:text-blue-500"
              onClick={() => setIsOpen(false)} // Close menu on click
            >
              Home
            </a>
            <a
              href="#features"
              className="text-base font-medium hover:text-blue-500"
              onClick={() => setIsOpen(false)}
            >
              Features
            </a>
            <a
              href="#contact"
              className="text-base font-medium hover:text-blue-500"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
    );
  };

  export default Header;