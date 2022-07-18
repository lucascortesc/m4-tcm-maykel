import { Request, Response } from "express";
import { createFamilyService } from "../../services/family/createFamily.service";

export const createFamilyController = async (req: Request, res: Response) => {
  const { name, address_id } = req.body;
  const agentId = req.userId;

  const newFamily = await createFamilyService({ name, address_id }, agentId);

  return res.status(201).json(newFamily);
};
