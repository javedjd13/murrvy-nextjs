"use client";
import BreadCrumb from "@/Components/Element/BreadCrumb";
import ShopLeftSidebarContain from "@/Components/Shop/ShopLeftSidebarContain";
import Layout5 from "@/Layout/Layout5";
import useShopProductsQuery from "@/hooks/queries/useShopProductsQuery";

const ShopListPage = () => {
  const { productData } = useShopProductsQuery({ skip: 0, limit: 30 });
  const listGrid = true;

  return (
    <Layout5>
      <BreadCrumb parent="Shop" title="Shop List" />
      <ShopLeftSidebarContain productData={productData} listGrid={listGrid} />
    </Layout5>
  );
};

export default ShopListPage;
