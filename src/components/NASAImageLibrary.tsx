import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface NASAImage {
  nasa_id: string;
  title: string;
  date_created: string;
  description: string;
  href: string;
}

const Spinner: React.FC = () => (
  <div className="flex justify-center items-center h-32">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-b-4 border-transparent" />
  </div>
);

const NASAImageLibrary: React.FC = () => {
  const [images, setImages] = useState<NASAImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState<string>("mars");
  const [mediaType, setMediaType] = useState<string>("image");

  const fetchImages = (searchQuery: string, type: string) => {
    setLoading(true);
    axios
      .get(
        `https://images-api.nasa.gov/search?q=${searchQuery}&media_type=${type}`
      )
      .then((response) => {
        const imageResults = response.data.collection.items.map(
          (item: any) => ({
            nasa_id: item.data[0].nasa_id,
            title: item.data[0].title,
            date_created: item.data[0].date_created,
            description: item.data[0].description,
            href: item.links[0].href,
          })
        );
        setImages(imageResults.slice(0, 6)); // Limit to first 6 images
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchImages(query, mediaType);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchImages(query, mediaType);
  };

  return (
    <div className="nasa-image-library p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-4 text-center">
        NASA Image Library
      </h2>
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row mb-4 justify-center"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for images..."
          className="border border-gray-700 bg-gray-800 p-3 mr-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <select
          value={mediaType}
          onChange={(e) => setMediaType(e.target.value)}
          className="border border-gray-700 bg-gray-800 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value="audio">Audio</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-md ml-2 transition duration-200 hover:bg-blue-600"
        >
          Search
        </button>
      </form>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <div
              key={image.nasa_id}
              className="image-card bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-xl transition-shadow duration-200"
            >
              <img
                src={image.href}
                alt={image.title}
                className="w-full mb-2 rounded-lg object-cover transition-transform duration-200 hover:scale-105"
              />
              <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
              <p className="text-sm text-gray-400">
                {new Date(image.date_created).toLocaleDateString()}
              </p>
              <p className="text-gray-300">{image.description}</p>
            </div>
          ))}
        </div>
      )}
      <div className="text-center mt-4">
        <Link
          to={`/more-photos/ImageLibrary`}
          className="text-blue-500 underline"
        >
          See More
        </Link>
      </div>
    </div>
  );
};

export default NASAImageLibrary;
