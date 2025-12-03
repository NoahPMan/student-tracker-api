
import request from "supertest";
import app from "../src/app";
import { auth } from "../src/config/firebaseConfig";

jest.mock("../src/config/firebaseConfig", () => ({
  auth: { verifyIdToken: jest.fn() }
}));

describe("Course API Routes", () => {
  beforeEach(() => jest.clearAllMocks());

  const validCourse = { name: "Math 101", description: "Basic Math" };

  // --- AUTH TESTS ---
  it("should return 401 when no token provided", async () => {
    const res = await request(app).get("/api/v1/courses");
    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe("TOKEN_NOT_FOUND");
  });

  it("should return 403 when user lacks role for POST", async () => {
    (auth.verifyIdToken as jest.Mock).mockResolvedValue({ uid: "user123", role: "user" });
    const res = await request(app)
      .post("/api/v1/courses")
      .set("Authorization", "Bearer valid-token")
      .send(validCourse);
    expect(res.status).toBe(403);
    expect(res.body.error.code).toBe("INSUFFICIENT_ROLE");
  });

  // --- CRUD TESTS ---
  it("should create course when user has admin role", async () => {
    (auth.verifyIdToken as jest.Mock).mockResolvedValue({ uid: "admin123", role: "admin" });
    const res = await request(app)
      .post("/api/v1/courses")
      .set("Authorization", "Bearer valid-token")
      .send(validCourse);
    expect(res.status).toBe(201);
    expect(res.body.message).toContain("created");
  });

  it("GET /courses should return 200 and array", async () => {
    (auth.verifyIdToken as jest.Mock).mockResolvedValue({ uid: "admin123", role: "admin" });
    const res = await request(app)
      .get("/api/v1/courses")
      .set("Authorization", "Bearer valid-token");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("GET /courses/:id should return 200 and course object", async () => {
    (auth.verifyIdToken as jest.Mock).mockResolvedValue({ uid: "admin123", role: "admin" });
    const res = await request(app)
      .get("/api/v1/courses/123")
      .set("Authorization", "Bearer valid-token");
    expect(res.status).toBe(200);
    expect(res.body.id).toBe("123");
  });

  it("PUT /courses/:id should return 200 when valid", async () => {
    (auth.verifyIdToken as jest.Mock).mockResolvedValue({ uid: "admin123", role: "admin" });
    const res = await request(app)
      .put("/api/v1/courses/123")
      .set("Authorization", "Bearer valid-token")
      .send(validCourse);
    expect(res.status).toBe(200);
    expect(res.body.message).toContain("updated");
  });

  it("DELETE /courses/:id should return 204 when admin", async () => {
    (auth.verifyIdToken as jest.Mock).mockResolvedValue({ uid: "admin123", role: "admin" });
    const res = await request(app)
      .delete("/api/v1/courses/123")
      .set("Authorization", "Bearer valid-token");
    expect(res.status).toBe(204);
  });

  // --- VALIDATION TESTS ---
  it("should return 400 when POST body is invalid", async () => {
    (auth.verifyIdToken as jest.Mock).mockResolvedValue({ uid: "admin123", role: "admin" });
    const res = await request(app)
      .post("/api/v1/courses")
      .set("Authorization", "Bearer valid-token")
      .send({});
    expect(res.status).toBe(400);
    expect(res.body.error.message).toContain("Validation error");
  });
});
