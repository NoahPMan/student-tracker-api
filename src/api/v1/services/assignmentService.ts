import { db } from "../../../config/firebaseConfig";
import { Assignment } from "../models/assignmentModel";

const COLLECTION = "assignments";

console.log("Firestore db initialized:", !!db);

export const createAssignment = async (assignmentData: Assignment): Promise<string> => {
  const docRef = await db.collection(COLLECTION).add(assignmentData);
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

  let queryRef: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> =
    db.collection(COLLECTION).orderBy(sortBy, sortOrder).limit(limit);

  if (page > 1) {
    const skip = (page - 1) * limit;
    const snapshot = await db.collection(COLLECTION).orderBy(sortBy, sortOrder).limit(skip).get();
    const lastDoc = snapshot.docs[snapshot.docs.length - 1];
    if (lastDoc) {
      queryRef = db.collection(COLLECTION)
        .orderBy(sortBy, sortOrder)
        .startAfter(lastDoc)
        .limit(limit);
    }
  }

  const snapshot = await queryRef.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Assignment));
};

export const getAssignmentById = async (id: string): Promise<Assignment | null> => {
  const docRef = await db.collection(COLLECTION).doc(id).get();
  if (!docRef.exists) return null;
  return { id: docRef.id, ...docRef.data() } as Assignment;
};

export const updateAssignment = async (id: string, data: Partial<Assignment>): Promise<void> => {
  await db.collection(COLLECTION).doc(id).update(data);
};

export const deleteAssignment = async (id: string): Promise<void> => {
  await db.collection(COLLECTION).doc(id).delete();
};
