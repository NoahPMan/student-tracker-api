import { firestore } from "firebase-admin";

const db = firestore();

/**
 * Creates a new document in the specified Firestore collection.
 * @template T
 * @param {string} collection - The name of the Firestore collection.
 * @param {T} data - The data object to store in the document.
 * @returns {Promise<string>} The ID of the newly created document.
 */
export const createDocument = async <T>(collection: string, data: T): Promise<string> => {
  const docRef = await db.collection(collection).add(data as any);
  return docRef.id;
};

/**
 * Retrieves all documents from the specified Firestore collection.
 * @template T
 * @param {string} collection - The name of the Firestore collection.
 * @returns {Promise<T[]>} An array of documents with their IDs included.
 */
export const getDocuments = async <T>(collection: string): Promise<T[]> => {
  const snapshot = await db.collection(collection).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
};

/**
 * Retrieves a single document by its ID from the specified Firestore collection.
 * @param {string} collection - The name of the Firestore collection.
 * @param {string} id - The document ID.
 * @returns {Promise<firestore.DocumentSnapshot>} The Firestore document snapshot.
 */
export const getDocumentById = async (collection: string, id: string): Promise<firestore.DocumentSnapshot> => {
  return db.collection(collection).doc(id).get();
};

/**
 * Updates a document in the specified Firestore collection.
 * @template T
 * @param {string} collection - The name of the Firestore collection.
 * @param {string} id - The document ID.
 * @param {Partial<T>} data - The partial data object to update.
 * @returns {Promise<void>} Resolves when the update is complete.
 */
export const updateDocument = async <T>(collection: string, id: string, data: Partial<T>): Promise<void> => {
  await db.collection(collection).doc(id).update(data);
};

/**
 * Deletes a document from the specified Firestore collection.
 * @param {string} collection - The name of the Firestore collection.
 * @param {string} id - The document ID.
 * @returns {Promise<void>} Resolves when the deletion is complete.
 */
export const deleteDocument = async (collection: string, id: string): Promise<void> => {
  await db.collection(collection).doc(id).delete();
};