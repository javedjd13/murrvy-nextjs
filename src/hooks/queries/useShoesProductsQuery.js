import { useQuery } from "@tanstack/react-query";
import { getShoesProducts } from "@/lib/api/shoesProducts";
import { mapProductsPayloadToShoesProducts } from "@/lib/mappers/shoesProductsMapper";

const emptyShoesProducts = {
  latestProducts: [],
  newArrivalProducts: [],
  allProducts: [],
};

const getShoesProductsQueryKey = (params) => [
  "shoes-products",
  params?.skip ?? 0,
  params?.limit ?? 30,
  params?.search ?? "",
];

const useShoesProductsQuery = (params) =>
  useQuery({
    queryKey: getShoesProductsQueryKey(params),
    queryFn: async () => {
      const response = await getShoesProducts(params);
      return mapProductsPayloadToShoesProducts(response);
    },
    placeholderData: (previousData) => previousData ?? emptyShoesProducts,
  });

export default useShoesProductsQuery;
