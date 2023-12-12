import React, { useState, useEffect } from "react";
import VehicleList from "./VehicleList";
import { getAllVehicles } from "../utils/api";
import LoaderClassic from "../assets/LoaderClassic";

function VehicleCollection() {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      setIsLoading(true);
      try {
        const vehicles = await getAllVehicles();
        setVehicles(vehicles.data.data.data);
        // setIsLoading(false);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching vehicles:", err);
        // setIsLoading(false);
      }
      setIsLoading(false);
    };
    fetchVehicles();
  }, []);

  if (isLoading) return <LoaderClassic color={"orange"} size={10} />;
  if (error)
    return <div className="w-full text-center mt-48">Error: {error}</div>;

  return (
    <div>
      <VehicleList vehicles={vehicles} />
    </div>
  );
}

export default VehicleCollection;
