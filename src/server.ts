
/**
 * @file server.ts
 * @description Entry point for starting the Express server.
 * Handles environment configuration, server startup, and graceful shutdown.
 */

import dotenv from "dotenv";
dotenv.config();

import app from "./app";

const PORT: number = parseInt(process.env.PORT || "3000", 10);

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing server...");
  server.close(() => {
    console.log("Server closed gracefully.");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT signal received: closing server...");
  server.close(() => {
    console.log("Server closed gracefully.");
    process.exit(0);
  });
});
