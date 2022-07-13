import { Request, Response } from "express";
import loginHealthAgentService from "../../services/heathAgent/loginHealthAgent.service";

const loginHealthAgentController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const login = await loginHealthAgentService(email, password);

  return res.status(200).json({ token: login });
};

export default loginHealthAgentController;
