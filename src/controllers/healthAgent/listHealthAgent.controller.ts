import { Request, Response } from "express";
import listHealthAgentService from "../../services/heathAgent/listHealthAgent.service";

const listHealthAgentController = async (req: Request, res: Response) => {
  const agents = await listHealthAgentService();
  return res.status(200).json(agents);
};

export default listHealthAgentController;
