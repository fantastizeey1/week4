import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path
      ? "text-blue-500"
      : "text-gray-400 hover:text-white";
  };

  return (
    <header className="bg-gray-800 w-full px-10 text-white p-4 flex items-center">
      <Link to="/" className="text-2xl font-bold w-1/2">
        <img
          src="/fantastizeey-logo-trans.png"
          alt="Logo"
          className="h-8 w-auto"
        />
      </Link>
      <nav className="hidden md:flex space-x-24 justify-around">
        <Link to="/api/advice-slip" className={isActive("/api/advice-slip")}>
          Advice-slip
        </Link>
        <Link to="/api/joke-api" className={isActive("/api/joke-api")}>
          Jokes-api
        </Link>
        <Link
          to="/api/countries-api"
          className={isActive("/api/countries-api")}
        >
          Countries-api
        </Link>
        <Link to="/api/nasa-api" className={isActive("/api/nasa-api")}>
          Nasa-api
        </Link>
      </nav>
      <div className="relative md:hidden">
        <button
          onClick={toggleDropdown}
          className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          aria-haspopup="true"
          aria-expanded={dropdownOpen}
        >
          {dropdownOpen ? (
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
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
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
          )}
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-20 transition-all duration-300 ease-in-out">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <Link
                to="/api/advice-slip"
                className={`block px-4 py-2 ${isActive(
                  "/api/advice-slip"
                )} hover:bg-gray-700`}
                role="menuitem"
              >
                Advice-slip
              </Link>
              <Link
                to="/api/joke-api"
                className={`block px-4 py-2 ${isActive(
                  "/api/joke-api"
                )} hover:bg-gray-700`}
                role="menuitem"
              >
                Jokes-api
              </Link>
              <Link
                to="/api/countries-api"
                className={`block px-4 py-2 ${isActive(
                  "/api/countries-api"
                )} hover:bg-gray-700`}
                role="menuitem"
              >
                Countries-api
              </Link>
              <Link
                to="/api/nasa-api"
                className={`block px-4 py-2 ${isActive(
                  "/api/nasa-api"
                )} hover:bg-gray-700`}
                role="menuitem"
              >
                Nasa-api
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
