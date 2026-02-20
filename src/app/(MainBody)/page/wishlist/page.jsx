"use client";
import BreadCrumb from "@/Components/Element/BreadCrumb";
import WishlistProducts from "@/Components/Pages/WishList/WishlistProducts";
import Layout5 from "@/Layout/Layout5";

const WishlistPage = () => {
  return (
    <Layout5>
      <BreadCrumb parent="Wishlist" title="Wishlist" />
      <WishlistProducts />
    </Layout5>
  );
};

export default WishlistPage;
