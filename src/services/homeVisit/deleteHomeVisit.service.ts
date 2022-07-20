import AppDataSource from "../../data-source";
import { HomeVisit } from "../../entities/homeVisit.entity";
import { AppError } from "../../errors/appError";

export const deleteHomeVisitService = async (id: string, userId: string) => {
  const getVisitsRepo = AppDataSource.getRepository(HomeVisit);
  const findVisit = await getVisitsRepo.findOneBy({ id: id });

  if (!findVisit) {
    throw new AppError("Visit not found", 404);
  }

  if (findVisit.agent_id.id !== userId) {
    throw new AppError("Agent does not have access to visit", 403);
  }

  await getVisitsRepo.delete(id);

  return "Visit deleted with success";
};
