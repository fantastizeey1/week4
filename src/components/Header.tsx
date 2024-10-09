import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        <img src="/path-to-your-logo.png" alt="Logo" className="h-8 w-auto" />
      </Link>
      <nav className="hidden md:flex space-x-4">
        <Link to="/option1" className="hover:underline">
          Option 1
        </Link>
        <Link to="/option2" className="hover:underline">
          Option 2
        </Link>
        <Link to="/option3" className="hover:underline">
          Option 3
        </Link>
      </nav>
      <div className="relative md:hidden">
        <button
          onClick={toggleDropdown}
          className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          aria-haspopup="true"
          aria-expanded={dropdownOpen}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <Link
                to="/option1"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                role="menuitem"
              >
                Option 1
              </Link>
              <Link
                to="/option2"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                role="menuitem"
              >
                Option 2
              </Link>
              <Link
                to="/option3"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                role="menuitem"
              >
                Option 3
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
