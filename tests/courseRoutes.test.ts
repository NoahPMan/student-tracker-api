import request from "supertest";
import app from "../src/app";

describe("Course API", () => {
  it("GET /courses should return 200", async () => {
    const res = await request(app).get("/api/v1/courses");
    expect(res.status).toBe(200);
  });

  it("POST /courses should return 201", async () => {
    const res = await request(app)
      .post("/api/v1/courses")
      .send({ name: "Math 101", description: "Basic Math" });
    expect(res.status).toBe(201);
  });
});