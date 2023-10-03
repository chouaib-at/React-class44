import React, { useEffect, useState } from "react";
import "./../App.css";
import Navbar from "../Components/Navbar";
import ProductCard from "../Components/ProductCard";
import { FavoriteContext } from "../context/FavoriteContext";
import { useContext } from "react";

function Favorites() {
  const [productsList, setProductsList] = useState([]);
  const [errorProducts, setErrorProducts] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const { favorites } = useContext(FavoriteContext);
  const [filteredProductList, setFilteredProductList] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setErrorProducts(false);
        setLoadingProducts(true);
        const response = await fetch(`https://fakestoreapi.com/products`);
        const products = await response.json();
        setLoadingProducts(false);
        setProductsList(products);
      } catch (error) {
        setErrorProducts(true);
      }
    };
    getAllProducts();
  }, []);
  useEffect(() => {
    const filteredList = productsList.filter((product) =>
      favorites.includes(product.id)
    );
    setFilteredProductList(filteredList);
  }, [favorites, productsList]);
  return (
    <div className="App">
      <Navbar title="Favorite Products" />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100vw",
          gap: "10px",
          justifyContent: "space-around",
        }}
      >
        {loadingProducts ? (
          <p>Loading Products</p>
        ) : errorProducts ? (
          <p>Error Loading Products</p>
        ) : (
          filteredProductList.length > 0 &&
          filteredProductList.map((product) => (
            <ProductCard product={product} />
          ))
        )}
      </div>
    </div>
  );
}

export default Favorites;

const productContainerStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  borderRadius: "10px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  transition: "box-shadow 0.3s ease-in-out",
};

productContainerStyle[":hover"] = {
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
};
