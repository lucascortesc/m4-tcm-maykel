import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { AppError } from "../../errors/appError";
import { IAddress } from "../../interfaces/address";

export const listAddressService = async (addressId: string, userId: string): Promise<IAddress> => {
  const addressRepository = AppDataSource.getRepository(Address);

  const address = await addressRepository.findOne({
    where: {
      id: addressId,
    },
  });

  if (!address) {
    throw new AppError("address not found", 404);
  }

  if (address.agent.id !== userId) {
    throw new AppError("Agent does not have access to address", 403);
  }

  const returnAddress = {
    id: address.id,
    state: address.state,
    city: address.city,
    cep: address.cep,
    number: address.number,
    street: address.street,
    agent_id: address.agent.id,
  };

  return returnAddress;
};
