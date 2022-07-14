import { Request, Response } from "express";
import updateHealthAgentService from "../../services/heathAgent/updateHealthAgent.service";

const updateHealthAgentController = async (req: Request, res: Response) => {
  const updatedAgent = await updateHealthAgentService(req.userId, req.body);

  return res.status(200).json(updatedAgent);
};

export default updateHealthAgentController;
