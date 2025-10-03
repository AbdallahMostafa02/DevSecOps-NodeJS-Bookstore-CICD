const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
const Book = require("../src/models/Book");
const User = require("../src/models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let token;

beforeAll(async () => {
  await Book.deleteMany({});
  await User.deleteMany({});

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash("password123", salt);
  const user = new User({ username: "bookuser", password: hash });
  await user.save();

  token = jwt.sign({ id: user._id }, "secret123");
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Books API", () => {
  it("should add a book when authorized", async () => {
    const res = await request(app)
      .post("/api/books")
      .set("Authorization", token)
      .send({
        title: "Clean Code",
        author: "Robert C. Martin",
        year: 2008
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.title).toBe("Clean Code");
  });

  it("should get all books", async () => {
    const res = await request(app).get("/api/books");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

