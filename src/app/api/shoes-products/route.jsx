import axios from "axios";
import Product from "@/app/ApiData/Product.json";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const defaultParams = {
  skip: "0",
  limit: "30",
};

const buildUpstreamUrl = (request) => {
  const baseUrl = process.env.MURRVY_API_BASE_URL || "https://api.murrvy.com";
  const endpoint = process.env.MURRVY_PRODUCTS_ENDPOINT || "/api/v1/products/";
  const url = new URL(endpoint, baseUrl);
  const requestUrl = new URL(request.url);

  if (requestUrl.searchParams.size === 0) {
    Object.entries(defaultParams).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  } else {
    requestUrl.searchParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });
  }

  if (!url.searchParams.has("skip")) {
    url.searchParams.set("skip", defaultParams.skip);
  }

  return url.toString();
};

const normalizeUpstreamProducts = (upstreamData) => {
  if (Array.isArray(upstreamData)) {
    return upstreamData;
  }

  if (Array.isArray(upstreamData?.data?.products)) {
    return upstreamData.data.products;
  }

  if (Array.isArray(upstreamData?.data?.product)) {
    return upstreamData.data.product;
  }

  if (upstreamData?.data?.product) {
    return [upstreamData.data.product];
  }

  if (upstreamData?.product) {
    return [upstreamData.product];
  }

  return [];
};

const createFallbackPayload = (message) => {
  const shoesProducts = Product.filter((item) => item.type === "shoes");

  return {
    status: true,
    message,
    data: {
      products: shoesProducts,
      total_count: shoesProducts.length,
      returned_count: shoesProducts.length,
    },
  };
};

export async function GET(request) {
  try {
    const upstreamUrl = buildUpstreamUrl(request);
    const { data } = await axios.get(upstreamUrl, {
      headers: { Accept: "application/json" },
      timeout: 15000,
    });

    const products = normalizeUpstreamProducts(data);

    if (!Array.isArray(products) || products.length === 0) {
      return NextResponse.json(createFallbackPayload("Fallback: upstream returned empty products"), {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      });
    }

    const normalizedData = {
      status: data?.status ?? true,
      message: data?.message ?? "Success",
      data: {
        products,
        total_count: products.length,
        returned_count: products.length,
      },
    };

    return NextResponse.json(normalizedData, {
      status: 200,
      headers: {
        "Cache-Control": "s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch (error) {
    const fallbackData = createFallbackPayload("Fallback: local shoes product data");

    return NextResponse.json(
      {
        ...fallbackData,
        upstreamError: error?.response?.data?.detail || error.message,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }
}
