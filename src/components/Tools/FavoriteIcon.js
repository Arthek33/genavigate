import React, { useState, useContext, useEffect } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "../../context/AuthContext";
import { FavoritesContext } from "../../context/FavoritesContext";
import { addFavoriteVehicle, removeFavoriteVehicle } from "../../utils/api";
import { Tooltip } from "react-tooltip";

function FavoriteIcon({ vehicle, className, size = 1.5, clickable = true }) {
  const [isFavorite, setIsFavorite] = useState(false); // Initial state can be fetched if you have user's favorites
  const { user } = useContext(AuthContext);
  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoritesContext);

  const handleFavoriteClick = async () => {
    if (clickable) {
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
    }
  };
  useEffect(() => {
    setIsFavorite(favorites.includes(vehicle._id));
  }, [user, vehicle]);

  return (
    <>
      <div
        className={`${className} ${
          clickable ? "hover:scale-125" : ""
        } translate-x-1/2 -translate-y-1/2 transition-all`}
        style={{ width: `${size}rem`, height: `${size}rem` }}
        data-tooltip-id="favorite-tooltip"
        // data-tooltip-hidden={!clickable}
      >
        {user ? (
          <HeartIcon
            className={`${
              clickable ? "cursor-pointer hover:drop-shadow-lg" : ""
            } stroke-orange-600 transition-all w-full h-full 
           ${isFavorite ? "fill-orange-600" : ""}`}
            onClick={handleFavoriteClick}
          />
        ) : (
          <></>
        )}
      </div>
      {clickable ? (
        <Tooltip
          id="favorite-tooltip"
          // class="bg-blue-500 text-red-500"
          className="tooltip-custom"
          // disableStyleInjection={true}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Tooltip>
      ) : (
        ""
      )}
    </>
  );
}

export default FavoriteIcon;
