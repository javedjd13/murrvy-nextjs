"use client";
import BreadCrumb from "@/Components/Element/BreadCrumb";
import OrderTracking from "@/Components/Pages/OrderTracking/OrderTracking";
import Layout5 from "@/Layout/Layout5";

const OrderTrackingPage = () => {
  return (
    <Layout5>
      <BreadCrumb parent="Order Tracking" title="Order Tracking" />
      <OrderTracking />
    </Layout5>
  );
};

export default OrderTrackingPage;
