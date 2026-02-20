import { useRouter } from "next/navigation";
import { Heart } from "react-feather";
import { useDispatch } from "react-redux";
import { ADDTOWISHLIST } from "@/ReduxToolkit/Reducers/AddtoCartReducer";
import { addWishlistItem } from "@/lib/storage/cartWishlistStorage";

const AddToWishList = ({ elem, staticActions }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const AddtoWishList = () => {
    if (staticActions) {
      router.push("/page/wishlist");
    } else {
      const { keys } = addWishlistItem(elem);
      dispatch(ADDTOWISHLIST(keys));
      router.push(`/page/wishlist`);
    }
  };

  return (
    <li onClick={() => AddtoWishList()}>
      <a href="#javascript" className="wishlist">
        <Heart />
      </a>
    </li>
  );
};

export default AddToWishList;
