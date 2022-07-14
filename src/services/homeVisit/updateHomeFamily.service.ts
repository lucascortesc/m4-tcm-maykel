import AppDataSource from "../../data-source";
import { HomeVisit } from "../../entities/homeVisit.entity";
import { AppError } from "../../errors/appError";
import { IHomeVisit, IUpdateHomeVisit } from "../../interfaces/homeVisit";

const updateHomeVisitService = async (
  id: string,
  data: IUpdateHomeVisit
): Promise<IHomeVisit> => {
  const homeVisitRepository = AppDataSource.getRepository(HomeVisit);

  if (data.id) {
    throw new AppError("You can't change the home visit id.");
  }

  const homeVisit = await homeVisitRepository.findOneBy({ id: id });

  await homeVisitRepository.update(id, {
    status: data.status || homeVisit?.status,
    message: data.message || homeVisit?.message,
    address_id: data.address_id || homeVisit?.address_id,
    agent_id: data.agent_id || homeVisit?.agent_id,
    updated_at: new Date(),
  });

  const updatedVisit = await homeVisitRepository.findOneBy({ id: id });
  if (!updatedVisit) {
    throw new AppError(
      "Visit can not be updated, don't worry it's not your fault."
    );
  }
  return updatedVisit;
};

export default updateHomeVisitService;
