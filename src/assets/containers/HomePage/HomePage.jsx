import ProductCard from "../../components/ProductCard/ProductCard";
import SaleCarousal from "../../components/SaleCarousal/SaleCarousal";
import { useState, useContext, useEffect } from "react";
import { ProductContext } from "../../../App";
import { getCollectionFromDb } from "../../../services/dbInteractions";

const HomePage = () => {
  // const globalShopData = useContext(ProductContext);
  // const products = globalShopData.allProducts;

  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const wrapper = async () => {
      const keyboardDataFromDb = await getCollectionFromDb("keyboards");
      setProductData(keyboardDataFromDb);
    };
    wrapper();
  }, []);

  return (
    <div>
      <h2>All Products</h2>
      <SaleCarousal />
      <h3>List of All Products</h3>
      {productData &&
        productData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  );
};

export default HomePage;
