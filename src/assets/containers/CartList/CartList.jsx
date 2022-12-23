import CartItem from "../../components/CartItem/CartItem";
import { ProductContext } from "../../../App";
import { useContext } from "react";

const CartList = () => {
  const globalShopData = useContext(ProductContext);
  const cartItemsArray = globalShopData.cartItems;
  console.log(cartItemsArray);

  return (
    <div>
      <h2>My Cart</h2>
      {cartItemsArray &&
        cartItemsArray.map((item, index) => (
          <CartItem key={item.index} item={item} />
        ))}
    </div>
  );
};

export default CartList;
