import Favourite from "../../components/Favourite/Favourite";
import { useEffect, useState } from "react";
import { getCollectionFromDb } from "../../../services/dbInteractions";
import styles from "./FavoritesList.module.scss";

const FavouritesList = () => {
  const [userData, setUserData] = useState([]);
  const [favUpdate, setFavUpdate] = useState(0);

  useEffect(() => {
    const wrapper = async () => {
      const userDataFromDb = await getCollectionFromDb("userData");
      setUserData(userDataFromDb);
    };
    wrapper();
  }, [favUpdate]);

  return (
    <div className={styles.FavouritesList}>
      <h2>My Favourites</h2>
      {userData.length && userData[0].favItems.length !== 0 ? (
        userData[0].favItems.map((product) => (
          <Favourite
            key={product.id}
            product={product}
            userData={userData}
            favUpdate={favUpdate}
            setFavUpdate={setFavUpdate}
          />
        ))
      ) : (
        <p>You don't have any favourites :(</p>
      )}
    </div>
  );
};

export default FavouritesList;
