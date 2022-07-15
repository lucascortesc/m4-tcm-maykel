import { Request, Response } from "express";
import updateHomeVisitService from "../../services/homeVisit/updateHomeVisit.service";

const updateHomeVisitController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req

  const updatedVisit = await updateHomeVisitService(id, req.body, userId);

  return res.status(200).json(updatedVisit);
};

export default updateHomeVisitController;
