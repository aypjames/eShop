import styles from "./Favourite.module.scss";

import { Link } from "react-router-dom";

const Favourite = ({ product }) => {
  return (
    <div className={styles.Favourite}>
      <img src={product.imgs[2]} alt={`image of ${product.name}`} />
      <div className={styles.Favourite_Desc}>
        <div className={styles.Favourite_Desc_Header}>
          <Link to={`/product/${product.id}`}>
            <h3>{product.name}</h3>{" "}
          </Link>
          <span>X</span>
        </div>
        <p>{product.desc}</p>
      </div>
    </div>
  );
};

export default Favourite;
