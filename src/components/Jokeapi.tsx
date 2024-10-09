import React, { useState, useEffect } from "react";
import axios from "axios";

interface Joke {
  id: string;
  joke: string;
}

const Jokeapi: React.FC = () => {
  const [joke, setJoke] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Joke>("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      });
      setJoke(response.data.joke);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="joke p-6 bg-gradient-to-br from-gray-800 to-black rounded-lg shadow-xl max-w-md mx-auto mt-10">
      <h2 className="text-3xl font-bold text-pink-400 mb-6 text-center">
        Joke of the Day
      </h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 border-t-4 border-pink-500 rounded-full"></div>
        </div>
      ) : (
        <p className="text-lg text-white mb-6 text-center transition-opacity duration-300 ease-in-out opacity-100">
          &quot;{joke}&quot;
        </p>
      )}
      <button
        onClick={fetchJoke}
        className="bg-pink-500 text-white p-3 rounded-lg shadow-lg hover:bg-pink-400 transition duration-300 w-full"
      >
        Get Another Joke
      </button>
    </div>
  );
};

export default Jokeapi;
