export type TProductStatus = "available" | "out_of_stock" | "discontinued";

export type TProductsCategory =
  | "Notebooks"
  | "Pens"
  | "Pencils"
  | "Markers"
  | "Erasers"
  | "Staplers"
  | "Folders"
  | "Calculators"
  | "Paper"
  | "Books"
  | "Other";

export type TDiscount = {
  percentage: string;
  validUntil: string;
};

export type TProducts = {
  _id: string;
  name: string;
  author?: string;
  description?: string;
  category: TProductsCategory;
  price: number;
  stockQuantity: number;
  brand?: string;
  color?: string;
  size?: string;
  material?: string;
  productImg?: string;
  sku: string;
  rating?: number;
  isFeatured?: boolean;
  tags?: string[];
  discount?: TDiscount;
  status: TProductStatus;
};

export type TQueryParams = {
  name: string;
  value: string;
};
