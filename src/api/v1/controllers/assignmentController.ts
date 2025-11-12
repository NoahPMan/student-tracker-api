import { Request, Response } from "express";
import { createDocument, getDocuments, getDocumentById, updateDocument, deleteDocument } from "../repositories/firestoreRepository";

const COLLECTION = "assignments";

/**
 * Create a new assignment
 */
export const createAssignment = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = await createDocument(COLLECTION, req.body);
    res.status(201).json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: "Failed to create assignment" });
  }
};

/**
 * Get all assignments
 */
export const getAllAssignments = async (req: Request, res: Response): Promise<void> => {
  try {
    const assignments = await getDocuments(COLLECTION);
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
};

/**
 * Get an assignment by ID
 */
export const getAssignmentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const doc = await getDocumentById(COLLECTION, req.params.id);
    if (!doc.exists) {
      res.status(404).json({ error: "Assignment not found" });
    } else {
      res.status(200).json({ id: doc.id, ...doc.data() });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch assignment" });
  }
};

/**
 * Update an assignment by ID
 */
export const updateAssignment = async (req: Request, res: Response): Promise<void> => {
  try {
    await updateDocument(COLLECTION, req.params.id, req.body);
    res.status(200).json({ message: "Assignment updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update assignment" });
  }
};

/**
 * Delete an assignment by ID
 */
export const deleteAssignment = async (req: Request, res: Response): Promise<void> => {
  try {
    await deleteDocument(COLLECTION, req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete assignment" });
  }
};