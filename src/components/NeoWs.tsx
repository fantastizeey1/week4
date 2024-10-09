import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Neo {
  id: string;
  name: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  close_approach_data: {
    close_approach_date: string;
    miss_distance: {
      kilometers: string;
    };
  }[];
  nasa_jpl_url: string;
}

interface NeosResponse {
  [date: string]: Neo[];
}

const NeoWs: React.FC = () => {
  const [neos, setNeos] = useState<NeosResponse>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://api.nasa.gov/neo/rest/v1/feed?api_key=${
          import.meta.env.VITE_NASA_API_KEY
        }`
      )
      .then((response) => {
        setNeos(response.data.near_earth_objects);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  // Get the first 6 NEOs only
  const neosLimited: Neo[] = [];
  let count = 0;
  for (const date in neos) {
    for (const neo of neos[date]) {
      if (count < 6) {
        neosLimited.push(neo);
        count++;
      } else {
        break;
      }
    }
    if (count >= 6) {
      break;
    }
  }

  return (
    <div className="neos p-4">
      <h2 className="text-2xl font-bold mb-4">Near-Earth Objects</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {neosLimited.map((neo) => (
          <div key={neo.id} className="p-4 mb-4 border rounded-lg shadow-md">
            <p>
              <strong>Name:</strong> {neo.name}
            </p>
            <p>
              <strong>Magnitude:</strong> {neo.absolute_magnitude_h}
            </p>
            <p>
              <strong>Estimated Diameter (km):</strong>{" "}
              {neo.estimated_diameter.kilometers.estimated_diameter_min} -{" "}
              {neo.estimated_diameter.kilometers.estimated_diameter_max}
            </p>
            <p>
              <strong>Close Approach Date:</strong>{" "}
              {neo.close_approach_data[0].close_approach_date}
            </p>
            <p>
              <strong>Miss Distance (km):</strong>{" "}
              {neo.close_approach_data[0].miss_distance.kilometers}
            </p>
            <p>
              <strong>More Info:</strong>{" "}
              <a
                href={neo.nasa_jpl_url}
                className="text-blue-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                NASA JPL
              </a>
            </p>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <Link to={`/more-photos/neo`} className="text-blue-500 underline">
          See More
        </Link>
      </div>
    </div>
  );
};

export default NeoWs;
