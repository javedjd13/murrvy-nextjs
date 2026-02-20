"use client";
import BreadCrumb from "@/Components/Element/BreadCrumb";
import ShopSection from "@/Components/Shop/ShopCategoryFilter/ShopSection";
import ShopSlider from "@/Components/Shop/ShopCategoryFilter/ShopSlider";
import Layout5 from "@/Layout/Layout5";
import useShopProductsQuery from "@/hooks/queries/useShopProductsQuery";

const ShopCategoryFilterPage = () => {
  const { productData } = useShopProductsQuery({ skip: 0, limit: 30 });

  return (
    <Layout5>
      <BreadCrumb parent="Shop" title="Shop Category Filter" />
      <ShopSlider />
      <ShopSection productData={productData} />
    </Layout5>
  );
};

export default ShopCategoryFilterPage;
