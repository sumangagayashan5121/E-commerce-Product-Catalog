import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/products";
import authRoutes from "./routes/auth";
import categoryRoutes from "./routes/categories";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swaggerConfig";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(
  (
    err: unknown,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err);

    if (err instanceof Error) {
      res.status(500).json({
        message: err.message || "Internal Server Error",
      });
    } else {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
);

export default app;
