import AppDataSource from "../../data-source";
import { Agent } from "../../entities/healthAgent.entity";
import { HomeVisit } from "../../entities/homeVisit.entity";
import { AppError } from "../../errors/appError";
import { IHomeVisit } from "../../interfaces/homeVisit";

export const listHomeVisitsService = async (agentId: string): Promise<IHomeVisit[]> => {
  const homeVisitsRepository = AppDataSource.getRepository(HomeVisit);
  const agentRepository = AppDataSource.getRepository(Agent);

  const agent = await agentRepository.findOneBy({
    id: agentId,
  });

  if (!agent) {
    throw new AppError("Home visits not found", 404);
  }

  const homeVisits = await homeVisitsRepository.find({
    where: {
      agent_id: agent,
    },
  });

  if (!homeVisits) {
    throw new AppError("Home visits not found", 404);
  }

  const formatedVisits = homeVisits.map((visit) => {
    return {
      id: visit.id,
      status: visit.status,
      message: visit.message,
      address_id: visit.address_id.id,
      agent_id: visit.id,
      created_at: visit.created_at,
      updated_at: visit.updated_at,
    };
  });

  return formatedVisits;
};
