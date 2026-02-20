"use client";
import BreadCrumb from "@/Components/Element/BreadCrumb";
import Product360ViewContain from "@/Components/Products/Product360Views";
import Layout5 from "@/Layout/Layout5";
import RecentNotification from "@/Components/Products/RecentNotification";

const Product360Page = () => {
  return (
    <Layout5>
      <BreadCrumb parent="Product 360 View" title="Product 360 View" />
      <Product360ViewContain />
      <RecentNotification />
    </Layout5>
  );
};

export default Product360Page;
