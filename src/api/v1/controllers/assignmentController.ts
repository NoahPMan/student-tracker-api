import { Request, Response } from "express";
import * as assignmentService from "../services/assignmentService";

/**
 * Create a new assignment
 */
export const createAssignment = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = await assignmentService.createAssignment(req.body);
    res.status(201).json({ message: "Assignment created successfully", id, data: req.body });
  } catch (error) {
    res.status(500).json({ error: "Failed to create assignment" });
  }
};

/**
 * Get all assignments with pagination and sorting
 */
export const getAllAssignments = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page, limit, sortBy, sortOrder } = req.query;
    const assignments = await assignmentService.getAllAssignments({
      page: page ? parseInt(page as string, 10) : undefined,
      limit: limit ? parseInt(limit as string, 10) : undefined,
      sortBy: sortBy as string,
      sortOrder: sortOrder as "asc" | "desc"
    });
    res.status(200).json({ message: "Assignments fetched successfully", data: assignments });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
};

/**
 * Get an assignment by ID
 */
export const getAssignmentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const assignment = await assignmentService.getAssignmentById(req.params.id);
    if (!assignment) {
      res.status(404).json({ error: "Assignment not found" });
    } else {
      res.status(200).json({ message: "Assignment fetched successfully", data: assignment });
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
    await assignmentService.updateAssignment(req.params.id, req.body);
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
    await assignmentService.deleteAssignment(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete assignment" });
  }
};