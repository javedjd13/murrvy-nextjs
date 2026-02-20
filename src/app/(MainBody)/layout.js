"use client";
import YoutubeModal from "@/Components/FashionDemo/YoutubeModal";
import ConfirmDeleteModal from "@/Components/Pages/UserDashboard/ConfirmDeleteModal";
import DeleteModal from "@/Components/Pages/UserDashboard/DeleteModal";
import PaymentCardModal from "@/Components/Pages/UserDashboard/PaymentCardModal";
import ProfileModal from "@/Components/Pages/UserDashboard/ProfileModal";
import SaveAddressModal from "@/Components/Pages/UserDashboard/SaveAddressModal";
import CopyConfigModal from "@/Layout/Common/Customizer/CopyConfigModal";
import SizeModal from "@/Layout/Element/SizeModal";
import Overlay from "@/Layout/Overlay";
import { store } from "@/ReduxToolkit/store";
import AuthSessionProvider from "@/lib/auth/AuthSessionProvider";
import ReactQueryProvider from "@/lib/react-query/ReactQueryProvider";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import CartSuccessModal from "../../Components/Element/CartSuccessModal";
import CommonMobileView from "../../Components/Element/CommonMobileView";
import CommonModel from "../../Components/Element/CommonModel";
import React, { useEffect } from "react";
import { unstable_batchedUpdates } from "react-dom";

unstable_batchedUpdates(() => {
  console.error = () => { };
  console.warn = () => { };
});

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    if (error.message.includes("ToastContainer")) {
      return;
    }
    return "Uncaught error:", error, errorInfo;
  }

  render() {
    return this.props.children;
  }
}

const RootLayout = ({ children }) => {
  const router = usePathname();
  const pathArr = router.split("/");

  useEffect(() => {
    if (router.search("/product") === -1) {
      document.body.classList.remove("stickyCart");
    } else if (router === "/page/coming_soon") {
      document.body.classList.add("light-gray-bg");
    } else if (router !== "/page/coming_soon") {
      document.body.classList.remove("light-gray-bg");
    }
  }, [router]);

  return (
    <ReactQueryProvider>
      <AuthSessionProvider>
        <Provider store={store}>
          <ErrorBoundary>
            {children}
            <Overlay />
            <CartSuccessModal />
            {pathArr.includes("register") || pathArr.includes("login") || pathArr.includes("forgot_password") || (pathArr.includes("coming_soon") !== true && <CommonMobileView />)}
            <ToastContainer />
            <SizeModal />
            <CommonModel />
            <DeleteModal />
            <ConfirmDeleteModal />
            <ProfileModal />
            <SaveAddressModal />
            <PaymentCardModal />
            <YoutubeModal />
            <CopyConfigModal />
          </ErrorBoundary>
        </Provider>
      </AuthSessionProvider>
    </ReactQueryProvider>
  );
};

export default RootLayout;
