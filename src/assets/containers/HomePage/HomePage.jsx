import ProductCard from "../../components/ProductCard/ProductCard";
import Carousal from "../../components/Carousal/Carousal";

const ProductsCardList = () => {
  return (
    <div>
      <h2>Home Page</h2>
      <Carousal />
      <h3>List of All Products</h3>
      <ProductCard />
    </div>
  );
};

export default ProductsCardList;
