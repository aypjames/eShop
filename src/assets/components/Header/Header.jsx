import styles from "./Header.module.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCollectionFromDb } from "../../../services/dbInteractions";

const Header = ({ userData }) => {
  const navigate = useNavigate();
  // const [totalItemsInCart, setTotalItemsInCart] = useState(0);

  // useEffect(() => {
  //   const wrapper = async () => {
  //     const userDataFromDb = await getCollectionFromDb("userData");
  //     const totalItems = userDataFromDb[0].cartItems.length;
  //     setTotalItemsInCart(totalItems);
  //   };
  //   wrapper();
  // }, [userData]);

  const handleNavClick = (pagePath) => {
    navigate(pagePath);
  };

  return (
    <div className={styles.Header}>
      <div onClick={() => handleNavClick("/")} className={styles.Header_Title}>
        <h2>Keybored</h2>
      </div>
      <div className={styles.Header_Others}>
        <button
          onClick={() => handleNavClick("/myfavs")}
          className={`${styles.Header_Others_Heart} button_secondary`}
        >
          <span className="material-symbols-outlined">favorite</span>
        </button>
        <button
          onClick={() => handleNavClick("/mycart")}
          className={`${styles.Header_Others_Cart} button_secondary`}
        >
          <span className="material-symbols-outlined">shopping_cart</span>
          {/* <span>{`MY CART (${
            totalItemsInCart !== undefined && totalItemsInCart
          })`}</span> */}
          <span>MY CART</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
