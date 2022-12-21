import styles from "./ProductPage.module.scss";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../../App";
import { useContext } from "react";

const ProductPage = () => {
  const routeParams = useParams();
  const allProducts = useContext(ProductContext);
  const filteredProduct = allProducts.filter(
    (product) => product.id === routeParams.id
  );
  const product = filteredProduct[0];

  return (
    <div className={styles.ProductCard}>
      <div className={styles.ProductCard_MainImg}>
        <img src={product.imgs[0]} alt="image of product selected" />
      </div>
      <div className={styles.ProductCard_Details}>
        <div className={styles.ProductDetails_Header}>
          <h2>{product.name}</h2>
          <p>isSale</p>
          <p>
            <span className="material-symbols-outlined heartIcon">
              favorite
            </span>
          </p>
        </div>
        <div className={styles.ProductDetails_Body}>
          {/* <div id="productImgs">
          <img src="" alt="image of product 1" />
          <img src="" alt="image of product 2" />
          <img src="" alt="image of product 3" />
        </div> */}

          <h4>${product.price}</h4>
          <div id="productVariants">
            <button>S</button>
            <button>M</button>
            <button>L</button>
          </div>
          <p>Long Description</p>
          <div id="productQty">
            <button>-</button>
            <p>0</p>
            <button>+</button>
          </div>
          <button>
            ADD TO CART
            <span className="material-symbols-outlined">trending_flat</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
