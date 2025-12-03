
import { Request, Response, NextFunction } from "express";
import * as assignmentService from "../services/assignmentService";

export const createAssignment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = await assignmentService.createAssignment(req.body);
    res.status(201).json({ message: "Assignment created successfully", id, data: req.body });
  } catch (error) {
    next(error);
  }
};

export const getAllAssignments = async (req: Request, res: Response, next: NextFunction) => {
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
    next(error);
  }
};

export const getAssignmentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const assignment = await assignmentService.getAssignmentById(req.params.id);
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });
    res.status(200).json({ message: "Assignment fetched successfully", data: assignment });
  } catch (error) {
    next(error);
  }
};

export const updateAssignment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await assignmentService.updateAssignment(req.params.id, req.body);
    res.status(200).json({ message: "Assignment updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteAssignment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await assignmentService.deleteAssignment(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
