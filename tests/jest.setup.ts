jest.mock("../src/config/firebaseConfig", () => ({
  db: {
    collection: jest.fn(() => ({
      add: jest.fn(async () => ({ id: "mockId" })),
      get: jest.fn(async () => ({
        docs: [{ id: "mockId", data: () => ({ title: "Homework 1" }) }],
      })),
      doc: jest.fn(() => ({
        get: jest.fn(async () => ({ exists: true, data: () => ({ title: "Homework 1" }) })),
        update: jest.fn(),
        delete: jest.fn(),
      })),
    })),
  },
  auth: { verifyIdToken: jest.fn() },
}));

process.env.FIREBASE_SERVICE_ACCOUNT_KEY = JSON.stringify({
  project_id: "mock-project",
  client_email: "mock@example.com",
  private_key: "mock-key",
});