import { Request, Response } from "express";
import { activateHealthAgentService } from "../../services/heathAgent/activateHealthAgent.service";

export const activateHealthAgentController = async (req: Request, res: Response) => {
  const agentId = req.userId;

  const user = await activateHealthAgentService(agentId);

  return res.json(user);
};
