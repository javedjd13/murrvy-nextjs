/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Col, Table } from "reactstrap";
import { action, image, Prices, productname, quentityname, Total } from "@/Constant";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "reactstrap";
import MobileViewCartData from "./MobileViewCartData";
import Img from "@/Components/Element/Images";
import { ADDTOCART, QUANTITY } from "@/ReduxToolkit/Reducers/AddtoCartReducer";
import {
  getProductStorageKey,
  removeCartItem,
  resolveProductImageSrc,
} from "@/lib/storage/cartWishlistStorage";

const CartData = ({ cartData, setTotalMrp }) => {
  const { quantity } = useSelector((state) => state.AddToCartReducer);
  const dispatch = useDispatch();
  const handleQtyChange = (qty, id, price) => {
    const parsedQty = Number(qty);
    const safeQty = Number.isFinite(parsedQty) && parsedQty > 0 ? parsedQty : 1;
    dispatch(QUANTITY({ qty: safeQty, id, price: Number(price) || 0 }));
  };

  useEffect(() => {
    const total = cartData.reduce((sum, item) => {
      const itemKey = item?.cartKey || getProductStorageKey(item);
      const qtyValue = Number(quantity[itemKey]?.qty || 1);
      const priceValue = Number(quantity[itemKey]?.price || item?.price || 0);
      return sum + qtyValue * priceValue;
    }, 0);

    setTotalMrp(total);
  }, [quantity, cartData]);

  const removeProduct = (product) => {
    const { keys } = removeCartItem(product);
    dispatch(ADDTOCART(keys));
  };

  return (
    <Col sm="12" className="table-responsive mt-4">
      <Table className="cart-table">
        <thead>
          <tr className="table-head">
            <th scope="col">{image}</th>
            <th scope="col">{productname}</th>
            <th scope="col">{Prices}</th>
            <th scope="col">{quentityname}</th>
            <th scope="col">{action}</th>
            <th scope="col">{Total}</th>
          </tr>
        </thead>
        <tbody>
          {cartData &&
            cartData.map((elem) => {
              const itemKey = elem?.cartKey || getProductStorageKey(elem);
              return (
                <tr key={itemKey}>
                  <td>
                    <a>
                      {elem?.images?.slice(0, 1).map((item, imageIndex) => {
                        const imageSrc = typeof item === "string" ? item : item?.src;
                        return <Img src={resolveProductImageSrc(imageSrc)} key={imageIndex} alt="cart" />;
                      })}
                    </a>
                  </td>
                  <MobileViewCartData
                    elem={elem}
                    handleQtyChange={handleQtyChange}
                    removeProduct={removeProduct}
                    quantityMap={quantity}
                    itemKey={itemKey}
                  />
                  <td>
                    <h2>${elem.price}</h2>
                  </td>
                  <td>
                    <div className="qty-box">
                      <div className="input-group">
                        <Input
                          type="number"
                          name="quantity"
                          value={quantity[itemKey]?.qty ? quantity[itemKey]?.qty : 1}
                          min={1}
                          className="form-control input-number"
                          onChange={(e) => handleQtyChange(e.target.value, itemKey, elem.price)}
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <a href="#javascript" onClick={() => removeProduct(elem)}>
                      <i className="fas fa-times"></i>
                    </a>
                  </td>
                  <td>
                    <h2 className="td-color">
                      $
                      {quantity[itemKey]?.qty && quantity[itemKey]?.qty
                        ? elem?.price * quantity[itemKey]?.qty
                        : elem.price}
                    </h2>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Col>
  );
};

export default CartData;
