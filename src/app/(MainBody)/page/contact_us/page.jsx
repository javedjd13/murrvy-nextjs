"use client";
import BreadCrumb from "@/Components/Element/BreadCrumb";
import ContactContain from "@/Components/Pages/ContactUs/ContactContain";
import MapSection from "@/Components/Pages/ContactUs/MapSection";
import Layout5 from "@/Layout/Layout5";

const ContactUsPage = () => {
  return (
    <Layout5>
      <BreadCrumb parent="Contact Us" title="Contact Us" />
      <ContactContain />
      <MapSection />
    </Layout5>
  );
};

export default ContactUsPage;
