import styles from "./CartItem.module.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductContext } from "../../../App";
import { useContext } from "react";

const Cart = ({ productData, productVariant, qtyToPurchase }) => {
  const globalShopData = useContext(ProductContext);
  const cartItemId = globalShopData.cartItems.id;
  const cartItems = globalShopData.cartItems;
  const setCartItems = globalShopData.setCartItems;

  // cartItems array
  // id: product.id,
  // productData: product,
  // productVariant: switchSelected,
  // qtyToPurchase: qtyOfProduct,

  const [productQtyToPurchase, setProductQtyToPurchase] =
    useState(qtyToPurchase);
  const [productVariantToPurchase, setProductVariantSelect] =
    useState(productVariant);

  const handlePurchaseDec = () => {
    if (productQtyToPurchase > 1) {
      setProductQtyToPurchase(productQtyToPurchase - 1);
    }
  };

  const handlePurchaseInc = () => {
    const maxQtyOfProduct = productData.qtyBySwitches[productVariantToPurchase];
    if (productQtyToPurchase < maxQtyOfProduct) {
      setProductQtyToPurchase(productQtyToPurchase + 1);
    }
  };

  const handlePurchaseSwitch = (e) => {
    const switchSelected = e.target.value;
    setProductVariantSelect(switchSelected);
    const switchChange = cartItems.map((item) => {
      if (item.id === productData.id) {
        return { ...item, productVariant: switchSelected };
      } else {
        return item;
      }
    });
    setCartItems(switchChange);
  };

  return (
    <div className={styles.CartItem}>
      <img src={productData.imgs[2]} alt={`image of ${productData.name}`} />
      <div className={styles.CartItem_Desc}>
        <div className={styles.CartItem_Desc_Header}>
          <Link to={`/product/${productData.id}`}>
            <h3>{productData.name}</h3>{" "}
          </Link>
          <button>
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
        <h4>${productData.price}</h4>
        <label htmlFor="productVariants">Switch Type: </label>
        <select
          id="productVariants"
          onChange={handlePurchaseSwitch}
          defaultValue={productVariantToPurchase}
        >
          {Object.keys(productData.qtyBySwitches)
            .sort()
            .map((productSwitch, index) => (
              <option key={index} value={productSwitch} name={productSwitch}>
                {productSwitch}
              </option>
            ))}
        </select>
        <br />
        <p>Qty: </p>
        <button onClick={handlePurchaseDec}>-</button>
        <p>{productQtyToPurchase}</p>
        <button onClick={handlePurchaseInc}>+</button>
        <p>Total: ${productData.price * productQtyToPurchase}</p>
      </div>
    </div>
  );
};

export default Cart;
