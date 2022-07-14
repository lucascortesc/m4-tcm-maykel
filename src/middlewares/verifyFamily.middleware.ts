import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Family } from "../entities/family.entity";
import { AppError } from "../errors/appError";

const verifyFamily = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const familyRepository = AppDataSource.getRepository(Family);

  const findFamily = await familyRepository.findOneBy({ id: id });

  if (!findFamily) {
    throw new AppError("Family not found");
  }
};
export default verifyFamily;
