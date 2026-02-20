import { useMemo } from "react";
import useShoesProductsQuery from "./useShoesProductsQuery";

const useShopProductsQuery = (params) => {
  const query = useShoesProductsQuery(params);

  const productData = useMemo(() => {
    const latestProducts = query?.data?.latestProducts;
    if (Array.isArray(latestProducts) && latestProducts.length > 0) {
      return latestProducts;
    }

    const allProducts = query?.data?.allProducts;
    if (Array.isArray(allProducts) && allProducts.length > 0) {
      return allProducts;
    }

    return [];
  }, [query?.data?.allProducts, query?.data?.latestProducts]);

  return {
    ...query,
    productData,
  };
};

export default useShopProductsQuery;
