import React, { useState, useEffect } from "react";
import axios from "axios";

interface Country {
  name: {
    common: string;
    official: string;
  };
  region: string;
  population: number;
  flags: {
    png: string;
    svg: string;
  };
  capital: string[];
  languages: { [key: string]: string };
  subregion: string;
}

const Countriesapi: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [region, setRegion] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  useEffect(() => {
    axios
      .get<Country[]>("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const handleFavoriteToggle = (name: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(name)
        ? prevFavorites.filter((fav) => fav !== name)
        : [...prevFavorites, name]
    );
  };

  const handleCountryClick = (country: Country) => {
    setSelectedCountry(country);
  };

  const handleCloseModal = () => {
    setSelectedCountry(null);
  };

  const filteredCountries = countries
    .filter((country) => (region === "all" ? true : country.region === region))
    .filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.population - b.population
        : b.population - a.population
    );

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="countries p-6 bg-gradient-to-br from-gray-800 to-black rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-pink-400 mb-4 text-center">
        Countries
      </h2>
      <div className="mb-4 flex flex-col md:flex-row md:justify-between">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search for a country..."
          className="border border-pink-400 p-2 mb-2 md:mb-0 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
        />
        <select
          value={region}
          onChange={handleRegionChange}
          className="border border-pink-400 p-2 mb-2 md:mb-0 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
        >
          <option value="all">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="border border-pink-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
        >
          <option value="asc">Sort by Population: Ascending</option>
          <option value="desc">Sort by Population: Descending</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCountries.map((country) => (
          <div
            key={country.name.common}
            className="country-card p-4 bg-gray-900 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            onClick={() => handleCountryClick(country)}
          >
            <img
              src={country.flags.png}
              alt={`${country.name.common} Flag`}
              className="w-full mb-2 rounded-lg"
            />
            <h3 className="text-xl font-semibold text-pink-300 mb-2 text-center">
              {country.name.common}
            </h3>
            <p className="text-white">
              <strong>Population:</strong> {country.population.toLocaleString()}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevents triggering the country click
                handleFavoriteToggle(country.name.common);
              }}
              className={`mt-2 p-1 rounded ${
                favorites.includes(country.name.common)
                  ? "bg-red-600"
                  : "bg-blue-500"
              } text-white`}
            >
              {favorites.includes(country.name.common)
                ? "Unfavorite"
                : "Favorite"}
            </button>
          </div>
        ))}
      </div>

      {selectedCountry && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="modal-content bg-gray-800 rounded-lg p-6 w-11/12 max-w-lg">
            <h2 className="text-2xl font-bold text-pink-400">
              {selectedCountry.name.common}
            </h2>
            <p>
              <strong>Official Name:</strong> {selectedCountry.name.official}
            </p>
            <p>
              <strong>Region:</strong> {selectedCountry.region}
            </p>
            <p>
              <strong>Subregion:</strong> {selectedCountry.subregion}
            </p>
            <p>
              <strong>Population:</strong>{" "}
              {selectedCountry.population.toLocaleString()}
            </p>
            <p>
              <strong>Capital:</strong>{" "}
              {Array.isArray(selectedCountry.capital) &&
              selectedCountry.capital.length > 0
                ? selectedCountry.capital.join(", ")
                : "No capital available"}
            </p>
            <p>
              <strong>Languages:</strong>{" "}
              {Object.values(selectedCountry.languages).join(", ")}
            </p>
            <button
              onClick={handleCloseModal}
              className="mt-4 bg-red-500 text-white p-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Countriesapi;
