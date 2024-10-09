import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-8">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">
        Oops! The page you're looking for got lost in space.
      </p>
      <img
        src="https://media.cnn.com/api/v1/images/stellar/prod/221122124230-02-good-night-oppy-mars-film.jpg?q=w_2000,c_fill/f_webp"
        className="w-1/3  h-1/3 mb-8"
      />
      <Link
        to="/"
        className="text-blue-500 text-lg underline hover:text-blue-700"
      >
        Take me back to Earth
      </Link>
    </div>
  );
};

export default NotFound;
