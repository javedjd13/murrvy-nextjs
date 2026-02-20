"use client";
import BreadCrumb from "@/Components/Element/BreadCrumb";
import RegisterSection from "@/Components/Pages/Register/RegisterSection";
import Layout5 from "@/Layout/Layout5";

const RegisterPage = () => {
  return (
    <Layout5>
      <BreadCrumb parent="Register" title="Register" />
      <RegisterSection />
    </Layout5>
  );
};

export default RegisterPage;
