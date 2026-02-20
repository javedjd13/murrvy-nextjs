"use client";
import BreadCrumb from "@/Components/Element/BreadCrumb";
import ShopTopFilterContain from "@/Components/Shop/ShopTopFilter";
import Layout5 from "@/Layout/Layout5";
import useShopProductsQuery from "@/hooks/queries/useShopProductsQuery";

const ShopTopFilterPage = () => {
  const { productData } = useShopProductsQuery({ skip: 0, limit: 30 });

  return (
    <Layout5>
      <BreadCrumb parent="Shop" title="Shop Top Filter" />
      <ShopTopFilterContain productData={productData} />
    </Layout5>
  );
};

export default ShopTopFilterPage;
