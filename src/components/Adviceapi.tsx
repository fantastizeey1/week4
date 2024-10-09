import React, { useState, useEffect } from "react";
import axios from "axios";

interface Advice {
  slip: {
    id: number;
    advice: string;
  };
}

const Adviceapi: React.FC = () => {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [history, setHistory] = useState<string[]>([]);

  const fetchAdvice = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Advice>(
        "https://api.adviceslip.com/advice"
      );
      const newAdvice = response.data.slip.advice;
      // Check if the new advice is already in the history
      if (!history.includes(newAdvice)) {
        setHistory((prevHistory) => [newAdvice, ...prevHistory]);
      }
      setAdvice(newAdvice);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []); // Run only once when the component mounts

  return (
    <div className="advice p-6 bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-xl max-w-md mx-auto mt-10">
      <h2 className="text-3xl font-bold text-pink-400 mb-6 text-center">
        Advice Slip
      </h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-t-4 border-pink-500 rounded-full"></div>
        </div>
      ) : (
        <p className="text-lg text-white mb-6 text-center transition-opacity duration-300 ease-in-out opacity-100">
          &quot;{advice}&quot;
        </p>
      )}
      <button
        onClick={fetchAdvice}
        className="bg-pink-500 text-white p-3 rounded-lg shadow-lg hover:bg-pink-400 transition duration-300 w-full"
      >
        Get Another Advice
      </button>
      <div className="mt-8">
        <h3 className="text-xl font-bold text-pink-400 mb-2">Advice History</h3>
        <ul className="list-disc list-inside">
          {history.map((item, index) => (
            <li
              key={index}
              className="text-gray-300 mb-1 hover:text-pink-400 transition duration-300"
            >
              &quot;{item}&quot;
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Adviceapi;
