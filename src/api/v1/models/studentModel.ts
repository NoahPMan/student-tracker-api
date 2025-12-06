/**
 * Represents a Student entity.
 * @typedef {Object} Student
 * @property {string} id - Unique identifier for the student.
 * @property {string} name - Full name of the student.
 * @property {string} email - Email address of the student.
 * @property {string[]} courses - List of course IDs the student is enrolled in.
 */
export interface Student {
  id: string;
  name: string;
  email: string;
  courses: string[];
}