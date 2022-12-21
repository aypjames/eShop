import { ProductContext } from "../../../App";
import { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Carousal.module.scss";

const Carousal = () => {
  const allProducts = useContext(ProductContext);
  const saleItems = allProducts.filter((product) => product.isOnSale);

  return (
    <div className={styles.Carousal}>
      <h2 className={"sale-item"}>On Sale!</h2>
      <div className={styles.Carousal_Imgs}>
        {saleItems &&
          saleItems.map((product) => {
            return (
              <Link to={`/product/${product.id}`} key={product.id}>
                <img src={product.imgs[1]} alt={`image of ${product.name}`} />
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Carousal;
