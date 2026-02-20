import apiClient from "./client";

export const defaultShoesProductParams = {
  skip: 0,
  limit: 30,
};

export const getShoesProducts = async (params = {}) => {
  const finalParams = { ...defaultShoesProductParams, ...params };
  const { data } = await apiClient.get("/shoes-products", { params: finalParams });

  return data;
};
