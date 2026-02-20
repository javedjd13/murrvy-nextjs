/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";

const normalizeBgSource = (value) => {
  if (!value || typeof value !== "string") {
    return "";
  }

  const trimmedValue = value.trim();

  try {
    return encodeURI(decodeURI(trimmedValue));
  } catch (error) {
    return encodeURI(trimmedValue);
  }
};

const Img = (props) => {
  const { alt, src, className } = props;
  const bgImg = useRef(null);

  useEffect(() => {
    const image = bgImg.current;
    if (!image) {
      return;
    }

    if (image.classList.contains("bg-img")) {
      const parentElement = image.parentElement;
      const source = image.getAttribute("src");
      const safeSrc = normalizeBgSource(source);

      if (!parentElement) {
        return;
      }

      parentElement.classList.add("bg-size");
      image.style.display = "none";
      parentElement.style.backgroundImage = safeSrc ? `url("${safeSrc}")` : "";
      parentElement.style.backgroundSize = "cover";
      parentElement.style.backgroundPosition = "center";
      parentElement.style.backgroundRepeat = "no-repeat";
      parentElement.style.display = "block";
      return;
    }

    image.style.display = "";
  }, [src, className]);

  return <img ref={bgImg} {...props} alt={alt} />;
};
export default Img;
