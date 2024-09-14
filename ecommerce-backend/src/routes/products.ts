import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
} from "../controllers/productsController";
import { authenticate } from "../middleware/auth";

const router = Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of products with optional filters and pagination
 *     parameters:
 *       - name: category
 *         in: query
 *         description: Filter products by category
 *         required: false
 *         schema:
 *           type: string
 *       - name: minPrice
 *         in: query
 *         description: Filter products with a minimum price
 *         required: false
 *         schema:
 *           type: number
 *       - name: maxPrice
 *         in: query
 *         description: Filter products with a maximum price
 *         required: false
 *         schema:
 *           type: number
 *       - name: search
 *         in: query
 *         description: Search products by name or description
 *         required: false
 *         schema:
 *           type: string
 *       - name: page
 *         in: query
 *         description: Pagination page number
 *         required: false
 *         schema:
 *           type: number
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: Number of products per page
 *         required: false
 *         schema:
 *           type: number
 *           default: 10
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalItems:
 *                   type: number
 *                   description: Total number of items
 *                 totalPages:
 *                   type: number
 *                   description: Total number of pages
 *                 currentPage:
 *                   type: number
 *                   description: Current page number
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       price:
 *                         type: number
 *                       category:
 *                         type: string
 *       500:
 *         description: Internal server error
 */
router.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     description: Retrieve a single product by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Product ID
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *                 category:
 *                   type: string
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authenticate, getProductById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Add a new product
 *     description: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *                 category:
 *                   type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/", authenticate, createProduct);

export default router;
