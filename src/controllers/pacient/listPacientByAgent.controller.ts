import { Request, Response } from "express";
import { listPacientByAgentService } from "../../services/pacient/listPacientByAgent.service";

export const listPacientByAgent = async (req: Request, res: Response) => {
  const agentId = req.userId;

  const listPacient = await listPacientByAgentService(agentId);

  return res.status(200).json(listPacient);
};
