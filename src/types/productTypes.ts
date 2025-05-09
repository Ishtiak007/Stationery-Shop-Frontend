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
  | "Other"
  | "Highlighters"
  | "Glue"
  | "Scissors"
  | "Rulers"
  | "Paper Clips"
  | "Sticky Notes"
  | "Tape"
  | "Whiteboard"
  | "Index Cards"
  | "Sharpener"
  | "Binder Clips"
  | "Thumbtacks";

export type TDiscount = {
  percentage: string; // assuming it's stored as string for formatting or form compatibility
  validUntil: string; // ISO string format
};

export type TProducts = {
  createdAt: string | number | Date;
  _id?: string; // make optional if used for creating new product
  name: string;
  author: string;
  description: string;
  category: TProductsCategory;
  price: number; // changed to number (from string) based on your JSON
  stockQuantity: number; // changed to number (from string) based on your JSON
  brand: string;
  color: string;
  size: string;
  material: string;
  productImg?: string;
  sku: string;
  rating: number;
  isFeatured: boolean;
  tags: string[];
  discount?: TDiscount;
  status: TProductStatus;
};

export type TQueryParams = {
  name: string;
  value: string;
};
