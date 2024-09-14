import request from "supertest";
import express from "express";
import categoriesRouter from "../routes/categories";

const app = express();
app.use(express.json());
app.use("/api/categories", categoriesRouter);

describe("Categories API", () => {
  it("should return a list of categories", async () => {
    const response = await request(app).get("/api/categories");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("success", true);
    expect(response.body).toHaveProperty("status", 200);
    expect(response.body).toHaveProperty(
      "message",
      "Categories fetched successfully"
    );
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data[0]).toHaveProperty("id");
    expect(response.body.data[0]).toHaveProperty("name");
  });
});
