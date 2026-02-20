const CART_KEYS_STORAGE = "addProduct";
const CART_ITEMS_STORAGE = "addProductItems";
const WISHLIST_KEYS_STORAGE = "wishlist";
const WISHLIST_ITEMS_STORAGE = "wishlistItems";
const fallbackImage = "fashion/product/front/1.jpg";

const isBrowser = () => typeof window !== "undefined";

const readStorageArray = (key) => {
  if (!isBrowser()) {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(key);
    if (!rawValue) {
      return [];
    }

    const parsedValue = JSON.parse(rawValue);
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch (error) {
    return [];
  }
};

const writeStorageArray = (key, value) => {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(Array.isArray(value) ? value : []));
};

const normalizeImage = (image, index) => {
  const imageSrc =
    typeof image === "string"
      ? image
      : image?.src ?? image?.image_url ?? image?.imageUrl ?? image?.url;

  if (!imageSrc || typeof imageSrc !== "string") {
    return null;
  }

  return {
    imageId: image?.imageId ?? image?.id ?? index + 1,
    class: image?.class ?? (index === 0 ? "front" : "back"),
    src: imageSrc.trim(),
  };
};

export const getProductStorageKey = (item = {}) => {
  const idValue = item?.id ?? item?.product_id;
  if (idValue === undefined || idValue === null || idValue === "") {
    return null;
  }

  const typeValue = typeof item?.type === "string" && item.type.trim().length > 0 ? item.type.trim() : "product";
  return `${typeValue}:${String(idValue)}`;
};

export const normalizeStoredProduct = (item = {}) => {
  const productKey = getProductStorageKey(item);
  if (!productKey) {
    return null;
  }

  const imageList = Array.isArray(item?.images)
    ? item.images.map(normalizeImage).filter(Boolean)
    : [];

  return {
    id: item?.id ?? item?.product_id,
    type: typeof item?.type === "string" && item.type.trim().length > 0 ? item.type.trim() : "product",
    cartKey: productKey,
    name: item?.name ?? item?.product_name ?? "Product",
    description: item?.description ?? "",
    category: item?.category ?? item?.category_name ?? "none",
    brand: item?.brand ?? item?.brand_name ?? "none",
    price: Number(item?.price ?? 0),
    mrp: Number(item?.mrp ?? item?.price ?? 0),
    inStock: Number(item?.inStock ?? item?.stock ?? 0),
    available: item?.available ?? true,
    colors: Array.isArray(item?.colors)
      ? item.colors.map((color) => (typeof color === "string" ? color : color?.color_name)).filter(Boolean)
      : [],
    size: item?.size ?? "",
    images:
      imageList.length > 0
        ? imageList
        : [{ imageId: 1, class: "front", src: fallbackImage }],
  };
};

const normalizeStoredList = (items = []) =>
  (Array.isArray(items) ? items : [])
    .map(normalizeStoredProduct)
    .filter(Boolean);

const writeProductList = (itemsStorageKey, keysStorageKey, items) => {
  const normalizedItems = normalizeStoredList(items);
  writeStorageArray(itemsStorageKey, normalizedItems);
  writeStorageArray(
    keysStorageKey,
    normalizedItems.map((item) => item.cartKey),
  );

  return normalizedItems;
};

const readProductList = (itemsStorageKey) => normalizeStoredList(readStorageArray(itemsStorageKey));

const addProductToList = (itemsStorageKey, keysStorageKey, item) => {
  const normalizedItem = normalizeStoredProduct(item);
  const existingItems = readProductList(itemsStorageKey);

  if (!normalizedItem) {
    return {
      items: existingItems,
      keys: existingItems.map((entry) => entry.cartKey),
    };
  }

  const existingIndex = existingItems.findIndex((entry) => entry.cartKey === normalizedItem.cartKey);
  const updatedItems =
    existingIndex >= 0
      ? existingItems.map((entry, index) => (index === existingIndex ? normalizedItem : entry))
      : [...existingItems, normalizedItem];

  const savedItems = writeProductList(itemsStorageKey, keysStorageKey, updatedItems);
  return {
    items: savedItems,
    keys: savedItems.map((entry) => entry.cartKey),
  };
};

const removeProductFromList = (itemsStorageKey, keysStorageKey, itemOrKey) => {
  const itemKey = typeof itemOrKey === "string" ? itemOrKey : getProductStorageKey(itemOrKey);
  const existingItems = readProductList(itemsStorageKey);
  const filteredItems = itemKey
    ? existingItems.filter((entry) => entry.cartKey !== itemKey)
    : existingItems;

  const savedItems = writeProductList(itemsStorageKey, keysStorageKey, filteredItems);
  return {
    items: savedItems,
    keys: savedItems.map((entry) => entry.cartKey),
  };
};

const clearProductList = (itemsStorageKey, keysStorageKey) => {
  writeStorageArray(itemsStorageKey, []);
  writeStorageArray(keysStorageKey, []);
  return {
    items: [],
    keys: [],
  };
};

export const getCartItems = () => readProductList(CART_ITEMS_STORAGE);
export const getWishlistItems = () => readProductList(WISHLIST_ITEMS_STORAGE);
export const addCartItem = (item) => addProductToList(CART_ITEMS_STORAGE, CART_KEYS_STORAGE, item);
export const addWishlistItem = (item) => addProductToList(WISHLIST_ITEMS_STORAGE, WISHLIST_KEYS_STORAGE, item);
export const removeCartItem = (itemOrKey) => removeProductFromList(CART_ITEMS_STORAGE, CART_KEYS_STORAGE, itemOrKey);
export const removeWishlistItem = (itemOrKey) => removeProductFromList(WISHLIST_ITEMS_STORAGE, WISHLIST_KEYS_STORAGE, itemOrKey);
export const clearCartItems = () => clearProductList(CART_ITEMS_STORAGE, CART_KEYS_STORAGE);
export const clearWishlistItems = () => clearProductList(WISHLIST_ITEMS_STORAGE, WISHLIST_KEYS_STORAGE);

export const resolveProductImageSrc = (value) => {
  if (!value || typeof value !== "string") {
    return `/assets/images/${fallbackImage}`;
  }

  const trimmedValue = value.trim();
  if (/^https?:\/\//i.test(trimmedValue)) {
    return trimmedValue;
  }

  if (trimmedValue.startsWith("/")) {
    return trimmedValue;
  }

  if (trimmedValue.startsWith("assets/images/")) {
    return `/${trimmedValue}`;
  }

  return `/assets/images/${trimmedValue}`;
};
