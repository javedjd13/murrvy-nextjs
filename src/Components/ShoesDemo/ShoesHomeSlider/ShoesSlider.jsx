import Img from "@/Components/Element/Images";
import { CommonPath, OFF } from "@/Constant";
import Link from "next/link";
import Slider from "react-slick";
import { ShoesMainSlider } from "../../../Data/SliderSettingsData";
import BottomSlider from "./BottomSlider";
import SuggestionBox from "./SuggestionBox";

const resolveImageSrc = (path, fallbackPath) => {
  if (!path || typeof path !== "string") {
    return `${CommonPath}/${fallbackPath}`;
  }

  if (/^https?:\/\//i.test(path) || path.startsWith("/")) {
    return path;
  }

  return `${CommonPath}/${path}`;
};

const ShoesSlider = ({ ShoesMainFilter }) => {
  return (
    <Slider {...ShoesMainSlider}>
      {ShoesMainFilter?.map((el) => {
        return el?.slides?.map((elem, i) => {
          return (
            <div className="banner-poster" key={i}>
              <div className="slider-right-detail">
                <div className="labels">
                  <ul className="label-15">
                    {(elem?.socialIcons || []).map((item, i) => {
                      return (
                        <li key={i}>
                          <Link href={item.website}>
                            <Img
                              src={resolveImageSrc(item.iconImage, "social-icon/1.png")}
                              className="img-fluid"
                              alt="facebook"
                            />
                            <h5 className="d-lg-block d-none">{item.name}</h5>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <h4>{elem.title}</h4>
                {elem.discount > 0 && (
                  <div className="offer-box">
                    <h6>
                      {elem.discount}% {OFF}
                    </h6>
                  </div>
                )}
              </div>
              <div className="slider-bg">
                <div className="bg-text z-1">
                  <span>{elem.leftProduct}</span>
                </div>
                <div className={`bg-circle${elem.gradient}`}></div>
                <Img
                  src={resolveImageSrc(elem.bannerImage, "shoes/banner-1.png")}
                  className="shoes-1 img-fluid z-2"
                  alt="circle"
                />
              </div>
              <SuggestionBox elem={elem} />
              <BottomSlider elem={elem} />
            </div>
          );
        });
      })}
    </Slider>
  );
};

export default ShoesSlider;
