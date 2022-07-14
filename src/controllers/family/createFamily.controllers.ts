import { Request, Response } from "express";
import { createFamilyService } from "../../services/family/createFamily.service";
import { iFamily } from "../../interfaces/family";

export const createFamilyController = async (req: Request, res: Response) => {
  const { name, address } = req.body;

  const newFamily = await createFamilyService({ name, address });

  return res.status(201).json(newFamily);
};
