import Link from "next/link";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { ShoesNewSlider } from "../../../Data/SliderSettingsData";
import { CommonPath } from "@/Constant";
import AddToCartProduct from "../../Element/AddToCart";
import AddToWishList from "../../Element/AddToWishList";
import CompareProducts from "../../Element/CompareProducts";
import DynamicRating from "../../Element/DynamicRating";
import ModelViewProduct from "../../Element/ModelViewProduct";
import Img from "@/Components/Element/Images";

const resolveImageSrc = (value, fallbackValue) => {
  if (!value || typeof value !== "string") {
    return `${CommonPath}/${fallbackValue}`;
  }

  if (/^https?:\/\//i.test(value) || value.startsWith("/")) {
    return value;
  }

  return `${CommonPath}/${value}`;
};

const ShoesSliderCard = ({ products = [] }) => {
  const { symbol, currencyValue } = useSelector((state) => state.CurrencyReducer);

  if (!Array.isArray(products) || products.length === 0) {
    return null;
  }

  return (
    <div className="product-wrapper slide-5 light-arrow bottom-space">
      <Slider {...ShoesNewSlider}>
        {products.map((elem, i) => {
          const imageList = Array.isArray(elem?.images) ? elem.images : [];
          const mappedImages =
            imageList.length > 0 ? imageList : [{ imageId: 1, src: "shoes/product/1.jpg" }];

          return (
            <div key={i}>
              <div className="product-box">
                <div className="img-wrapper">
                  <a>
                    {mappedImages.map((item, i) => {
                      const imageSrc = typeof item === "string" ? item : item?.src;

                      return (
                        <Img
                          src={resolveImageSrc(imageSrc, "shoes/product/1.jpg")}
                          className="img-fluid bg-img"
                          alt="shoes"
                          key={i}
                        />
                      );
                    })}
                  </a>
                  <div className="cart-wrap">
                    <ul>
                      <AddToCartProduct elem={elem} />
                      <ModelViewProduct elem={elem} />
                      <CompareProducts elem={elem} />
                      <AddToWishList elem={elem} />
                    </ul>
                  </div>
                </div>
                <div className="product-details text-center">
                  <h3 className="theme-color">
                    {symbol}
                    {(Number(elem.price || 0) * currencyValue).toFixed(2)}
                    <span className="font-light ml-1">
                      {symbol}
                      {(Number(elem.mrp || 0) * currencyValue).toFixed(2)}
                    </span>
                  </h3>
                  <Link href={`/product/product_left_sidebar/${elem.id}`} className="font-default">
                    <h5>{elem.name}</h5>
                  </Link>
                  <DynamicRating data={elem.ratingStars} customeclass={"mt-1"} />
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ShoesSliderCard;
