import { Request, Response, NextFunction } from "express";
import { ValidationError } from "yup";
import { ObjectSchema } from "yup";
import { AppError } from "../errors/appError";

export const schemaValidation =
  (schema: ObjectSchema<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validation = await schema.validate(req.body);

      let invalidFields = [];

      for (let i in req.body) {
        if (!Object.keys(validation).some((key) => key === i)) {
          invalidFields.push(i);
        }
      }

      if (req.body !== validation) {
        throw new ValidationError(
          invalidFields.length > 1
            ? `(${invalidFields.join(", ")}) are invalids fields`
            : `(${invalidFields[0]}) is an invalid field`
        );
      }

      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new AppError(error.errors.join("; "));
      }
    }
  };
