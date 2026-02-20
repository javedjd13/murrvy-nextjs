"use client";
import OrderDetails from "@/Components/Pages/OrderSuccess/OrderDetails";
import TopSection from "@/Components/Pages/OrderSuccess/TopSection";
import Layout5 from "@/Layout/Layout5";

const OrderSuccessPage = () => {
  return (
    <Layout5>
      <TopSection />
      <OrderDetails />
    </Layout5>
  );
};

export default OrderSuccessPage;
