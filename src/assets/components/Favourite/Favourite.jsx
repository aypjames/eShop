import styles from "./Favourite.module.scss";

import { Link } from "react-router-dom";
import { updateFieldInDb } from "../../../services/dbInteractions";

const Favourite = ({ product, userData, favUpdate, setFavUpdate }) => {
  const handleFavClick = () => {
    //Check if product alread in favList
    const isInFavList = userData[0].favItems.find(
      (element) => element.id === product.id
    );

    const updateFavList = () => {
      if (isInFavList === undefined) {
        // Product not in favlist and will be added.
        return [...userData[0].favItems, product];
      } else {
        //  Product is in favList and will be removed.
        return userData[0].favItems.filter((item) => item.id !== product.id);
      }
    };

    console.log("Fav List", updateFavList());

    updateFieldInDb("userData", userData[0].id, "favItems", updateFavList());
    setFavUpdate(favUpdate + 1);
  };

  return (
    <div className={styles.Favourite}>
      <img src={product.imgs[2]} alt={`image of ${product.name}`} />
      <div className={styles.Favourite_Desc}>
        <div className={styles.Favourite_Desc_Header}>
          <Link to={`/product/${product.id}`}>
            <h5>{product.name}</h5>{" "}
          </Link>
          <span
            onClick={handleFavClick}
            className="material-symbols-outlined heart-icon-fav"
          >
            favorite
          </span>
        </div>
        <p>{product.desc}</p>
      </div>
    </div>
  );
};

export default Favourite;
