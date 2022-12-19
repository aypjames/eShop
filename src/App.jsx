import { useState } from "react";
import styles from "./App.scss";
import Header from "./assets/components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./assets/containers/HomePage/HomePage";
import FavouritesList from "./assets/containers/FavouritesList/FavouritesList";
import CartList from "./assets/containers/CartList/CartList";
import ProductPage from "./assets/components/ProductPage/ProductPage";

const App = () => {
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/myfavs" element={<FavouritesList />} />
          <Route path="/mycart" element={<CartList />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
