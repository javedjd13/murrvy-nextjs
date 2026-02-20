import { toast } from "react-toastify";
import { Btn } from "@/Components/AbstractElements";
import { Addtocart } from "@/Constant";
import { ADDTOCART } from "@/ReduxToolkit/Reducers/AddtoCartReducer";
import { addCartItem } from "@/lib/storage/cartWishlistStorage";
import { useDispatch } from "react-redux";

const AddtoCartBtn = ({ customeclass, data, btn }) => {
  const dispatch = useDispatch();
  const AddtoCart = () => {
    const { keys } = addCartItem(data);
    dispatch(ADDTOCART(keys));
    toast.success("Successfully Added to Cart!!");
  };
  return (
    <>
      {btn ? (
        <Btn attrBtn={{ className: customeclass, onClick: AddtoCart }}>{Addtocart}</Btn>
      ) : (
        <a className={customeclass} onClick={AddtoCart}>
          {Addtocart}
        </a>
      )}
    </>
  );
};

export default AddtoCartBtn;
