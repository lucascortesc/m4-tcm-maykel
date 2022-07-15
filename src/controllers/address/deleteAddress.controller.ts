import { Request, Response } from "express";
import { deleteAddressService } from "../../services/address/deleteAddress.service";

export const deleteAddressController = async (req: Request, res: Response) => {
  const addressId = req.params.id;

  const deletedAddress = await deleteAddressService(addressId, req.userId);

  return res.status(200).json({ message: deletedAddress });
};
