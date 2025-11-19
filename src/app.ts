import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import setupSwagger from "./config/swagger";
import studentRoutes from "./api/v1/routes/studentRoutes";
import courseRoutes from "./api/v1/routes/courseRoutes";
import assignmentRoutes from "./api/v1/routes/assignmentRoutes";
import { errorHandler } from "./api/v1/middleware/errorHandler";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

// Swagger Docs
setupSwagger(app);

// Routes
app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/assignments", assignmentRoutes);

// Error Handler
app.use(errorHandler);

export default app;
