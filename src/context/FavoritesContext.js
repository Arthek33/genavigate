import React, { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState(user ? user.favoriteVehicles : []);

  const addFavorite = (vehicleId) => {
    setFavorites([...favorites, vehicleId]);
  };

  const removeFavorite = (vehicleId) => {
    setFavorites(favorites.filter((id) => id !== vehicleId));
  };

  useEffect(() => {
    if (user && user.favoriteVehicles) {
      setFavorites(user.favoriteVehicles);
    } else {
      setFavorites([]);
    }
  }, [user]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
