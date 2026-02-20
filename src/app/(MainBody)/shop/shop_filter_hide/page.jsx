"use client";
import BreadCrumb from "@/Components/Element/BreadCrumb";
import ShopFilterHideContain from "@/Components/Shop/ShopFilterHideContain";
import Layout5 from "@/Layout/Layout5";
import useShopProductsQuery from "@/hooks/queries/useShopProductsQuery";

const ShopFilterHidePage = () => {
  const { productData } = useShopProductsQuery({ skip: 0, limit: 30 });

  return (
    <Layout5>
      <BreadCrumb parent="Shop" title="Shop Filter Hide" />
      <ShopFilterHideContain productData={productData} />
    </Layout5>
  );
};

export default ShopFilterHidePage;
