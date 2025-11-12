import { firestore } from "firebase-admin";

const db = firestore();

export const createDocument = async <T>(collection: string, data: T): Promise<string> => {
  const docRef = await db.collection(collection).add(data as any);
  return docRef.id;
};

export const getDocuments = async <T>(collection: string): Promise<T[]> => {
  const snapshot = await db.collection(collection).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
};

export const getDocumentById = async (collection: string, id: string): Promise<firestore.DocumentSnapshot> => {
  return db.collection(collection).doc(id).get();
};

export const updateDocument = async <T>(collection: string, id: string, data: Partial<T>): Promise<void> => {
  await db.collection(collection).doc(id).update(data);
};

export const deleteDocument = async (collection: string, id: string): Promise<void> => {
  await db.collection(collection).doc(id).delete();
};