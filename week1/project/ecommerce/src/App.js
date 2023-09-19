import React, { useEffect, useState } from "react";
import "./App.css";
import Categories from "./fake-data/all-categories";
import Products from "./fake-data/all-products";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [productList, setProductList] = useState(Products);

  useEffect(() => {
    if (selectedCategory) {
      setProductList(
        Products.filter((product) =>
          product.category.includes(selectedCategory)
        )
      );
    }
  }, [selectedCategory]);
  return (
    <div className="App">
      <div>
        <h1 className="cats">Categories</h1>
        <div className="categoryList">
          {Categories.map((c) => (
            <button
              key={c}
              onClick={(e) => {
                setSelectedCategory(c);
              }}
              className={
                selectedCategory === c ? "category active" : "category"
              }
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h1>Products</h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "100vw",
            gap: "10px",
          }}
        >
          {productList.map((product) => (
            <div key={product.id} style={productContainerStyle}>
              <img src={product.image} alt="product" style={imageStyle} />
              <p style={nameStyle}>{product.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

const productContainerStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  borderRadius: "10px",
  textAlign: "center",
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
