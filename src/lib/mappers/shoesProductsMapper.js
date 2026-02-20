const fallbackProductImage = "shoes/product/1.jpg";
const newBadgeWindowDays = 30;

const toNumber = (value, fallbackValue) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallbackValue;
};

const toTimestamp = (value, fallbackValue = 0) => {
  if (!value) {
    return fallbackValue;
  }

  const parsed = new Date(value).getTime();
  return Number.isFinite(parsed) ? parsed : fallbackValue;
};

const normalizeSizeOptions = (sizes) => {
  if (!Array.isArray(sizes) || sizes.length === 0) {
    return [];
  }

  return sizes
    .map((size) => (typeof size === "string" ? size : size?.size_name ?? size?.label))
    .filter((value) => typeof value === "string" && value.trim().length > 0);
};

const normalizeImagePath = (value) => {
  if (!value || typeof value !== "string") {
    return fallbackProductImage;
  }
  const trimmedValue = value.trim();

  const encodeSafe = (input) => {
    try {
      return encodeURI(decodeURI(input));
    } catch (error) {
      return encodeURI(input);
    }
  };

  if (/^https?:\/\//i.test(trimmedValue)) {
    return encodeSafe(trimmedValue);
  }

  if (trimmedValue.startsWith("/assets/images/")) {
    return encodeSafe(trimmedValue.replace("/assets/images/", ""));
  }

  if (trimmedValue.startsWith("assets/images/")) {
    return encodeSafe(trimmedValue.replace("assets/images/", ""));
  }

  return encodeSafe(trimmedValue.startsWith("/") ? trimmedValue.slice(1) : trimmedValue);
};

const normalizeImages = (images) => {
  if (!Array.isArray(images) || images.length === 0) {
    return [{ imageId: 1, class: "front", src: fallbackProductImage }];
  }

  return images.map((image, index) => {
    const imageSrc =
      typeof image === "string"
        ? image
        : image?.src ?? image?.image_url ?? image?.imageUrl ?? image?.url;

    return {
      imageId: index + 1,
      class: index === 0 ? "front" : "back",
      src: normalizeImagePath(imageSrc),
    };
  });
};

const toDiscount = (mrp, price, discountValue) => {
  const explicitDiscount = toNumber(discountValue, NaN);

  if (Number.isFinite(explicitDiscount)) {
    return explicitDiscount;
  }

  if (mrp <= 0 || price >= mrp) {
    return 0;
  }

  return Math.round(((mrp - price) / mrp) * 100);
};

const normalizeSourceProducts = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data?.products)) {
    return payload.data.products;
  }

  if (Array.isArray(payload?.data?.product)) {
    return payload.data.product;
  }

  if (payload?.data?.product) {
    return [payload.data.product];
  }

  if (payload?.product) {
    return [payload.product];
  }

  return [];
};

const mapToShoesProduct = (rawItem, index) => {
  const sourceProduct = rawItem?.data?.product ?? rawItem?.product ?? rawItem;
  const id = toNumber(sourceProduct?.id ?? sourceProduct?.product_id, index + 1);
  const createdAt = sourceProduct?.date_created ?? sourceProduct?.created_at ?? null;
  const modifiedAt = sourceProduct?.date_modified ?? sourceProduct?.updated_at ?? null;
  const timestamp = toTimestamp(modifiedAt, toTimestamp(createdAt, 0));
  const mrpCandidate = toNumber(
    sourceProduct?.mrp ?? sourceProduct?.price ?? sourceProduct?.regular_price,
    0,
  );
  const priceCandidate = toNumber(
    sourceProduct?.offer_price ?? sourceProduct?.sale_price ?? sourceProduct?.price,
    mrpCandidate,
  );
  const mrp = mrpCandidate > 0 ? mrpCandidate : priceCandidate > 0 ? priceCandidate : 49;
  const price = priceCandidate > 0 ? Math.min(priceCandidate, mrp) : mrp;
  const discount = toDiscount(mrp, price, sourceProduct?.discount);
  const now = Date.now();
  const isNewFromDate =
    timestamp > 0 && now - timestamp <= newBadgeWindowDays * 24 * 60 * 60 * 1000;
  const normalizedSizeOptions = normalizeSizeOptions(sourceProduct?.sizes);

  return {
    id,
    type: "shoes",
    name: sourceProduct?.product_name ?? sourceProduct?.name ?? `Product ${id}`,
    description: sourceProduct?.description ?? "",
    category: sourceProduct?.category_name ?? sourceProduct?.category ?? "Shoes",
    brand: sourceProduct?.brand_name ?? sourceProduct?.brand ?? "Murrvy",
    discount,
    ratingStars: Math.max(1, Math.min(5, toNumber(sourceProduct?.ratingStars ?? sourceProduct?.rating, 4))),
    inStock: toNumber(sourceProduct?.stock ?? sourceProduct?.inStock, 20),
    totalReviews: toNumber(sourceProduct?.totalReviews ?? sourceProduct?.reviews_count, 0),
    mrp,
    price,
    available: sourceProduct?.status ? sourceProduct.status === "active" : true,
    feature: sourceProduct?.feature ?? "none",
    department: sourceProduct?.department ?? "none",
    size: sourceProduct?.sizes?.[0]?.size_name ?? sourceProduct?.size ?? "Regular",
    sizeoption:
      normalizedSizeOptions.length > 0
        ? normalizedSizeOptions
        : Array.isArray(sourceProduct?.sizeoption)
          ? sourceProduct.sizeoption
          : [],
    colors: Array.isArray(sourceProduct?.colors)
      ? sourceProduct.colors.map((color) => color?.color_name ?? color).filter(Boolean)
      : [],
    images: normalizeImages(sourceProduct?.images),
    new: sourceProduct?.new ?? isNewFromDate,
    date_created: createdAt,
    date_modified: modifiedAt,
    _timestamp: timestamp,
  };
};

export const mapProductsPayloadToShoesProducts = (payload) => {
  const sourceProducts = normalizeSourceProducts(payload);

  if (!Array.isArray(sourceProducts) || sourceProducts.length === 0) {
    return {
      latestProducts: [],
      newArrivalProducts: [],
      allProducts: [],
    };
  }

  const mappedProducts = sourceProducts.map(mapToShoesProduct).filter((item) => item.type === "shoes");
  const activeProducts = mappedProducts.filter((item) => item.available);
  const allProducts = activeProducts.length > 0 ? activeProducts : mappedProducts;
  const latestProducts = allProducts.slice(0, 30);
  const newArrivalProducts = [...allProducts]
    .sort((a, b) => b._timestamp - a._timestamp || b.id - a.id)
    .slice(0, 30)
    .map((item, index) => ({
      ...item,
      new: index < 6 ? true : item.new,
    }));

  return {
    latestProducts,
    newArrivalProducts,
    allProducts,
  };
};
