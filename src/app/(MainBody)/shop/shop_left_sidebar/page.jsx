"use client";
import BreadCrumb from "@/Components/Element/BreadCrumb";
import ShopLeftSidebarContain from "@/Components/Shop/ShopLeftSidebarContain";
import Layout5 from "@/Layout/Layout5";
import useShopProductsQuery from "@/hooks/queries/useShopProductsQuery";

const ShopLeftSidebarPage = () => {
  const { productData } = useShopProductsQuery({ skip: 0, limit: 30 });

  return (
    <Layout5>
      <BreadCrumb parent="Shop" title="Shop" />
      <ShopLeftSidebarContain productData={productData} />
    </Layout5>
  );
};

export default ShopLeftSidebarPage;
