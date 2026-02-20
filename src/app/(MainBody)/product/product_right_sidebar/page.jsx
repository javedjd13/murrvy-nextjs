"use client";
import BreadCrumb from "@/Components/Element/BreadCrumb";
import ProductRightSidebarContain from "@/Components/Products/ProductRightSidebarContain.jsx";
import Layout5 from "@/Layout/Layout5";
import RecentNotification from "@/Components/Products/RecentNotification";
import { getAPIData } from "@/Utils";
import { useEffect, useState } from "react";

const ProductRightSidebarPage = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    getAPIData("/api/products").then((res) => {
      setProductData(res?.data || []);
    });
  }, []);

  return (
    <Layout5>
      <BreadCrumb parent="Product" title="Product Right Sidebar" />
      <ProductRightSidebarContain productData={productData} />
      <RecentNotification />
    </Layout5>
  );
};

export default ProductRightSidebarPage;
