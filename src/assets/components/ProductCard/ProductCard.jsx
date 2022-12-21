import styles from "./ProductCard.module.scss";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className={styles.ProductCard}>
      <Link to={`/product/${product.id}`}>
        <img src={product.imgs[0]} alt={`image of ${product.name} keyboard`} />
        <div className={styles.ProductInfo}>
          <div className={styles.ProductInfo_Details}>
            <h4>{product.name}</h4>
            <p>${product.price}</p>
          </div>
          <div className={styles.ProductInfo_Attributes}>
            {product.isOnSale && <p className="sale-item">SALE</p>}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
