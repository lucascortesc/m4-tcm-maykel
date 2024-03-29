import AppDataSource from "../../data-source";
import { HomeVisit } from "../../entities/homeVisit.entity";
import { AppError } from "../../errors/appError";
import { IHomeVisit, IUpdateHomeVisit } from "../../interfaces/homeVisit";
import { Address } from "../../entities/address.entity";

const updateHomeVisitService = async (id: string, data: IUpdateHomeVisit, userId: string): Promise<IHomeVisit> => {
  const homeVisitRepository = AppDataSource.getRepository(HomeVisit);
  const addressRepository = AppDataSource.getTreeRepository(Address);

  if (data.id) {
    throw new AppError("You can't change the visit id", 403);
  }

  if (data.agent_id) {
    throw new AppError("You can't change the agent id", 403);
  }

  if (data.address_id) {
    throw new AppError("You can't change the address id", 403);
  }

  const homeVisit = await homeVisitRepository.findOneBy({ id: id });

  if (!homeVisit) {
    throw new AppError("Visit not found", 404);
  }

  const findAddress = await addressRepository.findOneBy({ id: homeVisit.address_id.id });

  if (!findAddress) {
    throw new AppError("Address not found", 404);
  }

  if (findAddress.agent.id !== userId) {
    throw new AppError("Agent does not have access to address", 403);
  }

  await homeVisitRepository.update(id, data);

  const updatedVisit = await homeVisitRepository.findOneBy({ id: id });
  if (!updatedVisit) {
    throw new AppError("Visit can not be updated, don't worry it's not your fault.");
  }

  return {
    id: updatedVisit.id,
    status: updatedVisit.status,
    message: updatedVisit.message,
    updated_at: updatedVisit.updated_at,
    created_at: updatedVisit.created_at,
    agent_id: updatedVisit.agent_id.id,
    address_id: updatedVisit.address_id.id,
  };
};

export default updateHomeVisitService;
