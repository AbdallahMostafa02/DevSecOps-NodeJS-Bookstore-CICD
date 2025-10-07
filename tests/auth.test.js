const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
const User = require("../src/models/User");

beforeAll(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth API", () => {
  it("should register a user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "testuser",
      password: "password123"
    });
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("User registered");
  });

  it("should login and return token", async () => {
    const res = await request(app).post("/api/auth/login").send({
      username: "testuser",
      password: "password123"
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});

describe("Frontend Static Files", () => {
  it("should serve index.html", async () => {
    const res = await request(app).get("/index.html");
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("Register");
  });
});


