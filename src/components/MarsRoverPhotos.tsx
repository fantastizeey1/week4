import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Photo {
  id: number;
  img_src: string;
  earth_date: string;
  camera: {
    full_name: string;
  };
}

const MarsRoverPhotos: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${
          import.meta.env.VITE_NASA_API_KEY
        }`
      )
      .then((response) => {
        setPhotos(response.data.photos.slice(0, 6)); // Show only 3 photos initially
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="mars-photos p-4">
      <h2 className="text-4xl text-center font-bold mb-8">Mars Rover Photos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-4">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-card">
            <img
              src={photo.img_src}
              alt={`Mars Rover`}
              className="w-[300px] h-[300px]    mb-2 rounded-lg shadow-md"
            />
            <p className="text-[18px] text-gray-600">
              {photo.camera.full_name}
            </p>
            <p className="text-sm text-pink-600">{photo.earth_date}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <Link to={`/more-photos/mars`} className="text-blue-500 underline">
          See More
        </Link>
      </div>
    </div>
  );
};

export default MarsRoverPhotos;
