"use client";

import { useState, useEffect } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="bg-yellow-300 shadow-md w-full z-20 sticky top-0">
      {/* Top Section */}
      <div className="flex items-center justify-between px-6 md:px-10 lg:px-12 py-4">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <img src="/icon.ico" alt="Fly Mate Logo" width={40} height={40} />
          <h1 className="text-xl md:text-3xl font-bold">Fly Mate</h1>
        </div>

        {/* Navigation Links for Larger Screens */}
        <nav className="hidden md:flex gap-6">
          <a
            href="/home"
            className="text-base md:text-lg font-medium transition ease-in-out duration-300 hover:bg-gray-500 px-3 py-2 rounded-md active:bg-blue-100 active:text-blue-600"
          >
            Home
          </a>
          <a
            href="/flightnumber"
            className="text-base md:text-lg font-medium transition ease-in-out duration-300 hover:bg-gray-500 px-3 py-2 rounded-md active:bg-blue-100 active:text-blue-600"
          >
            Flight Number
          </a>
          <a
            href="#contact"
            className="text-base md:text-lg font-medium transition ease-in-out duration-300 hover:bg-gray-500 px-3 py-2 rounded-md active:bg-blue-100 active:text-blue-600"
          >
            Contact
          </a>
        </nav>

        {/* Hamburger Menu Button */}
        <button
          className="text-lg font-bold md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          ☰
        </button>
      </div>

      {/* Dropdown Menu */}
      <div
        className={`bg-black shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[300px]" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-4 px-4 py-4">
          <a
            href="/home"
            className="text-white font-bold hover:bg-gray-500 px-3 py-2 transition rounded-md"
            onClick={() => setIsOpen(false)}
          >
            Home
          </a>
          <a
            href="/flightnumber"
            className="text-white font-bold hover:bg-gray-500 px-3 py-2 transition rounded-md"
            onClick={() => setIsOpen(false)}
          >
            Flight Number
          </a>
          <a
            href="#contact"
            className="text-white font-bold hover:bg-gray-500 px-3 py-2 transition rounded-md"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;

