import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import Joi from "joi";

interface RequestSchemas {
  body?: ObjectSchema;
  query?: ObjectSchema;
  params?: ObjectSchema;
}

export const validateRequest = (schemas: RequestSchemas) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: string[] = [];

    const validatePart = (schema: ObjectSchema, data: any, partName: string) => {
      const { error, value } = schema.validate(data, {
        abortEarly: false,
        stripUnknown: true
      });
      if (error) {
        errors.push(...error.details.map(detail => `${partName}: ${detail.message}`));
      }
      return value;
    };

    if (schemas.body) req.body = validatePart(schemas.body, req.body, "Body");
    if (schemas.query) req.query = validatePart(schemas.query, req.query, "Query");
    if (schemas.params) req.params = validatePart(schemas.params, req.params, "Params");

    
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        error: {
          message: `Validation error: ${errors.join(", ")}`,
          code: "VALIDATION_ERROR",
        },
      });
    }


    next();
  };
};

// Student Schemas
export const studentBodySchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(18).max(100).required()
});

export const studentQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  sortBy: Joi.string().valid("name", "createdAt").optional(),
  sortOrder: Joi.string().valid("asc", "desc").default("asc")
});

export const studentParamsSchema = Joi.object({
  id: Joi.string().required()
});

// Assignment Schemas
export const assignmentBodySchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500).optional(),
  dueDate: Joi.date().required()
});

export const assignmentParamsSchema = Joi.object({
  id: Joi.string().required()
});

// Course Schemas
export const courseBodySchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  code: Joi.string().alphanum().min(3).max(10).required(),
  credits: Joi.number().integer().min(1).max(10).required()
});

export const courseParamsSchema = Joi.object({
  id: Joi.string().required()
});

