import { useQuery } from "@tanstack/react-query";
import { getHomeBanners } from "@/lib/api/homeBanners";
import { mapHeroResponseToShoesMainSlider } from "@/lib/mappers/shoesHeroMapper";

const getHeroQueryKey = (params) => [
  "home-banners",
  "shoes-hero",
  params?.skip ?? 0,
  params?.limit ?? 5,
  params?.search ?? "",
];

const useShoesHeroQuery = (params) =>
  useQuery({
    queryKey: getHeroQueryKey(params),
    queryFn: async () => {
      const response = await getHomeBanners(params);
      return mapHeroResponseToShoesMainSlider(response);
    },
    placeholderData: (previousData) => previousData ?? [],
  });

export default useShoesHeroQuery;
