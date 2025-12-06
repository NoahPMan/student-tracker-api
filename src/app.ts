/**
 * @file app.ts
 * @description Express application setup for Assignment Tracker API.
 * Applies security middleware, loads environment variables, sets up Swagger docs,
 * mounts routes, and configures global error handling.
 */

import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import setupSwagger from "./config/swagger";
import studentRoutes from "./api/v1/routes/studentRoutes";
import courseRoutes from "./api/v1/routes/courseRoutes";
import assignmentRoutes from "./api/v1/routes/assignmentRoutes";
import { errorHandler } from "./api/v1/middleware/errorHandler";

dotenv.config();

const app: Express = express();

// Middleware
app.use(express.json());

// Environment-based CORS configuration
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? true
        : process.env.ALLOWED_ORIGINS?.split(",") || [],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Helmet configuration for API-only
app.use(
  helmet({
    contentSecurityPolicy: false,
    hidePoweredBy: true,
    noSniff: true,
    frameguard: { action: "deny" },
  })
);

// Logging
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));

// Swagger Docs
setupSwagger(app);

// Routes
app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/assignments", assignmentRoutes);

// Health Check Endpoint
app.get("/api/v1/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// Global Error Handler
app.use(errorHandler);

export default app;