import request from "supertest";
import app from "../src/app";
import { auth } from "../src/config/firebaseConfig";

jest.mock("../src/config/firebaseConfig", () => ({
  auth: { verifyIdToken: jest.fn() }
}));

describe("Student API Routes", () => {
  beforeEach(() => jest.clearAllMocks());

  const validStudent = { name: "John Doe", email: "john@example.com", age: 20 };

  // --- AUTH TESTS ---
  it("should return 401 when no token provided", async () => {
    const res = await request(app).get("/api/v1/students");
    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe("TOKEN_NOT_FOUND");
  });

  it("should return 403 when user lacks role for POST", async () => {
    (auth.verifyIdToken as jest.Mock).mockResolvedValue({ uid: "user123", role: "user" });
    const res = await request(app)
      .post("/api/v1/students")
      .set("Authorization", "Bearer valid-token")
      .send(validStudent);
    expect(res.status).toBe(403);
    expect(res.body.error.code).toBe("INSUFFICIENT_ROLE");
  });

  // --- CRUD TESTS ---
  it("should create student when user has admin role", async () => {
    (auth.verifyIdToken as jest.Mock).mockResolvedValue({ uid: "admin123", role: "admin" });
    const res = await request(app)
      .post("/api/v1/students")
      .set("Authorization", "Bearer valid-token")
      .send(validStudent);
    expect(res.status).toBe(201);
    expect(res.body.message).toContain("created");
  });

  it("GET /students should return 200 and array", async () => {
    (auth.verifyIdToken as jest.Mock).mockResolvedValue({ uid: "admin123", role: "admin" });
    const res = await request(app)
      .get("/api/v1/students")
      .set("Authorization", "Bearer valid-token");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("GET /students/:id should return 200 and student object", async () => {
    (auth.verifyIdToken as jest.Mock).mockResolvedValue({ uid: "admin123", role: "admin" });
    const res = await request(app)
      .get("/api/v1/students/123")
      .set("Authorization", "Bearer valid-token");
    expect(res.status).toBe(200);
    expect(res.body.id).toBe("123");
  });

  it("PUT /students/:id should return 200 when valid", async () => {
    (auth.verifyIdToken as jest.Mock).mockResolvedValue({ uid: "admin123", role: "admin" });
    const res = await request(app)
      .put("/api/v1/students/123")
      .set("Authorization", "Bearer valid-token")
      .send(validStudent);
    expect(res.status).toBe(200);
    expect(res.body.message).toContain("updated");
  });

  it("DELETE /students/:id should return 204 when admin", async () => {
    (auth.verifyIdToken as jest.Mock).mockResolvedValue({ uid: "admin123", role: "admin" });
    const res = await request(app)
      .delete("/api/v1/students/123")
      .set("Authorization", "Bearer valid-token");
    expect(res.status).toBe(204);
  });

  // --- VALIDATION TESTS ---
  it("should return 400 when POST body is invalid", async () => {
    (auth.verifyIdToken as jest.Mock).mockResolvedValue({ uid: "admin123", role: "admin" });
    const res = await request(app)
      .post("/api/v1/students")
      .set("Authorization", "Bearer valid-token")
      .send({});
    expect(res.status).toBe(400);
    expect(res.body.error.message).toContain("Validation error");
  });
});
