import { Request, Response } from "express";
import { listHomeVisitsService } from "../../services/homeVisit/listHomeVisits.service";

export const listHomeVisitsController = async (req: Request, res: Response) => {
  const agentId = req.userId;

  const HomeVisit = await listHomeVisitsService(agentId);

  return res.status(200).json(HomeVisit);
};
