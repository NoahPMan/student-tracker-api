
import express from "express";
import * as assignmentController from "../controllers/assignmentController";
import { authenticate } from "../middleware/authenticate";
import { isAuthorized } from "../middleware/authorize";
import { validateRequest } from "../middleware/validate";
import {
  assignmentBodySchema,
  assignmentParamsSchema,
  studentQuerySchema // reused for pagination/sorting
} from "../middleware/validate";

const router = express.Router();

/**
 * @openapi
 * /api/v1/assignments:
 *   post:
 *     summary: Create a new assignment
 *     tags: [Assignments]
 */
router.post(
  "/",
  authenticate,
  isAuthorized(["admin", "manager"]),
  validateRequest({ body: assignmentBodySchema }),
  assignmentController.createAssignment
);

/**
 * @openapi
 * /api/v1/assignments:
 *   get:
 *     summary: Get all assignments
 *     tags: [Assignments]
 */
router.get(
  "/",
  authenticate,
  validateRequest({ query: studentQuerySchema }),
  assignmentController.getAllAssignments
);

/**
 * @openapi
 * /api/v1/assignments/{id}:
 *   get:
 *     summary: Get an assignment by ID
 *     tags: [Assignments]
 */
router.get(
  "/:id",
  authenticate,
  validateRequest({ params: assignmentParamsSchema }),
  assignmentController.getAssignmentById
);

/**
 * @openapi
 * /api/v1/assignments/{id}:
 *   put:
 *     summary: Update an assignment by ID
 *     tags: [Assignments]
 */
router.put(
  "/:id",
  authenticate,
  isAuthorized(["admin", "manager"]),
  validateRequest({ params: assignmentParamsSchema, body: assignmentBodySchema }),
  assignmentController.updateAssignment
);

/**
 * @openapi
 * /api/v1/assignments/{id}:
 *   delete:
 *     summary: Delete an assignment by ID
 *     tags: [Assignments]
 */
router.delete(
  "/:id",
  authenticate,
  isAuthorized(["admin"]),
  validateRequest({ params: assignmentParamsSchema }),
  assignmentController.deleteAssignment
);

export default router;