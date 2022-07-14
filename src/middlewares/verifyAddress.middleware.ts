import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Address } from "../entities/address.entity";
import { AppError } from "../errors/appError";

const verifyAddress = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const addressRepository = AppDataSource.getRepository(Address);

  const findAddress = await addressRepository.findOneBy({ id: id });

  if (!findAddress) {
    throw new AppError("Address not found", 404);
  }

  next();
};
export default verifyAddress;
