import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

// This function takes a Joi schema and returns a middleware
export const validateRequest = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ message: "Validation failed", errors: errorMessages });
    }

    next(); // Validation passed, go to controller
  };
};
