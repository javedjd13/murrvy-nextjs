import axios from "axios";
import HomeSlider from "@/app/ApiData/HomeSlider.json";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const defaultParams = {
  skip: "0",
  limit: "5",
};

const buildUpstreamUrl = (request) => {
  const baseUrl = process.env.MURRVY_API_BASE_URL || "https://api.murrvy.com";
  const endpoint = process.env.MURRVY_HOME_BANNERS_ENDPOINT || "/api/v1/home_banners/get/";
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

const createFallbackPayload = (message) => {
  const shoesHeroSlides = HomeSlider.find((item) => item.type === "shoes")?.slides || [];

  return {
    status: true,
    message,
    data: {
      banner: shoesHeroSlides,
      total_count: shoesHeroSlides.length,
      returned_count: shoesHeroSlides.length,
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
    const banners = data?.data?.banner ?? data?.data?.banners;

    if (!Array.isArray(banners) || banners.length === 0) {
      return NextResponse.json(createFallbackPayload("Fallback: upstream returned empty banner list"), {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      });
    }

    const normalizedData = {
      ...data,
      data: {
        ...data.data,
        banner: banners,
        banners,
      },
    };

    return NextResponse.json(normalizedData, {
      status: 200,
      headers: {
        "Cache-Control": "s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch (error) {
    const fallbackData = createFallbackPayload("Fallback: local hero data");

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
