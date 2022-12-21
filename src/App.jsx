import { useEffect, useState, createContext } from "react";
import styles from "./App.scss";
import Header from "./assets/components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./assets/containers/HomePage/HomePage";
import FavouritesList from "./assets/containers/FavouritesList/FavouritesList";
import CartList from "./assets/containers/CartList/CartList";
import ProductPage from "./assets/components/ProductPage/ProductPage";
import { getAllKeyboards } from "./services/dbInteractions";

export const ProductContext = createContext();

const App = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const wrapper = async () => {
      const allKeyboards = await getAllKeyboards();
      setAllProducts(allKeyboards);
    };
    wrapper();
  }, []);

  return (
    <BrowserRouter>
      <div className={styles.App}>
        <ProductContext.Provider value={allProducts}>
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
