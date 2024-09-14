import request from "supertest";
import app from "../app";
import { users } from "../data/users";

let token: string;

beforeAll(async () => {
  const user = users[0];
  const response = await request(app).post("/api/auth/login").send({
    email: user.email,
    password: user.password,
  });

  token = response.body.data.token;
});

describe("Products API", () => {
  describe("GET /api/products", () => {
    it("should retrieve a list of products", async () => {
      const response = await request(app)
        .get("/api/products")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("success", true);
      expect(response.body).toHaveProperty("status", 200);
      expect(response.body).toHaveProperty(
        "message",
        "Products fetched successfully"
      );
      expect(response.body.data.products).toBeInstanceOf(Array);
      expect(response.body.data).toHaveProperty("totalItems");
      expect(response.body.data).toHaveProperty("totalPages");
      expect(response.body.data).toHaveProperty("currentPage");
    });

    it("should filter products by category", async () => {
      const category = 1;
      const response = await request(app)
        .get(`/api/products?category=${category}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.data.products).toBeInstanceOf(Array);
      response.body.data.products.forEach((product: { category: any }) => {
        expect(product.category).toBe(category);
      });
    });

    it("should filter products by minPrice and maxPrice", async () => {
      const minPrice = 10;
      const maxPrice = 50;
      const response = await request(app)
        .get(`/api/products?minPrice=${minPrice}&maxPrice=${maxPrice}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      response.body.data.products.forEach((product: { price: any }) => {
        expect(product.price).toBeGreaterThanOrEqual(minPrice);
        expect(product.price).toBeLessThanOrEqual(maxPrice);
      });
    });

    it("should return products based on a search term", async () => {
      const search = "example";
      const response = await request(app)
        .get(`/api/products?search=${search}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      response.body.data.products.forEach((product: { name: string }) => {
        expect(product.name.toLowerCase()).toContain(search.toLowerCase());
      });
    });
  });

  describe("GET /api/products/:id", () => {
    it("should retrieve a product by ID", async () => {
      const productId = 1; // Existing product ID
      const response = await request(app)
        .get(`/api/products/${productId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("success", true);
      expect(response.body.data).toHaveProperty("id", productId);
    });

    it("should return 404 if product is not found", async () => {
      const productId = 999; // Non-existent product ID
      const response = await request(app)
        .get(`/api/products/${productId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Product not found");
    });
  });

  describe("POST /api/products", () => {
    it("should create a new product", async () => {
      const newProduct = {
        name: "New Product",
        description: "A new product description",
        price: 29.99,
        category: 1,
      };

      const response = await request(app)
        .post("/api/products")
        .set("Authorization", `Bearer ${token}`)
        .send(newProduct);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("success", true);
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data).toHaveProperty("name", newProduct.name);
      expect(response.body.data).toHaveProperty(
        "description",
        newProduct.description
      );
      expect(response.body.data).toHaveProperty("price", newProduct.price);
      expect(response.body.data).toHaveProperty(
        "category",
        newProduct.category
      );
    });

    it("should return 400 for missing required fields", async () => {
      const newProduct = {
        name: "Incomplete Product",
      };

      const response = await request(app)
        .post("/api/products")
        .set("Authorization", `Bearer ${token}`)
        .send(newProduct);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "All fields are required"
      );
    });
  });
});
