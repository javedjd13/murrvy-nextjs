"use client";
import FashionService from "@/Components/FashionDemo/FashionService";
import FlowerBrand from "@/Components/FlowerDemo/FlowerBrand";
import FlowerSubscribe from "@/Components/FlowerDemo/FlowerSubscribe";
import ShoesBannerMiddle from "@/Components/ShoesDemo/ShoesBannerMiddle";
import ShoesCategory from "@/Components/ShoesDemo/ShoesCategory";
import ShoesDeal from "@/Components/ShoesDemo/ShoesDeal";
import ShoesHomeSlider from "@/Components/ShoesDemo/ShoesHomeSlider";
import ShoesLatestProduct from "@/Components/ShoesDemo/ShoesLatestProduct";
import ShoesNewArrival from "@/Components/ShoesDemo/ShoesNewArrival";
import ShoesTopBanner from "@/Components/ShoesDemo/ShoesTopBanner";
import HomeSlider from "@/app/ApiData/HomeSlider.json";
import Product from "@/app/ApiData/Product.json";
import StartModel from "@/Layout/Element/StartModel";
import Layout5 from "@/Layout/Layout5";
import useShoesHeroQuery from "@/hooks/queries/useShoesHeroQuery";
import useShoesProductsQuery from "@/hooks/queries/useShoesProductsQuery";
import { getAPIData } from "@/Utils";
import { useEffect, useMemo, useState } from "react";

const Shoes = () => {
  const [bannerData, setBannerData] = useState([]);
  const [categoryBanner, setCategoryBanner] = useState([]);

  const { data: heroSliderData = [] } = useShoesHeroQuery({
    skip: 0,
    limit: 5,
  });

  const fallbackMainSlider = useMemo(
    () => HomeSlider.filter((item) => item.type === "shoes"),
    [],
  );

  const mainSlider =
    Array.isArray(heroSliderData) && heroSliderData.length > 0
      ? heroSliderData
      : fallbackMainSlider;

  const { data: shoesProductsData } = useShoesProductsQuery({
    skip: 0,
    limit: 30,
  });

  const fallbackShoesProducts = useMemo(
    () => Product.filter((item) => item.type === "shoes"),
    [],
  );

  const latestProducts =
    shoesProductsData?.latestProducts?.length > 0
      ? shoesProductsData.latestProducts
      : fallbackShoesProducts;
  const newArrivalProducts =
    shoesProductsData?.newArrivalProducts?.length > 0
      ? shoesProductsData.newArrivalProducts
      : [...fallbackShoesProducts]
          .sort((a, b) => Number(b.id) - Number(a.id))
          .slice(0, 30);

  useEffect(() => {
    document.documentElement.style.setProperty("--theme-color", "#3DFC0E");
    const types = ["banner", "popular", "tabsection", "categorybanner"];
    types.forEach((type) => {
      getAPIData(`/api/${type}`).then((res) => {
        type === "banner" && setBannerData(res?.data);
        type === "categorybanner" && setCategoryBanner(res?.data);
      });
    });
  }, []);
  const isCategories = true;
  const removePadding = true;
  return (
    <Layout5 isCategories={isCategories}>
      <ShoesHomeSlider mainSlider={mainSlider} />
      <FashionService removePadding={removePadding} />
      <ShoesTopBanner bannerData={bannerData} />
      <ShoesLatestProduct products={latestProducts} />
      <ShoesBannerMiddle bannerData={bannerData} />
      <ShoesCategory categoryBanner={categoryBanner} />
      <ShoesNewArrival products={newArrivalProducts} />
      <ShoesDeal bannerData={bannerData} />
      <FlowerSubscribe />
      <FlowerBrand />
      <StartModel />
    </Layout5>
  );
};
export default Shoes;
