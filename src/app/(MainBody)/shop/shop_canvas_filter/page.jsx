"use client";
import BreadCrumb from "@/Components/Element/BreadCrumb";
import ShopCanvasFilterContain from "@/Components/Shop/ShopCanvasFilter";
import Layout5 from "@/Layout/Layout5";
import useShopProductsQuery from "@/hooks/queries/useShopProductsQuery";

const ShopCanvasFilterPage = () => {
  const { productData } = useShopProductsQuery({ skip: 0, limit: 30 });

  return (
    <Layout5>
      <BreadCrumb parent="Shop" title="Shop Canvas Filter" />
      <ShopCanvasFilterContain productData={productData} />
    </Layout5>
  );
};

export default ShopCanvasFilterPage;
