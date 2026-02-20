"use client";
import BreadCrumb from "@/Components/Element/BreadCrumb";
import ProductVideoThumbnailContain from "@/Components/Products/ProductVideoThumbnailContain";
import Layout5 from "@/Layout/Layout5";
import RecentNotification from "@/Components/Products/RecentNotification";
import { getAPIData } from "@/Utils";
import { useEffect, useState } from "react";

const ProductVideoThumbnailPage = () => {
  const [productData, setProductData] = useState([]);
  const VideoPlay = true;

  useEffect(() => {
    getAPIData("/api/products").then((res) => {
      setProductData(res?.data || []);
    });
  }, []);

  return (
    <Layout5>
      <BreadCrumb parent="Product" title="Product Video Thumbnail" />
      <ProductVideoThumbnailContain productData={productData} VideoPlay={VideoPlay} />
      <RecentNotification />
    </Layout5>
  );
};

export default ProductVideoThumbnailPage;
