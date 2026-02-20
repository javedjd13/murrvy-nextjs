"use client";
import BreadCrumb from "@/Components/Element/BreadCrumb";
import ProductLeftSidebarContain from "@/Components/Products/ProductLeftSidebarContain";
import Layout5 from "@/Layout/Layout5";
import RecentNotification from "@/Components/Products/RecentNotification";
import { getAPIData } from "@/Utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProductLeftSidebarPage = ({ params }) => {
  const [productData, setProductData] = useState([]);
  const routeParams = useParams();
  const resolvedId = Array.isArray(routeParams?.id)
    ? routeParams.id[0]
    : routeParams?.id || params?.id;

  useEffect(() => {
    getAPIData("/api/products").then((res) => {
      setProductData(res?.data || []);
    });
  }, []);

  return (
    <Layout5>
      <BreadCrumb parent="Product" title="Product Page" />
      <ProductLeftSidebarContain productData={productData} id={resolvedId} />
      <RecentNotification />
    </Layout5>
  );
};

export default ProductLeftSidebarPage;
