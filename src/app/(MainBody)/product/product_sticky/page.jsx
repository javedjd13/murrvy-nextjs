"use client";
import BreadCrumb from "@/Components/Element/BreadCrumb";
import ProductStickyContain from "@/Components/Products/ProductStickyContain";
import Layout5 from "@/Layout/Layout5";
import RecentNotification from "@/Components/Products/RecentNotification";
import StickyFooter from "@/Components/Products/StickyFooter";

const ProductStickyPage = () => {
  return (
    <Layout5>
      <BreadCrumb parent="Product" title="Product Sticky" />
      <ProductStickyContain />
      <StickyFooter />
      <RecentNotification />
    </Layout5>
  );
};

export default ProductStickyPage;
