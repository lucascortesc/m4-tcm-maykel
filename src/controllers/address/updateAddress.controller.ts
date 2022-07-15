import { Request, Response } from "express";
import { updateAddressService } from "../../services/address/updateAddress.service";

export const updateAddressController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const updatedAddress = await updateAddressService(
    id,
    req.userId,
    req.body
  );

  return res.json(updatedAddress);
};
