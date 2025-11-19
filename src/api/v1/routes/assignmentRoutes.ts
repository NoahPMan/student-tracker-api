import express from "express";
import * as assignmentController from "../controllers/assignmentController";
import { authenticate } from "../middleware/authenticate";
import { isAuthorized } from "../middleware/authorize";

const router = express.Router();

/**
 * @openapi
 * /api/v1/assignments:
 *   post:
 *     summary: Create a new assignment
 *     tags: [Assignments]
 */
router.post("/", assignmentController.createAssignment);

/**
 * @openapi
 * /api/v1/assignments:
 *   get:
 *     summary: Get all assignments
 *     tags: [Assignments]
 */
router.get("/", assignmentController.getAllAssignments);

/**
 * @openapi
 * /api/v1/assignments/{id}:
 *   get:
 *     summary: Get an assignment by ID
 *     tags: [Assignments]
 */
router.get("/:id", assignmentController.getAssignmentById);

/**
 * @openapi
 * /api/v1/assignments/{id}:
 *   put:
 *     summary: Update an assignment by ID
 *     tags: [Assignments]
 */
router.put("/:id", assignmentController.updateAssignment);

/**
 * @openapi
 * /api/v1/assignments/{id}:
 *   delete:
 *     summary: Delete an assignment by ID
 *     tags: [Assignments]
 */
router.delete("/:id", authenticate, isAuthorized(["admin"]), assignmentController.deleteAssignment)

export default router;