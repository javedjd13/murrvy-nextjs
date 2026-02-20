"use client";
import BreadcrumSection from "@/Components/Pages/Faq/BreadCrumSection";
import FaqDetail from "@/Components/Pages/Faq/FaqDetail";
import TopSection from "@/Components/Pages/Faq/TopSection";
import Layout5 from "@/Layout/Layout5";

const FaqPage = () => {
  return (
    <Layout5>
      <BreadcrumSection />
      <TopSection />
      <FaqDetail />
    </Layout5>
  );
};

export default FaqPage;
