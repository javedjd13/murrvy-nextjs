import { wishlist } from "@/Constant";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { ADDTOWISHLIST } from "@/ReduxToolkit/Reducers/AddtoCartReducer";
import { NOTIFICATIONALTER } from "@/ReduxToolkit/Reducers/ModalReducer";
import { addWishlistItem } from "@/lib/storage/cartWishlistStorage";

const ProductWishListAction = ({ singleProduct }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const AddtoWishList = () => {
    const activeProduct = singleProduct ? singleProduct[0] : null;
    const { keys } = addWishlistItem(activeProduct || { id: 1, type: "product" });
    dispatch(ADDTOWISHLIST(keys));
    dispatch(NOTIFICATIONALTER(singleProduct, true));
    router.push("/page/wishlist");
  };
  return (
    <a className="btn btn-solid" onClick={AddtoWishList}>
      <i className="fa fa-bookmark fz-16 me-2"></i>
      <span>{wishlist}</span>
    </a>
  );
};

export default ProductWishListAction;
