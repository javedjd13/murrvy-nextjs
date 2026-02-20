import { ADDTOCART } from "@/ReduxToolkit/Reducers/AddtoCartReducer";
import { ISCARTADD } from "@/ReduxToolkit/Reducers/ModalReducer";
import { useRouter } from "next/navigation";
import { ShoppingBag } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addCartItem } from "@/lib/storage/cartWishlistStorage";

const AddToCartProduct = ({ elem, staticActions }) => {
  const { addToCartModal } = useSelector((state) => state.ModalReducer);
  const dispatch = useDispatch();
  const router = useRouter();
  const AddtoCart = () => {
    if (staticActions) {
      router.push("/page/cart");
    } else {
      dispatch(ISCARTADD(!addToCartModal, elem));
      const { keys } = addCartItem(elem);
      dispatch(ADDTOCART(keys));
      toast.success("Successfully Added to Cart!!");
    }
  };
  return (
    <>
      <li onClick={AddtoCart}>
        <a href="#javascript" className="addtocart-btn">
          <ShoppingBag />
        </a>
      </li>
    </>
  );
};

export default AddToCartProduct;
