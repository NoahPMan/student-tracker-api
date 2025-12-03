import { db } from "../../../config/firebaseConfig";
import { Course } from "../models/courseModel";

const COLLECTION = "courses";

export const createCourse = async (courseData: Course): Promise<string> => {
  const docRef = await db.collection(COLLECTION).add(courseData as any);
  return docRef.id;
};

export const getAllCourses = async (
  filters?: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }
): Promise<Course[]> => {
  const { page = 1, limit = 10, sortBy = "createdAt", sortOrder = "asc" } = filters || {};

  let query = db.collection(COLLECTION).orderBy(sortBy, sortOrder).limit(limit);

  if (page > 1) {
    const skip = (page - 1) * limit;
    const snapshot = await db.collection(COLLECTION).orderBy(sortBy, sortOrder).limit(skip).get();
    const lastDoc = snapshot.docs[snapshot.docs.length - 1];
    if (lastDoc) {
      query = db.collection(COLLECTION).orderBy(sortBy, sortOrder).startAfter(lastDoc).limit(limit);
    }
  }

  const snapshot = await query.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Course[];
};

export const getCourseById = async (id: string): Promise<Course | null> => {
  const doc = await db.collection(COLLECTION).doc(id).get();
  return doc.exists ? ({ id: doc.id, ...doc.data() } as Course) : null;
};

export const updateCourse = async (id: string, data: Partial<Course>): Promise<void> => {
  await db.collection(COLLECTION).doc(id).update(data);
};

export const deleteCourse = async (id: string): Promise<void> => {
  await db.collection(COLLECTION).doc(id).delete();
};
