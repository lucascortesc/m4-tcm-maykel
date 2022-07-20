import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { AppError } from "../../errors/appError";
import { IAddress, IUpdateAddress } from "../../interfaces/address";

export const updateAddressService = async (id: string, agentId: string, data: IUpdateAddress): Promise<IAddress> => {
  const addressRepository = AppDataSource.getRepository(Address);
  const address = await addressRepository.findOneBy({ id });

  if (data.id) {
    throw new AppError("You can't change the address id", 403);
  }

  if (data.agent_id) {
    throw new AppError("You can't change the agent id", 403);
  }

  if (!address) {
    throw new AppError("Address does not exists", 404);
  }

  if (agentId !== address.agent.id) {
    throw new AppError("Agent does not have access to address", 403);
  }

  await addressRepository.update(id, {
    state: data.state || address.state,
    city: data.city || address.city,
    street: data.street || address.street,
    number: data.number || address.number,
    cep: data.cep || address.cep,
  });

  const updatedAddress = await addressRepository.findOneBy({ id });

  if (!updatedAddress) {
    throw new AppError("Address does not exist", 404);
  }

  const withoutAgent = {
    id: id,
    agent_id: agentId,
    state: updatedAddress.state,
    city: updatedAddress.city,
    street: updatedAddress.street,
    number: updatedAddress.number,
    cep: updatedAddress.cep,
  };

  return withoutAgent;
};
