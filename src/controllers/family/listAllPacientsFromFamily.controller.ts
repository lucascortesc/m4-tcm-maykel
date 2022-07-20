import { Request, Response } from "express";
import { listAllPacientsFromFamilyService } from "../../services/family/listAllPacientsFromFamily.service";

export const listAllPacientsFromFamily = async (req: Request, res: Response) => {
  const familyId = req.params.id;
  const agentId = req.userId;

  const pacients = await listAllPacientsFromFamilyService(familyId, agentId);

  return res.json(pacients);
};
