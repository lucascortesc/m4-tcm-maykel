import { Request, Response } from "express";
import { activateHealthAgentService } from "../../services/heathAgent/activateHealthAgent.service";

export const activateHealthAgentController = async (req: Request, res: Response) => {
  const agentId = req.userId;

  const message = await activateHealthAgentService(agentId);

  return res.json({ message: message });
};
