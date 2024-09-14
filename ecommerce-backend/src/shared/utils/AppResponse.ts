import { Response } from "express";
import { HttpCodes } from "../enums/httpCodes.enum";

export class AppResponse {
  success<T>(
    response: Response,
    status: HttpCodes,
    message: string,
    payload?: T
  ) {
    return response.status(status).json({
      success: true,
      status,
      message,
      data: payload,
    });
  }

  error<T>(
    response: Response,
    status: HttpCodes,
    message: string,
    payload?: T
  ) {
    return response.status(status).json({
      success: false,
      status,
      message,
      data: payload,
    });
  }
}

export const appResponse = new AppResponse();
