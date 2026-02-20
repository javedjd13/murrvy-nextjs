"use client";
import BreadCrumb from "@/Components/Element/BreadCrumb";
import ProductCart from "@/Components/Pages/Cart";
import Layout5 from "@/Layout/Layout5";

const CartPage = () => {
  return (
    <Layout5>
      <BreadCrumb parent="Cart" title="Cart" />
      <ProductCart />
    </Layout5>
  );
};

export default CartPage;
