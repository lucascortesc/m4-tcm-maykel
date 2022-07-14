import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { Agent } from "../../entities/healthAgent.entity";
import { AppError } from "../../errors/appError";

export const listAddressByAgentService = async (agentId: string) => {
  const addressRepository = AppDataSource.getRepository(Address);
  const agentsRepository = AppDataSource.getRepository(Agent);

  const agent = await agentsRepository.findOneBy({ id: agentId });

  if (!agent) {
    throw new AppError("Agent does not exist.", 400);
  }

  const addresses = await addressRepository.find({
    where: { agent: agent },
  });

  const withoutAgent = addresses.map((el) => {
    return {
      id: el.id,
      state: el.state,
      city: el.city,
      street: el.street,
      number: el.number,
      cep: el.cep,
      agentId: agent.id,
    };
  });

  return withoutAgent;
};
