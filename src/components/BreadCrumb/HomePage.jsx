import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BreadCrumb from "./BreadCrumb";
import Home from "./Home";
import ProductListing from "./ProductListing";
import ProductDetail from "./ProductDetail";
import "./HomePage.css";
const HomePage = () => {
  return (
    <Router>
      <div className="home">
        <h1>Home Store</h1>
        <BreadCrumb />
        <hr />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default HomePage;
