"use client";
import BreadCrumb from "@/Components/Element/BreadCrumb";
import ProductNoSideBarContain from "@/Components/Products/ProductNoSidebarContain";
import Layout5 from "@/Layout/Layout5";
import RecentNotification from "@/Components/Products/RecentNotification";

const ProductNoSidebarPage = () => {
  return (
    <Layout5>
      <BreadCrumb parent="Product" title="Product No Sidebar" />
      <ProductNoSideBarContain />
      <RecentNotification />
    </Layout5>
  );
};

export default ProductNoSidebarPage;
