import React, { useState, useContext, useEffect } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "../context/AuthContext";
import { FavoritesContext } from "../context/FavoritesContext";
import { addFavoriteVehicle, removeFavoriteVehicle } from "../utils/api";

function FavoriteIcon({ vehicle, className, size = 1.5 }) {
  const [isFavorite, setIsFavorite] = useState(false); // Initial state can be fetched if you have user's favorites
  const { user } = useContext(AuthContext);
  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoritesContext);

  const handleFavoriteClick = async () => {
    console.log(vehicle);
    if (isFavorite) {
      // Remove from favorites
      try {
        await removeFavoriteVehicle(vehicle._id);
        setIsFavorite(false);
        removeFavorite(vehicle._id);
      } catch (error) {
        console.error("Error removing favorite:", error);
      }
    } else {
      // Add to favorites
      try {
        await addFavoriteVehicle(vehicle._id);
        setIsFavorite(true);
        addFavorite(vehicle._id);
      } catch (error) {
        console.error("Error adding favorite:", error);
      }
    }
  };
  useEffect(() => {
    console.log("useEffect vehicleCard");
    setIsFavorite(favorites.includes(vehicle._id));
  }, [user, vehicle]);

  return (
    <div
      className={`${className} hover:scale-125 translate-x-1/2 -translate-y-1/2 transition-all`}
      style={{ width: `${size}rem`, height: `${size}rem` }}
    >
      {user ? (
        <HeartIcon
          className={`cursor-pointer stroke-orange-600 transition-all w-full h-full hover:drop-shadow-lg
           ${
             isFavorite
               ? "fill-orange-600 hover:fill-orange-700"
               : "hover:fill-orange-500"
           }`}
          onClick={handleFavoriteClick}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default FavoriteIcon;
