import { Request, Response } from "express";
import listHealthAgentService from "../../services/heathAgent/listHealthAgent.service";

const listHealthAgentController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const agents = await listHealthAgentService(id);
  return res.status(200).json(agents);
};

export default listHealthAgentController;
