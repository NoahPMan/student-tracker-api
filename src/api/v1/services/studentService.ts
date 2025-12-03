import { db } from "../../../config/firebaseConfig";
import { Student } from "../models/studentModel";

const COLLECTION = "students";

export const createStudent = async (studentData: Student): Promise<string> => {
  const docRef = await db.collection(COLLECTION).add(studentData as any);
  return docRef.id;
};

export const getAllStudents = async (
  filters?: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }
): Promise<Student[]> => {
  const { page = 1, limit = 10, sortBy = "createdAt", sortOrder = "asc" } = filters || {};

  let query = db.collection(COLLECTION).orderBy(sortBy, sortOrder).limit(limit);

  // Pagination using startAfter
  if (page > 1) {
    const skip = (page - 1) * limit;
    const snapshot = await db.collection(COLLECTION).orderBy(sortBy, sortOrder).limit(skip).get();
    const lastDoc = snapshot.docs[snapshot.docs.length - 1];
    if (lastDoc) {
      query = db.collection(COLLECTION).orderBy(sortBy, sortOrder).startAfter(lastDoc).limit(limit);
    }
  }

  const snapshot = await query.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Student[];
};

export const getStudentById = async (id: string): Promise<Student | null> => {
  const doc = await db.collection(COLLECTION).doc(id).get();
  return doc.exists ? ({ id: doc.id, ...doc.data() } as Student) : null;
};

export const updateStudent = async (id: string, data: Partial<Student>): Promise<void> => {
  await db.collection(COLLECTION).doc(id).update(data);
};

export const deleteStudent = async (id: string): Promise<void> => {
  await db.collection(COLLECTION).doc(id).delete();
};