import express from "express";
import * as courseController from "../controllers/courseController";
import { authenticate } from "../middleware/authenticate";
import { isAuthorized } from "../middleware/authorize";

const router = express.Router();

/**
 * @openapi
 * /api/v1/courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 */
router.post("/", courseController.createCourse);

/**
 * @openapi
 * /api/v1/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 */
router.get("/", courseController.getAllCourses);

/**
 * @openapi
 * /api/v1/courses/{id}:
 *   get:
 *     summary: Get a course by ID
 *     tags: [Courses]
 */
router.get("/:id", courseController.getCourseById);

/**
 * @openapi
 * /api/v1/courses/{id}:
 *   put:
 *     summary: Update a course by ID
 *     tags: [Courses]
 */
router.put("/:id", courseController.updateCourse);

/**
 * @openapi
 * /api/v1/courses/{id}:
 *   delete:
 *     summary: Delete a course by ID
 *     tags: [Courses]
 */
router.delete("/:id", authenticate, isAuthorized(["admin"]), courseController.deleteCourse);

export default router;