import { Request, Response } from "express";
import updateHomeVisitService from "../../services/homeVisit/updateHomeFamily.service";

const updateHomeVisitController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const updatedVisit = await updateHomeVisitService(id, req.body);

  return res.status(200).json(updatedVisit);
};

export default updateHomeVisitController;
