import { db } from "../../../config/firebaseConfig";
import { DocumentSnapshot } from "firebase-admin/firestore";
/**
 * Creates a new document in the specified Firestore collection.
 */
export const createDocument = async <T>(collection: string, data: T): Promise<string> => {
  const docRef = await db.collection(collection).add(data as any);
  return docRef.id;
};

/**
 * Retrieves all documents from the specified Firestore collection.
 */
export const getDocuments = async <T>(collection: string): Promise<T[]> => {
  const snapshot = await db.collection(collection).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
};

/**
 * Retrieves a single document by its ID.
 */
export const getDocumentById = async (collection: string, id: string): Promise<DocumentSnapshot> => {
  return db.collection(collection).doc(id).get();
};

/**
 * Updates a document in the specified Firestore collection.
 */
export const updateDocument = async <T>(collection: string, id: string, data: Partial<T>): Promise<void> => {
  await db.collection(collection).doc(id).update(data);
};

/**
 * Deletes a document from the specified Firestore collection.
 */
export const deleteDocument = async (collection: string, id: string): Promise<void> => {
  await db.collection(collection).doc(id).delete();
};