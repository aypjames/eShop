import CartItem from "../../components/CartItem/CartItem";
// import { ProductContext } from "../../../App";
import { useState, useEffect } from "react";
import {
  getCollectionFromDb,
  updateFieldInDb,
} from "../../../services/dbInteractions";

const CartList = () => {
  const [userData, setUserData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [cartUpdate, setCartUpdate] = useState(0);

  useEffect(() => {
    const wrapper = async () => {
      const userDataFromDb = await getCollectionFromDb("userData");
      const keyboardDataFromDb = await getCollectionFromDb("keyboards");
      setUserData(userDataFromDb);
      setProductData(keyboardDataFromDb);
    };
    wrapper();
  }, [cartUpdate]);

  const totalCost = () => {
    return userData[0].cartItems.reduce((acc, obj) => {
      return acc + obj.productData.price * obj.qtyToPurchase;
    }, 0);
  };

  const handleCartCheckout = () => {
    // confirmation of checkout?

    // collectionName, DocumentId, fieldName, newValue;
    const existingPurchases = userData[0].purchasedItems;
    const cartItems = userData[0].cartItems;
    // Add items to user's purchase List
    updateFieldInDb("userData", userData[0].id, "purchaseItems", [
      ...existingPurchases,
      cartItems,
    ]);

    // Update Product Stock
    cartItems.map((item) => {
      const qtyData = productData.filter(
        (thing) => thing.id === item.productId
      );
      let existingData = qtyData[0].qtyBySwitches;
      const fieldKey = item.productVariant;
      const valueChange = Number(existingData[fieldKey] - item.qtyToPurchase);
      existingData[fieldKey] = valueChange;

      updateFieldInDb(
        "keyboards",
        item.productId,
        "qtyBySwitches",
        existingData
      );
    });

    // Clear Cart.
    updateFieldInDb("userData", userData[0].id, "cartItems", []);

    //Reload Page
    setCartUpdate(cartUpdate + 1);

    alert("Thank for your order. Happy Typing!");
  };

  return (
    <div>
      <h2>My Cart</h2>
      {userData.length > 0 &&
        userData[0].cartItems.map((item) => (
          <CartItem
            key={item.id}
            productId={item.id}
            productLink={item.productId}
            productData={item.productData}
            productVariant={item.productVariant}
            qtyToPurchase={item.qtyToPurchase}
            userData={userData}
            setUserData={setUserData}
            cartUpdate={cartUpdate}
            setCartUpdate={setCartUpdate}
          />
        ))}
      <br />
      {userData.length && userData[0].cartItems.length !== 0 ? (
        <>
          <h3>Order Total: ${totalCost()}</h3>
          <button onClick={handleCartCheckout}>CHECKOUT</button>
        </>
      ) : (
        <p>Your cart is empty :(</p>
      )}
    </div>
  );
};

export default CartList;
