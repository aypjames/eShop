import ProductCard from "../../components/ProductCard/ProductCard";
import SaleCarousal from "../../components/SaleCarousal/SaleCarousal";
import { useState, useContext, useEffect } from "react";
import { ProductContext } from "../../../App";
import { getCollectionFromDb } from "../../../services/dbInteractions";
import styles from "./HomePage.module.scss";

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
      <SaleCarousal />
      <h3 className={styles.HomePage_Header}>List of All Products</h3>
      <div className={styles.HomePage_Products}>
        {productData &&
          productData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default HomePage;
