import { useEffect, useState, createContext } from "react";
import styles from "./App.scss";
import Header from "./assets/components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./assets/containers/HomePage/HomePage";
import FavouritesList from "./assets/containers/FavouritesList/FavouritesList";
import CartList from "./assets/containers/CartList/CartList";
import ProductPage from "./assets/components/ProductPage/ProductPage";
import { getAllKeyboardsFromDb } from "./services/dbInteractions";

export const ProductContext = createContext();

const App = () => {
  const [dataFetch, setDataFetch] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const globalShopData = {
    allProducts,
    cartItems,
    setCartItems,
    dataFetch,
    setDataFetch,
  };

  useEffect(() => {
    const wrapper = async () => {
      const allKeyboards = await getAllKeyboardsFromDb();
      setAllProducts(allKeyboards);
      console.log(allKeyboards);
    };
    wrapper();
  }, [dataFetch]);

  return (
    <BrowserRouter>
      <div className={styles.App}>
        <ProductContext.Provider value={globalShopData}>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/myfavs" element={<FavouritesList />} />
            <Route path="/mycart" element={<CartList />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </ProductContext.Provider>
      </div>
    </BrowserRouter>
  );
};

export default App;
