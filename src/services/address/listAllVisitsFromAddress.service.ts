import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { Agent } from "../../entities/healthAgent.entity";
import { HomeVisit } from "../../entities/homeVisit.entity";
import { AppError } from "../../errors/appError";

export const listAllVisitsFromAddressService = async (addressId: string, agentId: string) => {
  const agentsRepository = AppDataSource.getRepository(Agent);
  const addressRepository = AppDataSource.getRepository(Address);
  const homeVisitRepository = AppDataSource.getRepository(HomeVisit);

  const agent = await agentsRepository.findOneBy({ id: agentId });

  if (!agent) {
    throw new AppError("Agent not found", 404);
  }

  const address = await addressRepository.findOne({
    where: { id: addressId },
  });

  if (!address) {
    throw new AppError("address not found", 404);
  }

  const visits = await homeVisitRepository
    .createQueryBuilder("visit")
    .where("visit.agent_id = :agent_id", { agent_id: agent.id })
    .andWhere("visit.address_id = :address_id", { address_id: address.id })
    .getMany();

  return visits;
};
