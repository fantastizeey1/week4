import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

interface Photo {
  id: string;
  img_src: string;
  earth_date: string;
  camera: {
    full_name: string;
  };
}

const MorePhotos: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  const apiMap: { [key: string]: string } = {
    mars: `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${
      import.meta.env.VITE_NASA_API_KEY
    }`,
    exoplanet: `https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=ps&api_key=${
      import.meta.env.VITE_NASA_API_KEY
    }`,
    neo: `https://api.nasa.gov/neo/rest/v1/feed?start_date=2024-01-01&end_date=2024-01-31&api_key=${
      import.meta.env.VITE_NASA_API_KEY
    }`,
  };

  useEffect(() => {
    if (type && apiMap[type]) {
      axios
        .get(apiMap[type])
        .then((response) => {
          let data: Photo[] = [];

          if (type === "mars") {
            data = response.data.photos.slice(0, 50).map((photo: any) => ({
              id: photo.id,
              img_src: photo.img_src,
              earth_date: photo.earth_date,
              camera: {
                full_name: photo.camera.full_name,
              },
            }));
          } else if (type === "exoplanet") {
            data = response.data.slice(0, 50).map((planet: any) => ({
              id: planet.pl_name,
              img_src: "",
              earth_date: "",
              camera: {
                full_name: planet.pl_name,
              },
            }));
          } else if (type === "neo") {
            data = Object.values(response.data.near_earth_objects)
              .flat()
              .slice(0, 50)
              .map((neo: any) => ({
                id: neo.id,
                img_src: "",
                earth_date: neo.close_approach_data[0].close_approach_date,
                camera: {
                  full_name: neo.name,
                },
              }));
          }

          setPhotos(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    } else {
      console.error("Invalid type or API map missing for type:", type);
      setLoading(false);
    }
  }, [type]);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="more-photos p-4 bg-black text-white min-h-screen">
      <div className="flex justify-between flex-row items-center mb-6">
        <h2 className="text-4xl font-bold text-neon tracking-wide animate-pulse">
          More{" "}
          {type ? `${type.charAt(0).toUpperCase()}${type.slice(1)}` : "Photo"}{" "}
          Photos
        </h2>
        <Link
          to="/"
          className="text-pink-500 hover:text-pink-300 underline transition duration-300"
        >
          Back to Home
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {photos.length > 0 ? (
          photos.map((photo) => (
            <div
              key={photo.id}
              className="photo-card p-4 bg-gray-900 rounded-lg shadow-xl hover:shadow-neon transition-shadow duration-300"
            >
              {photo.img_src ? (
                <img
                  src={photo.img_src}
                  alt="Mars Rover"
                  className="w-full mb-2 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="bg-gradient-to-r from-blue-500 to-purple-700 rounded-lg h-48 flex items-center justify-center">
                  <p className="text-center text-xl font-bold text-white">
                    No Image Available
                  </p>
                </div>
              )}
              <p className="mt-4 text-lg font-semibold text-neon">
                {photo.camera?.full_name}
              </p>
              <p className="text-sm text-gray-400">
                {photo.earth_date || "Unknown Date"}
              </p>
            </div>
          ))
        ) : (
          <p>No photos available for this category.</p>
        )}
      </div>
      <div className="text-center mt-8">
        <Link
          to="/"
          className="text-pink-500 hover:text-pink-300 underline transition duration-300 text-lg"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default MorePhotos;
