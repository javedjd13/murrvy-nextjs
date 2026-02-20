import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col } from "reactstrap";
import { Brand, Category, Color, Size, Tags, Viewdetails, productdetail } from "@/Constant";
import AddtoCartBtn from "./AddtoCartBtn";
import DynamicRating from "./DynamicRating";
import KGForVegetable from "./KGForVegetable";
import VegetableProductDetails from "./VegetableProductDetails";
import { IS_MODAL } from "@/ReduxToolkit/Reducers/ModalReducer";

const getColorLabel = (color) => {
  if (typeof color === "string") {
    return color;
  }

  if (typeof color?.color_name === "string") {
    return color.color_name;
  }

  return "";
};

const getColorStyle = (color) => {
  const label = getColorLabel(color).trim();
  const normalized = label.toLowerCase();

  if (!label) {
    return { background: "#d9d9d9" };
  }

  if (normalized === "multicolor" || normalized === "multi color") {
    return {
      background:
        "linear-gradient(135deg, #ff5f6d 0%, #ffc371 30%, #47cf73 60%, #5b86e5 100%)",
    };
  }

  if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(label) || /^(rgb|hsl)a?\(/i.test(label)) {
    return { background: label };
  }

  if (/^[a-zA-Z]+$/.test(label)) {
    return { background: label.toLowerCase() };
  }

  return { background: "#d9d9d9" };
};

const ModalProductDetails = ({ data }) => {
  const [selectedClass, setSelectedClass] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);
  const colorSelected = (val) => {
    setSelectedClass(val);
  };
  const dispatch = useDispatch();
  return (
    <Col lg="6">
      <div className="product-right">
        <h2 className="mb-2">{data?.name}</h2>
        <DynamicRating data={data?.ratingStars} customeclass={"mt-1"} />
        {data?.quantity_1 ? (
          <KGForVegetable />
        ) : (
          <div className="price mt-3">
            <h3>
              {symbol}
              {(Number(data?.price || 0) * currencyValue).toFixed(2)}
            </h3>
          </div>
        )}
        {data?.colors?.length > 0 && (
          <div className="color-types">
            <h4>{Color}</h4>
            <ul className="color-variant mb-0">
              {data?.colors?.map((colorstyle, i) => {
                const colorLabel = getColorLabel(colorstyle);

                return (
                  <li
                    title={colorLabel || "color"}
                    style={getColorStyle(colorstyle)}
                    className={selectedClass === i ? "selected" : ""}
                    key={i}
                    onClick={() => colorSelected(i)}
                  ></li>
                );
              })}
            </ul>
          </div>
        )}
        {Array.isArray(data?.sizeoption) && data.sizeoption.length > 0 && (
          <div className="size-detail">
            <h4>{Size}</h4>
            <ul>
              {data?.sizeoption?.map((productsize, i) => {
                return (
                  <li key={i} className={selectedSize === i ? "selected" : ""} onClick={() => setSelectedSize(i)}>
                    {productsize}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        {data?.quantity_1 ? (
          <VegetableProductDetails data={data} />
        ) : (
          <div className="product-details">
            <h4>{productdetail}</h4>
            <ul>
              <li>
                <span className="font-light">{Brand} :</span> {data?.brand}
              </li>
              <li>
                <span className="font-light">{Category} :</span> {data?.category}
              </li>
              <li>
                <span className="font-light">{Tags}:</span> summer, organic
              </li>
            </ul>
          </div>
        )}
        <div className="product-btns">
          <AddtoCartBtn customeclass="btn btn-solid-default btn-sm" data={data} />
          <Link href={`/product/product_left_sidebar/${data?.id}`} className="btn btn-solid-default btn-sm" onClick={() => dispatch(IS_MODAL())}>
            {Viewdetails}
          </Link>
        </div>
      </div>
    </Col>
  );
};
export default ModalProductDetails;
