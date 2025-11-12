import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

/**
 * Middleware to validate incoming request body against a Joi schema.
 *
 * @param {ObjectSchema} schema - Joi schema to validate the request body.
 * @returns {(req: Request, res: Response, next: NextFunction) => void} Express middleware function.
 *
 * @example
 * // Usage in a route:
 * router.post("/students", validateRequest(studentSchema), (req, res) => { ... });
 */
export const validateRequest = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};