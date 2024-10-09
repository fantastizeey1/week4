import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface ApodData {
  title: string;
  url: string;
  explanation: string;
}

const Apod: React.FC = () => {
  const [data, setData] = useState<ApodData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://api.nasa.gov/planetary/apod?api_key=${
          import.meta.env.VITE_NASA_API_KEY
        }`
      )
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return data ? (
    <div className="apod p-4">
      <h2 className="text-2xl font-bold">{data.title}</h2>
      <img
        src={data.url}
        alt={data.title}
        className="w-full mb-4 rounded-lg shadow-md"
      />
      <p>{data.explanation}</p>
      <div className="text-center mt-4">
        <Link to={`/more-photos/apod`} className="text-blue-500 underline">
          See More
        </Link>
      </div>
    </div>
  ) : (
    <p>Failed to load data.</p>
  );
};

export default Apod;
