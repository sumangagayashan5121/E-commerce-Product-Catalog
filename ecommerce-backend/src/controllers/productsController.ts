import { Request, Response } from "express";
import { Product, productsData } from "../data/products";
import { appResponse } from "../shared/utils/AppResponse";
import { HttpCodes } from "../shared/enums/httpCodes.enum";

export const getProducts = (req: Request, res: Response) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      search,
      page = 1,
      limit = 9,
    } = req.query;

    let filteredProducts = productsData;

    if (category) {
      filteredProducts = filteredProducts.filter(
        (p) => p.category === Number(category)
      );
    }

    if (minPrice) {
      filteredProducts = filteredProducts.filter(
        (p) => p.price >= Number(minPrice)
      );
    }

    if (maxPrice) {
      filteredProducts = filteredProducts.filter(
        (p) => p.price <= Number(maxPrice)
      );
    }

    if (search) {
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.name.toLowerCase().includes((search as string).toLowerCase()) ||
          p.description.toLowerCase().includes((search as string).toLowerCase())
      );
    }

    const totalItems = filteredProducts.length;
    const totalPages = Math.ceil(totalItems / Number(limit));
    const start = (Number(page) - 1) * Number(limit);
    const end = start + Number(limit);

    const paginatedProducts = filteredProducts.slice(start, end);

    return appResponse.success(
      res,
      HttpCodes.OK,
      "Products fetched successfully",
      {
        totalItems,
        totalPages,
        currentPage: Number(page),
        products: paginatedProducts,
      }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return appResponse.error(
        res,
        HttpCodes.INTERNAL_SERVER_ERROR,
        "Error fetching products",
        error.message
      );
    }
    return appResponse.error(
      res,
      HttpCodes.INTERNAL_SERVER_ERROR,
      "Error fetching products",
      "Unknown error"
    );
  }
};

// GET product by ID
export const getProductById = (req: Request, res: Response) => {
  const product = productsData.find((p) => p.id === parseInt(req.params.id));
  if (product) {
    return appResponse.success(
      res,
      HttpCodes.OK,
      "Product fetched successfully",
      product
    );
  } else {
    return appResponse.error(res, HttpCodes.NOT_FOUND, "Product not found");
  }
};

// POST create new product
export const createProduct = (req: Request, res: Response) => {
  try {
    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category) {
      return appResponse.error(
        res,
        HttpCodes.BAD_REQUEST,
        "All fields are required"
      );
    }

    const newProduct: Product = {
      id: productsData.length + 1,
      name,
      description,
      price: Number(price),
      category: Number(category),
    };

    productsData.push(newProduct);
    return appResponse.success(
      res,
      HttpCodes.CREATED,
      "Product created successfully",
      newProduct
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return appResponse.error(
        res,
        HttpCodes.INTERNAL_SERVER_ERROR,
        "Error creating product",
        error.message
      );
    }
    return appResponse.error(
      res,
      HttpCodes.INTERNAL_SERVER_ERROR,
      "Error creating product",
      "Unknown error"
    );
  }
};
