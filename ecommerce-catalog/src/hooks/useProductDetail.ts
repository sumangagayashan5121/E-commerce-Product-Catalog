import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../types/products";
import { IResponse } from "../types/response";

const useProductDetail = (id: string | undefined) => {
  const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      const token = localStorage.getItem("token");
      try {
        const res = await axios.get<IResponse<Product>>(
          `${BASE_API_URL}/api/products/${id}`,
          {
            headers: { Authorization: token ? `Bearer ${token}` : "" },
          }
        );

        const response = res.data;

        if (response.status) {
          setProduct(response.data);
        } else {
          setError(response.message || "Failed to load product details.");
        }
      } catch (error) {
        setError("Failed to load product details.");
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
};

export default useProductDetail;
