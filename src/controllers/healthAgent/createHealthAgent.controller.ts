import { Request, Response } from "express";
import createHealthAgentService from "../../services/heathAgent/createHealthAgent.service";

const createHealthAgentController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const healthAgent = await createHealthAgentService({ name, email, password });

  return res.status(201).json(healthAgent);
};

export default createHealthAgentController;
