import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { HomeVisit } from "../entities/homeVisit.entity";
import { AppError } from "../errors/appError";

const verifyHomeVisit = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const homeVisitRepository = AppDataSource.getRepository(HomeVisit);

  const findHomeVisit = await homeVisitRepository.findOneBy({ id: id });

  if (!findHomeVisit) {
    throw new AppError("visit not found", 404);
  }
  next();
};
export default verifyHomeVisit;
