import request from "supertest";
import app from "../src/app";

/**
 * @fileoverview Unit tests for Student API routes.
 * Uses Supertest to validate HTTP responses.
 */

describe("Student API", () => {
  /**
   * Test case: GET /students should return HTTP 200 status.
   * @test
   */
  it("GET /students should return 200", async () => {
    const res = await request(app).get("/api/v1/students");
    expect(res.status).toBe(200);
  });
});

