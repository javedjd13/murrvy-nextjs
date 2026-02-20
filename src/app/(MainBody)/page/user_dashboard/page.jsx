"use client";
import BreadCrumb from "@/Components/Element/BreadCrumb";
import DashboardSidebar from "@/Components/Pages/UserDashboard/DashboardSidebar";
import Layout5 from "@/Layout/Layout5";

const UserDashboardPage = () => {
  return (
    <Layout5>
      <BreadCrumb parent="User Dashboard" title="User Dashboard" />
      <DashboardSidebar />
    </Layout5>
  );
};

export default UserDashboardPage;
