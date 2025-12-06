import Joi from "joi";

export const studentSchemas = {
  create: Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    age: Joi.number().integer().min(16).required()
  }),
  update: Joi.object({
    name: Joi.string().min(2).optional(),
    email: Joi.string().email().optional(),
    age: Joi.number().integer().min(16).optional()
  })
};
