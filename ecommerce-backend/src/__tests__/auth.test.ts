import request from "supertest";
import app from "../app";
import { users } from "../data/users";
import jwt from "jsonwebtoken";

describe("Auth API", () => {
  it("should return a JWT token on successful login", async () => {
    const user = users[0];

    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: user.email, password: user.password });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("success", true);
    expect(response.body).toHaveProperty("status", 200);
    expect(response.body).toHaveProperty("message", "Login successful");
    expect(response.body.data).toHaveProperty("token");

    const decodedToken = jwt.verify(
      response.body.data.token,
      process.env.JWT_SECRET as string
    );
    expect(decodedToken).toMatchObject({ id: user.id, email: user.email });
  });

  it("should return 401 for invalid credentials", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "invalid@example.com", password: "wrongpassword" });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("success", false);
    expect(response.body).toHaveProperty("message", "Invalid credentials");
  });

  it("should return 400 if email or password is missing", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com" }); // Missing password

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("success", false);
    expect(response.body).toHaveProperty(
      "message",
      "Email and password are required"
    );
  });
});
