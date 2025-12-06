import express from "express";
import * as studentController from "../controllers/studentController";
import { authenticate } from "../middleware/authenticate";
import { isAuthorized } from "../middleware/authorize";
import { validateRequest } from "../middleware/validate";
import {
  studentBodySchema,
  studentParamsSchema,
  studentQuerySchema
} from "../middleware/validate";


console.log("authenticate:", typeof authenticate);
console.log("validateRequest:", typeof validateRequest);
console.log("controller:", typeof studentController.getStudentById);


const router = express.Router();

/**
 * @openapi
 * /api/v1/students:
 *   post:
 *     summary: Create a new student and send confirmation email
 *     tags:
 *       - Students
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       201:
 *         description: Student created successfully and confirmation email sent
 *         content:
 *           application/json:
 *             example:
 *               message: "Student created and email sent"
 *               id: "abc123"
 */
router.post(
  "/",
  authenticate,
  isAuthorized(["admin", "manager"]),
  validateRequest({ body: studentBodySchema }),
  studentController.createStudent
);

/**
 * @openapi
 * /api/v1/students:
 *   get:
 *     summary: Get all students
 *     tags:
 *       - Students
 *     responses:
 *       200:
 *         description: List of students
 */
router.get("/", authenticate, validateRequest({ query: studentQuerySchema }), studentController.getAllStudents);

/**
 * @openapi
 * /api/v1/students/{id}:
 *   get:
 *     summary: Get a student by ID
 *     tags:
 *       - Students
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student details
 */
router.get(
  "/:id",
  authenticate,
  validateRequest({ params: studentParamsSchema }),
  studentController.getStudentById
);

/**
 * @openapi
 * /api/v1/students/{id}:
 *   put:
 *     summary: Update a student by ID
 *     tags:
 *       - Students
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: Student updated successfully
 */
router.put(
  "/:id",
  authenticate,
  isAuthorized(["admin", "manager"]),
  validateRequest({ params: studentParamsSchema, body: studentBodySchema }),
  studentController.updateStudent
);

/**
 * @openapi
 * /api/v1/students/{id}:
 *   delete:
 *     summary: Delete a student by ID
 *     tags:
 *       - Students
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Student deleted successfully
 */
router.delete(
  "/:id",
  authenticate,
  isAuthorized(["admin"]),
  validateRequest({ params: studentParamsSchema }),
  studentController.deleteStudent
);

export default router;