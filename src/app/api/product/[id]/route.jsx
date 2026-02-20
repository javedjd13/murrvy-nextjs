import axios from "axios";
import { mapProductsPayloadToShoesProducts } from "@/lib/mappers/shoesProductsMapper";
import { NextResponse } from "next/server";
import Product from "../../../ApiData/Product.json";

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

const getFallbackProduct = (id) => {
  const targetId = Number(id);
  const byId = Product.filter((item) => Number(item.id) === targetId);

  if (byId.length > 0) {
    return byId;
  }

  return Product.filter((item) => item.id === 1);
};

const resolveProductId = (req, params) => {
  if (params?.id !== undefined && params?.id !== null) {
    return Number(params.id);
  }

  const path = new URL(req.url).pathname;
  const rawId = path.split("/").filter(Boolean).pop();
  return Number(rawId);
};

export async function GET(req, { params } = {}) {
  const productId = resolveProductId(req, params);

  if (!Number.isFinite(productId) || productId <= 0) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    const baseUrl = process.env.MURRVY_API_BASE_URL || "https://api.murrvy.com";
    const endpoint = process.env.MURRVY_PRODUCTS_ENDPOINT || "/api/v1/products/";
    const url = new URL(endpoint, baseUrl);
    url.searchParams.set("skip", "0");
    url.searchParams.set("limit", "200");

    const { data } = await axios.get(url.toString(), {
      headers: { Accept: "application/json" },
      timeout: 15000,
    });

    const rawProducts = normalizeUpstreamProducts(data);
    const mapped = mapProductsPayloadToShoesProducts({
      status: true,
      data: {
        products: rawProducts,
      },
    });

    const matchedProduct = mapped.allProducts.find((item) => Number(item.id) === productId);

    if (matchedProduct) {
      return NextResponse.json([matchedProduct], {
        headers: { "Cache-Control": "no-store" },
      });
    }
  } catch (error) {
    // Fallback to local JSON when upstream is unavailable.
  }

  return NextResponse.json(getFallbackProduct(productId), {
    headers: { "Cache-Control": "no-store" },
  });
}
