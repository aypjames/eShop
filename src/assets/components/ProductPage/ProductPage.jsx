import styles from "./ProductPage.module.scss";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../../App";
import { useContext, useEffect, useState } from "react";

const ProductPage = () => {
  const [qtyOfProduct, setQtyOfProduct] = useState(0);
  const [switchSelected, setSwitchSelected] = useState("");
  const routeParams = useParams();
  const globalShopData = useContext(ProductContext);
  const filteredProduct = globalShopData.allProducts.filter(
    (product) => product.id === routeParams.id
  );
  const product = filteredProduct[0];

  const heartColor = product.isFavourited
    ? "heart-icon-fav"
    : "heart-icon-default";

  const handleSwitchSelect = (e) => {
    const switchColor = e.target.value;
    setQtyOfProduct(1);
    setSwitchSelected(switchColor);
  };

  const handleQtyDec = () => {
    if (qtyOfProduct > 1) {
      setQtyOfProduct(qtyOfProduct - 1);
    }
  };

  const handleQtyInc = () => {
    const maxQtyOfProduct = product.qtyBySwitches[switchSelected];
    if (qtyOfProduct < maxQtyOfProduct) {
      setQtyOfProduct(qtyOfProduct + 1);
    }
  };

  const handleAddToCart = () => {
    const currentCart = globalShopData.cartItems;
    const addItemtoCart = globalShopData.setCartItems;
    addItemtoCart([...currentCart], {
      productData: product,
      productVariant: switchSelected,
      qtyToPurchase: qtyOfProduct,
    });
    alert(
      `Added ${qtyOfProduct} ${switchSelected} ${product.name}s to your Cart`
    );
  };

  return (
    <div className={styles.ProductCard}>
      <div className={styles.ProductCard_MainImg}>
        <img src={product.imgs[0]} alt="image of product selected" />
      </div>
      <div className={styles.ProductCard_Details}>
        <div className={styles.ProductDetails_Header}>
          <h2>{product.name}</h2>
        </div>
        <div className={styles.ProductDetails_Body}>
          <div id="productImgs">
            <img
              className={styles.ProductCard_Thumbnail}
              src={product.imgs[0]}
              alt={`image 1 of ${product.name} keyboard`}
            />
            <img
              className={styles.ProductCard_Thumbnail}
              src={product.imgs[1]}
              alt={`image 1 of ${product.name} keyboard`}
            />
            <img
              className={styles.ProductCard_Thumbnail}
              src={product.imgs[2]}
              alt={`image 1 of ${product.name} keyboard`}
            />
          </div>
          {product.isOnSale && <h5 className="sale-item-text">ON SALE</h5>}
          <h3>${product.price}</h3>
          <p>{product.desc}</p>

          <select
            id="productVariants"
            onChange={handleSwitchSelect}
            defaultValue="SwitchType"
          >
            <option value="SwitchType" disabled>
              Switch Type
            </option>
            {Object.keys(product.qtyBySwitches)
              .sort()
              .map((productSwitch, index) => (
                <option key={index} value={productSwitch} name={productSwitch}>
                  {productSwitch}
                </option>
              ))}
          </select>

          <p>
            Items in stock:{" "}
            {switchSelected !== "" && product.qtyBySwitches[switchSelected]}
          </p>

          <div id="productQty">
            <p>Purchase quantity:</p>
            <button onClick={handleQtyDec} disabled={qtyOfProduct <= 1}>
              -
            </button>
            <p>{qtyOfProduct}</p>
            <button
              onClick={handleQtyInc}
              disabled={
                qtyOfProduct === product.qtyBySwitches[switchSelected] ||
                qtyOfProduct === 0
              }
            >
              +
            </button>
          </div>
          <br />
          <button onClick={handleAddToCart}>
            ADD TO CART
            <span className="material-symbols-outlined">trending_flat</span>
          </button>
          <button>
            <span className={`material-symbols-outlined ${heartColor}`}>
              favorite
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
