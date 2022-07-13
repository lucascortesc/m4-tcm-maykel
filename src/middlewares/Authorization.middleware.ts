import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../errors/appError";

export const authorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError("Missing token", 401);
  }

  const splitToken = token.split(" ");

  jwt.verify(
    splitToken[1],
    process.env.SECRET_KEY as string,
    (error: any, decoded: any) => {
      if (error) {
        throw new AppError("Invalid token", 401);
      }
      if (!decoded.isActive) {
        throw new AppError("User inactive");
      }

      req.userId = decoded.id;
      req.userIsActive = decoded.isActive;
      next();
    }
  );
};
