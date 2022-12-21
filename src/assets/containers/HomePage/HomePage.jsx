import ProductCard from "../../components/ProductCard/ProductCard";
import Carousal from "../../components/Carousal/Carousal";
import { useState, useContext, useEffect } from "react";
import { ProductContext } from "../../../App";

const HomePage = () => {
  const products = useContext(ProductContext);
  return (
    <div>
      <h2>All Products</h2>
      <Carousal />
      <h3>List of All Products</h3>
      {products &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  );
};

export default HomePage;
