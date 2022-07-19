import { Request, Response, NextFunction } from "express";
import { ValidationError } from "yup";
import { ObjectSchema } from "yup";
import { AppError } from "../errors/appError";

export const schemaValidation =
  (schema: ObjectSchema<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validation = await schema.validate(req.body);
      req.body = validation;
      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new AppError(error.errors.join("; "));
      }
    }
  };
