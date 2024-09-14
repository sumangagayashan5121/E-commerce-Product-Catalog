import axios from "axios";
import { useEffect, useState } from "react";
import { FilterFormValues, Product } from "../types/products";
import { IResponse } from "../types/response";

const useProducts = (filters: FilterFormValues, page: number) => {
  const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params: { [key: string]: string | number } = { page };
        if (filters.category) params.category = filters.category;
        if (filters.minPrice !== "") params.minPrice = filters.minPrice;
        if (filters.maxPrice !== "") params.maxPrice = filters.maxPrice;
        if (filters.search) params.search = filters.search;

        const res = await axios.get<
          IResponse<{ products: Product[]; totalPages: number }>
        >(`${BASE_API_URL}/api/products`, { params });

        const response = res.data;

        console.log("response", response);

        if (response.status) {
          setProducts(response.data.products);
          setTotalPages(response.data.totalPages);
        } else {
          setError(response.message || "Error fetching products");
        }
      } catch (error) {
        setError("Error fetching products");
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, page]);

  return { products, loading, totalPages, error };
};

export default useProducts;
