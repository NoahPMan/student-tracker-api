import { Request, Response, NextFunction } from "express";
import * as courseService from "../services/courseService";

export const createCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = await courseService.createCourse(req.body);
    res.status(201).json({ message: "Course created successfully", id, data: req.body });
  } catch (error) {
    next(error);
  }
};

export const getAllCourses = async (req: Request, res: Response, next: NextFunction) => {
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
    next(error);
  }
};

export const getCourseById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const course = await courseService.getCourseById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json({ message: "Course fetched successfully", data: course });
  } catch (error) {
    next(error);
  }
};

export const updateCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await courseService.updateCourse(req.params.id, req.body);
    res.status(200).json({ message: "Course updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await courseService.deleteCourse(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
