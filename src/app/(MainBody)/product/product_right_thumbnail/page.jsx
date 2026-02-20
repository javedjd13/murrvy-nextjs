"use client";
import BreadCrumb from "@/Components/Element/BreadCrumb";
import ProductRightThumbnailContain from "@/Components/Products/ProductRightThumbnailContain.jsx";
import Layout5 from "@/Layout/Layout5";
import RecentNotification from "@/Components/Products/RecentNotification";

const ProductRightThumbnailPage = () => {
  return (
    <Layout5>
      <BreadCrumb parent="Product" title="Product Right Thumbnail" />
      <ProductRightThumbnailContain />
      <RecentNotification />
    </Layout5>
  );
};

export default ProductRightThumbnailPage;
