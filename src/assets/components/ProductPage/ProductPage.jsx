import styles from "./ProductPage.module.scss";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../../App";
import { useContext, useEffect, useState } from "react";
import { updateFieldInDb } from "../../../services/dbInteractions";

const ProductPage = () => {
  const [product, setProduct] = useState("");
  const [favClicked, setFavClicked] = useState(0);
  const [qtyOfProduct, setQtyOfProduct] = useState(0);
  const [switchSelected, setSwitchSelected] = useState("");
  const routeParams = useParams();
  const globalShopData = useContext(ProductContext);
  const filteredProduct = globalShopData.allProducts.filter(
    (product) => product.id === routeParams.id
  );

  useEffect(() => {
    setProduct(filteredProduct[0]);
  });

  useEffect(() => {
    globalShopData.setDataFetch(globalShopData.dataFetch + 1);
  }, [favClicked]);

  const heartColor = () => {
    return product.isFavourited ? "heart-icon-fav" : "heart-icon-default";
  };

  const handleSwitchSelect = (e) => {
    const switchColor = e.target.value;
    setQtyOfProduct(1);
    setSwitchSelected(switchColor);
  };

  const handleQtyDec = () => {
    if (qtyOfProduct > 1) {
      setQtyOfProduct(qtyOfProduct - 1);
    }
  };

  const handleQtyInc = () => {
    const maxQtyOfProduct = product.qtyBySwitches[switchSelected];
    if (qtyOfProduct < maxQtyOfProduct) {
      setQtyOfProduct(qtyOfProduct + 1);
    }
  };

  const handleAddToCart = () => {
    const currentCart = globalShopData.cartItems;
    const addItemtoCart = globalShopData.setCartItems;

    globalShopData.setCartItems([
      ...globalShopData.cartItems,
      {
        id: product.id,
        productData: product,
        productVariant: switchSelected,
        qtyToPurchase: qtyOfProduct,
      },
    ]);
    alert(
      `Added ${qtyOfProduct} ${switchSelected} ${product.name}s to your Cart`
    );
  };

  const handleFavClick = () => {
    // keyboardId, fieldName, newValue;
    updateFieldInDb(product.id, "isFavourited", !product.isFavourited);
    setFavClicked(favClicked + 1);
  };

  return (
    <>
      {product && (
        <div className={styles.ProductCard}>
          <div className={styles.ProductCard_MainImg}>
            <img src={product.imgs[0]} alt="image of product selected" />
          </div>
          <div className={styles.ProductCard_Details}>
            <div className={styles.ProductDetails_Header}>
              <h2>{product.name}</h2>
            </div>
            <div className={styles.ProductDetails_Body}>
              <div id="productImgs">
                <img
                  className={styles.ProductCard_Thumbnail}
                  src={product.imgs[0]}
                  alt={`image 1 of ${product.name} keyboard`}
                />
                <img
                  className={styles.ProductCard_Thumbnail}
                  src={product.imgs[1]}
                  alt={`image 1 of ${product.name} keyboard`}
                />
                <img
                  className={styles.ProductCard_Thumbnail}
                  src={product.imgs[2]}
                  alt={`image 1 of ${product.name} keyboard`}
                />
              </div>
              {product.isOnSale && <h5 className="sale-item-text">ON SALE</h5>}
              <h3>${product.price}</h3>
              <p>{product.desc}</p>

              <select
                id="productVariants"
                onChange={handleSwitchSelect}
                defaultValue="SwitchType"
              >
                <option value="SwitchType" disabled>
                  Switch Type
                </option>
                {Object.keys(product.qtyBySwitches)
                  .sort()
                  .map((productSwitch, index) => (
                    <option
                      key={index}
                      value={productSwitch}
                      name={productSwitch}
                    >
                      {productSwitch}
                    </option>
                  ))}
              </select>

              <p>
                Items in stock:{" "}
                {switchSelected !== "" && product.qtyBySwitches[switchSelected]}
              </p>

              <div id="productQty">
                <p>Purchase quantity:</p>
                <button onClick={handleQtyDec} disabled={qtyOfProduct <= 1}>
                  -
                </button>
                <p>{qtyOfProduct}</p>
                <button
                  onClick={handleQtyInc}
                  disabled={
                    qtyOfProduct === product.qtyBySwitches[switchSelected] ||
                    qtyOfProduct === 0
                  }
                >
                  +
                </button>
              </div>
              <br />
              <button onClick={handleAddToCart} disabled={qtyOfProduct === 0}>
                ADD TO CART
                <span className="material-symbols-outlined">trending_flat</span>
              </button>
              <button onClick={handleFavClick}>
                <span className={`material-symbols-outlined ${heartColor()}`}>
                  favorite
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
