import { Request, Response } from "express";
import { createDocument, getDocuments, getDocumentById, updateDocument, deleteDocument } from "../repositories/firestoreRepository";

const COLLECTION = "courses";

/**
 * Create a new course
 */
export const createCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = await createDocument(COLLECTION, req.body);
    res.status(201).json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: "Failed to create course" });
  }
};

/**
 * Get all courses
 */
export const getAllCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const courses = await getDocuments(COLLECTION);
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

/**
 * Get a course by ID
 */
export const getCourseById = async (req: Request, res: Response): Promise<void> => {
  try {
    const doc = await getDocumentById(COLLECTION, req.params.id);
    if (!doc.exists) {
      res.status(404).json({ error: "Course not found" });
    } else {
      res.status(200).json({ id: doc.id, ...doc.data() });
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
    await updateDocument(COLLECTION, req.params.id, req.body);
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
    await deleteDocument(COLLECTION, req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete course" });
  }
};