import { ProductContext } from "../../../App";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Carousal.module.scss";
import { getCollectionFromDb } from "../../../services/dbInteractions";
import "bootstrap/dist/css/bootstrap.css";
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
    <div style={{ display: "block", width: 500, height: 400, padding: 10 }}>
      <h2 className={"sale-item"}>On Sale</h2>
      <Carousel>
        {saleItems &&
          saleItems.map((product) => (
            <Carousel.Item interval={5000}>
              <Link to={`/product/${product.id}`} key={product.id}>
                <img
                  className="d-block w-100"
                  src={product.imgs[1]}
                  alt={`image of ${product.name}`}
                />
              </Link>
              <Carousel.Caption>
                <h3>{product.name}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
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
