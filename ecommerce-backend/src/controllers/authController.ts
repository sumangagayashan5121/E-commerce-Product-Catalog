import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { users } from "../data/users";
import { appResponse } from "../shared/utils/AppResponse";
import { HttpCodes } from "../shared/enums/httpCodes.enum";

export const login = (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return appResponse.error(
        res,
        HttpCodes.BAD_REQUEST,
        "Email and password are required"
      );
    }

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      return appResponse.error(
        res,
        HttpCodes.UNAUTHORIZED,
        "Invalid credentials"
      );
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return appResponse.success(res, HttpCodes.OK, "Login successful", {
      token,
      user: { id: user.id, email: user.email },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return appResponse.error(
        res,
        HttpCodes.INTERNAL_SERVER_ERROR,
        "Error during login",
        error.message
      );
    }
    return appResponse.error(
      res,
      HttpCodes.INTERNAL_SERVER_ERROR,
      "Error during login",
      "Unknown error"
    );
  }
};
