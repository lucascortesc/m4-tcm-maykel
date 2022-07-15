import { Request, Response } from "express";
import { updatePacientService } from "../../services/pacient/updatePacient.service";

export const updatePacient = async (req: Request, res: Response) => {
  const agentId = req.userId;
  const pacientId = req.params.id;

  const updatedPacient = await updatePacientService(req.body, pacientId, agentId);

  return res.status(200).json(updatedPacient);
};
