"use client";
import BreadCrumb from "@/Components/Element/BreadCrumb";
import LoginContain from "@/Components/Pages/Login/LoginContain";
import Layout5 from "@/Layout/Layout5";

const LoginPage = () => {
  return (
    <Layout5>
      <BreadCrumb parent="Login" title="Login" />
      <LoginContain />
    </Layout5>
  );
};

export default LoginPage;
