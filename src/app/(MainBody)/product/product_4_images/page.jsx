"use client";
import BreadCrumb from "@/Components/Element/BreadCrumb";
import Product4ImageContain from "@/Components/Products/Product4ImageContain";
import Layout5 from "@/Layout/Layout5";
import RecentNotification from "@/Components/Products/RecentNotification";

const Product4ImagesPage = () => {
  return (
    <Layout5>
      <BreadCrumb parent="Product" title="Product 4 Images" />
      <Product4ImageContain />
      <RecentNotification />
    </Layout5>
  );
};

export default Product4ImagesPage;
