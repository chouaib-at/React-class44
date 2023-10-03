import { useState, useEffect } from "react";
import { createContext } from "react";

const FavoriteContext = createContext();

const MyProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const saveFavoritesToLocalStorage = (updatedFavorites) => {
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const addToFavorites = (product) => {
    const updatedFavorites = [...favorites, product];
    setFavorites(updatedFavorites);
    saveFavoritesToLocalStorage(updatedFavorites);
  };

  const removeFromFavorites = (product) => {
    const updatedFavorites = favorites.filter(
      (favProduct) => favProduct !== product
    );
    setFavorites(updatedFavorites);
    saveFavoritesToLocalStorage(updatedFavorites);
  };

  useEffect(() => {
    saveFavoritesToLocalStorage(favorites);
  }, [favorites]);

  return (
    <FavoriteContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export { MyProvider, FavoriteContext };
