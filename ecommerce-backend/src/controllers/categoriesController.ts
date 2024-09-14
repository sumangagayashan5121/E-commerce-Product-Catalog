import { Request, Response } from "express";
import { categories } from "../data/categories";
import { appResponse } from "../shared/utils/AppResponse";
import { HttpCodes } from "../shared/enums/httpCodes.enum";

// GET categories
export const getCategories = (req: Request, res: Response) => {
  try {
    return appResponse.success(
      res,
      HttpCodes.OK,
      "Categories fetched successfully",
      categories
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return appResponse.error(
        res,
        HttpCodes.INTERNAL_SERVER_ERROR,
        "Error fetching categories",
        error.message
      );
    }
    return appResponse.error(
      res,
      HttpCodes.INTERNAL_SERVER_ERROR,
      "Error fetching categories",
      "Unknown error"
    );
  }
};
