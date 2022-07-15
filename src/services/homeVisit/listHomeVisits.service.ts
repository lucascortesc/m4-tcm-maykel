import AppDataSource from "../../data-source";
import { HomeVisit } from "../../entities/homeVisit.entity";
import { AppError } from "../../errors/appError";
import { IHomeVisit } from "../../interfaces/homeVisit";

export const listHomeVisitsService = async (
  visitHomeId: string
): Promise<IHomeVisit> => {
  const homeVisitsRepository = AppDataSource.getRepository(HomeVisit);

  const homeVisits = await homeVisitsRepository.findOne({
    where: {
      id: visitHomeId,
    },
  });

  if (!homeVisits) {
    throw new AppError("Home visits not found", 404);
  }

  const returnHomeVisits = {
    id: homeVisits.id,
    status: homeVisits.status,
    message: homeVisits.message,
    address_id: homeVisits.address_id,
    agent_id: homeVisits.agent_id,
    created_at: homeVisits.created_at,
    updated_at: homeVisits.updated_at,
  };
  return returnHomeVisits;
};
