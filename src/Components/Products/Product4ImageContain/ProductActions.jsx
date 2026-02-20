import { Addtocart, freeshipping } from "@/Constant";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ProductWishListAction from "./ProductWishListAction";
import Img from "@/Components/Element/Images";
import { ADDTOCART } from "@/ReduxToolkit/Reducers/AddtoCartReducer";
import { NOTIFICATIONALTER } from "@/ReduxToolkit/Reducers/ModalReducer";
import { addCartItem } from "@/lib/storage/cartWishlistStorage";

const ProductActions = ({ singleProduct }) => {
  const dispatch = useDispatch();

  const AddtoCart = () => {
    const activeProduct = singleProduct ? singleProduct[0] : null;
    const { keys } = addCartItem(activeProduct || { id: 1, type: "product" });
    dispatch(ADDTOCART(keys));
    dispatch(NOTIFICATIONALTER(singleProduct ? singleProduct : 1, true));

    toast.success("Item Added");
  };
  return (
    <>
      <div className="product-buttons">
        <ProductWishListAction singleProduct={singleProduct} />
        <a href="#javascript" id="cartEffect" className="btn btn-solid hover-solid btn-animation" onClick={AddtoCart}>
          <i className="fa fa-shopping-cart"></i>
          <span>{Addtocart}</span>
        </a>
      </div>

      <ul className="product-count shipping-order">
        <li>
          <Img src="/assets/images/gif/truck.png" className="img-fluid" alt="image" />
          <span className="lang">{freeshipping}</span>
        </li>
      </ul>
    </>
  );
};

export default ProductActions;
