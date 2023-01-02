import { ProductContext } from "../../../App";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Carousal.module.scss";
import { getCollectionFromDb } from "../../../services/dbInteractions";
import Carousel from "react-bootstrap/Carousel";

const SaleCarousal = () => {
  // const globalShopData = useContext(ProductContext);

  const [productData, setProductData] = useState([]);
  const saleItems = productData.filter((product) => product.isOnSale);
  console.log(saleItems);

  useEffect(() => {
    const wrapper = async () => {
      const keyboardDataFromDb = await getCollectionFromDb("keyboards");
      setProductData(keyboardDataFromDb);
    };
    wrapper();
  }, []);

  return (
    <div className={styles.Carousal}>
      <h2 className={"sale-item"}>On Sale!</h2>
      <Carousel>
        {saleItems &&
          saleItems.map((product) => {
            return (
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="holder.js/800x400?text=First slide&bg=373940"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                  <Link to={`/product/${product.id}`} key={product.id}>
                    <img
                      src={product.imgs[1]}
                      alt={`image of ${product.name}`}
                    />
                  </Link>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
      </Carousel>
    </div>
  );
};

export default SaleCarousal;

// function UncontrolledExample() {
//   return (

//   );
// }

// export default UncontrolledExample;
