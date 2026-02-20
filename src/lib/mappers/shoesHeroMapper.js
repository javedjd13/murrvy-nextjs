const defaultSocialIcons = [
  {
    name: "Facebook",
    website: "https://www.facebook.com/",
    iconImage: "social-icon/1.png",
  },
  {
    name: "Instagram",
    website: "https://www.instagram.com/",
    iconImage: "social-icon/2.png",
  },
  {
    name: "Twitter",
    website: "https://www.twitter.com/",
    iconImage: "social-icon/3.png",
  },
];

const gradients = [" gradient-purple", " red-gradient", " gradient-blue"];

const fallbackSlideDescription =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae minima asperiores possimus ad quae.";

const toNumber = (value, fallbackValue) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallbackValue;
};

const toDiscount = (item, bottomPrice, bottomMrp) => {
  const explicitDiscount = toNumber(
    item.discount ?? item.discount_percentage ?? item.offer,
    NaN,
  );

  if (Number.isFinite(explicitDiscount)) {
    return explicitDiscount;
  }

  if (bottomMrp > 0 && bottomMrp > bottomPrice) {
    return Math.round(((bottomMrp - bottomPrice) / bottomMrp) * 100);
  }

  return 0;
};

const normalizeImagePath = (value, fallbackValue) => {
  if (!value || typeof value !== "string") {
    return fallbackValue;
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  if (value.startsWith("/assets/images/")) {
    return value.replace("/assets/images/", "");
  }

  if (value.startsWith("assets/images/")) {
    return value.replace("assets/images/", "");
  }

  return value.startsWith("/") ? value.slice(1) : value;
};

const mapSocialIcons = (icons) => {
  if (!Array.isArray(icons) || icons.length === 0) {
    return defaultSocialIcons;
  }

  return icons.map((icon, index) => {
    const fallbackIcon = defaultSocialIcons[index % defaultSocialIcons.length];

    return {
      name: icon?.name ?? fallbackIcon.name,
      website: icon?.website ?? icon?.link ?? fallbackIcon.website,
      iconImage: normalizeImagePath(
        icon?.iconImage ?? icon?.image ?? fallbackIcon.iconImage,
        fallbackIcon.iconImage,
      ),
    };
  });
};

const mapBannerToSlide = (item, index) => {
  const mappedBottomPrice = toNumber(
    item.bottomPrice ?? item.offer_price ?? item.sale_price ?? item.price,
    65,
  );
  const mappedBottomMrp = toNumber(
    item.bottomMrp ?? item.mrp ?? item.old_price ?? item.price,
    mappedBottomPrice + 14,
  );
  const bannerImage = normalizeImagePath(
    item.bannerImage ??
      item.banner_image ??
      item.banner_images?.[0]?.image_url ??
      item.banner_images?.[0]?.imageUrl ??
      item.image ??
      item.image_url,
    "shoes/banner-1.png",
  );
  const mappedDiscount = toDiscount(item, mappedBottomPrice, mappedBottomMrp);

  return {
    socialIcons: mapSocialIcons(item.socialIcons),
    title: item.title ?? item.heading ?? item.name ?? `New Offer ${index + 1}`,
    discount: mappedDiscount,
    product: item.product ?? item.company_name ?? "Shoes",
    bannerImage,
    leftTitle: item.leftTitle ?? "Suggestion Product",
    leftSubtitle: item.leftSubtitle ?? item.subheading ?? "Our Collection",
    leftImage: normalizeImagePath(item.leftImage ?? bannerImage, bannerImage),
    leftProduct: item.leftProduct ?? item.company_name ?? item.brand ?? "MURRVY",
    leftPrice: toNumber(
      item.leftPrice ?? item.offer_price ?? item.price ?? mappedBottomPrice,
      mappedBottomPrice,
    ),
    leftReviewStars: toNumber(item.leftReviewStars ?? item.rating, 3),
    bottomMrp: mappedBottomMrp,
    bottomPrice: mappedBottomPrice,
    gradient: item.gradient || gradients[index % gradients.length],
    bottomDescription: item.bottomDescription ?? item.description ?? fallbackSlideDescription,
  };
};

export const mapHeroResponseToShoesMainSlider = (payload) => {
  const bannerList = payload?.data?.banner;

  if (!Array.isArray(bannerList) || bannerList.length === 0) {
    return [];
  }

  const slides = bannerList.map(mapBannerToSlide);

  return [
    {
      type: "shoes",
      slides,
    },
  ];
};
