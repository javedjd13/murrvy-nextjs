import React from 'react';
import { useState } from 'react';
import { BestSeller, Color, OFF } from '@/Constant';
import GifComponents from '../Product4ImageContain/GifComponents';
import ProductActions from '../Product4ImageContain/ProductActions';
import ProductProgressBar from '../Product4ImageContain/ProductProgressBar';
import ProductSizeChart from '../Product4ImageContain/ProductSizeChart';
import ShareSocial from '../Product4ImageContain/ShareSocial';
import BundleCartDetails from './BundleCartDetails';

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
  const label = getColorLabel(color).trim().toLowerCase();

  if (!label) {
    return { background: "#d9d9d9" };
  }

  if (label === "multicolor" || label === "multi color") {
    return {
      background:
        "linear-gradient(135deg, #ff5f6d 0%, #ffc371 30%, #47cf73 60%, #5b86e5 100%)",
    };
  }

  if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(label) || /^(rgb|hsl)a?\(/i.test(label)) {
    return { background: label };
  }

  if (/^[a-z]+$/i.test(label)) {
    return { background: label };
  }

  return { background: "#d9d9d9" };
};

const ProductDetails = ({ bundles, singleProduct }) => {
  const [active, setActive] = useState();
  const product = singleProduct?.[0] || {};

  return (
    <div className='cloth-details-size'>
      <GifComponents />

      <div className='details-image-concept'>
        <h2>{product?.name}</h2>
      </div>

      <div className='label-section'>
        <span className='badge badge-grey-color'>{BestSeller}</span>
        <span className='label-text'>in {product?.type}</span>
      </div>

      <h3 className='price-detail'>
        ${product?.price} <del>${product?.mrp}.00</del>
        {product?.discount !== 0 && (
          <span>
            {product?.discount}% {OFF}
          </span>
        )}
      </h3>

      <div className='color-selector'>
        <h5>{Color} :</h5>
        <ul className='image-section'>
          {Array.isArray(product?.colors) &&
            product.colors.map((elem, i) => (
              <li key={i}>
                <a
                  href='#javascript'
                  title={getColorLabel(elem) || "color"}
                  onClick={() => setActive(i)}
                  style={getColorStyle(elem)}
                >
                  {active === i && <i className='fas fa-check'></i>}
                </a>
              </li>
            ))}
        </ul>
      </div>
      <ProductSizeChart sizeOptions={product?.sizeoption} />
      <ProductActions singleProduct={singleProduct} />
      <ProductProgressBar />
      <ShareSocial />
      {bundles && <BundleCartDetails />}
    </div>
  );
};

export default ProductDetails;
