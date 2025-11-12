import * as firestoreRepository from "../repositories/firestoreRepository";
import { Student } from "../models/studentModel";

const COLLECTION = "students";

export const createStudent = async (studentData: Student): Promise<string> => {
  return await firestoreRepository.createDocument<Student>(COLLECTION, studentData);
};

export const getAllStudents = async (): Promise<Student[]> => {
  const docs = await firestoreRepository.getDocuments(COLLECTION);
  return docs as Student[];
};

export const getStudentById = async (id: string): Promise<Student | null> => {
  const doc = await firestoreRepository.getDocumentById(COLLECTION, id);
  return doc ? (doc.data() as Student) : null;
};

export const updateStudent = async (id: string, data: Partial<Student>): Promise<void> => {
  await firestoreRepository.updateDocument<Student>(COLLECTION, id, data);
};

export const deleteStudent = async (id: string): Promise<void> => {
  await firestoreRepository.deleteDocument(COLLECTION, id);
};
