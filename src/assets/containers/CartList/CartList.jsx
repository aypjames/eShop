import CartItem from "../../components/CartItem/CartItem";
import { ProductContext } from "../../../App";
import { useContext, useState } from "react";

const CartList = () => {
  const globalShopData = useContext(ProductContext);
  const cartItemsArray = globalShopData.cartItems;
  // const [cartTotal, setCartTotal] = useState(cartItemsArray);
  const totalCost = cartItemsArray.reduce((acc, obj) => {
    return acc + obj.productData.price * obj.qtyToPurchase;
  }, 0);

  console.log(cartItemsArray);

  return (
    <div>
      <h2>My Cart</h2>
      {cartItemsArray.length !== 0 &&
        cartItemsArray.map((item, index) => (
          <CartItem
            key={item.productData.id}
            productData={item.productData}
            productVariant={item.productVariant}
            qtyToPurchase={item.qtyToPurchase}
            // cartTotal={cartTotal}
            // setCartTotal={setCartTotal}
          />
        ))}
      <br />
      {cartItemsArray.length !== 0 && <h3>Total: ${totalCost}</h3>}
    </div>
  );
};

export default CartList;
