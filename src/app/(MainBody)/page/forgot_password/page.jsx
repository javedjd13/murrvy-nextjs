"use client";
import BreadCrumb from "@/Components/Element/BreadCrumb";
import ForgotPasswordSection from "@/Components/Pages/ForgotPassword/ForgotPasswordSection";
import Layout5 from "@/Layout/Layout5";

const ForgotPasswordPage = () => {
  return (
    <Layout5>
      <BreadCrumb parent="Forgot Password" title="Forgot Password" />
      <ForgotPasswordSection />
    </Layout5>
  );
};

export default ForgotPasswordPage;
