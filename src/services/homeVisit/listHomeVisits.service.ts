import AppDataSource from "../../data-source";
import { Agent } from "../../entities/healthAgent.entity";
import { HomeVisit } from "../../entities/homeVisit.entity";
import { AppError } from "../../errors/appError";
import { IHomeVisit } from "../../interfaces/homeVisit";

export const listHomeVisitsService = async (
  agentId: string
): Promise<IHomeVisit> => {
  const homeVisitsRepository = AppDataSource.getRepository(HomeVisit);
  const agentRepository = AppDataSource.getRepository(Agent);

  const agent = await agentRepository.findOneBy({
    id: agentId,
  });

  if (!agent) {
    throw new AppError("Home visits not found", 404);
  }

  const homeVisits = await homeVisitsRepository.findOne({
    where: {
      agent_id: agent,
    },
  });

  if (!homeVisits) {
    throw new AppError("Home visits not found", 404);
  }

  const returnHomeVisits = {
    id: homeVisits.id,
    status: homeVisits.status,
    message: homeVisits.message,
    address_id: homeVisits.address_id.id,
    agent_id: agent.id,
    created_at: homeVisits.created_at,
    updated_at: homeVisits.updated_at,
  };
  return returnHomeVisits;
};
