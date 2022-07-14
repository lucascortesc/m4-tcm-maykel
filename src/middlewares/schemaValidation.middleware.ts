import { Request, Response, NextFunction } from "express";
import { ValidationError } from "yup";
import { ObjectSchema } from "yup";

export const schemaValidation =
  (schema: ObjectSchema<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validation = await schema.validate(req.body);
      req.body = validation;
      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json({
          message: error.errors.join("; "),
        });
      }
    }
  };
