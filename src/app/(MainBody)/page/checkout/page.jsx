"use client";
import BreadCrumb from "@/Components/Element/BreadCrumb";
import SectionCheckout from "@/Components/Pages/Checkout";
import Layout5 from "@/Layout/Layout5";

const CheckoutPage = () => {
  return (
    <Layout5>
      <BreadCrumb parent="Checkout" title="Checkout" />
      <SectionCheckout />
    </Layout5>
  );
};

export default CheckoutPage;
