import express from "express";
import * as studentController from "../controllers/studentController";

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
router.post("/", studentController.createStudent);

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
router.get("/", studentController.getAllStudents);

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
router.get("/:id", studentController.getStudentById);

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
router.put("/:id", studentController.updateStudent);

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
router.delete("/:id", studentController.deleteStudent);

export default router;
