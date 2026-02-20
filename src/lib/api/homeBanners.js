import apiClient from "./client";

export const defaultHeroBannerParams = {
  skip: 0,
  limit: 5,
};

export const getHomeBanners = async (params = {}) => {
  const finalParams = { ...defaultHeroBannerParams, ...params };
  const { data } = await apiClient.get("/home-banners", { params: finalParams });

  return data;
};
