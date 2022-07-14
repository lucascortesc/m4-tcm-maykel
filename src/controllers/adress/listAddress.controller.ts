import { Request, Response } from "express";
import { listAddressService } from "../../services/address/listAddress.service";

export const listAddress = async (req: Request, res: Response) => {
  const addressId = req.params.id;

  const Address = await listAddressService(addressId);

  return res.status(201).json(Address);
};
