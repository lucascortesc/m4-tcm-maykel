import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { Agent } from "../../entities/healthAgent.entity";
import { AppError } from "../../errors/appError";
import { ICreateAddress, IAddress } from "../../interfaces/address";

export const createAddressService = async (
  { state, city, cep, number, street }: ICreateAddress,
  agentId: string
): Promise<IAddress> => {
  const addressRepository = AppDataSource.getRepository(Address);
  const healthAgentRepository = AppDataSource.getRepository(Agent);

  const findAddress = await addressRepository.findOne({
    where: {
      state,
      city,
      cep,
      number,
      street,
    },
  });

  const healthAgent = await healthAgentRepository.findOneBy({
    id: agentId,
  });

  if (!healthAgent) {
    throw new AppError("Agent not found", 404);
  }

  if (findAddress) {
    throw new AppError("Address already exists");
  }

  const newAddress = await addressRepository.save({
    state,
    city,
    cep,
    number,
    street,
    agent: healthAgent,
  });

  const returnAddress = {
    id: newAddress.id,
    state: newAddress.state,
    city: newAddress.city,
    cep: newAddress.cep,
    number: newAddress.number,
    street: newAddress.street,
    agent_id: newAddress.agent.id,
  };

  return returnAddress;
};
