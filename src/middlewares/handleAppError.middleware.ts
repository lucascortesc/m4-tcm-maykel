import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

export const handleAppErrorMiddleware = (error: Error, req: Request, res: Response, _: NextFunction) => {
  const formatedError = (message: string) => {
    let formatedMessage = message.charAt(0).toUpperCase() + message.slice(1);

    return formatedMessage.split(".")[0];
  };

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      error: formatedError(error.message),
    });
  }

  if (error instanceof Error) {
    return res.status(400).json({
      error: formatedError(error.message),
    });
  }

  return res.status(500).json({
    error: "Internal server error",
  });
};
