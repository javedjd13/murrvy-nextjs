"use client";
import BreadCrumb from "@/Components/Element/BreadCrumb";
import CompareTable from "@/Components/Pages/Compare/CompareTable";
import Layout5 from "@/Layout/Layout5";

const ComparePage = () => {
  return (
    <Layout5>
      <BreadCrumb parent="Compare" title="Compare" />
      <CompareTable />
    </Layout5>
  );
};

export default ComparePage;
