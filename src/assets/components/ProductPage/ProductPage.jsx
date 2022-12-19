import styles from "./ProductPage.module.scss";

const ProductPage = () => {
  return (
    <div className={styles.ProductCard}>
      <div className={styles.ProductCard_MainImg}>
        <img
          src="https://cdn.shopify.com/s/files/1/0059/0630/1017/products/Keychron-K8-tenkeyless-wireless-mechanical-keyboard-for-Mac-Windows-non-backlight-with-Keychron-switch-red_1800x1800.jpg"
          alt="image of product selected"
        />
      </div>
      <div className={styles.ProductCard_Details}>
        <div className={styles.ProductDetails_Header}>
          <h2>Product Name</h2>
          <p>isSale</p>
          <p className={styles.mainGreen}>Short Description</p>
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

          <h4>$XXX</h4>
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
