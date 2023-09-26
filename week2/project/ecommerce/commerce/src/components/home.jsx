import React, { useEffect, useState } from "react";
import "./../App.css";
import { Link } from "react-router-dom";

function Home() {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        const categories = await response.json();
        setLoadingCategories(false);
        setCategories(categories);
      } catch (error) {
        setErrorCategories(true);
      }
    };
    getCategories();
  }, []);
  const [productsList, setProductsList] = useState([]);
  const [errorProducts, setErrorProducts] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  useEffect(() => {
    if (!selectedCategory) {
      const getAllProducts = async () => {
        try {
          setErrorProducts(false);
          setLoadingProducts(true);
          const response = await fetch(`https://fakestoreapi.com/products`);
          const products = await response.json();
          console.log(products);
          setLoadingProducts(false);
          setProductsList(products);
        } catch (error) {
          setErrorProducts(true);
        }
      };
      getAllProducts();
    } else {
      const getProductsByCategory = async () => {
        try {
          setErrorProducts(false);
          setLoadingProducts(true);
          const response = await fetch(
            `https://fakestoreapi.com/products/category/${selectedCategory}`
          );
          const products = await response.json();
          console.log(products);
          setLoadingProducts(false);
          setProductsList(products);
        } catch (error) {
          setErrorProducts(true);
        }
      };
      getProductsByCategory();
    }
  }, [selectedCategory]);
  return (
    <div className="App">
      <h1>Categories</h1>
      <div className="categoryList">
        {errorCategories ? (
          <p>error loading categories</p>
        ) : loadingCategories ? (
          <p>Loading</p>
        ) : (
          categories.map((category) => (
            <button
              key={category}
              className={
                selectedCategory === category ? "category active" : "category"
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))
        )}
      </div>
      <h1>Products</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100vw",
          gap: "10px",
        }}
      >
        {loadingProducts ? (
          <p>Loading Products</p>
        ) : errorProducts ? (
          <p>Error Loading Products</p>
        ) : (
          productsList.length > 0 &&
          productsList.map((product) => (
            <div key={product.id} style={productContainerStyle}>
              <img src={product.image} alt="product" style={imageStyle} />
              <Link to={`/product/${product.id}`} style={nameStyle}>{product.title}</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;

const productContainerStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  borderRadius: "10px",
  textAlign: "center",
  display:"flex",
  flexDirection:"column",
  justifyContent:"center",
  alignItems:"center",
  transition: "box-shadow 0.3s ease-in-out",
};

productContainerStyle[":hover"] = {
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
};

const imageStyle = {
  width: "200px",
  height: "200px",
};

const nameStyle = {
  fontWeight: "bold",
  marginTop: "10px",
};
