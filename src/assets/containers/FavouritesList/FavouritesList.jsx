import Favourite from "../../components/Favourite/Favourite";
import { ProductContext } from "../../../App";
import { useContext } from "react";

const FavouritesList = () => {
  const globalShopData = useContext(ProductContext);
  const favItems = globalShopData.allProducts.filter(
    (product) => product.isFavourited
  );

  return (
    <div>
      <h2>My Favourites</h2>
      {favItems &&
        favItems.map((product) => (
          <Favourite key={product.id} product={product} />
        ))}
    </div>
  );
};

export default FavouritesList;