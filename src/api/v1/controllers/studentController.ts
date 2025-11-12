import { Request, Response } from "express";
import * as studentService from "../services/studentService";

export const createStudent = async (req: Request, res: Response) => {
  const id = await studentService.createStudent(req.body);
  res.status(201).json({ message: "Student created", id });
};

export const getAllStudents = async (_req: Request, res: Response) => {
  const students = await studentService.getAllStudents();
  res.status(200).json(students);
};

export const getStudentById = async (req: Request, res: Response) => {
  const student = await studentService.getStudentById(req.params.id);
  if (!student) return res.status(404).json({ message: "Student not found" });
  res.status(200).json(student);
};

export const updateStudent = async (req: Request, res: Response) => {
  await studentService.updateStudent(req.params.id, req.body);
  res.status(200).json({ message: "Student updated" });
};

export const deleteStudent = async (req: Request, res: Response) => {
  await studentService.deleteStudent(req.params.id);
  res.status(204).send();
};