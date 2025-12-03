import { Request, Response } from "express";
import * as courseService from "../services/courseService";

/**
 * Create a new course
 */
export const createCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = await courseService.createCourse(req.body);
    res.status(201).json({ message: "Course created successfully", id, data: req.body });
  } catch (error) {
    res.status(500).json({ error: "Failed to create course" });
  }
};

/**
 * Get all courses with pagination and sorting
 */
export const getAllCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page, limit, sortBy, sortOrder } = req.query;
    const courses = await courseService.getAllCourses({
      page: page ? parseInt(page as string, 10) : undefined,
      limit: limit ? parseInt(limit as string, 10) : undefined,
      sortBy: sortBy as string,
      sortOrder: sortOrder as "asc" | "desc"
    });
    res.status(200).json({ message: "Courses fetched successfully", data: courses });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

/**
 * Get a course by ID
 */
export const getCourseById = async (req: Request, res: Response): Promise<void> => {
  try {
    const course = await courseService.getCourseById(req.params.id);
    if (!course) {
      res.status(404).json({ error: "Course not found" });
    } else {
      res.status(200).json({ message: "Course fetched successfully", data: course });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch course" });
  }
};

/**
 * Update a course by ID
 */
export const updateCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    await courseService.updateCourse(req.params.id, req.body);
    res.status(200).json({ message: "Course updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update course" });
  }
};

/**
 * Delete a course by ID
 */
export const deleteCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    await courseService.deleteCourse(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete course" });
  }
};