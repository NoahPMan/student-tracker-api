import request from "supertest";
import app from "../src/app";

describe("Assignment API", () => {
  it("GET /assignments should return 200", async () => {
    const res = await request(app).get("/api/v1/assignments");
    expect(res.status).toBe(200);
  });

  it("POST /assignments should return 201", async () => {
    const res = await request(app)
      .post("/api/v1/assignments")
      .send({ title: "Homework 1", dueDate: "2025-12-01" });
    expect(res.status).toBe(201);
  });
});