import React, { useMemo, useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { useDispatch } from "react-redux";
import { CATEGORY } from "@/ReduxToolkit/Reducers/ProductFilterReducer";
import useShopProductsQuery from "@/hooks/queries/useShopProductsQuery";

const SortByType = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { productData } = useShopProductsQuery({ skip: 0, limit: 30 });
  const features = useMemo(() => {
    return Array.from(new Set((Array.isArray(productData) ? productData : []).map((item) => item?.type).filter(Boolean)));
  }, [productData]);

  return (
    <Dropdown className="select-featured" isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
      <DropdownToggle className="dropdown-toggle">
        <span>{"Select Featured"}</span> <i className="fas fa-angle-down ms-lg-3 ms-2"></i>
      </DropdownToggle>
      <DropdownMenu>
        {features &&
          features.map((elem, i) => {
            return (
              <DropdownItem key={i} onClick={() => dispatch(CATEGORY([elem]))}>
                {elem}
              </DropdownItem>
            );
          })}
      </DropdownMenu>
    </Dropdown>
  );
};

export default SortByType;
