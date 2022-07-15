import { Request, Response } from "express";
import { createHomeVisitService } from "../../services/homeVisit/createHomeVisit.service";

export const createHomeVisitController = async (
  req: Request,
  res: Response
) => {
  const id = req.userId;
  const { status, message, address_id } = req.body;

  const newHomeVisit = await createHomeVisitService(id, {
    status,
    message,
    address_id,
  });

  return res.status(201).json(newHomeVisit);
};
