import { QueryClient } from "@tanstack/react-query";

const shouldRetry = (failureCount, error) => {
  const status = error?.response?.status;

  if (status && status < 500) {
    return false;
  }

  return failureCount < 2;
};

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: shouldRetry,
      },
      mutations: {
        retry: false,
      },
    },
  });
