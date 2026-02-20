"use client";
import BreadCrumb from "@/Components/Element/BreadCrumb";
import SearchContain from "@/Components/Pages/Search/SearchContain";
import Layout5 from "@/Layout/Layout5";

const SearchPage = () => {
  return (
    <Layout5>
      <BreadCrumb parent="Search" title="Search" />
      <SearchContain />
    </Layout5>
  );
};

export default SearchPage;
