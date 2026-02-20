"use client";
import BreadCrumb from "@/Components/Element/BreadCrumb";
import ShopRightSidebarContain from "@/Components/Shop/ShopRightSidebarContain";
import Layout5 from "@/Layout/Layout5";
import useShopProductsQuery from "@/hooks/queries/useShopProductsQuery";

const ShopRightSidebarPage = () => {
  const { productData } = useShopProductsQuery({ skip: 0, limit: 30 });

  return (
    <Layout5>
      <BreadCrumb parent="Shop" title="Shop Right Sidebar" />
      <ShopRightSidebarContain productData={productData} />
    </Layout5>
  );
};

export default ShopRightSidebarPage;
