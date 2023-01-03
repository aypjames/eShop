import styles from "./ProductPage.module.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  updateFieldInDb,
  getCollectionFromDb,
  getKeyboardByIdFromDb,
} from "../../../services/dbInteractions";

const ProductPage = () => {
  const [product, setProduct] = useState("");
  const [dataChange, setDataChange] = useState(0);
  const [userData, setUserData] = useState([]);
  const [qtyOfProduct, setQtyOfProduct] = useState(0);
  const [switchSelected, setSwitchSelected] = useState("");
  const [mainImg, setMainImg] = useState("");
  const routeParams = useParams();
  let customId = `${routeParams.id}${switchSelected}`;

  useEffect(() => {
    const wrapper = async () => {
      const keyboardData = await getKeyboardByIdFromDb(routeParams.id);
      const userDataFromDb = await getCollectionFromDb("userData");
      setProduct(keyboardData);
      setUserData(userDataFromDb);
    };
    wrapper();
  }, [dataChange]);

  const colorOfHeart = () => {
    const isInFavList = userData[0].favItems.find((element) => {
      if (element.id === routeParams.id) {
        return true;
      }
      return false;
    });
    return isInFavList !== undefined ? "heart-icon-fav" : "heart-icon-default";
  };

  const handleSwitchSelect = (e) => {
    const switchColor = e.target.value;
    if (product.qtyBySwitches[switchColor] === 0) {
      setQtyOfProduct(0);
    } else {
      setQtyOfProduct(1);
    }

    setSwitchSelected(switchColor);
  };

  const handleQtyDec = () => {
    if (qtyOfProduct > 1) {
      setQtyOfProduct(qtyOfProduct - 1);
    }
  };

  const productAvailForPurchase = () => {
    const maxQtyOfProduct = product.qtyBySwitches[switchSelected];
    const itemInCart = userData[0].cartItems.filter(
      (item) => item.id === customId
    );

    if (itemInCart.length > 0) {
      let qtyAlreadyInCart = itemInCart[0].qtyToPurchase;
      return maxQtyOfProduct - qtyAlreadyInCart;
    } else {
      return maxQtyOfProduct;
    }
  };

  const handleQtyInc = () => {
    if (qtyOfProduct < productAvailForPurchase()) {
      setQtyOfProduct(qtyOfProduct + 1);
    } else {
    }
  };

  const handleAddToCart = () => {
    //Check if product already in cartList
    const existingItemInCart = userData[0].cartItems.filter(
      (item) => item.id === customId
    );
    const existingItemQty =
      existingItemInCart.length > 0 ? existingItemInCart[0].qtyToPurchase : 0;
    const otherItemsInCart = userData[0].cartItems.filter(
      (item) => item.id !== customId
    );

    //   collectionName, DocumentId, fieldName, newValue;
    updateFieldInDb("userData", userData[0].id, "cartItems", [
      ...otherItemsInCart,
      {
        id: customId,
        productId: routeParams.id,
        productVariant: switchSelected,
        qtyToPurchase: qtyOfProduct + existingItemQty,
        productData: product,
      },
    ]);

    alert(
      `Added ${qtyOfProduct} ${switchSelected} ${product.name}s to your Cart`
    );
    setQtyOfProduct(1);
    setDataChange(dataChange + 1);
  };

  const handleFavClick = () => {
    //Check if product alread in favList
    const isInFavList = userData[0].favItems.find((element) => {
      if (element.id === routeParams.id) {
        return true;
      }
      return false;
    });

    const updateFavList = () => {
      if (isInFavList === undefined) {
        // Adding item to favourites
        return [...userData[0].favItems, { id: routeParams.id, ...product }];
      } else {
        // Removing item to favourites
        return userData[0].favItems.filter(
          (item) => item.id !== routeParams.id
        );
      }
    };

    console.log("Fav List", updateFavList());

    updateFieldInDb("userData", userData[0].id, "favItems", updateFavList());
    setDataChange(dataChange + 1);
  };

  const handleChangeImg = (e) => {
    const imgSrc = e.target.src;
    setMainImg(imgSrc);
  };

  return (
    <div className={styles.ProductPage}>
      {product && (
        <div className={styles.ProductCard}>
          <div className={styles.ProductCard_MainImg}>
            <img
              src={mainImg === "" ? product.imgs[0] : mainImg}
              alt="image of product selected"
            />
          </div>
          <div className={styles.ProductCard_Details}>
            <div className={styles.ProductDetails_Header}>
              <h2>{product.name}</h2>
            </div>
            <div className={styles.ProductDetails_Body}>
              <div id="productImgs" className={styles.ProductDetails_Body_Imgs}>
                <img
                  className={styles.ProductCard_Thumbnail}
                  src={product.imgs[0]}
                  alt={`image 1 of ${product.name} keyboard`}
                  onClick={handleChangeImg}
                />
                <img
                  className={styles.ProductCard_Thumbnail}
                  src={product.imgs[1]}
                  alt={`image 1 of ${product.name} keyboard`}
                  onClick={handleChangeImg}
                />
                <img
                  className={styles.ProductCard_Thumbnail}
                  src={product.imgs[2]}
                  alt={`image 1 of ${product.name} keyboard`}
                  onClick={handleChangeImg}
                />
              </div>
              <div className={styles.ProductDetails_Body_Text}>
                {product.isOnSale && (
                  <h5 className="sale-item-text">ON SALE</h5>
                )}
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
                  {switchSelected !== "" &&
                    product.qtyBySwitches[switchSelected]}
                </p>

                <p>Purchase quantity:</p>
                <div className={styles.ProductDetails_Body_Text_Qty}>
                  <button onClick={handleQtyDec} disabled={qtyOfProduct <= 1}>
                    -
                  </button>
                  <p>{qtyOfProduct}</p>
                  <button
                    onClick={handleQtyInc}
                    disabled={
                      qtyOfProduct === product.qtyBySwitches[switchSelected] ||
                      qtyOfProduct === 0 ||
                      qtyOfProduct >= productAvailForPurchase()
                    }
                  >
                    +
                  </button>
                </div>
                <div className={styles.ProductDetails_Body_Text_Transaction}>
                  <button
                    className={styles.transactionBtn}
                    onClick={handleAddToCart}
                    disabled={
                      qtyOfProduct === 0 ||
                      qtyOfProduct > productAvailForPurchase()
                    }
                  >
                    ADD TO CART
                    <span className="material-symbols-outlined">
                      trending_flat
                    </span>
                  </button>
                  <button
                    className={styles.transactionBtn}
                    onClick={handleFavClick}
                  >
                    <span
                      className={`material-symbols-outlined ${colorOfHeart()}`}
                    >
                      favorite
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
