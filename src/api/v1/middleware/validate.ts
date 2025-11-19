import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

/**
 * Middleware to validate incoming request body against a Joi schema.
 *
 * @param {ObjectSchema} schema - Joi schema to validate the request body.
 * @returns {(req: Request, res: Response, next: NextFunction) => void} Express middleware function.
 *
 * @example
 * router.post("/students", validateRequest(studentSchema), (req, res) => { ... });
 */
export const validateRequest = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false, // Show all validation errors
      stripUnknown: true // Remove unknown fields
    });

    if (error) {
      return res.status(400).json({
        errors: error.details.map(detail => detail.message)
      });
    }

    // Replace req.body with validated and sanitized data
    req.body = value;
    next();
  };
};