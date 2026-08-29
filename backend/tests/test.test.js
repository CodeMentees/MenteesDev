import request from "supertest";
import app from "../index.js";
import mongoose from "mongoose";
import test from "../models/test.js";

describe("test API", () => {
  let createdItem;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    // Clear the collection before each test
    await test.deleteMany({});
  });

  test("POST /api/test should create a new test", async () => {
    const response = await request(app)
      .post("/api/test")
      .send({ name: "Test test", price: 100, isPublished: true });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body.name).toBe("Test test");
    createdItem = response.body;
  });

  test("GET /api/test should return paginated results", async () => {
    // Create some test data
    await test.create([
      { name: "test 1", price: 100, isPublished: true },
      { name: "test 2", price: 200, isPublished: false },
    ]);

    const response = await request(app).get("/api/test?page=1&limit=2");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("page");
    expect(response.body).toHaveProperty("limit");
    expect(response.body.data).toHaveLength(2);
  });

  test("GET /api/test/:id should return a single test", async () => {
    const item = await test.create({
      name: "Test test",
      price: 100,
      isPublished: true,
    });
    const response = await request(app).get(`/api/test/${item._id}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Test test");
  });

  test("GET /api/test/:id should return 404 if test not found", async () => {
    const invalidId = new mongoose.Types.ObjectId();
    const response = await request(app).get(`/api/test/${invalidId}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("test not found");
  });

  test("PUT /api/test/:id should update a test", async () => {
    const item = await test.create({
      name: "Test test",
      price: 100,
      isPublished: true,
    });
    const response = await request(app)
      .put(`/api/test/${item._id}`)
      .send({ name: "Updated test", price: 200 });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Updated test");
    expect(response.body.price).toBe(200);
  });

  test("PUT /api/test/:id should return 404 if test not found", async () => {
    const invalidId = new mongoose.Types.ObjectId();
    const response = await request(app)
      .put(`/api/test/${invalidId}`)
      .send({ name: "Updated test", price: 200 });
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("test not found");
  });

  test("DELETE /api/test/:id should delete a test", async () => {
    const item = await test.create({
      name: "Test test",
      price: 100,
      isPublished: true,
    });
    const response = await request(app).delete(`/api/test/${item._id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("test deleted successfully");

    // Verify the item is deleted
    const deletedItem = await test.findById(item._id);
    expect(deletedItem).toBeNull();
  });

  test("DELETE /api/test/:id should return 404 if test not found", async () => {
    const invalidId = new mongoose.Types.ObjectId();
    const response = await request(app).delete(`/api/test/${invalidId}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("test not found");
  });
});
