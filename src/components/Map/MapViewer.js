import "leaflet/dist/leaflet.css";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MapLocation from "./MapLocation";
import { getAllVehicles } from "../../utils/api";
import LoaderClassic from "../../assets/LoaderClassic";

function MapViewer() {
  const [vehicles, setVehicles] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const vehicles = await getAllVehicles();
        setVehicles(vehicles.data.data.data);
        // setIsLoading(false);
      } catch (err) {
        // setError(err.message);
        console.error("Error fetching vehicles:", err);
        // setIsLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  return (
    <div className="container mx-auto max-w-7xl">
      <div className="text-center text-gray-900 dark:text-gray-100 py-20 animate-fade-in-up animation-fill ">
        <h1 className="text-4xl font-bold tracking-tight">Vehicle Locations</h1>
        <p className="mt-4 text-gray-500 dark:text-gray-400">
          Find the nearest vehicle from your home.. and come try it!
        </p>
      </div>
      {vehicles ? (
        <div className="py-8 mx-4 animate-fade-in-up animation-fill border-t border-gray-100 dark:border-gray-700">
          <div>
            <MapLocation vehicles={vehicles} />
          </div>
        </div>
      ) : (
        // <div className="text-center py-8">Loading...</div>
        <LoaderClassic color={"orange"} size={10} marginTop={40} />
      )}
    </div>
  );
}

export default MapViewer;
