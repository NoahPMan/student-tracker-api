import request from "supertest";
import app from "../src/app";

describe("Student API", () => {
  it("GET /students should return 200", async () => {
    const res = await request(app).get("/api/v1/students");
    expect(res.status).toBe(200);
  });
});