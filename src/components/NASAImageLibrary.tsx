import React, { useState, useEffect } from "react";
import axios from "axios";

interface NASAImage {
  nasa_id: string;
  title: string;
  date_created: string;
  description: string;
  href: string;
}

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
    <div className="nasa-image-library p-4">
      <h2 className="text-2xl font-bold mb-4">NASA Image Library</h2>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for images..."
          className="border p-2 mr-2"
        />
        <select
          value={mediaType}
          onChange={(e) => setMediaType(e.target.value)}
          className="border p-2"
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value="audio">Audio</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 ml-2">
          Search
        </button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {images.map((image) => (
            <div key={image.nasa_id} className="image-card">
              <img
                src={image.href}
                alt={image.title}
                className="w-full mb-2 rounded-lg shadow-md"
              />
              <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
              <p>{image.date_created}</p>
              <p>{image.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NASAImageLibrary;
