"use client";
import BreadCrumb from "@/Components/Element/BreadCrumb";
import ShopListInfiniteContain from "@/Components/Shop/ShopListInfinite/ShopListInfinite";
import Layout5 from "@/Layout/Layout5";
import useShopProductsQuery from "@/hooks/queries/useShopProductsQuery";

const ShopListInfinitePage = () => {
  const { productData } = useShopProductsQuery({ skip: 0, limit: 30 });
  const listGrid = true;

  return (
    <Layout5>
      <BreadCrumb parent="Shop" title="Shop List Infinite" />
      <ShopListInfiniteContain productData={productData} listGrid={listGrid} />
    </Layout5>
  );
};

export default ShopListInfinitePage;
