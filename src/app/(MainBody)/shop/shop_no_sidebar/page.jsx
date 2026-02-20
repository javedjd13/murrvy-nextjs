"use client";
import BreadCrumb from "@/Components/Element/BreadCrumb";
import ShopNoSidebarContain from "@/Components/Shop/ShopNoSidebar";
import Layout5 from "@/Layout/Layout5";
import useShopProductsQuery from "@/hooks/queries/useShopProductsQuery";

const ShopNoSidebarPage = () => {
  const { productData } = useShopProductsQuery({ skip: 0, limit: 30 });

  return (
    <Layout5>
      <BreadCrumb parent="Shop" title="Shop No Sidebar" />
      <ShopNoSidebarContain productData={productData} />
    </Layout5>
  );
};

export default ShopNoSidebarPage;
