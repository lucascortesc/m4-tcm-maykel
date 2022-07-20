import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { Agent } from "../../entities/healthAgent.entity";
import { HomeVisit } from "../../entities/homeVisit.entity";
import { AppError } from "../../errors/appError";
import { ICreateHomeVisit, IHomeVisit } from "../../interfaces/homeVisit";

export const createHomeVisitService = async (
  agent_id: string,
  { status, message, address_id }: ICreateHomeVisit
): Promise<IHomeVisit> => {
  const homeVisitRepository = AppDataSource.getRepository(HomeVisit);
  const agentRepository = AppDataSource.getRepository(Agent);
  const addressRepository = AppDataSource.getRepository(Address);

  const agent = await agentRepository.findOneBy({ id: agent_id });
  const address = await addressRepository.findOneBy({
    id: address_id,
  });

  if (!agent) {
    throw new AppError("Agent not found", 404);
  }

  if (!address) {
    throw new AppError("Address not found", 404);
  }

  if (address.agent.id !== agent_id) {
    throw new AppError("Agent does not have access to address", 403);
  }

  const newHomeVisit = homeVisitRepository.create({
    message,
    status,
    address_id: address,
    agent_id: agent,
  });

  await homeVisitRepository.save(newHomeVisit);

  const homeVisit = {
    id: newHomeVisit.id,
    status,
    message,
    address_id: address.id,
    agent_id: agent.id,
    created_at: newHomeVisit.created_at,
    updated_at: newHomeVisit.updated_at,
  };

  return homeVisit;
};
