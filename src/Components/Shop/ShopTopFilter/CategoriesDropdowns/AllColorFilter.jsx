import { Color } from "@/Constant";
import { COLORFILTER } from "@/ReduxToolkit/Reducers/ProductFilterReducer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AllColorFilter = ({ productData, setIsNum, isNum }) => {
  const dispatch = useDispatch();
  const { color } = useSelector((state) => state.ProductFilter);
  const [colorArray, setColorArray] = useState([]);

  useEffect(() => {
    const nextColors = Array.from(
      new Set(
        (Array.isArray(productData) ? productData : []).flatMap((item) => {
          if (!Array.isArray(item?.colors)) {
            return [];
          }

          return item.colors
            .map((colorItem) => (typeof colorItem === "string" ? colorItem : colorItem?.color_name))
            .filter(Boolean);
        })
      )
    );

    setColorArray(nextColors);
  }, [productData]);

  const onShow = (val) => {
    if (val !== isNum) {
      setIsNum(val);
    } else {
      setIsNum(0);
    }
  };
  return (
    <li className={`category-color onclick-title${isNum === 3 ? " show-2" : ""}`}>
      <h6 onClick={() => onShow(3)}>{Color}</h6>
      <ul className="onclick-content top-filter-color category-list">
        {colorArray?.map((elem, i) => (
          <li className={`${color?.includes(elem) ? "active" : ""}`} key={i}>
            <a href="#javascript" style={{ background: elem }} onClick={() => dispatch(COLORFILTER(elem))}></a>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default AllColorFilter;
