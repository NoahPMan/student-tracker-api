import { Request, Response, NextFunction } from "express";
import * as studentService from "../services/studentService";
import { sendEmail } from "../services/emailService";

export const createStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = await studentService.createStudent(req.body);
    await sendEmail(
      req.body.email,
      "Welcome to Student Tracker",
      `Hello ${req.body.name}, your account has been created successfully!`
    );
    res.status(201).json({ message: "Student created and email sent", id, data: req.body });
  } catch (error) {
    next(error);
  }
};

export const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, sortBy, sortOrder } = req.query;
    const students = await studentService.getAllStudents({
      page: page ? parseInt(page as string, 10) : undefined,
      limit: limit ? parseInt(limit as string, 10) : undefined,
      sortBy: sortBy as string,
      sortOrder: sortOrder as "asc" | "desc"
    });
    res.status(200).json({ message: "Students fetched successfully", data: students });
  } catch (error) {
    next(error);
  }
};

export const getStudentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = await studentService.getStudentById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json({ message: "Student fetched successfully", data: student });
  } catch (error) {
    next(error);
  }
};

export const updateStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await studentService.updateStudent(req.params.id, req.body);
    res.status(200).json({ message: "Student updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await studentService.deleteStudent(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};