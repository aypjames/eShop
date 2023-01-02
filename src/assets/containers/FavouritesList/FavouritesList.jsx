import Favourite from "../../components/Favourite/Favourite";
import { useEffect, useState } from "react";
import { getCollectionFromDb } from "../../../services/dbInteractions";

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
    <div>
      <h2>My Favourites</h2>
      {userData.length > 0 &&
        userData[0].favItems.map((product) => (
          <Favourite
            key={product.id}
            product={product}
            userData={userData}
            favUpdate={favUpdate}
            setFavUpdate={setFavUpdate}
          />
        ))}
    </div>
  );
};

export default FavouritesList;
