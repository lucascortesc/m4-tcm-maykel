import { Request, Response } from "express";
import { listHomeVisitsService } from "../../services/homeVisit/listHomeVisits.service";

export const listHomeVisitsController = async (req: Request, res: Response) => {
  const visitHomeId = req.params.id;

  const HomeVisit = await listHomeVisitsService(visitHomeId);

  return res.status(200).json(HomeVisit);
};
