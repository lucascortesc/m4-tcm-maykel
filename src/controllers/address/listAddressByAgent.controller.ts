import { Request, Response } from "express";
import { listAddressByAgentService } from "../../services/address/listAddressByAgent.service";

export const listAddressByAgentController = async (
  req: Request,
  res: Response
) => {
  const agentId = req.userId;

  const addresses = await listAddressByAgentService(agentId);

  return res.json(addresses);
};
