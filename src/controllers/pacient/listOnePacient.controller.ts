import { Request, Response } from "express";
import { listOnePacientService } from "../../services/pacient/listOnePatient.service";

export const listOnePatientController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const agentId = req.userId;

  const listOnePatient = await listOnePacientService(id, agentId);

  return res.json(listOnePatient);
};
