import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "@/Constant";
import useWindowDimensions from "@/Utils/useWindowDimensions";
import AddToHome from "./AddToHome";
import ThreeBarToggle from "./ThreeBarToggle";
import { getAPIData } from "@/Utils";
import { OVERLAY, TOPMENUTOGGLE } from "@/ReduxToolkit/Reducers/ModalReducer";

const NavBar = ({ customClass }) => {
  const { width } = useWindowDimensions();
  const [headerData, setHeaderData] = useState([]);
  const { TopMenuToggle } = useSelector((state) => state.ModalReducer);
  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    getAPIData("/api/header").then((res) => setHeaderData(res?.data || []));
  }, []);

  const closeMobileMenu = () => {
    if (width < 1200) {
      dispatch(TOPMENUTOGGLE());
      dispatch(OVERLAY());
    }
  };

  const closeMenuFromBack = () => {
    dispatch(TOPMENUTOGGLE());
    dispatch(OVERLAY());
  };

  const normalizePath = (path = "/") => {
    const cleanPath = path.split("?")[0].split("#")[0];
    if (cleanPath !== "/" && cleanPath.endsWith("/")) {
      return cleanPath.slice(0, -1);
    }
    return cleanPath || "/";
  };

  const currentPath = normalizePath(pathname);

  const isMenuActive = (menuPath = "/") => {
    const normalizedMenuPath = normalizePath(menuPath);
    if (normalizedMenuPath === "/") {
      return currentPath === "/";
    }
    return currentPath === normalizedMenuPath || currentPath.startsWith(`${normalizedMenuPath}/`);
  };

  return (
    <div className="main-navbar">
      <div id="mainnav">
        <ThreeBarToggle customClass={customClass} />
        <ul className="nav-menu" style={{ right: TopMenuToggle ? "0px" : "-410px" }}>
          <li className="back-btn d-xl-none" onClick={closeMenuFromBack}>
            <div className="close-btn">
              {Menu}
              <span className="mobile-back">
                <i className="fa fa-angle-left"></i>
              </span>
            </div>
          </li>

          {headerData?.map((menu, i) => {
            const menuPath = menu?.path || "/";
            const isActive = isMenuActive(menuPath);
            return (
              <li key={i} className={isActive ? "active" : ""}>
                <Link href={menuPath} className={`nav-link menu-title ${isActive ? "active" : ""}`} onClick={closeMobileMenu}>
                  {menu?.title}
                </Link>
              </li>
            );
          })}

          <AddToHome />
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
