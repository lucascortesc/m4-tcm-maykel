import { Request, Response } from "express";
import { listAllVisitsFromAddressService } from "../../services/address/listAllVisitsFromAddress.service";

export const listAllVisitsFromAddress = async (req: Request, res: Response) => {
  const addressId = req.params.id;
  const agentId = req.userId;

  const visits = await listAllVisitsFromAddressService(addressId, agentId);

  return res.json(visits);
};
