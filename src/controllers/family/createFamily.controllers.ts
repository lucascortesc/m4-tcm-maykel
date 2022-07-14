import { Request, Response } from "express";
import { createFamilyService } from "../../services/family/createFamily.service";

export const createFamilyController = async (req: Request, res: Response) => {
  const { name, address_id } = req.body;

  const newFamily = await createFamilyService({ name, address_id });

  return res.status(201).json(newFamily);
};
