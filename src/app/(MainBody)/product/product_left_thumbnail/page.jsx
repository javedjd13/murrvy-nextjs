"use client";
import BreadCrumb from "@/Components/Element/BreadCrumb";
import ProductLeftThumbnailContain from "@/Components/Products/ProductLeftThumbnailContain.jsx";
import Layout5 from "@/Layout/Layout5";
import RecentNotification from "@/Components/Products/RecentNotification";

const ProductLeftThumbnailPage = () => {
  return (
    <Layout5>
      <BreadCrumb parent="Product" title="Product Left Thumbnail" />
      <ProductLeftThumbnailContain />
      <RecentNotification />
    </Layout5>
  );
};

export default ProductLeftThumbnailPage;
