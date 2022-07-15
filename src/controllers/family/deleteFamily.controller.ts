import { Request, Response } from "express";
import deleteFamilyService from "../../services/family/deleteFamily.service";

const deleteFamilyController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req
  const deleted = await deleteFamilyService(id, userId);

  return res.status(200).json({ message: deleted });
};

export default deleteFamilyController;
