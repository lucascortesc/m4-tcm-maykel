import { Request, Response } from "express";
import { ICreateAddress } from "../../interfaces/address";
import { createAddressService } from "../../services/address/createAddress.service";

export const createAddress = async (req: Request, res: Response) => {
  const { state, city, cep, number, street }: ICreateAddress = req.body;

  const newAddress = await createAddressService({ state, city, cep, number, street }, req.userId);

  return res.status(201).json(newAddress);
};