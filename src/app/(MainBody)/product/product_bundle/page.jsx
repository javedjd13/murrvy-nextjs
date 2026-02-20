"use client";
import BreadCrumb from "@/Components/Element/BreadCrumb";
import ProductBundleContain from "@/Components/Products/ProductBundle";
import Layout5 from "@/Layout/Layout5";
import RecentNotification from "@/Components/Products/RecentNotification";

const ProductBundlePage = () => {
  return (
    <Layout5>
      <BreadCrumb parent="Product" title="Product Bundle" />
      <ProductBundleContain />
      <RecentNotification />
    </Layout5>
  );
};

export default ProductBundlePage;
