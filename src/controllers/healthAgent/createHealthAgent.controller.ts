import { Request, Response } from "express";
import createHealthAgentService from "../../services/heathAgent/createHealthAgent.service";

const createHealthAgentController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const protocol = req.protocol
  const host = req.get('host')
  const healthAgent = await createHealthAgentService({ name, email, password }, protocol, host);

  return res.status(201).json(healthAgent);
};

export default createHealthAgentController;
