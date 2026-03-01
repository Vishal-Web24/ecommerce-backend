require("dotenv").config();
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

// Connect to MongoDB before all tests
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
}, 30000);

// Disconnect after all tests
afterAll(async () => {
  await mongoose.connection.close();
}, 30000);

describe("Products API", () => {
  test("GET /products - should return all products", async () => {
    const res = await request(app).get("/products");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  }, 15000);

  test("GET /products/electronics - should return electronics", async () => {
    const res = await request(app).get("/products/electronics");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  }, 15000);
});

describe("Cart API", () => {
  test("GET /cart - should return cart items", async () => {
    const res = await request(app).get("/cart");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  }, 15000);

  test("POST /api/cart - should add item to cart", async () => {
    const res = await request(app)
      .post("/api/cart")
      .send({
        productId: "69a34c8dc2bc5a0e755998c8",
        name: "iPhone 15 Pro",
        price: 999.99,
        image: "https://via.placeholder.com/300",
        category: "electronics",
        quantity: 1,
      });
    expect([200, 201]).toContain(res.statusCode);
    expect(res.body.success).toBe(true);
  }, 15000);
});

describe("Favorites API", () => {
  test("GET /favorites - should return favorites", async () => {
    const res = await request(app).get("/favorites");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  }, 15000);

  test("POST /api/favorites - should add item to favorites", async () => {
    const res = await request(app)
      .post("/api/favorites")
      .send({
        productId: "69a34c8dc2bc5a0e755998c9",
        name: "Samsung 4K TV",
        price: 799.99,
        image: "https://via.placeholder.com/300",
        category: "electronics",
      });
    expect([200, 201, 409]).toContain(res.statusCode);
  }, 15000);
});