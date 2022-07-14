import { Request, Response } from "express";
import deleteHealthAgentService from "../../services/heathAgent/deleteHealthAgent.service";

const deleteHealthAgentController = async (req: Request, res: Response) => {
  const deletedAgent = await deleteHealthAgentService(req.userId);

  return res.status(200).json({ message: deletedAgent });
};

export default deleteHealthAgentController;
