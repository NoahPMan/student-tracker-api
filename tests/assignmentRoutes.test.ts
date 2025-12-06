import request from "supertest";
import app from "../src/app";
import { auth } from "../src/config/firebaseConfig";

jest.mock("../src/config/firebaseConfig", () => ({
  auth: { verifyIdToken: jest.fn() }
}));

describe("Assignment API Routes", () => {
  beforeEach(() => jest.clearAllMocks());

  const validAssignment = { title: "Homework 1", dueDate: "2025-12-01" };

  // --- AUTH TESTS ---
  it("should return 401 when no token provided", async () => {
    const res = await request(app).get("/api/v1/assignments");
    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe("TOKEN_NOT_FOUND");
  });

  it("should return 403 when user lacks role for POST", async () => {
    (auth.verifyIdToken as jest.Mock).mockResolvedValue({ uid: "user123", role: "user" });
    const res = await request(app)
      .post("/api/v1/assignments")
      .set("Authorization", "Bearer valid-token")
      .send(validAssignment);
    expect(res.status).toBe(403);
    expect(res.body.error.code).toBe("INSUFFICIENT_ROLE");
  });

  // --- CRUD TESTS ---
  it("should create assignment when user has admin role", async () => {
    (auth.verifyIdToken as jest.Mock).mockResolvedValue({ uid: "admin123", role: "admin" });
    const res = await request(app)
      .post("/api/v1/assignments")
      .set("Authorization", "Bearer valid-token")
      .send(validAssignment);
    expect(res.status).toBe(201);
    expect(res.body.message).toContain("created");
  });

  it("GET /assignments should return 200 and array", async () => {
    (auth.verifyIdToken as jest.Mock).mockResolvedValue({ uid: "admin123", role: "admin" });
    const res = await request(app)
      .get("/api/v1/assignments")
      .set("Authorization", "Bearer valid-token");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("GET /assignments/:id should return 200 and assignment object", async () => {
    (auth.verifyIdToken as jest.Mock).mockResolvedValue({ uid: "admin123", role: "admin" });
    const res = await request(app)
      .get("/api/v1/assignments/123")
      .set("Authorization", "Bearer valid-token");
    expect(res.status).toBe(200);
    expect(res.body.id).toBe("123");
  });

  it("PUT /assignments/:id should return 200 when valid", async () => {
    (auth.verifyIdToken as jest.Mock).mockResolvedValue({ uid: "admin123", role: "admin" });
    const res = await request(app)
      .put("/api/v1/assignments/123")
      .set("Authorization", "Bearer valid-token")
      .send(validAssignment);
    expect(res.status).toBe(200);
    expect(res.body.message).toContain("updated");
  });

  it("DELETE /assignments/:id should return 204 when admin", async () => {
    (auth.verifyIdToken as jest.Mock).mockResolvedValue({ uid: "admin123", role: "admin" });
    const res = await request(app)
      .delete("/api/v1/assignments/123")
      .set("Authorization", "Bearer valid-token");
    expect(res.status).toBe(204);
  });

  // --- VALIDATION TESTS ---
  it("should return 400 when POST body is invalid", async () => {
    (auth.verifyIdToken as jest.Mock).mockResolvedValue({ uid: "admin123", role: "admin" });
    const res = await request(app)
      .post("/api/v1/assignments")
      .set("Authorization", "Bearer valid-token")
      .send({});
    expect(res.status).toBe(400);
    expect(res.body.error.message).toContain("Validation error");
  });
});
