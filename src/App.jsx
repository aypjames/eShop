import { useEffect, useState, createContext } from "react";
import styles from "./App.scss";
import Header from "./assets/components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./assets/containers/HomePage/HomePage";
import FavouritesList from "./assets/containers/FavouritesList/FavouritesList";
import CartList from "./assets/containers/CartList/CartList";
import ProductPage from "./assets/components/ProductPage/ProductPage";
import { getCollectionFromDb } from "./services/dbInteractions";

export const ProductContext = createContext();

const App = () => {
  const [dataFetch, setDataFetch] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const wrapper = async () => {
      const allKeyboards = await getCollectionFromDb("keyboards");
      const userDataFromDb = await getCollectionFromDb("userData");
      setAllProducts(allKeyboards);
      setUserData(userDataFromDb);
      console.log("shop data", allKeyboards);
      console.log("user data", userDataFromDb);
    };
    wrapper();
  }, [dataFetch]);

  const globalShopData = {
    allProducts,
    userData,
    setUserData,
    dataFetch,
    setDataFetch,
  };

  return (
    <BrowserRouter>
      <div className={styles.App}>
        <ProductContext.Provider value={globalShopData}>
          <Header userData={userData} />
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
