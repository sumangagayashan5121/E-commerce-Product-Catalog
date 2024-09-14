import { useState, useEffect } from "react";
import axios from "axios";
import { Category } from "../types/category";
import { IResponse } from "../types/response";

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

  const fetchCategories = async () => {
    if (!BASE_API_URL) {
      setError("Base API URL is not defined");
      return;
    }

    try {
      const res = await axios.get<IResponse<Category[]>>(
        `${BASE_API_URL}/api/categories`
      );

      const response = res.data;

      if (response.status) {
        setCategories(response.data);
      } else {
        setError(response.message || "Error fetching categories");
      }
    } catch (error) {
      setError("Error fetching categories");
      console.error("Error fetching categories:", error);
    }
  };

  fetchCategories();

  return { categories, error };
};

export default useCategories;
