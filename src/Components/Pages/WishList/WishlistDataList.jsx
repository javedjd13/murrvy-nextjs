import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "reactstrap";
import MobileViewData from "./MobileViewData";
import WishlistTableHead from "./WishlistTableHead";
import Img from "@/Components/Element/Images";
import { ADDTOWISHLIST } from "@/ReduxToolkit/Reducers/AddtoCartReducer";
import {
  getProductStorageKey,
  removeWishlistItem,
  resolveProductImageSrc,
} from "@/lib/storage/cartWishlistStorage";

const WishlistDataList = ({ wishlistData }) => {
  const dispatch = useDispatch();
  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);

  const removeProduct = (product) => {
    const { keys } = removeWishlistItem(product);
    dispatch(ADDTOWISHLIST(keys));
  };

  return (
    <Table className="cart-table wishlist-table">
      <WishlistTableHead />
      <tbody>
        {wishlistData &&
          wishlistData.map((elem) => {
            const itemKey = elem?.cartKey || getProductStorageKey(elem);
            return (
              <tr key={itemKey}>
                <td>
                  <Link href={`/product/product_left_sidebar/${elem.id}`}>
                    {elem?.images?.slice(0, 1).map((item, i) => (
                      <Img src={resolveProductImageSrc(typeof item === "string" ? item : item?.src)} alt="product" key={i} />
                    ))}
                  </Link>
                </td>
                <MobileViewData elem={elem} />
                <td>
                  <p className="fw-bold">{`${symbol}${(elem.price * currencyValue).toFixed(2)}`}</p>
                </td>
                <td>
                  <p>{elem.inStock > 0 ? "In Stock" : "Out of Stock"}</p>
                </td>
                <td>
                  <button className="icon btn" onClick={() => removeProduct(elem)}>
                    <i className="fas fa-times"></i>
                  </button>
                  <Link href={`/page/cart`} className="icon">
                    <i className="fas fa-shopping-cart"></i>
                  </Link>
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default WishlistDataList;
