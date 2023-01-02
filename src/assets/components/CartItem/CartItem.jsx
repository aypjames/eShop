import styles from "./CartItem.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { updateFieldInDb } from "../../../services/dbInteractions";

const Cart = ({
  productLink,
  productId,
  productData,
  productVariant,
  qtyToPurchase,
  userData,
  cartUpdate,
  setCartUpdate,
}) => {
  // NEEED TO MAKE CHANGE TO DECREMENT AND INCREMENT LIKE THE CHANGE TO THE SWITCH THINGO!
  const [productQtyToPurchase, setProductQtyToPurchase] =
    useState(qtyToPurchase);

  const handleQtyDec = () => {
    const qtyChange = userData[0].cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, qtyToPurchase: item.qtyToPurchase - 1 };
      } else {
        return item;
      }
    });
    setProductQtyToPurchase(productQtyToPurchase - 1);

    // collectionName, DocumentId, fieldName, newValue;
    updateFieldInDb("userData", userData[0].id, "cartItems", qtyChange);
    // Refresh Page Data
    setCartUpdate(cartUpdate + 1);
  };

  const handleQtyInc = () => {
    const qtyChange = userData[0].cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, qtyToPurchase: item.qtyToPurchase + 1 };
      } else {
        return item;
      }
    });
    setProductQtyToPurchase(productQtyToPurchase + 1);
    // collectionName, DocumentId, fieldName, newValue;
    updateFieldInDb("userData", userData[0].id, "cartItems", qtyChange);
    // Refresh Page Data
    setCartUpdate(cartUpdate + 1);
  };

  const handleItemRemoval = () => {
    const updatedCartList = userData[0].cartItems.filter(
      (item) => item.id !== productId
    );

    if (confirm("You are removing this item from your cart.")) {
      updateFieldInDb("userData", userData[0].id, "cartItems", updatedCartList);
    } else {
      return;
    }
    // Refresh Page Data
    setCartUpdate(cartUpdate + 1);
  };

  return (
    <div className={styles.CartItem}>
      <img src={productData.imgs[2]} alt={`image of ${productData.name}`} />
      <div className={styles.CartItem_Desc}>
        <div className={styles.CartItem_Desc_Header}>
          <Link to={`/product/${productLink}`}>
            <h3>{productData.name}</h3>{" "}
          </Link>
          <button onClick={handleItemRemoval}>
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
        <h4>${productData.price}</h4>
        <p>Switch Type: {productVariant}</p>
        <br />
        <p>Qty: </p>
        <button onClick={handleQtyDec} disabled={productQtyToPurchase === 1}>
          -
        </button>
        <p>{productQtyToPurchase}</p>
        <button
          onClick={handleQtyInc}
          disabled={
            productQtyToPurchase === productData.qtyBySwitches[productVariant]
          }
        >
          +
        </button>
        <br />
        <br />
        <p>Subtotal: ${productData.price * productQtyToPurchase}</p>
      </div>
    </div>
  );
};

export default Cart;
