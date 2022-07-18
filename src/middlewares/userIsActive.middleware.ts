import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import { AppError } from "../errors/appError";
import AppDataSource from "../data-source";
import { Agent } from "../entities/healthAgent.entity";

export const userIsActive = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.userId;
  const healthAgentRepository = AppDataSource.getRepository(Agent);

  const agents = await healthAgentRepository.findOneBy({ id: id });

  if (!agents?.isactive) {
    throw new AppError("User inactive");
  }

  next();
};
