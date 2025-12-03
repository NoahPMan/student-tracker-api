import { db } from "../../../config/firebaseConfig";
import { Assignment } from "../models/assignmentModel";

const COLLECTION = "assignments";

export const createAssignment = async (assignmentData: Assignment): Promise<string> => {
  const docRef = await db.collection(COLLECTION).add(assignmentData as any);
  return docRef.id;
};

export const getAllAssignments = async (
  filters?: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }
): Promise<Assignment[]> => {
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
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Assignment[];
};

export const getAssignmentById = async (id: string): Promise<Assignment | null> => {
  const doc = await db.collection(COLLECTION).doc(id).get();
  return doc.exists ? ({ id: doc.id, ...doc.data() } as Assignment) : null;
};

export const updateAssignment = async (id: string, data: Partial<Assignment>): Promise<void> => {
  await db.collection(COLLECTION).doc(id).update(data);
};

export const deleteAssignment = async (id: string): Promise<void> => {
  await db.collection(COLLECTION).doc(id).delete();
};