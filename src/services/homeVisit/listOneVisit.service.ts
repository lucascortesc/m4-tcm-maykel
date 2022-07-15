import AppDataSource from "../../data-source";
import { HomeVisit } from "../../entities/homeVisit.entity";
import { AppError } from "../../errors/appError";

export const listOneVisitService = async (visitId: string, agentId: string) => {
  const homeVisitRepository = AppDataSource.getRepository(HomeVisit);

  const visit = await homeVisitRepository.findOneBy({ id: visitId });
  if (!visit) {
    throw new AppError("Visit not found", 404);
  }

  if (visit.agent_id.id !== agentId) {
    throw new AppError("Agent does not have access to visit", 401);
  }

  return {
    id: visit.id,
    created_at: visit.created_at,
    updated_at: visit.updated_at,
    status: visit.status,
    message: visit.message,
    agent_id: visit.agent_id.id,
    address_id: visit.address_id.id,
  };
};
