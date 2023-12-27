import React, { useState, useEffect, useContext } from "react";
import VehicleList from "./VehicleList";
import { getFavoriteVehicles } from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";
import LoaderClassic from "../../assets/LoaderClassic";

function VehicleFavorites() {
  const [favoriteVehicles, setFavoriteVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchFavoriteVehicles = async () => {
      setIsLoading(true);
      try {
        const vehicles = await getFavoriteVehicles();
        setFavoriteVehicles(vehicles.data.data);
        // setIsLoading(false);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching favorite vehicles:", err);
        // setIsLoading(false);
      }
      setIsLoading(false);
    };
    if (user && user._id) {
      fetchFavoriteVehicles();
    }
  }, [user]);

  if (isLoading) return <LoaderClassic color={"orange"} size={10} />;
  if (error)
    return <div className="w-full text-center mt-48">Error: {error}</div>;

  return (
    <div>
      <VehicleList vehicles={favoriteVehicles} />
    </div>
  );
}

export default VehicleFavorites;
