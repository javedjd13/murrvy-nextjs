"use client";
import BreadCrumb from "@/Components/Element/BreadCrumb";
import ShopWithCategoryContain from "@/Components/Shop/ShopWithCategory";
import Layout5 from "@/Layout/Layout5";
import useShopProductsQuery from "@/hooks/queries/useShopProductsQuery";

const ShopWithCategoryPage = () => {
  const { productData } = useShopProductsQuery({ skip: 0, limit: 30 });

  return (
    <Layout5>
      <BreadCrumb parent="Shop" title="Shop With Category" />
      <ShopWithCategoryContain productData={productData} />
    </Layout5>
  );
};

export default ShopWithCategoryPage;
