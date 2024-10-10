import React, { useState, useEffect } from "react";
import axios from "axios";

interface Joke {
  id: string;
  type: string;
  joke?: string;
  setup?: string;
  delivery?: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  safe: boolean;
  category: string;
}

const Jokeapi: React.FC = () => {
  const [joke, setJoke] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [type, setType] = useState<string>("single");
  const [flags, setFlags] = useState<string[]>([]); // New state to store flags

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Joke>(
        `https://v2.jokeapi.dev/joke/Any?type=${type}`
      );
      const jokeData = response.data;

      // Handling both single and twopart joke types
      if (jokeData.type === "twopart") {
        setJoke(`${jokeData.setup} - ${jokeData.delivery}`);
      } else {
        setJoke(jokeData.joke || "No joke available.");
      }

      // Extract flags where the value is true
      const flagEntries = Object.entries(jokeData.flags);
      const activeFlags = flagEntries
        .filter(([_, value]) => value)
        .map(([key]) => key);

      setFlags(activeFlags); // Set the flags in state
    } catch (error) {
      console.error(error);
      setJoke("Oops, something went wrong! Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, [type]);

  return (
    <div className="joke-container p-8 bg-gray-900 mx-4 text-gray-300 rounded-xl shadow-lg max-w-lg md:mx-auto mt-10">
      <h2 className="text-4xl font-bold text-pink-400 mb-6 text-center tracking-wide">
        Joke of the Day
      </h2>
      <div className="mb-6 text-center">
        <label className="text-white text-lg mr-2">Select Joke Type:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded-md border border-gray-700 focus:ring-2 focus:ring-pink-400"
        >
          <option value="single">Single</option>
          <option value="twopart">Two-part</option>
        </select>
      </div>
      {loading ? (
        <div className="flex justify-center items-center mb-6">
          <div className="w-12 h-12 border-4 border-gray-700 border-t-4 border-pink-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div>
          <p className="text-xl font-medium text-white text-center mb-6">
            {joke ? `"${joke}"` : "No joke available at the moment."}
          </p>
          {flags.length > 0 && (
            <div className="text-sm text-red-400 text-center mb-6">
              <p>Warning: This joke contains:</p>
              <ul>
                {flags.map((flag, index) => (
                  <li key={index} className="capitalize">
                    {flag} Contents
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      <button
        onClick={fetchJoke}
        className="w-full bg-pink-600 text-white py-3 rounded-md shadow-md hover:bg-pink-500 transition duration-300 transform hover:scale-105"
      >
        Get Another Joke
      </button>
    </div>
  );
};

export default Jokeapi;
