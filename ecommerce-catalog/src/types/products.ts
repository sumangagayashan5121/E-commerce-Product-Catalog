export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
}

export interface FilterFormValues {
  category: string;
  minPrice: string;
  maxPrice: string;
  search: string;
}
