import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Product from "./Pages/Product";
import Favorites from "./Pages/Favorites";
import { MyProvider } from "./context/FavoriteContext";

const App = () => {
  return (
    <MyProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </MyProvider>
  );
};

export default App;
