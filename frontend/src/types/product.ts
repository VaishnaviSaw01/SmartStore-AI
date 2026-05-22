export type Product = {
  _id?: string;
  id?: number; // fallback for legacy code
  title: string;
  price: number;
  category: string;
  stock: number;
  description?: string;
  tags?: string[];
  marketingCaption?: string;
};