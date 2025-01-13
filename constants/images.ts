// constants/images.ts
export const UNSPLASH_IMAGES = {
  masala: { uri: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=80" },
  sugar: { uri: "https://images.unsplash.com/photo-1622484211148-c6b9d8dba7bb?w=500&q=80" },
  salt: { uri: "https://images.unsplash.com/photo-1626197031507-c17099753214?w=500&q=80" },
  atta: { uri: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80" },
  rice: { uri: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80" },
  oil: { uri: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80" },
  fruits: { uri: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&q=80" },
};

// Product images with additional details
export const PRODUCT_IMAGES = {
  sugar: {
    uri: "https://images.unsplash.com/photo-1622484211148-c6b9d8dba7bb?w=500&q=80",
    alt: "Sugar",
    thumbnail: "https://images.unsplash.com/photo-1622484211148-c6b9d8dba7bb?w=200&q=80",
  },
  salt: {
    uri: "https://images.unsplash.com/photo-1626197031507-c17099753214?w=500&q=80",
    alt: "Salt",
    thumbnail: "https://images.unsplash.com/photo-1626197031507-c17099753214?w=200&q=80",
  },
  atta: {
    uri: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80",
    alt: "Wheat Flour",
    thumbnail: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&q=80",
  },
  rice: {
    uri: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80",
    alt: "Rice",
    thumbnail: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&q=80",
  },
};

// Types for images
export interface ProductImage {
  uri: string;
  alt: string;
  thumbnail: string;
}

export type ProductImages = {
  [key: string]: ProductImage;
};