import express from "express";
import * as courseController from "../controllers/courseController";
import { authenticate } from "../middleware/authenticate";
import { isAuthorized } from "../middleware/authorize";
import { validateRequest } from "../middleware/validate";
import {
  courseBodySchema,
  courseParamsSchema,
  studentQuerySchema // reused for pagination/sorting
} from "../middleware/validate";

const router = express.Router();


console.log("authenticate:", typeof authenticate);
console.log("validateRequest:", typeof validateRequest);
console.log("controller:", typeof courseController.getCourseById);


/**
 * @openapi
 * /api/v1/courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 */
router.post(
  "/",
  authenticate,
  isAuthorized(["admin", "manager"]),
  validateRequest({ body: courseBodySchema }),
  courseController.createCourse
);

/**
 * @openapi
 * /api/v1/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 */
router.get(
  "/",
  authenticate,
  validateRequest({ query: studentQuerySchema }),
  courseController.getAllCourses
);

/**
 * @openapi
 * /api/v1/courses/{id}:
 *   get:
 *     summary: Get a course by ID
 *     tags: [Courses]
 */
router.get(
  "/:id",
  authenticate,
  validateRequest({ params: courseParamsSchema }),
  courseController.getCourseById
);

/**
 * @openapi
 * /api/v1/courses/{id}:
 *   put:
 *     summary: Update a course by ID
 *     tags: [Courses]
 */
router.put(
  "/:id",
  authenticate,
  isAuthorized(["admin", "manager"]),
  validateRequest({ params: courseParamsSchema, body: courseBodySchema }),
  courseController.updateCourse
);

/**
 * @openapi
 * /api/v1/courses/{id}:
 *   delete:
 *     summary: Delete a course by ID
 *     tags: [Courses]
 */
router.delete(
  "/:id",
  authenticate,
  isAuthorized(["admin"]),
  validateRequest({ params: courseParamsSchema }),
  courseController.deleteCourse
);

export default router;